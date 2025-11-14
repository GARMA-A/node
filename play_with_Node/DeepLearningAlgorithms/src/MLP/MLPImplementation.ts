import { createInterface, Interface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { S, O, Err, Segma, DeltaWeight, NewWeight } from './MLPutils.ts';
import { askForNumber } from '../utils/utils.ts';
import { backwardPass, forwardPass, type inputWeights, type inputXandT } from '../../types/types.ts';

export async function MLP() {
	const rl = createInterface({ input: stdin, output: stdout });
	const biasInput = 1;
	try {
		const { weights: initialWeights, xt4: XT4Rows, n } = await takeMLPInput(rl)
		const { allWeightUpdates, allForwardPass, allBackwardPass } = calcMLP(initialWeights, XT4Rows, n, biasInput);
		const weightHistory = [
			...allWeightUpdates
		];
		dieplayMLP(allForwardPass, allBackwardPass, weightHistory, XT4Rows);

	} catch (err) {
		console.error("An error occurred:", err);
	} finally {
		rl.close();
	}
}

function calcMLP(weights: inputWeights, xt4: inputXandT, n: number, biasInput = 1): {
	allWeightUpdates: inputWeights[],
	allForwardPass: forwardPass[],
	allBackwardPass: backwardPass[],
} {

	let currentWeights = { ...weights };
	const allForwardPass: forwardPass[] = [];
	const allBackwardPass: backwardPass[] = [];
	const allWeightUpdates: inputWeights[] = [weights];
	const numSteps = 3;

	try {

		for (let i = 0; i < numSteps; ++i) {
			const p = xt4[i];
			const S3 = S([p.x1, p.x2], [currentWeights.w13, currentWeights.w23]) + currentWeights.wb13;
			const O3 = O(S3);
			const S4 = S([p.x1, p.x2], [currentWeights.w14, currentWeights.w24]) + currentWeights.wb14;
			const O4 = O(S4);

			const S5 = S([O3, O4], [currentWeights.w35, currentWeights.w45]) + currentWeights.wb25;
			const Y = O(S5);
			const E = Err(Y, p.t);

			const d5 = Segma(Y, p.t);
			if (d5 instanceof Error) throw d5;
			const d4 = Segma(undefined, undefined, O4, currentWeights.w45, d5);
			if (d4 instanceof Error) throw d4;
			const d3 = Segma(undefined, undefined, O3, currentWeights.w35, d5);
			if (d3 instanceof Error) throw d3;

			const dw13 = DeltaWeight(n, p.x1, d3);
			const dw14 = DeltaWeight(n, p.x1, d4);
			const dw23 = DeltaWeight(n, p.x2, d3);
			const dw24 = DeltaWeight(n, p.x2, d4);
			const dw35 = DeltaWeight(n, O3, d5);
			const dw45 = DeltaWeight(n, O4, d5);
			const dwb13 = DeltaWeight(n, biasInput, d3);
			const dwb14 = DeltaWeight(n, biasInput, d4);
			const dwb35 = DeltaWeight(n, biasInput, d5);

			allForwardPass.push({
				S3: +S3.toFixed(3),
				O3: O3,
				S4: +S4.toFixed(3),
				O4: O4,
				S5: +S5.toFixed(3),
				Y: Y,
				E: E,
			});

			allBackwardPass.push({
				"δ5": d5,
				"δ4": d4,
				"δ3": d3,
			});

			currentWeights = {
				w13: NewWeight(currentWeights.w13, dw13),
				w14: NewWeight(currentWeights.w14, dw14),
				w23: NewWeight(currentWeights.w23, dw23),
				w24: NewWeight(currentWeights.w24, dw24),
				w35: NewWeight(currentWeights.w35, dw35),
				w45: NewWeight(currentWeights.w45, dw45),
				wb13: NewWeight(currentWeights.wb13, dwb13),
				wb14: NewWeight(currentWeights.wb14, dwb14),
				wb25: NewWeight(currentWeights.wb25, dwb35),
			};

			allWeightUpdates.push({
				w13: currentWeights.w13,
				w14: currentWeights.w14,
				w23: currentWeights.w23,
				w24: currentWeights.w24,
				w35: currentWeights.w35,
				w45: currentWeights.w45,
				wb13: currentWeights.wb13,
				wb14: currentWeights.wb14,
				wb25: currentWeights.wb25,
			});

		}

	} catch (err) {
		console.log("error in calcMLP :", err)
	}

	return { allWeightUpdates, allForwardPass, allBackwardPass }

}



async function takeMLPInput(rl: Interface): Promise<{ weights: inputWeights, xt4: inputXandT, n: number }> {

	const skipInput = await askForNumber(rl, "Enter 1 to skip manual input and use default values, or 0 to enter manually: ");
	let n = 0.3;
	let initialWeights: inputWeights = {
		w13: -0.5,
		w23: -0.5,
		wb13: 0.7,
		w14: 0.5,
		w24: 0.5,
		wb14: -0.75,
		w35: 0.6,
		w45: 0.6,
		wb25: -0.3,
	};
	let XT4Rows: inputXandT = [
		{ x1: 0, x2: 0, t: 1 },
		{ x1: 0, x2: 1, t: 0 },
		{ x1: 1, x2: 0, t: 0 },
		{ x1: 1, x2: 1, t: 1 },
	]

	if (skipInput === 0) {
		console.log("--- Please enter the model weights and biases ---");
		initialWeights = {
			w13: await askForNumber(rl, "Enter W13: "),
			w23: await askForNumber(rl, "Enter W23: "),
			wb13: await askForNumber(rl, "Enter Wb13 (bias): "),
			w14: await askForNumber(rl, "Enter W14: "),
			w24: await askForNumber(rl, "Enter W24: "),
			wb14: await askForNumber(rl, "Enter Wb14 (bias): "),
			w35: await askForNumber(rl, "Enter W35: "),
			w45: await askForNumber(rl, "Enter W45: "),
			wb25: await askForNumber(rl, "Enter Wb25 (bias): "),
		};

		console.log("\n--- Please enter the 4 data rows ---");
		XT4Rows = [];
		for (let i = 0; i < 4; i++) {
			console.log(`\n--- Filling Row ${i + 1} ---`);
			const x1 = await askForNumber(rl, "Enter x1: ");
			const x2 = await askForNumber(rl, "Enter x2: ");
			const t = await askForNumber(rl, "Enter t (target output): ");
			XT4Rows.push({ x1, x2, t });
		}
		n = await askForNumber(rl, "Enter n (learning rate): ");
	}
	return { weights: initialWeights, xt4: XT4Rows, n }
}

function dieplayMLP(allForwardPass: forwardPass[], allBackwardPass: backwardPass[], weightHistory: inputWeights[], XT4Rows: inputXandT) {

	console.log("\n--- TABLE 1: Forward Pass (S3, O3, S4, O4, S5, Y, E) ---");
	console.table(allForwardPass);
	console.log("\n--- TABLE 2: Backward Pass (δ5, δ4, δ3) ---");
	console.table(allBackwardPass);
	console.log("\n--- TABLE 3: Final Table (x1, x2, w13, w23, wb13, w14, w24, wb14, w35, w45, wb2, t) ---");
	const finalTable = XT4Rows.map((row, i) => {
		const weights = weightHistory[i];
		return {
			x1: row.x1,
			x2: row.x2,
			w13: weights.w13,
			w23: weights.w23,
			wb13: weights.wb13,
			w14: weights.w14,
			w24: weights.w24,
			wb14: weights.wb14,
			w35: weights.w35,
			w45: weights.w45,
			wb2: weights.wb25,
			t: row.t,
		};
	});
	console.table(finalTable);
}



import { Interface } from "node:readline/promises";

export async function askForNumber(rl: Interface, query: string): Promise<number> {
	while (true) {
		const answer = await rl.question(query);
		const num = parseFloat(answer);

		if (isNaN(num)) {
			console.log("Invalid input. Please enter a valid number.");
		} else {
			return num;
		}
	}
}

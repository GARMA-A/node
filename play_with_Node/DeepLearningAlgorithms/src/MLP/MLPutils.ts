export function S(inputToNode: number[], weight: number[]): number {
	if (inputToNode.length !== weight.length) {
		throw new Error("Input and weight arrays must have the same length.");
	}
	const s3 = inputToNode.reduce((sum, input, index) => sum + input * weight[index], 0);
	return parseFloat(s3.toFixed(3));
}

export function O(S: number): number {
	return parseFloat((1 / (1 + Math.exp(-S))).toFixed(3));
}

export function Err(Y: number, T: number): number {
	return parseFloat((0.5 * Math.pow((T - Y), 2)).toFixed(3));
}

export function Segma(y?: number, t?: number, o?: number, w?: number, segma?: number): number | Error {
	if (y !== undefined && t !== undefined) {
		return parseFloat((y * (1 - y) * (t - y)).toFixed(3));
	}
	// For hidden layer: o, w, and segma must be provided
	else if (o !== undefined && w !== undefined && segma !== undefined) {
		return parseFloat((o * (1 - o) * (segma * w)).toFixed(3));
	}
	else {
		return new Error("Invalid parameters");
	}
}

export function DeltaWeight(n: number, oi: number, segmaJ: number): number {
	return parseFloat((n * oi * segmaJ).toFixed(3));
}

export function NewWeight(w: number, deltaW: number): number {
	return parseFloat((w + deltaW).toFixed(3));
}


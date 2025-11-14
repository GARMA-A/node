export type inputWeights = {
	w13: number,
	w23: number,
	wb13: number,
	w14: number,
	w24: number,
	wb14: number,
	w35: number,
	w45: number,
	wb25: number,
};
export type inputXandT = { x1: number, x2: number, t: number }[];


export type forwardPass = { S3: number, O3: number, S4: number, O4: number, S5: number, Y: number, E: number }

export type backwardPass = { "δ5": number, "δ4": number, "δ3": number }

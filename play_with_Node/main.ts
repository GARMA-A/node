const S3 = (inputs.x1 * weights.w13) + (inputs.x2 * weights.w23) + weights.wb13;
const O3 = 1 / (1 + Math.exp(-S3));
const S4 = (inputs.x1 * weights.w14) + (inputs.x2 * weights.w24) + weights.wb14;
const O4 = 1 / (1 + Math.exp(-S4));
const S5 = (O3 * weights.w35) + (O4 * weights.w45) + weights.wb35;
const Y = 1 / (1 + Math.exp(-S5));
const E = Math.pow(inputs.t - Y, 2) / 2;

const delta5 = Y * (1 - Y) * (inputs.t - Y);
const delta4 = O4 * (1 - O4) * (weights.w45 * delta5);
const delta3 = O3 * (1 - O3) * (weights.w35 * delta5);

const eta = 0.3;
const new_w13 = weights.w13 + (eta * inputs.x1 * delta3);
const new_w14 = weights.w14 + (eta * inputs.x1 * delta4);
const new_w23 = weights.w23 + (eta * inputs.x2 * delta3);
const new_w24 = weights.w24 + (eta * inputs.x2 * delta4);
const new_w35 = weights.w35 + (eta * O3 * delta5);
const new_w45 = weights.w45 + (eta * O4 * delta5);
const new_wb13 = weights.wb13 + (eta * 1 * delta3);
const new_wb14 = weights.wb14 + (eta * 1 * delta4);
const new_wb35 = weights.wb35 + (eta * 1 * delta5);

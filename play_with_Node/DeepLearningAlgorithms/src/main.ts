import { createInterface } from "node:readline/promises";
import { MLP } from "./MLP/MLPImplementation.ts";
import { askForNumber } from "./utils/utils.ts";
import { stdin, stdout } from "node:process";



console.log("Welcoem to Advnced AI CLI tool \n\n");
console.log("to calc MLP problem Press 1 \n");
console.log("to calc Gene problem Press 2 \n");

(async () => {

	const rl = createInterface({ input: stdin, output: stdout })
	const choice = await askForNumber(rl, "Enter your choice: ")
	if (choice === 1) {
		MLP();
	} else if (choice === 2) {
		console.log("Gene problem is not implemented yet.");
	}

})();






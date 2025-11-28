async function wait(milliseconds: number) {
	await new Promise((res) => setTimeout(() => { res("resolved") }, milliseconds));
}

async function main() {
	console.log("before waiting")
	await wait(3000);
	console.log("after waiting")

}
main()


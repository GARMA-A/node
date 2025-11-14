async function success_staff() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
async function faliar_staff() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("error"));
        }, 1000);
    });
}
async function task() {
    try {
        let a = await Promise.all([
            success_staff(),
            success_staff(),
            faliar_staff(),
            success_staff()
        ]);
        console.log("promise success");
        console.log(a);
    }
    catch (err) {
        console.log("promise  failed");
    }
}
task();

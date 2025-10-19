interface writeBehavior {
	write(): void;
}
interface readBehavior {
	read(): void;
}

class strong_person implements readBehavior, writeBehavior {
	read(): void {
		console.log("i,m adult of course i can read")
	}
	write(): void {
		console.log("i'm adualt of course i can write")
	}
}
class weak_person implements readBehavior, writeBehavior {
	read(): void {
		console.log("i,m still a baby i cannot read yet")
	}
	write(): void {
		console.log("i,m still a baby i cnnot write yet")
	}
}


class Person {
	protected readWrite: readBehavior & writeBehavior;

	constructor(readWrite: readBehavior & writeBehavior) {
		this.readWrite = readWrite
	}

	performRead(): void {
		this.readWrite.read()
	}

	performWrite(): void {
		this.readWrite.write()
	}
}

class Student extends Person {

	constructor() {
		super(new strong_person())
	}

}

class baby extends Person {
	constructor() {
		super(new weak_person())
	}
}


const s = new Student()
s.performRead()
s.performWrite()

const b = new baby()
b.performWrite()
b.performRead()









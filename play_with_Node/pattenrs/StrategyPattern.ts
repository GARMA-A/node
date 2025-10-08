// 🧠 1. Strategy Interfaces
interface FlyBehavior {
	fly(): void;
}

interface QuackBehavior {
	quack(): void;
}

// 🛠 2. Concrete Fly Behaviors
class FlyWithWings implements FlyBehavior {
	fly(): void {
		console.log("🦆 I'm flying with wings!");
	}
}

class FlyNoWay implements FlyBehavior {
	fly(): void {
		console.log("🚫 I can't fly.");
	}
}

class FlyRocketPowered implements FlyBehavior {
	fly(): void {
		console.log("🚀 I'm flying with a rocket!");
	}
}

// 🛠 3. Concrete Quack Behaviors
class Quack implements QuackBehavior {
	quack(): void {
		console.log("Quack 🗣️");
	}
}

class Squeak implements QuackBehavior {
	quack(): void {
		console.log("Squeak 🐭");
	}
}

class MuteQuack implements QuackBehavior {
	quack(): void {
		console.log("🤫 ...silence...");
	}
}

// 🦆 4. Duck Abstract Class
abstract class Duck {
	protected flyBehavior: FlyBehavior;
	protected quackBehavior: QuackBehavior;

	constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
		this.flyBehavior = flyBehavior;
		this.quackBehavior = quackBehavior;
	}

	performFly(): void {
		this.flyBehavior.fly();
	}

	performQuack(): void {
		this.quackBehavior.quack();
	}

	swim(): void {
		console.log("🌊 All ducks float, even decoys!");
	}

	setFlyBehavior(fb: FlyBehavior): void {
		this.flyBehavior = fb;
	}

	setQuackBehavior(qb: QuackBehavior): void {
		this.quackBehavior = qb;
	}

	abstract display(): void;
}

// 🦆 5. Concrete Duck Types
class MallardDuck extends Duck {
	constructor() {
		super(new FlyWithWings(), new Quack());
	}

	display(): void {
		console.log("🦆 I'm a real Mallard duck");
	}
}

class ModelDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new Quack());
	}

	display(): void {
		console.log("🧸 I'm a model duck");
	}
}

// 🧪 6. Test the pattern
const mallard = new MallardDuck();
mallard.display();
mallard.performFly();
mallard.performQuack();

console.log("-----");

const model = new ModelDuck();
model.display();
model.performQuack();
model.performFly(); // initially can't fly

// Change strategy at runtime 🚀
model.setFlyBehavior(new FlyRocketPowered());
model.performFly(); // now rocket powered!

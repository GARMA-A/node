interface Observer {
	name: string;
	update(data: string): void;
}

class Subject {
	private Observers: Observer[] = []
	registerObserver(observer: Observer) {
		this.Observers.push(observer);
	}

	unregisterObserver(observer: Observer) {
		this.Observers = this.Observers.filter((el) => el !== observer)
	}

	notify(data: string) {
		for (const obs of this.Observers) {
			obs.update(data)
		}
	}
}


class ConcreteObserver implements Observer {
	constructor(public name: string) {

	}
	update(data: string) {
		console.log(`observer ${this.name} updated with ${data} `)
	}
}



const ob1 = new ConcreteObserver("obs1")
const ob2 = new ConcreteObserver("obs2")
const ob3 = new ConcreteObserver("obs3")

const sub = new Subject()

sub.registerObserver(ob1)

sub.registerObserver(ob2)

sub.registerObserver(ob3)
sub.notify("new update")







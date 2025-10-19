abstract class Observer {
	abstract update(data: string): void;
}

class Subject {
	private Observers: Observer[] = [];
	constructor() {
	}

	subscribe(o: Observer): void {
		this.Observers.push(o)
	}

	unSubscribe(o: Observer): void {
		this.Observers = this.Observers.filter(el => el !== o)
	}

	notify(data: string): void {
		for (const obs of this.Observers) {
			obs.update(data)
		}
	}
}


class Observer1 implements Observer {
	update(data: string): void {
		console.log(`Observer1 recived an update with data = ${data}`)
	}
}




class Observer2 implements Observer {
	update(data: string): void {
		console.log(`Observer2 recived an update with data = ${data}`)
	}
}



const ob1 = new Observer1()
const ob2 = new Observer2()

const sub = new Subject()


sub.subscribe(ob1)
sub.subscribe(ob2)

sub.notify("correct")








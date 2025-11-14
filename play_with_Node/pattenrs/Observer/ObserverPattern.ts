// abstract class Observer {
// 	abstract update(data: string): void;
// }
//
// class Subject {
//
// 	private observers: Observer[] = [];
//
// 	subscribe(observer: Observer): void {
// 		this.observers.push(observer);
// 	}
//
// 	unSubscribe(observer: Observer): void {
// 		this.observers = this.observers.filter(el => observer !== el)
// 	}
//
// 	notify(data: string): void {
// 		for (const el of this.observers) {
// 			el.update(data)
// 		}
// 	}
// }
//
//
// class ObserverConcreteImpl extends Observer {
// 	constructor(private name: string) { super() }
// 	update(data: string): void {
// 		console.log(`${this.name} got new update with data = ${data}`)
// 	}
// }
//
//
// const subject = new Subject()
//
// const ob1 = new ObserverConcreteImpl("observer 1")
// const ob2 = new ObserverConcreteImpl("observer 2")
//
// subject.subscribe(ob1)
// subject.subscribe(ob2)
//
// subject.notify("update 1")
// subject.notify("update 2")
//
//
//
//
//
//

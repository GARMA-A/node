var Subject = /** @class */ (function () {
    function Subject() {
        this.Observers = [];
    }
    Subject.prototype.registerObserver = function (observer) {
        this.Observers.push(observer);
    };
    Subject.prototype.unregisterObserver = function (observer) {
        this.Observers = this.Observers.filter(function (el) { return el !== observer; });
    };
    Subject.prototype.notify = function (data) {
        for (var _i = 0, _a = this.Observers; _i < _a.length; _i++) {
            var obs = _a[_i];
            obs.update(data);
        }
    };
    return Subject;
}());
var ConcreteObserver = /** @class */ (function () {
    function ConcreteObserver(name) {
        this.name = name;
    }
    ConcreteObserver.prototype.update = function (data) {
        console.log("observer ".concat(this.name, " updated with ").concat(data, " "));
    };
    return ConcreteObserver;
}());
var ob1 = new ConcreteObserver("obs1");
var ob2 = new ConcreteObserver("obs2");
var ob3 = new ConcreteObserver("obs3");
var sub = new Subject();
sub.registerObserver(ob1);
sub.registerObserver(ob2);
sub.registerObserver(ob3);
sub.notify("new update");

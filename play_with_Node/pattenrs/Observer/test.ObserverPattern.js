var Observer = /** @class */ (function () {
    function Observer() {
    }
    return Observer;
}());
var Subject = /** @class */ (function () {
    function Subject() {
        this.Observers = [];
    }
    Subject.prototype.subscribe = function (o) {
        this.Observers.push(o);
    };
    Subject.prototype.unSubscribe = function (o) {
        this.Observers = this.Observers.filter(function (el) { return el !== o; });
    };
    Subject.prototype.notify = function (data) {
        for (var _i = 0, _a = this.Observers; _i < _a.length; _i++) {
            var obs = _a[_i];
            obs.update(data);
        }
    };
    return Subject;
}());
var Observer1 = /** @class */ (function () {
    function Observer1() {
    }
    Observer1.prototype.update = function (data) {
        console.log("Observer1 recived an update with data = ".concat(data));
    };
    return Observer1;
}());
var Observer2 = /** @class */ (function () {
    function Observer2() {
    }
    Observer2.prototype.update = function (data) {
        console.log("Observer2 recived an update with data = ".concat(data));
    };
    return Observer2;
}());
var ob1 = new Observer1();
var ob2 = new Observer2();
var sub = new Subject();
sub.subscribe(ob1);
sub.subscribe(ob2);
sub.notify("correct");

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 🛠 2. Concrete Fly Behaviors
var FlyWithWings = /** @class */ (function () {
    function FlyWithWings() {
    }
    FlyWithWings.prototype.fly = function () {
        console.log("🦆 I'm flying with wings!");
    };
    return FlyWithWings;
}());
var FlyNoWay = /** @class */ (function () {
    function FlyNoWay() {
    }
    FlyNoWay.prototype.fly = function () {
        console.log("🚫 I can't fly.");
    };
    return FlyNoWay;
}());
var FlyRocketPowered = /** @class */ (function () {
    function FlyRocketPowered() {
    }
    FlyRocketPowered.prototype.fly = function () {
        console.log("🚀 I'm flying with a rocket!");
    };
    return FlyRocketPowered;
}());
// 🛠 3. Concrete Quack Behaviors
var Quack = /** @class */ (function () {
    function Quack() {
    }
    Quack.prototype.quack = function () {
        console.log("Quack 🗣️");
    };
    return Quack;
}());
var Squeak = /** @class */ (function () {
    function Squeak() {
    }
    Squeak.prototype.quack = function () {
        console.log("Squeak 🐭");
    };
    return Squeak;
}());
var MuteQuack = /** @class */ (function () {
    function MuteQuack() {
    }
    MuteQuack.prototype.quack = function () {
        console.log("🤫 ...silence...");
    };
    return MuteQuack;
}());
// 🦆 4. Duck Abstract Class
var Duck = /** @class */ (function () {
    function Duck(flyBehavior, quackBehavior) {
        this.flyBehavior = flyBehavior;
        this.quackBehavior = quackBehavior;
    }
    Duck.prototype.performFly = function () {
        this.flyBehavior.fly();
    };
    Duck.prototype.performQuack = function () {
        this.quackBehavior.quack();
    };
    Duck.prototype.swim = function () {
        console.log("🌊 All ducks float, even decoys!");
    };
    Duck.prototype.setFlyBehavior = function (fb) {
        this.flyBehavior = fb;
    };
    Duck.prototype.setQuackBehavior = function (qb) {
        this.quackBehavior = qb;
    };
    return Duck;
}());
// 🦆 5. Concrete Duck Types
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        return _super.call(this, new FlyWithWings(), new Quack()) || this;
    }
    MallardDuck.prototype.display = function () {
        console.log("🦆 I'm a real Mallard duck");
    };
    return MallardDuck;
}(Duck));
var ModelDuck = /** @class */ (function (_super) {
    __extends(ModelDuck, _super);
    function ModelDuck() {
        return _super.call(this, new FlyNoWay(), new Quack()) || this;
    }
    ModelDuck.prototype.display = function () {
        console.log("🧸 I'm a model duck");
    };
    return ModelDuck;
}(Duck));
// 🧪 6. Test the pattern
var mallard = new MallardDuck();
mallard.display();
mallard.performFly();
mallard.performQuack();
console.log("-----");
var model = new ModelDuck();
model.display();
model.performQuack();
model.performFly(); // initially can't fly
// Change strategy at runtime 🚀
model.setFlyBehavior(new FlyRocketPowered());
model.performFly(); // now rocket powered!

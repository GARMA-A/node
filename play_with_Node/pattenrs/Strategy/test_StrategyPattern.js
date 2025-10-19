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
var strong_person = /** @class */ (function () {
    function strong_person() {
    }
    strong_person.prototype.read = function () {
        console.log("i,m adult of course i can read");
    };
    strong_person.prototype.write = function () {
        console.log("i'm adualt of course i can write");
    };
    return strong_person;
}());
var weak_person = /** @class */ (function () {
    function weak_person() {
    }
    weak_person.prototype.read = function () {
        console.log("i,m still a baby i cannot read yet");
    };
    weak_person.prototype.write = function () {
        console.log("i,m still a baby i cnnot write yet");
    };
    return weak_person;
}());
var Person = /** @class */ (function () {
    function Person(readWrite) {
        this.readWrite = readWrite;
    }
    Person.prototype.performRead = function () {
        this.readWrite.read();
    };
    Person.prototype.performWrite = function () {
        this.readWrite.write();
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student() {
        return _super.call(this, new strong_person()) || this;
    }
    return Student;
}(Person));
var baby = /** @class */ (function (_super) {
    __extends(baby, _super);
    function baby() {
        return _super.call(this, new weak_person()) || this;
    }
    return baby;
}(Person));
var s = new Student();
s.performRead();
s.performWrite();
var b = new baby();
b.performWrite();
b.performRead();

var e1 = {
    name: 'max',
    privilege: ['create'],
    startDate: new Date()
};
// type gaurds
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInfo(emp) {
    console.log('Name: ' + emp.name);
    if ('privilege' in emp) {
        console.log('Privileage: ' + emp.privilege);
    }
    // throw erro
    // if (typeof emp === 'object') {
    //     console.log('Privileage: '+ emp.privilege)
    // }
}
printEmployeeInfo(e1);
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('Driving ....');
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log('Driving truck ....');
    };
    Truck.prototype.loadCargro = function (load) {
        console.log('Loading cargo ....', load);
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargro(1000);
    }
}
useVehicle(v1);
useVehicle(v2);

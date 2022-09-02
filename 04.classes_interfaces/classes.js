// OOP - object oriented programming
// classes in blueprint for objects
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
// public
// private
// readonly
// inheritance
// protected
// getter and setter
// static -- not able to access on instance of class we can access to the class or in the class.
// Abstract -- will help when we want extends class will have some common method then we can not intantiate class;
var Department = /** @class */ (function () {
    function Department(id, name) {
        this.id = id;
        this.name = name;
        // name: string; // by default variable will be public `public name: string;`
        // private name: string; // by default variable will be public `public name: string;`
        // private employees: string[] = [] // private or # keyword => outside world can not access
        this.employees = []; // this will be available within in class and also who ever interit and not out side of world.
        // this.id = id
        // this.name = name;
    }
    // static method
    Department.createEmployee = function (name) {
        return { name: name };
    };
    // console.log(`Department: ${this.id} ` + this.name)
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.pringEmployee = function () {
        console.log(this.employees);
    };
    return Department;
}());
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = _super.call(this, id, 'IT') || this;
        _this.admins = admins;
        return _this;
    }
    ITDepartment.prototype.describe = function () {
        console.log('ITT dept.....', this.id);
    };
    return ITDepartment;
}(Department));
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(id, reports) {
        var _this = _super.call(this, id, 'Accounting') || this;
        _this.reports = reports;
        _this.reports = reports;
        return _this;
    }
    Object.defineProperty(AccountingDepartment.prototype, "mostRecentReport", {
        // add getter 
        get: function () {
            if (this.lastReport) {
                return this.lastReport;
            }
            throw new Error('No report found');
        },
        // setter
        set: function (value) {
            if (!value) {
                throw new Error('Please pass a valid value');
            }
            this.addReport(value);
        },
        enumerable: false,
        configurable: true
    });
    AccountingDepartment.getInstance = function () {
        if (AccountingDepartment.instance)
            return this.instance;
        this.instance = new AccountingDepartment('d2', []);
    };
    AccountingDepartment.prototype.describe = function () {
        console.log(this.id, 'from accounting');
    };
    // we can add or modified base class method and variable
    AccountingDepartment.prototype.addEmployee = function (name) {
        this.employees.push(name); // here we using the protected employees
    };
    AccountingDepartment.prototype.addReport = function (report) {
        this.reports.push(report);
        this.lastReport = report;
    };
    AccountingDepartment.prototype.getReports = function () {
        console.log(this.reports);
    };
    return AccountingDepartment;
}(Department));
var newEmp = Department.createEmployee('EMP1'); // it static will be available without initaiting with new keyword
// console.log(newEmp)
// const accounting = new Department('d1','Accounting')
var accountingIT = new ITDepartment('d2', ['Accounting']);
// accounting.describe()
// console.log(accounting)
// console.log(accountingIT)
// const accountingNew = new AccountingDepartment('ACC1', ['Something'])
var accountingNew = AccountingDepartment.getInstance();
var accountingNew2 = AccountingDepartment.getInstance();
console.log(accountingNew, accountingNew2);
// accountingNew.mostRecentReport = 'Year end report'
// console.log(accountingNew.mostRecentReport) // No report found
// accountingNew.addReport('Check')
// console.log(accountingNew.mostRecentReport) // No report found
// accountingNew.getReports()
// accounting.employees[2] = 'Abhi' // 
// accounting.addEmployee('Sudhir singh')
// accounting.addEmployee('Abhay singh')
// accounting.pringEmployee()

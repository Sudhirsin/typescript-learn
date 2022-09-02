// OOP - object oriented programming
// classes in blueprint for objects

// public
// private
// readonly
// inheritance
// protected
// getter and setter
// static -- not able to access on instance of class we can access to the class or in the class.
// Abstract -- will help when we want extends class will have some common method then we can not intantiate class;

abstract class Department { //abstract
    // name: string; // by default variable will be public `public name: string;`
    // private name: string; // by default variable will be public `public name: string;`
    // private employees: string[] = [] // private or # keyword => outside world can not access
    protected employees: string[] = [] // this will be available within in class and also who ever interit and not out side of world.

    constructor(protected readonly id: string, public name: string) { // shorthand
        // this.id = id
        // this.name = name;
    }

    // static method
    static createEmployee(name: string) {
        return { name }
    }

    // abstract
    abstract describe(this: Department): void;
    // console.log(`Department: ${this.id} ` + this.name)

    addEmployee(employee) {
        this.employees.push(employee)
    }

    pringEmployee() {
        console.log(this.employees)
    }
}


class ITDepartment extends Department { // extends will help to inferit
    public admins: string[]
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins
    }

    describe() {
        console.log('ITT dept.....', this.id)
    }
}

class AccountingDepartment extends Department { // extends will help to inferit
    private lastReport: string;
    private static instance: AccountingDepartment; 

    // add getter 
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found')
    }

    // setter
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass a valid value')
        }
        this.addReport(value)
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.reports = reports
    }

    static getInstance() {
        if (AccountingDepartment.instance) return this.instance;
        this.instance = new AccountingDepartment('d2', []);
    }

    describe() {
        console.log(this.id, 'from accounting')
    }

    // we can add or modified base class method and variable
    addEmployee(name: string) {
        this.employees.push(name) // here we using the protected employees
    }

    addReport(report) {
        this.reports.push(report)
        this.lastReport = report;
    }

    getReports() {
        console.log(this.reports)
    }
}


const newEmp = Department.createEmployee('EMP1') // it static will be available without initaiting with new keyword
// console.log(newEmp)
// const accounting = new Department('d1','Accounting')
const accountingIT = new ITDepartment('d2',['Accounting'])
// accounting.describe()
// console.log(accounting)
// console.log(accountingIT)

// const accountingNew = new AccountingDepartment('ACC1', ['Something'])
const accountingNew = AccountingDepartment.getInstance()
const accountingNew2 = AccountingDepartment.getInstance()
console.log(accountingNew, accountingNew2)
// accountingNew.mostRecentReport = 'Year end report'
// console.log(accountingNew.mostRecentReport) // No report found
// accountingNew.addReport('Check')
// console.log(accountingNew.mostRecentReport) // No report found
// accountingNew.getReports()


// accounting.employees[2] = 'Abhi' // 
// accounting.addEmployee('Sudhir singh')
// accounting.addEmployee('Abhay singh')
// accounting.pringEmployee()

// descibe the structure of object -- it will availble in only ts.
// used for type check
// type and interface is not same but we can use them interchangebly
// major defference in interface is used describe the structure of object
// but with type we can add more flexible like use union etc
// `?` used for optional properties;
var user1;
user1 = {
    name: 'sudhir',
    age: 34,
    greet: function (phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
user1.greet('Hi');
// ex-2
var PersonNew = /** @class */ (function () {
    // now we can extend the class also
    function PersonNew(n) {
    }
    PersonNew.prototype.greet = function (phrase) {
        console.log(phrase + ' ' + this.name);
    };
    return PersonNew;
}());
var user2;
user2 = {
    name: 'Sudhir',
    greet: function (phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
var add;
add = function (n1, n2) { return n1 + n2; };

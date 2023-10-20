"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
function createRandomUser() {
    var sex = faker_1.faker.person.sexType();
    var firstName = faker_1.faker.person.firstName(sex);
    var lastName = faker_1.faker.person.lastName();
    var email = faker_1.faker.helpers.unique(faker_1.faker.internet.email, [
        firstName,
        lastName,
    ]);
    var fligthNumber = faker_1.faker.number.int({ min: 1000000, max: 9999999 });
    var terminal = faker_1.faker.number.int({ min: 0, max: 50 });
    return {
        _id: faker_1.faker.string.uuid(),
        avatar: faker_1.faker.image.avatar(),
        birthday: faker_1.faker.date.birthdate(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        sex: sex,
        subscriptionTier: faker_1.faker.helpers.arrayElement(["free", "basic", "business"]),
        terminal: terminal,
        fligthNumber: fligthNumber,
    };
}
var user = createRandomUser();
var usersdata = [];
for (var i = 0; i < 20; i++) {
    usersdata.push(createRandomUser());
}
fs.writeFileSync("./db.json", JSON.stringify({ users: usersdata }));

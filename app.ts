import { faker } from "@faker-js/faker";
import type { SexType } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";
type SubscriptionTier = "free" | "basic" | "business";

interface User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: SexType;
  subscriptionTier: SubscriptionTier;
  terminal: number;
  fligthNumber: number;
}

function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);
  const fligthNumber = faker.number.int({ min: 1000000, max: 9999999 });
  const terminal = faker.number.int({ min: 0, max: 50 });

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    subscriptionTier: faker.helpers.arrayElement(["free", "basic", "business"]),
    terminal,
    fligthNumber,
  };
}

const user = createRandomUser();

const usersdata = [] as User[];
for (let i = 0; i < 20; i++) {
  usersdata.push(createRandomUser());
}

fs.writeFileSync("./db.json", JSON.stringify({ users: usersdata }));

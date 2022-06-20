import { PrismaClient } from "@prisma/client";

import { users } from "./seeds/users";
const prisma = new PrismaClient();

async function main() {
  users.map(async (_user) => {
    await prisma.user.create({
      data: _user
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

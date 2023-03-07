import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import encryption from "../service/encryption"

async function main() {
  const userrole1 = await prisma.userRole.upsert({
    where: { id: 1 },
    update: {},
    create: {
      value: "Administrator"
    }
  })

  const userrole2 = await prisma.userRole.upsert({
    where: { id: 2 },
    update: {},
    create: {
      value: "Default User"
    }
  })

  const admin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: "",
      username: "admin",
      password: "",
      roles: {
        connect: [{id: userrole1.id}]
      },
      imageURL: "",
    }
  })
  await encryption.hashAndStore(admin.id, "admin");
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

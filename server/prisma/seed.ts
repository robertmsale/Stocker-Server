import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import encryption from "$/service/encryption";

async function main() {
  const task1 = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      label: 'task1',
      done: true
    }
  })

  const task2 = await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      label: 'task2',
      done: false
    }
  })

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
  console.log({ task1, task2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

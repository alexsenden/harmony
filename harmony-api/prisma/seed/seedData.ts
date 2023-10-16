import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(
    await prisma.user.upsert({
      where: { userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb' },
      update: {},
      create: {
        userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
        username: 'Default User',
        password: '',
        active: true,
      },
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    throw new Error()
  })

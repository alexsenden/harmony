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
        firstName: 'John',
        lastName: 'Doe'
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: '99dbc8f9-135b-4ae4-8f42-e471437c87ac' },
      update: {},
      create: {
        artistId: '99dbc8f9-135b-4ae4-8f42-e471437c87ac',
        artistName: 'Drake',
        artistAlias: 'Drizzy',
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: '22973c6e-cd81-4c79-bdb4-6f0726a7f5fa' },
      update: {},
      create: {
        artistId: '22973c6e-cd81-4c79-bdb4-6f0726a7f5fa',
        artistName: 'Johnny Cash',
        artistAlias: '',
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: 'd3875672-d4ad-496b-bdc4-76993154ba87' },
      update: {},
      create: {
        artistId: 'd3875672-d4ad-496b-bdc4-76993154ba87',
        artistName: 'Taylor Swift',
        artistAlias: '',
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: '14baed3e-ba52-4ad2-ab8a-06e5b8be614a' },
      update: {},
      create: {
        artistId: '14baed3e-ba52-4ad2-ab8a-06e5b8be614a',
        artistName: 'The Tragically Hip',
        artistAlias: '',
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: 'ee22cf64-b75f-42a1-a1be-ab4adb4e03c7' },
      update: {},
      create: {
        albumId: 'ee22cf64-b75f-42a1-a1be-ab4adb4e03c7',
        albumName: 'Graduation',
        albumDescription: '',
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: '28ea65a9-4dff-4f2f-b1d4-a089f3c010cf' },
      update: {},
      create: {
        albumId: '28ea65a9-4dff-4f2f-b1d4-a089f3c010cf',
        albumName: 'Abbey Road',
        albumDescription: '',
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: '08817edf-0c4d-4266-a795-97ae770878f3' },
      update: {},
      create: {
        albumId: '08817edf-0c4d-4266-a795-97ae770878f3',
        albumName: 'Astroworld',
        albumDescription: '',
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: 'a2850d9e-193a-460a-9d51-5adcd1e9d566' },
      update: {},
      create: {
        albumId: 'a2850d9e-193a-460a-9d51-5adcd1e9d566',
        albumName: 'Some Nights',
        albumDescription: '',
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: 'd2647e0d-60a0-40ce-a276-4d29ef0b40da' },
      update: {},
      create: {
        songId: 'd2647e0d-60a0-40ce-a276-4d29ef0b40da',
        songName: 'Drift Away',
        songDescription: '',
        artistId: '99dbc8f9-135b-4ae4-8f42-e471437c87ac',
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: 'f02dd966-3b9b-4bff-a994-4d79e358c778' },
      update: {},
      create: {
        songId: 'f02dd966-3b9b-4bff-a994-4d79e358c778',
        songName: 'drive ME crazy!',
        songDescription: '',
        artistId: '99dbc8f9-135b-4ae4-8f42-e471437c87ac',
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: '679dfec3-6fd9-4c18-89aa-48775611a336' },
      update: {},
      create: {
        songId: '679dfec3-6fd9-4c18-89aa-48775611a336',
        songName: "Tuesday's Gone",
        songDescription: '',
        artistId: '99dbc8f9-135b-4ae4-8f42-e471437c87ac',
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: '8e3bc354-a27c-4403-b5c9-97b6dd88f219' },
      update: {},
      create: {
        songId: '8e3bc354-a27c-4403-b5c9-97b6dd88f219',
        songName: "Day 'N' Nite",
        songDescription: '',
        artistId: '99dbc8f9-135b-4ae4-8f42-e471437c87ac',
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

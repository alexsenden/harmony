import { PostType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  console.log(
    await prisma.user.upsert({
      where: { userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb' },
      update: {},
      create: {
        userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
        username: 'MrUserGuy',
        password:
          'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        active: true,
        firstName: 'Mr.',
        lastName: 'User',
      },
    })
  )

  console.log(
    await prisma.user.upsert({
      where: { userId: '9ba2787c-3178-45f1-9b60-2d2b701b2ab8' },
      update: {},
      create: {
        userId: '9ba2787c-3178-45f1-9b60-2d2b701b2ab8',
        username: 'default_user',
        password:
          'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        active: true,
        firstName: 'John',
        lastName: 'Doe',
      },
    })
  )

  console.log(
    await prisma.follow.upsert({
      where: {
        followingId_followerId: {
          followerId: '9ba2787c-3178-45f1-9b60-2d2b701b2ab8',
          followingId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
        },
      },
      update: {},
      create: {
        followerId: '9ba2787c-3178-45f1-9b60-2d2b701b2ab8',
        followingId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: 1 },
      update: {},
      create: {
        artistId: 1,
        artistName: 'Drake',
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: 2 },
      update: {},
      create: {
        artistId: 2,
        artistName: 'Johnny Cash',
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: 3 },
      update: {},
      create: {
        artistId: 3,
        artistName: 'Taylor Swift',
      },
    })
  )

  console.log(
    await prisma.artist.upsert({
      where: { artistId: 4 },
      update: {},
      create: {
        artistId: 4,
        artistName: 'The Tragically Hip',
      },
    })
  )

  console.log(
    await prisma.artistCredit.upsert({
      where: { artistCreditId: 1 },
      update: {},
      create: {
        artistCreditId: 1,
        formattedName: 'fake-artist',
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: 5 },
      update: {},
      create: {
        albumId: 5,
        albumName: 'Graduation',
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: 6 },
      update: {},
      create: {
        albumId: 6,
        albumName: 'Abbey Road',
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: 7 },
      update: {},
      create: {
        albumId: 7,
        albumName: 'Astroworld',
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.album.upsert({
      where: { albumId: 8 },
      update: {},
      create: {
        albumId: 8,
        albumName: 'Some Nights',
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: 9 },
      update: {},
      create: {
        songId: 9,
        songName: 'Drift Away',
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: 10 },
      update: {},
      create: {
        songId: 10,
        songName: 'drive ME crazy!',
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: 11 },
      update: {},
      create: {
        songId: 11,
        songName: "Tuesday's Gone",
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.song.upsert({
      where: { songId: 12 },
      update: {},
      create: {
        songId: 12,
        songName: "Day 'N' Nite",
        artistCreditId: 1,
      },
    })
  )

  console.log(
    await prisma.post.upsert({
      where: { postId: 'b08853b8-8d52-469c-8dab-60ba2b54506f' },
      update: {},
      create: {
        postId: 'b08853b8-8d52-469c-8dab-60ba2b54506f',
        userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
        title: 'What do you think about The Tragically Hip?',
        postType: PostType.DISCUSSION,
        content: 'They are one of my favourite bands. Are they one of yours?',
        artistId: 4,
      },
    })
  )

  console.log(
    await prisma.post.upsert({
      where: { postId: '7ef9a0d9-2afd-4f33-af90-7710a8fdf689' },
      update: {},
      create: {
        postId: '7ef9a0d9-2afd-4f33-af90-7710a8fdf689',
        userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
        title: 'What is the best song off of this album?',
        postType: PostType.POLL,
        albumId: 5,
      },
    })
  )

  console.log(
    await prisma.pollOption.upsert({
      where: { pollOptionId: '84b8b917-6da1-4c0c-bf68-66e1c0dd66f2' },
      update: {},
      create: {
        postId: '7ef9a0d9-2afd-4f33-af90-7710a8fdf689',
        option: 'Flashing Lights',
        entryNumber: 1,
        pollOptionId: '84b8b917-6da1-4c0c-bf68-66e1c0dd66f2',
      },
    })
  )

  console.log(
    await prisma.pollOption.upsert({
      where: { pollOptionId: 'd547423c-6b56-4aaa-98f6-58867a3f27e5' },
      update: {},
      create: {
        postId: '7ef9a0d9-2afd-4f33-af90-7710a8fdf689',
        option: 'I Wonder',
        entryNumber: 2,
        pollOptionId: 'd547423c-6b56-4aaa-98f6-58867a3f27e5',
      },
    })
  )

  console.log(
    await prisma.pollOption.upsert({
      where: { pollOptionId: '69897f2c-720b-4fcd-bad4-748a9e4555fb' },
      update: {},
      create: {
        postId: '7ef9a0d9-2afd-4f33-af90-7710a8fdf689',
        option: 'Stronger',
        entryNumber: 3,
        pollOptionId: '69897f2c-720b-4fcd-bad4-748a9e4555fb',
      },
    })
  )

  console.log(
    await prisma.pollOption.upsert({
      where: { pollOptionId: 'a0e3041a-8322-4818-b080-639ed7e970d9' },
      update: {},
      create: {
        postId: '7ef9a0d9-2afd-4f33-af90-7710a8fdf689',
        option: 'Good Life',
        entryNumber: 4,
        pollOptionId: 'a0e3041a-8322-4818-b080-639ed7e970d9',
      },
    })
  )

  console.log(
    await prisma.post.upsert({
      where: { postId: 'a706c75a-a076-43d2-b9d2-50d259a063da' },
      update: {},
      create: {
        postId: 'a706c75a-a076-43d2-b9d2-50d259a063da',
        userId: '9ba2787c-3178-45f1-9b60-2d2b701b2ab8',
        title: 'This song is abolutely fantastic!!',
        postType: PostType.REVIEW,
        content:
          'Lynyrd Skynyrd is a magician. Loved this song in Happy Gilmore too.',
        rating: 4.5,
        songId: 11,
      },
    })
  )

  console.log(
    await prisma.comment.upsert({
      where: { commentId: '0b08c78b-44ee-4465-b4a0-421c207c3e52' },
      update: {},
      create: {
        commentId: '0b08c78b-44ee-4465-b4a0-421c207c3e52',
        postId: 'a706c75a-a076-43d2-b9d2-50d259a063da',
        userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
        content:
          "Wow, I loved this song in Happy Gilmore too! Did you know he's the only guy to ever take his stake off and try to stab somebody?",
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

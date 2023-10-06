import { Topic } from '../models/topic'

// Stub
export const getTopicByPartialName = (partialName: string): Array<Topic> => {
  return [
    {
      topicId: {
        artistId: '1',
      },
      name: 'Johnny Cash',
    },
    {
      topicId: {
        artistId: '2',
      },
      name: 'Taylor Swift',
    },
    {
      topicId: {
        artistId: '3',
      },
      name: 'Drake',
    },
    {
      topicId: {
        artistId: '4',
      },
      name: 'The Tragically Hip',
    },
    {
      topicId: {
        albumId: '5',
      },
      name: 'Graduation',
    },
    {
      topicId: {
        albumId: '6',
      },
      name: 'Abbey Road',
    },
    {
      topicId: {
        albumId: '7',
      },
      name: 'Astroworld',
    },
    {
      topicId: {
        albumId: '8',
      },
      name: 'Some Nights',
    },
    {
      topicId: {
        songId: '9',
      },
      name: 'Drift Away',
    },
    {
      topicId: {
        songId: '10',
      },
      name: 'drive ME crazy!',
    },
    {
      topicId: {
        songId: '11',
      },
      name: `Tuesday's Gone`,
    },
    {
      topicId: {
        songId: '12',
      },
      name: `Day 'N' Nite`,
    },
  ]
}

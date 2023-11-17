/*
import prisma from '../../prisma/prisma';
import { getSongTopicByPartialName, getSongById } from '../../src/repos/songRepo'; 

describe('Integration tests for songRepo functions', () => {
  let testSongId: number;

  beforeEach(async () => {
    const testSongData = {
      songId: 1,
      artistCreditId: 1,
      songName: 'Test Song',
      length: 300, 
      songDescription: 'This is a test song',
    };

    await prisma.song.create({
      data: testSongData,
    });

    testSongId = testSongData.songId;
  });

  afterEach(async () => {
    try {
      await prisma.song.deleteMany({
        where: {
          songId: testSongId,
        },
      });
    }
    catch (e) { }
    
  });

  it('should get topics for songs by partial name', async () => {
    const partialName = 'Test';

    const topics = await getSongTopicByPartialName(partialName);

    expect(topics).toBeDefined();
    expect(Array.isArray(topics)).toBe(true);
    expect(topics.length).toBeGreaterThan(0);
  });

  it('should get a song by ID', async () => {
    const song = await getSongById(testSongId);

    expect(song).toBeDefined();
    expect(song.songId).toBe(testSongId);
  });
});
*/
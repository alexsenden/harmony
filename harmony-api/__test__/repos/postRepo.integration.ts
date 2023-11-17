
import prisma from '../../prisma/prisma';
import { HttpError } from '../../src/models/error/httpError';
import { getSongTopicByPartialName, getSongById } from '../../src/repos/songRepo'; // Adjust the path accordingly
import { User } from '../../src/models/user';
import { Post, PostType } from '../../src/models/post';
import {
  createPost, getPostByUserId, getPostsByArtistId, getPostsByAlbumId, getFollowingUserPosts, getPostsBySongId, getTrendingPosts,
  getFollowingArtistPosts, getFollowingAlbumPosts, getFollowingSongPosts, getPostById
} from '../../src/repos/postRepo';

describe('Integration tests for songRepo functions', () => {
  let testUser: User;

  beforeAll(async () => {
    testUser = {
      userId: '1',
      username: 'testuser',
      password: 'testpassword',
      firstName: 'John',
      lastName: 'Doe',
      active: true,
      createdAt: new Date(),
      picture: 0,
    };

    await prisma.user.create({
      data: testUser,
    });
  });

  it('should create a post for the user', async () => {
    const postData: Post = {
      userId: testUser.userId,
      postId: '1',
      createdAt: new Date(),
      postType: PostType.DISCUSSION,
      title: 'Test Artist Post',
      body: 'This is a test post for an artist.',
      topicId: {
        artistId: 1,
      },
      rating: 4.5,
    };

    const createdPost = await createPost(postData);
    expect(createdPost).toBeDefined();
    expect(createdPost.userId).toBe(testUser.userId);
    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.body).toBe(postData.body);
  });
  
  it('should get posts by user ID', async () => {
    const posts = await getPostByUserId(testUser.userId);
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should get posts by artist ID', async () => {
    const artistId = '1';
    const posts = await getPostsByArtistId(artistId);
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should get posts by album ID', async () => {
    const albumId = '5'; 
    const posts = await getPostsByAlbumId(albumId);
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should get posts by song ID', async () => {
    const songId = '11'; 
    const posts = await getPostsBySongId(songId);
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should get trending posts', async () => {
    const posts = await getTrendingPosts();
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should get posts by following users', async () => {
    const posts = await getFollowingUserPosts(testUser.userId);
    expect(posts).toBeDefined();
    expect(posts.length).toBe(0);
  });

  it('should get posts by following artists', async () => {
    const posts = await getFollowingArtistPosts(testUser.userId);
    expect(posts).toBeDefined();
    expect(posts.length).toBe(0);
  });

  it('should get posts by following songs', async () => {
    const posts = await getFollowingSongPosts(testUser.userId);
    expect(posts).toBeDefined();
    expect(posts.length).toBe(0);
  });

  it('should get posts by following albums', async () => {
    const posts = await getFollowingAlbumPosts(testUser.userId);
    expect(posts).toBeDefined();
    expect(posts.length).toBe(0);
  });

  afterAll(async () => {

    try {
      await prisma.post.deleteMany({
        where: {
          userId: testUser.userId,
        },
      });
    }
    catch (e) {

    }

    try {
      await prisma.user.deleteMany({
        where: {
          userId: testUser.userId,
        },
      });
    }
    catch (e) {

    }

  })

});


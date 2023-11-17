import prisma from '../../prisma/prisma';
import { createLike, getLikes, deleteLike } from '../../src/repos/likeRepo';
import { Like } from '../../src/models/like';
import { User } from '../../src/models/user';
import { Post, PostType } from '../../src/models/post';
import { createPost } from '../../src/repos/postRepo';

describe('Integration tests for likeRepo functions', () => {
  let testLike: Like;
  let testUser: User;
  let testPost: Post;

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

    const postData = {
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

    testPost = await createPost(postData);

    testLike = {
      userId: testUser.userId,
      postId: testPost.postId,
    };
  });

  afterAll(async () => {
    try {
      await deleteLike(testLike);
    } catch (e) { 
      console.error('Error deleting like:', e);
    }

    try {
      await prisma.post.deleteMany({
        where: {
          postId: '1',
        },
      });
    }
    catch (e) {
      console.error('Error deleting post:', e);
    }

    
    try {
      await prisma.post.deleteMany({
        where: {
          userId: testPost.userId,
        },
      });
    }
    catch (e) {
      console.error('Error deleting post:', e);
    }

    try {
      await prisma.user.deleteMany({
        where: {
          userId: testUser.userId,
        },
      });
      
    }
    catch (e) {
      console.error('Error deleting user:', e);
    }
  });

  it('should create a like', async () => {
    const newLikeData: Like = {
      userId: testUser.userId, 
      postId: testPost.postId, 
    };

    const newLike = await createLike(newLikeData);

    expect(newLike).toBeDefined();
    expect(newLike.userId).toBe(newLikeData.userId);
    expect(newLike.postId).toBe(newLikeData.postId);  });

  it('should get likes by post ID', async () => {
    const likes = await getLikes(testPost.postId); 

    expect(likes).toBeDefined();
    expect(likes.length).toBeGreaterThan(0);
  });

  it('should delete a like', async () => {
    const initialLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: testLike.userId,
          postId: testLike.postId,
        },
      },
    });

    expect(initialLike).toBeDefined();

    await deleteLike(testLike);

    const deletedLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: testLike.userId,
          postId: testLike.postId,
        },
      },
    });

    expect(deletedLike).toBeNull();
  });
});

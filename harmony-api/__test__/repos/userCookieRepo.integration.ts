/*import prisma from '../../prisma/prisma'
import { User } from '../../src/models/user';
import { assignUserCookie, removeUserCookie } from '../../src/repos/userCookieRepo'

describe('Integration tests for userCookieRepo functions', () => {
    let testUserData: User;
    let userCookie: String;

    beforeEach(async () => {
        // Set up a user for testing
        testUserData = {
            userId: '1',
            username: 'testuser',
            password: 'testpassword',
            firstName: 'John',
            lastName: 'Doe',
            active: true,
            createdAt: new Date(),
            picture: 0,
        };

        // Register the user
        await prisma.user.create({
            data: testUserData,
        });
        
        userCookie = await assignUserCookie(testUserData);
    });

    afterEach(async () => {
        try {
            await prisma.user.deleteMany({
                where: {
                    username: 'testuser',
                },
            });
        }
        catch (e) { }

        try {
            await prisma.userCookie.deleteMany({
                where: {
                    userId: '1',
                },
            });
        }
        catch (e) { }
    });

    it('should assign a cookie to the user', async () => {
        // Assign a cookie to the user

        // Assert that a cookie is assigned
        expect(userCookie).toBeDefined();
        expect(typeof userCookie).toBe('string');

        await removeUserCookie(userCookie.toString());
    });

    it('should remove the user cookie if it exists', async () => {
        // Attempt to remove the user cookie
        console.log("test1", userCookie)
        console.log("test2", userCookie)
        await removeUserCookie(userCookie.toString());
    
        // Confirm that the user cookie is deleted by attempting to retrieve it
        const deletedCookie = await prisma.userCookie.findUnique({
          where: {
            cookie: userCookie.toString(),
          },
        });
    
        // Assert that the user cookie is deleted
        expect(deletedCookie).toBeNull();
      });
});
*/
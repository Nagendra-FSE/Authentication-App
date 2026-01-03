import {hashValue, compareHash} from '../utils/bcypt.js';
import appAssert from '../utils/appAssert.js';

describe('App Assert Utility', () => {
    it('should not throw an error when condition is true', () => {
        expect(() => {
            appAssert(true, 'This should not throw', 400);
        }).not.toThrow();
    });

    it('should throw an AppError when condition is false', () => {
        expect(() => {
            appAssert(false, 'This should throw', 400);
        }).toThrow('This should throw');
    });

        it('should throw an AppError with correct status code and message', () => {
        try {
            appAssert(false, 'Custom error message', 401);
        } catch (error) {
            expect(error).toHaveProperty('message', 'Custom error message');
            expect(error).toHaveProperty('statusCode', 401);
        }
    });
})



describe('Bcrypt Utility Functions', () => {
    it('should hash a value and compare it correctly', async () => {
        const value = 'mySecretPassword';
        const hash = await hashValue(value);
        const isMatch = await compareHash(value, hash);
        expect(isMatch).toBe(true);
    });
    it('should return false for non-matching values', async () => {
        const value = 'mySecretPassword';
        const wrongValue = 'wrongPassword';
        const hash = await hashValue(value);
        const isMatch = await compareHash(wrongValue, hash);
        expect(isMatch).toBe(false);
    });

})




    
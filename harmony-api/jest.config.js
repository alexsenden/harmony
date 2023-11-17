/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['build', 'node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/__test__/testUtils/prisma/singleton.ts'],
}

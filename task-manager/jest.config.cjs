const { defaults } = require('jest-config');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [
        "/node_modules/",
        "\\.css$"
    ],

};

const global = require("global");
const { toMatchImageSnapshot } = require("jest-image-snapshot");

expect.extend({ toMatchImageSnapshot });

const eventMap = {};
global.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb;
});
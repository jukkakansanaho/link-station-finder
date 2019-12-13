// This is a test for "match link station for device" CLI-solution.
// (C) jukka.kansanaho@gmail.com

//const find_link_station = require('./finder_cli');
const findLinkStation = require('./finder_cli');

beforeEach(() => {
  jest.spyOn(console, 'log');
});

afterEach(() => {
  console.log.mockRestore();
});

test('function find_link_station exists', () => {
  expect(typeof findLinkStation).toEqual('function');
});

test('find_link_station called with x = 0, y = 0', () => {
  const point = [0, 0];
  findLinkStation(point);

  expect(console.log.mock.calls[0][0]).toEqual(
    'Best link station for point 0,0 is 0,0 with power 100'
  );
});

test('find_link_station called with x = 0, y = 0', () => {
  const point = [100, 100];
  findLinkStation(point);

  expect(console.log.mock.calls[0][0]).toEqual(
    'No link station within reach for point 100,100'
  );
});

test('find_link_station called with x = 0, y = 0', () => {
  const point = [15, 10];
  findLinkStation(point);

  expect(console.log.mock.calls[0][0]).toEqual(
    'Best link station for point 15,10 is 10,0 with power 0.672'
  );
});

test('find_link_station called with x = 0, y = 0', () => {
  const point = [18, 18];
  findLinkStation(point);

  expect(console.log.mock.calls[0][0]).toEqual(
    'Best link station for point 18,18 is 20,20 with power 4.716'
  );
});

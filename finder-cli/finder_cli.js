// This is a CLI-solution for "match link station for device" problem.
// (C) jukka.kansanaho@gmail.com

/**
 * Get Link stations
 * @param   {Array}  point    Point x and y coordinates.
 * @return  {Object} best_ls  The best link station for point.
 *                            Format: {"x": 0, "y": 0, "r": 0, "p": 0}
 **/
function findLinkStation(point) {
  let link_stations = getLinkStations();
  let distances = [];
  const point_ = {};
  point_['x'] = point['x'];
  point_['y'] = point['y'];
  let reachable = false;

  for (let ls of link_stations) {
    let distance = calculateDistance(point_, ls);
    let power = calculatePower(ls, distance);
    ls['p'] = power;

    if (power !== 0) {
      reachable = true;
    }
  }

  let best_ls = findMostSuitableLinkStation(link_stations);
  prepareResponse(point_, best_ls, reachable);

  return best_ls;
}

/**
 * Get Link stations
 * @return  {Array} link_stations All available link stations.
 **/
function getLinkStations() {
  let link_stations = [
    {
      x: 0,
      y: 0,
      r: 10,
      p: 0.0,
    },
    {
      x: 20,
      y: 20,
      r: 5,
      p: 0.0,
    },
    {
      x: 10,
      y: 0,
      r: 12,
      p: 0.0,
    },
  ];
  return link_stations;
}

/**
 * Calculate distance between point and link station.
 * @param   {Array}  point        Point x and y coordinates.
 * @param   {Array}  link_station Link station object.
 * @return  {Object} best_ls  The best link station for point.
 *                            Format: {"x": 0, "y": 0, "r": 0, "p": 0}
 **/
function calculateDistance(point, link_station) {
  let x_distance = point['x'] - link_station['x']; // x1 - x2
  let y_distance = point['y'] - link_station['y']; // y1 - y2

  // Pythagoras theorem:
  // distance_between_two_points = sqrt( (x1-x2)^2 + (y1-y2)^2 )
  return Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2));
}

/**
 * Calculate power output for link station when certain distance away from point.
 * @param   {Object} link_station Point x and y coordinates.
 * @param   {Number} distance     Distance between link station and point.
 * @return  {Number} power        Power output of the link station.
 **/
function calculatePower(link_station, distance) {
  const reach = link_station['r'];
  let power = 0.0;

  if (distance > reach) {
    power = 0.0;
  } else {
    power = parseFloat(Math.pow(reach - distance, 2).toFixed(3));
  }

  return power;
}

/**
 * Calculate most suitable link station for point (device) to connect to.
 * @param  {Array}  link_stations All link stattions with power outputs calculated.
 * @return {Object} max_ls        Most suitable link station.
 **/
function findMostSuitableLinkStation(link_stations) {
  let max_power = 0.0;
  let max_ls = {};
  for (let ls of link_stations) {
    if (ls['p'] > max_power) {
      max_power = ls['p'];
      max_ls = ls;
    }
  }

  return max_ls;
}

/**
 * Print out result text based on calculation.
 * @param  {Object}   point_      Point (x,y).
 * @param  {Object}   best_ls     The best link station (object).
 * @param  {Boolean}  reachable   Is best_ls reacable by any link station.
 **/
function prepareResponse(point_, best_ls, reachable) {
  response1 =
    'Best link station for point ' +
    point_['x'] +
    ',' +
    point_['y'] +
    ' is ' +
    best_ls['x'] +
    ',' +
    best_ls['y'] +
    ' with power ' +
    best_ls['p'];

  response2 =
    'No link station within reach for point ' + point_['x'] + ',' + point_['y'];

  if (reachable === true) {
    console.log(response1);
  } else {
    console.log(response2);
  }
}

module.exports = findLinkStation;

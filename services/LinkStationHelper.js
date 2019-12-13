/**
 * LinkStationHelper class with helper function for the main probgram.
 * @param   {Object}  point   Point object with x and y coordinates e.g. {"x": 0, "y": 0}.
 * @return  {Object}  res_obj Response object with summary string
 *                            and most suitbale link station object.
 **/
class LinkStationHelper {
  constructor(point) {
    this.point = point;
  }
  /**
   * Find most suitable link station for the given point.
   * @param   {Array}  point    Point x and y coordinates.
   * @return  {Object} best_ls  The best link station for point.
   *                            Format: {"x": 0, "y": 0, "r": 0, "p": 0}
   **/
  findLinkStation(point = {}) {
    let link_stations = this.getLinkStations();
    let distances = [];
    let point_ = {};

    if (this.point) {
      point_['x'] = this.point['x'];
      point_['y'] = this.point['y'];
    } else {
      this.point = point;
      point_['x'] = point['x'];
      point_['y'] = point['y'];
    }

    let reachable = false;

    for (let ls of link_stations) {
      let distance = this.calculateDistance(point_, ls);
      let power = this.calculatePower(ls, distance);
      ls['power'] = power;

      if (power !== 0) {
        reachable = true;
      }
    }

    let best_ls = this.findMostSuitableLinkStation(link_stations);
    let response = this.prepareResponse(point_, best_ls, reachable);

    return response;
  }

  /**
   * Get Link stations
   * @return  {Array} link_stations All available link stations.
   **/
  getLinkStations() {
    let link_stations = [
      {
        x: 0,
        y: 0,
        reach: 10,
        power: 0.0,
      },
      {
        x: 20,
        y: 20,
        reach: 5,
        power: 0.0,
      },
      {
        x: 10,
        y: 0,
        reach: 12,
        power: 0.0,
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
  calculateDistance(point, link_station) {
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
  calculatePower(link_station, distance) {
    const reach = link_station['reach'];
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
  findMostSuitableLinkStation(link_stations) {
    let max_power = 0.0;
    let max_ls = {};
    for (let ls of link_stations) {
      if (ls['power'] > max_power) {
        max_power = ls['power'];
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
  prepareResponse(point_, best_ls, reachable) {
    let res_str_1 =
      'Best link station for point ' +
      point_['x'] +
      ',' +
      point_['y'] +
      ' is ' +
      best_ls['x'] +
      ',' +
      best_ls['y'] +
      ' with power ' +
      best_ls['power'];

    let res_str_2 =
      'No link station within reach for point ' +
      point_['x'] +
      ',' +
      point_['y'];

    let res_obj = {
      summary: '',
      best_ls: best_ls,
    };

    if (reachable === true) {
      console.log(res_str_1);
      res_obj['summary'] = res_str_1;
      return res_obj;
    } else {
      console.log(res_str_2);
      res_obj['summary'] = res_str_2;
      return res_obj;
    }
  }
}
module.exports = LinkStationHelper;

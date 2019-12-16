const LinkStationHelper = require('../services/LinkStationHelper');

module.exports = app => {
  /**
   * Route for listing all available Link Stations.
   * @return  {Array} res  Array of available Link Stations.
   **/
  app.get('/api/linkstations', (req, res) => {
    const lsh = new LinkStationHelper();
    try {
      res.send(lsh.getLinkStations());
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  });

  /**
   * Route for finding best suitable Link Station for the point's x,y coordinates.
   * @return  {Object} res  JSON object with summary text and Link Station details as an object.
   **/
  app.get('/api/linkstation/find/:x/:y', async (req, res) => {
    const point = {};
    point['x'] = req.params.x;
    point['y'] = req.params.y;

    const lsh = new LinkStationHelper();
    try {
      let response = await lsh.findLinkStation(point);
      res.send(response);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  });
};

const LinkStationHelper = require('../services/LinkStationHelper');

module.exports = app => {
  app.get('/api/linkstations', (req, res) => {
    const lsh = new LinkStationHelper();
    try {
      res.send(lsh.getLinkStations());
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  });

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

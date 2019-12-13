_Find the best link station for a device | jukka.kansanaho@gmail.com | 2019-12-12_

# Find the best link station for a device

## Target of the project

This project provides a solution to the following problem:

- There are _link stations_ with a location (x, y) and reach (r)
- There are _devices_ with location (x, y)
- Link station power can be calculated with the following formula:
  - _power_ = (reach - device's distance from link station)^2
  - if distance > reach, power = 0

_Target:_ find a most suitable link station (with most power) for a device to connect to.

## Prerequisites

- [Node.js](https://nodejs.org/) installed locally for development.
- [python.org](https://python.org/) installed locally for Jest tests.
  - Note: [Anaconda](https://www.anaconda.com/distribution/) is recommended as a framework for python installations.
- [Jestjs.io](https://jestjs.io/) installed locally for tests.

## Used Technologies

- Frontend: React
- Backend: Express (nodejs), (MongoDB)

# HOWTO run the program in console

- Clone this repo (`git clone https://github.com/jukkakansanaho/link-station-finder.git`)
- Go to cloned **link-station-finder** folder
- Run node on console: `node`
- Type: `const findLinkStation = require('./finder_cli');`
- Type function name with the point coordinates (x,y) as an object e.g.: `findLinkStation({"x":0, "y":0})`
  - => Program return with the Summary text and best link station JSON object.

To run the tests for :

- install Jest: `npm install -g jest` (NOTE: requires python 2.7 to install properly)
- go to cloned **link-station-finder** folder
- Run: `jest ./finder_cli --watch` (this will run all Jest tests defined in **finder_cli.test.js** file)
- => This should show all 5 tests as PASS.

# HOWTO setup and run the service locally

To prepare the service do the following:

- Clone this repo (`git clone https://github.com/jukkakansanaho/link-station-finder.git`)
- Go to cloned **link-station-finder** folder
- Run `npm install` on command line to install server side dependencies

To run the server do the following:

- Go to cloned **link-station-finder** folder
- Run `npm run server` on command line to start the service locally
- Server responses on http://localhost:5000
- You can access API with the following queries:
  - `http://localhost:5000/api/linkstation/find/x/y`
    - Replace x with point's x-coordinate, y with y-coordinate
    - => Server responses with JSON object: { summary: "< summaryText >", "best_ls": { linkStationObject } }
  - `http://localhost:5000/api/linkstations`
    - => Server responses with array of JSON objects: [ listOfLinkServersObjects ]

# HOWTO use the service

- ...

# Other Notes

- Command line version and Service have the following predefined Link Stations where the point/device coordinates are compared to:
  - Link-Station-1: { "x": 0, "y": 0, "reach": 10}
  - Link-Station-2: { "x": 20, "y": 20, "reach": 5}
  - Link-Station-3: { "x": 10, "y": 0, "reach": 12}

# Further development options

- Add DB (e.g. MongoDB) to store Link Station data.
- Add DB to store all requested point/device coordinates with most suitable Link Station to connect to.
- Add (protected access) Admin section to the UI to add Link Stations to the service.
- Add visualisation to the front-end to show Links Stations and requested points/devices on a grid canvas.
- Add tests for backend and front-end of the solution.
- Add more error handling and special case handling to the code.
- Add Continuous Integration/Continuous Delivery (CI/CD) pipeline to automatically test and deploy changes done to backend or front-end. E.g. TravisCI, Jenkins, or CircleCI.
- Build and package solution as a set of Docker images and deploy using Docker Compose or Kubernetes orchestration tool.

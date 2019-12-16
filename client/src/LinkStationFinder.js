import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class LinkStationFinder extends Component {
  state = {
    linkstations: [],
    summary: '',
    best_ls: {},
    x: '',
    y: '',
    response: '',
  };

  /**
   * Do this when the page is rendered.
   **/
  componentDidMount() {
    this.fetchLinkStations();
  }

  /**
   * Fetch all Link Stations and set state values accordingly.
   *
   **/
  async fetchLinkStations() {
    const linkstations = await axios.get('/api/linkstations');
    this.setState({ linkstations: linkstations.data });
    console.log(linkstations);
  }

  /**
   * Fetch best suitable Link Station based on given x,y coordinates.
   * Set state with response values.
   * @param {Number} x  Point's X coordinate.
   * @param {Number} y  Point's Y coordinate.
   *
   **/
  handleSubmit = async event => {
    event.preventDefault();
    let path = '/api/linkstation/find/' + this.state.x + '/' + this.state.y;
    const res = await axios.get(path);
    this.setState({
      summary: res.data.summary,
      best_ls: res.data.best_ls,
      x: '',
      y: '',
    });

    if (res.data.best_ls === {}) {
      this.state.response = '"Response-found"';
    } else {
      this.state.response = '"Response-not-found"';
    }
    console.log('RES: ' + this.state.summary);
    console.log('RES: ' + this.state.response);
    console.log('RES: ' + JSON.stringify(this.state.best_ls));
  };

  /**
   * Render response for handleSubmit query.
   **/
  renderFoundLinkStation() {
    const res = [];

    if (this.state.summary !== '') {
      res.push(
        <div key="100">
          <fieldset className="Response-fieldset">
            <legend className="App-text">Best Suitable Link Station</legend>
            <div className={this.state.response}>{this.state.summary}</div>
            <table>
              <thead>
                <tr key="0">
                  <th>ID</th>
                  <th>X-coordinate</th>
                  <th>Y-coordinate</th>
                  <th>Reach</th>
                </tr>
              </thead>
              <tbody>
                <tr key={this.state.best_ls.id}>
                  <th>{this.state.best_ls.id}</th>
                  <th>{this.state.best_ls.x}</th>
                  <th>{this.state.best_ls.y}</th>
                  <th>{this.state.best_ls.reach}</th>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
      );
    }

    return res;
  }

  /**
   * Render available Link Stations as a table.
   **/
  renderLinkStations() {
    const stations = [];

    for (let ls of this.state.linkstations) {
      stations.push(
        <tr key={ls.id}>
          <th>{ls.id}</th>
          <th>{ls.x}</th>
          <th>{ls.y}</th>
          <th>{ls.reach}</th>
        </tr>
      );
    }

    return stations;
  }

  /**
   * Render whole page.
   **/
  render() {
    return (
      <div>
        <div className="App-table">
          <h5 className="App-text">Available Link Stations:</h5>
          <table>
            <thead>
              <tr key="0">
                <th>ID</th>
                <th>X-coordinate</th>
                <th>Y-coordinate</th>
                <th>Reach</th>
              </tr>
            </thead>
            <tbody>{this.renderLinkStations()}</tbody>
          </table>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className="App-text">Enter your coordinates</legend>
              X:{' '}
              <input
                value={this.state.x}
                onChange={event => this.setState({ x: event.target.value })}
                name="Type in X-coordinate"
                autoFocus
              />
              <br />
              Y:{' '}
              <input
                value={this.state.y}
                onChange={event => this.setState({ y: event.target.value })}
                name="Type in Y-coordinate"
              />
              <br />
              <button>FIND</button>
            </fieldset>
          </form>
        </div>
        <div>{this.renderFoundLinkStation()}</div>
      </div>
    );
  }
}

export default LinkStationFinder;

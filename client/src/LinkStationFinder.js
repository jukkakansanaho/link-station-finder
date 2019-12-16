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

  componentDidMount() {
    this.fetchLinkStations();
  }

  async fetchLinkStations() {
    const linkstations = await axios.get('/api/linkstations');
    this.setState({ linkstations: linkstations.data });
    console.log(linkstations);
  }

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

    //if (res )
    // console.log('RES: ' + this.state.summary);
    // console.log('RES: ' + JSON.stringify(this.state.best_ls));
  };

  renderFoundLinkStation() {
    const res = [];

    if (this.state.summary !== '') {
      res.push(
        <div>
          <h5 className="App-text">Best Suitable Link Station:</h5>
          <div className={this.state.response}>{this.state.summary}</div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>X-coordinate</th>
                <th>Y-coordinate</th>
                <th>Reach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{this.state.best_ls.id}</th>
                <th>{this.state.best_ls.x}</th>
                <th>{this.state.best_ls.y}</th>
                <th>{this.state.best_ls.reach}</th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return res;
  }

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
              />
              <br />
              Y:{' '}
              <input
                value={this.state.y}
                onChange={event => this.setState({ y: event.target.value })}
              />
              <br />
              <button>Submit</button>
            </fieldset>
          </form>
        </div>
        <div>{this.renderFoundLinkStation()}</div>
      </div>
    );
  }
}

export default LinkStationFinder;

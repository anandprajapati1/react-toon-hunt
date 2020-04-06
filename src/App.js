import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import { filterType } from "./lib/constants";
import FilterNav from './component/FilterNav';
import FilterCloud from './component/FilterCloud';
import FilterForm from './component/FilterForm';
import { ToonList } from './component/ToonList';
import { connect } from 'react-redux';

class App extends Component {
  getFilters() {
    return [
      {
        filterType: filterType.SPECIES,
        list: [...new Set(this.props.initialToonsData.map(x => x.species))]
      },
      {
        filterType: filterType.GENDER,
        list: [...new Set(this.props.initialToonsData.map(x => x.gender))]
      },
      {
        filterType: filterType.ORIGIN,
        list: [...new Set(this.props.initialToonsData.map(x => x.origin.name))]
      }
    ];
  }

  render() {
    const initialFilterCloud = [{ label: "filter 1", value: "filter 1" }, { label: "filter 2", value: "filter 2" }]

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Toon Hunt!
          </p>
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {this.getFilters().map((f, i) => <FilterNav filterList={f} key={i} />)}
            </div>
            <div className="col-md-9">
              <FilterCloud filters={initialFilterCloud} />
              <FilterForm />
              <ToonList toonsData={this.props.initialToonsData} />
            </div>
          </div>
        </div>

        <style jsx="true">{`
          body {
            background-color: #282c34;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            color: #eeeeee;
          }
          ul {
            list-style: none;
            padding-left: 0;
          }
          .App {
            background-color: #282c34;
          }

          .App-logo {
            height: 80px;
            pointer-events: none;
          }

          @media (prefers-reduced-motion: no-preference) {
            .App-logo {
              animation: App-logo-spin infinite 20s linear;
            }
          }

          .App-header {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          }

          .App-link {
            color: #61dafb;
          }

          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialToonsData: state.listReducer
})

export default connect(mapStateToProps)(App)

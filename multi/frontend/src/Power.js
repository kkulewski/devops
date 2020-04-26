import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Power extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      base: 0,
      exponent: 0,
      result: 0,
      from: "none"
    };
  }

  handleBaseChange = (e) => {
    this.setState({ base: e.target.value });
  }

  handleExponentChange = (e) => {
    this.setState({ exponent: e.target.value });
  }

  getPower = () => {
    axios
      .get(`api/pow/${this.state.base},${this.state.exponent}`)
      .then((response) => {
        console.log(response);
        this.setState({
          result: response.data.result,
          from: response.data.from
        })
      });
  }

  render() {
    return (
      <div className="App">
        <h3>Request:</h3>
        <form>
          <label>
            Base<br />
            <input type="number" placeholder="Base" name="base" value={this.state.base} onChange={this.handleBaseChange} /><br />
          </label>
          <label>
            Exponent<br />
            <input type="number" placeholder="Exponent" name="exponent" value={this.state.exponent} onChange={this.handleExponentChange} /><br />
          </label>
          <button type="button" onClick={this.getPower}>Compute</button>
        </form>
        <h3>Response:</h3>
        <form>
          <label>
            Result<br />
            <input type="text" disabled={true} placeholder="Result" name="Result" value={this.state.result} /><br />
          </label>
          <label>
            From<br />
            <input type="text" disabled={true} placeholder="From" name="From" value={this.state.from} /><br />
          </label>
        </form>
      </div>
    );
  }
}

export default Power;

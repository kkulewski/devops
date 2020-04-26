import React from 'react';
import './App.css';
import axios from 'axios';

class Power extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      base: 0,
      exponent: 0,
      result: 0,
      from: "none",
      history: []
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

  getHistory = () => {
    axios
      .get('api/history')
      .then((response) => {
        console.log(response);
        this.setState({
          history: response.data
        })
      });
  }

  render() {
    return (
      <div className="App" style={{width: '80%', margin: 'auto', textAlign: 'center'}}>
        <br />
        <form style={{border: '2px solid blue'}}>
          <h3>Request:</h3>
          <label>
            Base<br />
            <input type="number" placeholder="Base" name="base" value={this.state.base} onChange={this.handleBaseChange} /><br />
          </label>
          <label>
            Exponent<br />
            <input type="number" placeholder="Exponent" name="exponent" value={this.state.exponent} onChange={this.handleExponentChange} /><br />
          </label>
          <button type="button" onClick={this.getPower}>Compute</button><br /><br />
        </form>
        <br />
        <form style={{border: '2px solid blue'}}> 
          <h3>Response:</h3>
          <label>
            Result<br />
            <input type="text" disabled={true} placeholder="Result" name="Result" value={this.state.result} /><br />
          </label>
          <label>
            From<br />
            <input type="text" disabled={true} placeholder="From" name="From" value={this.state.from} /><br /><br />
          </label>
        </form>
        <br />
        <form style={{border: '2px solid blue'}}>
          <h3>History:</h3>
          <button type="button" onClick={this.getHistory}>Fetch</button><br /><br />
          {this.state.history.map(item => <p>{item["number"]}</p>)}
        </form>
      </div>
    );
  }
}

export default Power;

import React, { Component } from 'react';
import compile from '../src/index';
import './demo.scss'

export default class Demo extends Component {
  state = {
    template: 'This is my template, person is ((person)), value is ((value))',
    values: JSON.stringify({ "person": 1, "value": 2}),
    result: ''
  }

  startZerolyze = () => {
    const { template, values } = this.state;
    let replacement = {};
    try {
      replacement = JSON.parse(values);
    } catch (e) {
      replacement = {};
      alert(e);
    }

    console.log(replacement);
    const result = compile(template, replacement);
    this.setState({
      result
    });
  }

  render() {
    const { template, values, result } = this.state
    return (
      <div>
        Zerolyze Template Parser
        <div>Please input your Template:</div>
        <div>
          <textarea
            className='template-area'
            value={template}
            onChange={(e) => {
              this.setState({
                template: e.target.value
              })
            }}
          />
        </div>
        <div>Please input your JSON:</div>
        <textarea
          className='json-area'
          value={values}
          onChange={(e) => {
            const jsonString = e.target.value
            this.setState({
              values: jsonString
            });
          }}
        />
        <div>Result: </div>
        <div>{result}</div>
        <button onClick={this.startZerolyze}>Parse!</button>
      </div>
    );
  }
}

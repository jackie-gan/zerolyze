import React, { Component } from 'react';
import { tokenize } from '../src/index';
import './demo.scss'

export default class Demo extends Component {
  state = {
    template: 'this is my template, value 1 is ((value1)), value 2 is ((value))',
    values: {}
  }

  startZerolyze() {
    const { template } = this.state;
    const tokens = tokenize(template);
  }

  render() {
    const { template, values } = this.state
    return (
      <div>
        Zerolyze Template Parcer
        <textarea 
          value={template}
          onChange={(e) => {
            console.log('change: ', e.target.value)
            this.setState({
              template: e.target.value
            })
          }}
        />
      </div>
    );
  }
}

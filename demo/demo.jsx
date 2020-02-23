import React, { Component } from 'react';
import './demo.scss'

export default class Demo extends Component {
  state = {
    template: 'this is my template, value 1 is {{value1}}, value 2 is {{value}}',
    values: {}
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
        <textarea 
          value={values} 
          onChange={(e) => {
            this.setState({
              values: e.target.value
            })
          }} 
        />
      </div>
    );
  }
}

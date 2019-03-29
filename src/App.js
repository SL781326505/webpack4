import React, { Component } from 'react'
import './App.less'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      name: 'liu'
    }
  }

  handleClick = () => {
    this.setState({
      name: 'lin'
    })
  }

  render() {
    const { name } = this.state

    return (
      <div className="app">
        <h1 className="header">App</h1>
        <div className="avatar"></div>
        <h2>{name}</h2>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

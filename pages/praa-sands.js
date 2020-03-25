import axios from "axios"
import React from "react"

// ?={timestamp: 1584921600}

export default class PraaSands extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conditions: [],
      loaded: false
    }
  }

  componentDidMount() {
    axios.get('http://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=8')
    .then(response => {
      const data = response.data
      this.setState({ 
        conditions: data,
        loaded: true
      })
    })
  }

  renderConditionsToday() {
    const swell = this.state.conditions[0].swell
    const conditions = {
      day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()-1],
      swell: `${Math.round((swell.maxBreakingHeight - swell.minBreakingHeight)*3.28084)}ft`,
      wind: ``
    }
    return <h1>{conditions.day}</h1>
  }

  render() {
    return (
      <div>
          {this.state.loaded && this.renderConditionsToday()}
      </div>
    )
  }
}

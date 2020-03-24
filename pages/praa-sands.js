import axios from "axios"
import React from "react"

// ?={timestamp: 1584921600}

export default class PraaSands extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: [],
      conditions: {}
    }
  }

  componentDidMount() {
    axios.get('http://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=8')
    .then(response => {
      const data = response.data
      this.storeDay(data)
      this.storeConditionsToday(data[0])
    })
  }

  storeDay(data) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const day = days[new Date(data[0].timestamp * 1000).getDay() - 1]
    this.setState({ day: day })
  }

  storeConditionsToday(data) {
    console.log(data)
    const conditions = {
      day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()-1],
      swell: `${Math.round((data.swell.maxBreakingHeight - data.swell.minBreakingHeight)*3.28084)}ft`,
      wind: ``
    }
    this.setState({ conditions: conditions })
  }

  render() {
    return (
      <>
        <a>{this.state.conditions.day}</a>
        <p>{this.state.conditions.swell}</p>
      </>
    )
  }
}

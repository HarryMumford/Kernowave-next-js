import axios from "axios"
import React from "react"

// ?={timestamp: 1584921600}

export default class PraaSands extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      waveData: []
    }
  }

  componentDidMount() {
    axios.get('http://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=8')
    .then(response => {
      console.log(response.data)
      const waveData = response.data[0].timestamp
      this.setState({ waveData })
    })
  }

  render() {
    return (
      <p>
        {this.state.waveData}
      </p>
    )
  }
}

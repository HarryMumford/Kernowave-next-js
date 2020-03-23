import axios from "axios"
import react from "react"

// ?={timestamp: 1584921600}

class PraaSands extends React.Component {
  state = {
    waveData: []
  }

  getWaveData() {
    axios.get('http://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=8')
    .then(response => {
      console.log(response.data)
    })
  }

  render() {
    return (
      <div>
        <p>Praa Sands</p>
        <button onClick={this.getWaveData}>Hello</button>
      </div>
    )
  }
}

export default PraaSands
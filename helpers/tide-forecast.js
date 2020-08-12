import { days } from "../utils/days"

export default class TideForecast {
  constructor(data) {
    this.data = data
  }

  _formatDate(dateStr) {
    const formatted = dateStr.substring(11, 16)
    return formatted
  }

  create() {
    const { data } = this
    const forecast = {}

    for (let i = 0; i < 16; i += 4) {
      const events = []
      const day = days[new Date(data[i]["Date"]).getDay()]
      for (let ii = 0; ii < 4; ii++) {
        const event = {}
        const currentEvent = i + ii
        const type = data[currentEvent]["EventType"]
        const date = this._formatDate(data[currentEvent]["DateTime"])
        event[type] = date
        events.push(event)
      }
      forecast[day] = events
    }

    return forecast
  }
}

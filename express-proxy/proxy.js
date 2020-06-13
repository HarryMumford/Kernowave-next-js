const express = require("express")
const cors = require("cors")
const request = require("request")

const app = express()

app.use(cors())

app.get("/", (req, res) => {
  res.send("hello world")
})

app.get("/spot/:id", (req, res) => {
  const id = req.params.id
  request(
    {
      url: `http://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=${id}`
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message })
      }

      res.json(JSON.parse(body))
    }
  )
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening on ${PORT}`))

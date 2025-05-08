const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")

const URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.OPENWEATHER_API_KEY}&q=`

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
)
app.use("/icons", express.static("node_modules/bootstrap-icons/font"))

app.post("/getWeather", async (req, res) => {
  const city = req.body.city
  try {
    const weatherUrl = `${URL}${city}`
    const response = await fetch(weatherUrl)
    if (!response.ok) return res.status(404).json({ error: "City not found" })
    const weatherData = await response.json()
    res.status(200).json(weatherData)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.listen(3000, () => {
  console.log("Server is running, http://localhost:3000")
})

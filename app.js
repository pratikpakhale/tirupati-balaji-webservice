const express = require('express')
const axios = require('axios')
const app = express()

app.get('/', (req, res) => {
  axios
    .get(
      'https://online.tirupatibalaji.ap.gov.in/sdn/rest/v1/slot/get_availability'
    )
    .then(response => {
      const result = response.data.result
      const dates = Object.keys(result)
      const availableSlots = []
      dates.forEach(date => {
        if (result[date].avl > 0) {
          availableSlots.push(date)
        }
      })
      if (availableSlots.length > 0) {
        console.log(availableSlots)
        res.send(availableSlots)
      } else {
        console.log('No Slots Available')
        res.send('No slots available')
      }
    })
    .catch(error => {
      res.send(error)
    })
})

app.listen(5000, () => {
  console.log('Server is running on port 3000')
})

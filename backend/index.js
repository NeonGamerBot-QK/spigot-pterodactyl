const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3001
app.use(require('cors')({ origin: '*' }))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/cmd', (req, res) => {
  console.log(req.body, req.headers)
  fetch(req.headers.panelurl, {
    headers: req.body.headers,
    method: 'POST',
    body: req.body.body
  }).then(r => {
    if (r.status === 204) {
      res.status(r.status).end()
    } else {
      r.text().then(j => {
        res.status(r.status).send(j)
      })
    }
  })
})

app.post('/power', (req, res) => {
  console.log(req.body, req.headers)
  fetch(req.headers.panelurl, {
    headers: req.body.headers,
    method: 'POST',
    body: req.body.body
  }).then(r => {
    if (r.status === 204) {
      res.status(r.status).end()
    } else {
      r.text().then(j => {
        res.status(r.status).send(j)
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

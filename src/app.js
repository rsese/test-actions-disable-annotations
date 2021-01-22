const express = require('express')

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

let cats = []

cats.push({
  id: 1,
  name: "mr. meow",
  color: "orange",
  age: 2
})
cats.push({
  id: 2,
  name: "mac",
  color: "black",
  age: 3
})

app.get('/api', (req, res) => {
  res.send({msg: "hello world"})
})

app.get('/api/cats', (req, res) => {
  res.send(cats)
})

app.get('/api/cats/:id', (req, res) => {
  console.log(req.params.id)
  const cat = cats.find(cat => {
    console.log(cat.name, cat.id, req.params.id)
    return cat.id === Number.parseInt(req.params.id)
  })

  if (cat) {
    res.send(cat)
  } else {
    res.status(404).send("No cat!")
  }
})

app.post('/api/cats', (req, res) => {
  console.log(req.body)

  // Object.keys(cats[0]).forEach(key => console.log(key))
  cats.push(req.body)
  res.status(201).send(req.body)
})

app.delete('/api/cats/:id', (req, res) => {
  const index = cats.findIndex(cat => {
    console.log(cat.id, req.params.id)
    return cat.id === Number.parseInt(req.params.id)
  })

  console.log(`index: ${index}`)

  if (index) {
    console.log(cats)
    cats.splice(index, 1)
    console.log(cats)
    res.send()
  } else {
    res.status(404).send(`No cat!`)
  }
})

app.patch('/api/cats/:id', (req, res) => {

})

app.listen(port, () => {
  console.log(`Started server on port ${port}`)
})
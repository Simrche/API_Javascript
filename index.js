const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const Series = require('./Series.js')
const mongoose = require('mongoose')
const Serie = require('./Series.js')
const { findByIdAndDelete } = require('./Series.js')

app.use(bodyParser.urlencoded({extended:false}))

app.get('/serie', (req,res) => {
  Serie.find((err, result)=>{
    if(err){
      res.send("Error occured no serie retrieved")
      return
    }
    res.send(result)
    console.log(result)
  })
})

app.get('/serie/:id', (req,res)=>{
  const id = req.params.id;
  Serie.findById(id, (err, serie)=>{
    if(err){
      res.send('Serie not found')
    }
    res.send(serie)
    console.log(serie)
  })
})

app.post('/serie', (req, res)=>{
  console.log('Inserting a serie in the database')
  let isFinish = false;
  if (req.body.isFinish === ' true'){
    isFinish = true
  }
  let serie = new Serie({name: req.body.name, type: req.body.type, numberEpisode: parseInt(req.body.numberEpisode), isFinish: isFinish, plateform: req.body.plateform})
  serie.save(err=>{
    if(err) {
      res.send("Serie not inserted into the database")
    }
    res.send("Serie inserted into the database")
    console.log('Serie is in the database')
  })
})

app.put('/serie/:id', (req, res)=> {
  console.log('Trying to edit serie')
  Serie.findByIdAndUpdate(req.params.id, {
    name:req.body.name, 
    type: req.body.type,
    numberEpisode: parseInt(req.body.numberEpisode),
    isFinish: (req.body.isFinish === "true"),
    plateform: req.body.plateform

  }, err=>{
    if(err){
      res.send("It didn't edit")
      return
    }
    res.send("It did edit")
  })
})

app.delete('/serie/:id', (req, res)=>{
  res.send(req.params.id)
  findByIdAndDelete(req.params.id, err=>{
    if(err) {
      res.send('Serie did not delete')
      return
    }
    res.send('Serie deleted')
    console.log(`Dog with ${$req.params.id} is now deleted`)
  })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    mongoose.connect('mongodb+srv://Simrche:Xj29yu!+@seriesapi.4xr3s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
      catch(error => console.log(error));
  })
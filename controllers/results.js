require('dotenv').load()
const request = require('request-promise-native')
const express = require('express')
const router = express.Router()

router.post('/', function (req, res, next) {
  const url = req.body.url

  Promise.all([
    // MAKE CALL TO CUSTOM VISION API
    callAPI(url) // lives in codesnippits
  ]).then(([response]) => {
    var results = response

    // PARSE THE RESPONSE TO FIND THE HIGHEST PREDICTION
    const top = parseResponse(results.Predictions)  //found in code snippits also

    // GET THE DATA FOR THE TOP SCORED TAG
    const data = getTagData(top) // codesnippit

    // RENDER RESULTS
    res.render('results', {
      title: 'Results',
      description: data.description,
      probability: data.probability,
      photo: data.photo
    })
  }).catch(reason => {
    console.log(`Promise was rejected becasue ${reason}`)

    // RENDER AN ERROR MESSAGE
    res.render('results',
      { title: 'Error',
        description: 'Oops something went wrong! Submit another link to try again!',
        probability: 100,
        photo: '/images/Error.jpg'
      })
  })
})

module.exports = router

// =========================================================
// HELPER FUNCTIONS HERE
// =========================================================


// This funtion goes in the controllers/results.js file under the "helper functions" comment

function callAPI (url) {
  const options = {
    uri: process.env.PREDICTION_URL,
    headers: {
      'Prediction-Key': process.env.PREDICTION_KEY,
      'Content-Type': 'application/json'
    },
    body: `{"Url": "${url}"}`
  }

  return request.post(options)
    .then((result) => {
      return JSON.parse(result)
    })
}


// This funtion goes in the controllers/results.js file under the "helper functions" comment

function parseResponse (predictions) {
  // Loop through the array to find the top score
  var top = predictions[0]
  predictions.forEach(p => {
    if (p.Probability > top.Probability) {
      top = p
    }
  })

  return top
}


// This funtion goes in the controllers/results.js file under the "helper functions" comment

function getTagData (top) {
  var link = ''
  var description = ''

  // Decide which image and description to use based on the tag passed in
  switch (top.Tag.toLowerCase()) {
    case 'lannister':
      link = '/images/lannister.png'
      description = 'I spy the Lannister sigil, always pay your debts!'
      break
    case 'stark':
      link = '/images/stark.png'
      description = 'Looks like house Stark, winter is coming!'
      break
    case 'targaryen':
      link = '/images/targaryen.png'
      description = 'Fierce like the Mother of Dragons, you just entered the Targaryen sigil!'
      break
    case 'a':
      link = '/images/a.png'
      description = 'This letter is A'
      break
    case 'b':
      link= '/images/b.png'
      description = 'This letter is B'
    case 'c':
      link='/images/c.png'
      description = 'This letter is C'
    case 'd':
      link= '/images/d.png'
      description = 'This letter is D'
    case 'e':
      link= '/images/e.png'
      description = 'This letter is E'
    case 'f':
      link= '/images/f.png'
      description = 'This letter is F'
    case 'g':
      link= '/images/g.png'
      description = 'This letter is G'
    case 'h':
      link= '/images/h.png'
      description = 'This letter is H'
    case 'i':
      link= '/images/i.png'
      description = 'This letter is I'
    case 'j':
      link= '/images/j.png'
      description = 'This letter is J'
    case 'k':
      link= '/images/k.png'
      description = 'This letter is K'
    case 'l':
      link= '/images/l.png'
      description = 'This letter is L'
    case 'm':
      link= '/images/m.png'
      description = 'This letter is M'
    case 'n':
      link= '/images/n.png'
      description = 'This letter is N'
    case 'o':
      link= '/images/o.png'
      description = 'This letter is O'
    case 'p':
      link= '/images/p.png'
      description = 'This letter is P'
    case 'q':
      link= '/images/q.png'
      description = 'This letter is Q'
    case 'r':
      link= '/images/r.png'
      description = 'This letter is R'
    case 's':
      link= '/images/s.png'
      description = 'This letter is S'
    case 't':
      link= '/images/t.png'
      description = 'This letter is T'
    case 'u':
      link= '/images/u.png'
      description = 'This letter is U'
    case 'v':
      link= '/images/v.png'
      description = 'This letter is V'
    case 'w':
      link= '/images/w.png'
      description = 'This letter is W'
    case 'x':
      link= '/images/x.png'
      description = 'This letter is X'
    case 'y':
      link= '/images/y.png'
      description = 'This letter is Y'
    case 'z':
      link= '/images/z.png'
      description = 'This letter is Z'
    case '':
      link = '/images/Error.jpg'
      description = 'Oops something went wrong! Submit another link to try again!'
      break
  }

  // Store suggestion
  const data = {
    photo: link,
    description: description,
    probability: top.Probability * 100
  }

  return data
}

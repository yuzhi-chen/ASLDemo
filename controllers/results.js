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
        description: 'Oops something went wrong!!' + reason,
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
    case 'a':
      link = '/images/a.JPG'
      description = 'This letter is A'
      break
    case 'b':
      link= '/images/b1.JPG'
      description = 'This letter is B'
      break
    case 'c':
      link='/images/c.jpg'
      description = 'This letter is C'
      break
    case 'd':
      link= '/images/d.png'
      description = 'This letter is D'
      break
    case 'e':
      link= '/images/e.jpg'
      description = 'This letter is E'
      break
    case 'f':
      link= '/images/f.jpg'
      description = 'This letter is F'
      break
    case 'g':
      link= '/images/g.png'
      description = 'This letter is G'
      break
    case 'h':
      link= '/images/h.jpg'
      description = 'This letter is H'
      break
    case 'i':
      link= '/images/i.jpg'
      description = 'This letter is I'
      break
    case 'j':
      link= '/images/j.jpg'
      description = 'This letter is J'
      break
    case 'k':
      link= '/images/k.jpg'
      description = 'This letter is K'
      break
    case 'l':
      link= '/images/l.png'
      description = 'This letter is L'
      break
    case 'm':
      link= '/images/m.jpg'
      description = 'This letter is M'
      break
    case 'n':
      link= '/images/n.jpg'
      description = 'This letter is N'
      break
    case 'o':
      link= '/images/o.jpg'
      description = 'This letter is O'
      break
    case 'p':
      link= '/images/p.png'
      description = 'This letter is P'
      break
    case 'q':
      link= '/images/q.jpg'
      description = 'This letter is Q'
      break
    case 'r':
      link= '/images/r.jpg'
      description = 'This letter is R'
      break
    case 's':
      link= '/images/s.png'
      description = 'This letter is S'
      break
    case 't':
      link= '/images/t.jpg'
      description = 'This letter is T'
      break
    case 'u':
      link= '/images/u.jpg'
      description = 'This letter is U'
      break
    case 'v':
      link= '/images/v.jpg'
      description = 'This letter is V'
      break
    case 'w':
      link= '/images/w.jpg'
      description = 'This letter is W'
      break
    case 'x':
      link= '/images/x.jpg'
      description = 'This letter is X'
      break
    case 'y':
      link= '/images/y.jpg'
      description = 'This letter is Y'
      break
    case 'z':
      link= '/images/z.jpg'
      description = 'This letter is Z'
      break
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

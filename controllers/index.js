const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',
    { title: 'ASL-to-English writing translator',
      description: 'Welcome, I am the ASL-to-English writing translator! I help aid Deaf children who are struggling to read, by translating ASL finger-spelling into English. Just sign with your hand, take a photo, and I will give you the english letter!' })
})

module.exports = router

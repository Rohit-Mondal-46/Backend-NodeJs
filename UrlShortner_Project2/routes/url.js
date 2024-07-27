const express = require('express')
const {handleCreateShortId,handleRedirect,handleAnalytics} = require('../controller/url')
const urlRouter = express.Router();


urlRouter.post('/post',handleCreateShortId)
urlRouter.get('/:shortId',handleRedirect)
urlRouter.get('/analytics/:shortId',handleAnalytics)

module.exports = urlRouter;
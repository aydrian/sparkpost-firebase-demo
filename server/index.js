import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'
import SparkyFire from './sparkyFire.js'
import SparkPost from 'sparkpost'

const app = express()
const TEMPLATE_ID = 'sparkpost-firebase-demo'

const sparkyFire = new SparkyFire(process.env.FIREBASE_URL)
sparkyFire.listen('raw-events');

app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(express.static('public'))

app.get('/campaigns/:name/preview', (req, res) => {
  sparkyFire.db.child(`campaigns/${req.params.name}`).once('value', snapshot => {
    const client = new SparkPost()
    client.templates.preview({id: TEMPLATE_ID, data: snapshot.val()}, (err, data) => {
      res.json(data.body.results)
    })
  })
})

app.listen(3000)

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'
import SparkyFire from './sparkyFire.js'

const app = express()

const sparkyFire = new SparkyFire(process.env.FIREBASE_URL)
sparkyFire.listen('raw-events');

app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(express.static('public'))

app.get('/token', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000)

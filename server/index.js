import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'
import firebase from 'firebase'
var _ = require('lodash')

const app = express()


const db = new Firebase(process.env.FIREBASE_URL)

const processBatch = function(batch) {
  _.forEach(batch, function(rawEvent) {
    console.log('Raw Event:', rawEvent);
    var eventGrouping = _.keys(rawEvent.msys)[0]
    var event = rawEvent.msys[eventGrouping];
    if ( eventGrouping === 'relay_message') {
      processRelayMessage(event)
    } else {
      processEvent(event)
    }
  });
}

const processEvent = function(event) {
  console.log(`Processing #{ event.type } not implemented.`);
}

const processRelayMessage = function(event) {
  var local = event.rcpt_to.split('@')[0];
  db.child(local).push({
    email: event.msg_from,
    friendly: event.friendly_from,
    subject: event.content.subject
  });
  console.log({
    email: event.msg_from,
    friendly: event.friendly_from,
    subject: event.content.subject
  })
}

// Process Snapshots since last start.
db.child('raw-events').once('value', (snapshots) => {
  console.log("Snapshots:", snapshots.val())
  _.forOwn(snapshots.val(), function(batch, key) {
    console.log('Batch:', batch)
    processBatch(batch);
    db.child('raw-events').child(key).remove();
  });
});
// Process Incoming Events

db.child('raw-events').on('child_added', (snapshot) => {
  console.log('Batch:', snapshot.val())
  processBatch(snapshot.val());
  db.child('raw-events').child(snapshot.key()).remove();
});

app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(express.static('public'))

app.get('/token', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000)

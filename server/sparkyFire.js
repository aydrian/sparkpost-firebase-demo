import firebase from 'firebase'
import * as _ from  'lodash'

class SparkyFire {
  constructor(url) {
    this.db = new Firebase(url)
  }

  processBatch(batch) {
    batch.forEach(rawEvent => {
      console.log('Raw Event:', rawEvent);
      var eventGrouping = _.keys(rawEvent.msys)[0]
      var event = rawEvent.msys[eventGrouping];
      if ( eventGrouping === 'relay_message') {
        this.processRelayMessage(event)
      } else {
        this.processEvent(event)
      }
    });
  }

  processEvent(event) {
    console.log(`Processing #{ event.type } not implemented.`);
  }

  processRelayMessage(event) {
    var local = event.rcpt_to.split('@')[0];
    this.db.child(local).push({
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

  listen(child) {
    this.db.child(child).on('child_added', (snapshot) => {
      console.log('Batch:', snapshot.val())
      this.processBatch(snapshot.val());
      this.db.child('raw-events').child(snapshot.key()).remove();
    });
  }
}

export default SparkyFire

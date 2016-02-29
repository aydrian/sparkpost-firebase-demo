import firebase from 'firebase'

class SparkyFire {
  constructor(url) {
    this.db = new Firebase(url)
  }

  processBatch(batch) {
    batch.forEach(rawEvent => {
      const [eventGrouping] = Object.keys(rawEvent.msys);
      const event = rawEvent.msys[eventGrouping];
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
    const local = event.rcpt_to.split('@')[0]
    this.db.child(`recipients/${local}`).push({
      email: event.msg_from,
      friendly: event.friendly_from,
      subject: event.content.subject
    })
  }

  listen(child) {
    this.db.child(child).on('child_added', (snapshot) => {
      this.processBatch(snapshot.val());
      this.db.child('raw-events').child(snapshot.key()).remove()
    });
  }
}

export default SparkyFire

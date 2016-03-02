import firebase from 'firebase'
import SparkPost from 'sparkpost'

class SparkyFire {
  constructor(url) {
    this.db = new Firebase(url)
  }

  escapeEmailAddress(email) {
    if (!email) return false

    // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email;
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
    switch(event.type) {
      case 'delivery':
        this.processDeliveryEvent(event)
        break;
      case 'click':
        this.processClickEvent(event)
        break;
      case 'open':
        this.processOpenEvent(event)
        break;
      default:
        console.log(`Processing ${ event.type } not implemented.`)
        break;
    }
  }

  processOpenEvent(event) {
    const campaignId = event.campaign_id
    console.log(`Email Opened for ${ campaignId } by ${ event.rcpt_to }`)
    this.db.child(`recipients/${campaignId}/${this.escapeEmailAddress(event.rcpt_to)}`).update({
      isOpen: true
    })
  }

  processClickEvent(event) {
    const campaignId = event.campaign_id
    console.log(`Link Clicked for ${ campaignId } by ${ event.rcpt_to }: ${ event.target_link_url }`)
    this.db.child(`campaigns/${ campaignId }/links`).orderByChild('link').equalTo(event.target_link_url).limitToFirst(1).once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        var clicks = childSnapshot.val().clicks || 0;
        clicks++;
        childSnapshot.ref().child('clicks').set(clicks);
      })
    })
  }

  processDeliveryEvent(event) {
    const campaignId = event.campaign_id
    console.log(`Email Delivered for ${ campaignId } to ${ event.rcpt_to }`)
    this.db.child(`recipients/${campaignId}/${this.escapeEmailAddress(event.rcpt_to)}`).update({
      isSent: true
    })
  }

  processRelayMessage(event) {
    const campaignId = event.rcpt_to.split('@')[0]
    this.db.child(`campaigns/${campaignId}`).once('value')
      .then(snapShot => snapShot.val())
      .then(campaignData => {
        // If Campaign is active, add the email to the campaign and trigger send
        if (campaignData.isActive) {
          this.db.child(`recipients/${campaignId}/${this.escapeEmailAddress(event.msg_from)}`).set({
            email: event.msg_from,
            friendly: event.friendly_from,
            subject: event.content.subject,
            isSent: false,
            isOpen: false
          }, error => {
            if (error) {
              console.log('Error writing: ', error)
            } else {
              this.triggerEmail(campaignData, event.msg_from)
            }
          })
        }
      })
  }

  triggerEmail(campaignData, address) {
    const client = new SparkPost();
    client.transmissions.send({
      transmissionBody: {
        recipients: [{ address: { email: address } }],
        content: {
          template_id: process.env.TEMPLATE_ID
        },
        substitution_data: campaignData,
        campaign_id: campaignData.name
      }
    }, (err, res) => {
      console.log(`Email Sent for ${ campaignData.name } to ${ address }`)
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

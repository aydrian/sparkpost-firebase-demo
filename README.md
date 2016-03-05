<a href="https://www.sparkpost.com"><img src="https://www.sparkpost.com/sites/default/files/attachments/SparkPost_Logo_2-Color_Gray-Orange_RGB.svg" width="200px"/></a>

#SparkPost Firebase Demo

This application demonstrates using Firebase as a consumer for SparkPost Event and Relay Webhooks. This app will listen for raw-events to be added to a Firebase instance and then process the following events:
* relay_message
* delivery
* open
* click

The processed events will be display using React.js

## Environment Variables
To use this app, you'll need to add the following environment variables.
* SPARKPOST_API_KEY - A [SparkPost API Key][1] with Templates and Transmissions permissions
* TEMPLATE_ID - The ID of the SparkPost Template to use. **note** the template must be published
* FIREBASE_URL - The URL for the instance of your Firebase Database

## Email Template
Here are is minimum require template needed to display information passed in.
```
<h2>{{question}}</h2>
<ul>
{{ each links }}
    <li><a href="{{{ loop_var.link }}}">{{ loop_var.text }}</a></li>
{{ end }}
</ul>
```

## Webhooks
You'll need to create a Relay Webhook and an Event Webhook.
### Event Webhook
Use the [SparkPost WebUI](https://app.sparkpost.com/account/webhooks) to create a new webhook that points to FIREBASE_URL/raw-events.json. 
Select the following Events:
* Delivery
* Click
* Open

### Relay Webhook
Create an Inbound Domain by creating MX Records in your DNS: https://developers.sparkpost.com/api/#/reference/inbound-domains
Add the Inbound Domain to SparkPost **note** you will need a [SparkPost API Key][1] with Inbound Domain Permissions
```
curl --include \
     --request POST \
     --header "Content-Type: application/json" \
     --header "Authorization: 14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf" \
     --data-binary "{
  \"domain\": \"inbounddomain.test.com\"
}" \
'https://api.sparkpost.com/api/v1/inbound-domains'
```

Create a Relay Webhook and point it to FIREBASE_URL/raw-events.json: https://developers.sparkpost.com/api/#/reference/relay-webhooks/
**note** you will need a [SparkPost API Key][1] with Relay Webhook Permissions
```
curl --include \
     --request POST \
     --header "Content-Type: application/json" \
     --header "Authorization: 14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf" \
     --data-binary "{
  \"name\": \"Replies Webhook\",
  \"target\": \"FIREBASE_URL/raw-events.json\",
  \"auth_token\": \"\",
  \"match\":
    {
      \"protocol\": \"SMTP\",
      \"domain\": \"inbounddomain.test.com\"
    }
}" \
'https://api.sparkpost.com/api/v1/relay-webhooks'
```
[1]: https://app.sparkpost.com/account/credentials

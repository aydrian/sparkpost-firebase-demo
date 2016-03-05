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
* SPARKPOST_API_KEY - A SparkPost API Key with Templates and Transmissions permissions
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

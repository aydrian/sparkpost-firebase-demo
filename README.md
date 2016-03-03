<a href="https://www.sparkpost.com"><img src="https://www.sparkpost.com/sites/default/files/attachments/SparkPost_Logo_2-Color_Gray-Orange_RGB.svg" width="200px"/></a>

#SparkPost Firebase Demo

This application demonstrates using Firebase as a consumer for SparkPost Event and Relay Webhooks. This app will listen for raw-events to be added to a Firebase instance and then process the following events:
* relay_message
* delivery
* open
* click
The processed events will be display using React.js
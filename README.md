# My First Twilio App


I recently started at Twilio as a Principal Solution Engineer and as part of the onboarding process, every employee has the opportunity to earn their Track Jacket. 

The process entails building an app that utilizes the Twilio platform and then giving a demo of the app you built. 

This project will document my journey to earning my Track Jacket! Here I will be outlining the general process of setting up a Twilio account, the steps I followed to learn and build my app, and provide some tips and tricks as I learn them. 

Some of my ideas for the app are: 
- a number guessing app, the server generates a random number between 1 and 10, and then the user guesses a number, the server returns a match or a clue 
- a photo a day collage app, the user is prompted to submit a picture of what they are doing at that moment. At the end of the week a montage of the photos is returned
- a mad lib generating app, the user is prompted for a noun, verb, etc.. and the end result is a completed mad lib.
- a photo identifier application, submit a picture and have it analyzed for content, think silicon valley tv show, hot dog or no hot dog ha! 


## Create an account
In this step we will be creating a new Twilio account to get access to a phone number and the Twilio platform services

- In your web browser navigate to [twilio.com](https://twilio.com)
- In the upper right hand corner hit the sign up button 
![Sign up gif](images/signup.gif?raw=true "Signup gif")
- You will then be presented with a quick form to sign up for the Twilio platform 
![Sign up gif](images/signupform.png?raw=true "Signup form")

## Buy a phone number
This step will walk us though buying a phone number in the Twilio platform 

## Convert to employee account
For Twilio Employees only - you have the option to convert your trial account to an employee account. This will allow your account specific privileges above and beyond the trial account limitations. 



## Building your application 
### Outlining our goals 
Since I am new to software development, looking at my list of ideas, I think the simplest of them to get off the ground will be the number guessing game. As far as the user experience, what I want to build can be outlined like:  
* A user sends a text with the word "Start" to my Twilio number
* A is text returned to the user that lets them know a game is started and what the possible range of numbers is
* The user texts back their guess 
* If the number guessed is too low or too high a hint is returned
* If the number is right, they are informed and a new round is suggested

Lets break this down a bit, and look at this this works from a communication flow lens. Here is a quick diagram:
![Communication Flow](images/flow.png?raw=true "Communication Flow")

* In step 1, the user is sending an SMS message, this is transmitted from the users device to their carrier, such as AT&T or Verizon for example. 
* In step 2 and 3, the carrier is routing the message through their network and internet to the Twilio service.
* In step 4, Twilio is seeing that the communication should be handled by the phone services
* In step 5, The Twilio platform sees that incoming messages should be routed to a configured application service URL and directs it there. In our case, this is the app we are going to build! 
* Step 6 and 7, is our application processing and responding to the Twilio platform with a response we want the user to receive. This is the start of the whole process essentially in reverse, and the outbound message is working its way back though the Twilio Platform
* In step 8 and 9, Twilio is posting the message back to the carrier
* In step 10, the response from our application is delivered by the carrier network to our user

### Development environment 
With that in mind, our development environment is going to consist of a few tools. Ultimately this is a preference of your tools, and coding language, but since I am new this all of this, I am picking what I have heard around the virtual water cooler, and learning those. 
* For my code editor, I am going to use Visual Studio Code, its lightweight editor and has lots of customizations that can be applied. 
* I am going to be using and writing a node.js based application, so I have installed node on my mac. 
* While Node itself has a lot of functionality, we are going to use a couple of additional libraries to make our applcation development a bit easier. The additional libraries are [Express.js](https://expressjs.com) and [Body Parser](http://expressjs.com/en/resources/middleware/body-parser.html)
* To make my development easier, I installed another tool, [nodemon.js](https://nodemon.io). This tool watches your code files and as they are updated automatically reloads the node app, so your always running the latest updated code. 
* Finally to make my application available on the internet, with out having to open firewall ports, make network changes etc.. I am using a tool called ngrok. 

### API docs to keep handy

#### What is TwiML
TwiML is the markup language and formatting used by the twilio services 
Here is a link to the Twilio Docs:
 
- TwiML for [Programmable SMS](https://www.twilio.com/docs/sms/TwiML)

- TwiML for [Programmable Voice](https://www.twilio.com/docs/voice/TwiML)

### Create a basic SMS response

Based on the documentation referenced above, we can see a simple example to get us started. Looking at this example we see the text "Hello World!" wrapped in the Message Tag, which itself is wrapped in the Response Tag. This is an example of the TwiML markup that will inform the Twilio Platform to respond to any incoming SMS with a SMS in return, in this case a message that simply says "Hello World!"

```

<Response>
    <Message>Hello World!</Message>
</Response>

```


### Building our Application 

After installing the tools mentioned above, we are going to go ahead and start writing our application. In VSCode, I am going to open a new document, and save it as `Numberguess.js`. By saving it as a javascript file, VS Code knows the file type and will do some dynamic text colorization, auto complete, etc.. which is really handy. 

The first part of our code is going to add in the required libraries for our application, and define some variables. As noted in the development environment section, we have installed a few additional libraries, so lets add them to our application. This will make the functionality of the Express library and and body-parser library available to be consumed in our application.

```
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));

//Define Start Game variable that wil be used to compare against later on for a new number generation, or if the message contains a guess
StartGame='Start';

 ``` 

The next few lines of our code will create a new node application that will be listening on the serverurl/numberguess endpoint. I have added some code comments below as well inline with what should be happening. Other than start a service on that endpoint, we are going to generate an object that parses out the "Body" value from the message we got from Twilio. In this case the Body value is the content of the SMS message from the user and stores it as the incomingBody object. 

```

// an app that responds on the numberguess subdirectory, here it is expecting an inbound POST message
app.post('/numberguess', (request, response) => {
 
// creating an object called incomingBody that contains the value from the Body field of the inbound message from Twilio. In this case, Twilo is sending us a JSON formatted message and the Body field contains whatever message the sent via SMS
const incomingBody = request.body.Body;
// Logs the users sumitted text to the console window for troubleshooting and monitoring
console.log('User has submitted '+incomingBody);

```

This next block of code will going to check the users submitted text message to see if their intention is to start a new game. Remember at the start of our code we set the StartGame variable to be equal to "Start". Now we are going to check if the StartGame value equals the incomingBody value. If it does, than the if statement is true, and the following code will be run. This will generate a new random number and store it as the gamenumber object for future use. It will also print some messages to the console for us to troubleshoot and monitor game progress. Finally, we see the TwiML response / message xml being generated and sent back to twilio for delivery to the user. 

```

//here are are doing a check to see if the user has submitted the word "Start". If they have than the condition is satisified and the code in the "if" block will be processed
if(incomingBody == StartGame)
{
  // defining a varialbe that can be referenced later to check what the random number is. In this case, the 9 means that a number will be selected from 0 - 9 (inclusive of those)
  gamenumber = getRandomInt(9);
  //This is the function to generate a random number that is stored in the above variable
  function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }
// Send a message to the console log that based on the incomingBody and StartGame check, a new game is starting
console.log('Game Starting');
// here the random number that was selected is now printed out to the console for troubleshooting and monitoring 
console.log('the chosen number is '+gamenumber);
// Here we are now going to send a response back to the user who sent in the message. This is formatted using the TwiML XML Response / message tags 
response.send( "<Response><Message>The game is starting, a number from 0 - 9 has been selected, try to guess it</Message></Response>");
} 

```

This next block of code does the evaluation of the users guess. Here were checking to see if the submitted guess is too low, too high, correct, or something we dont understand. Again I added some code comments to try and make it easy to follow. Essentially, we are goign to compare the incomingBody value to the gamenumber value. Depending on the result, a message is returned to the user giving them a hint about what their next guess should be. 

```


// if the users submitted text does not match the word start, we are now going to assume that it must be a guess. We are now going to compare the users submitted message (incomingBody) to the current random number (gamenumber). This case is testing for a guess thats too low.
else if(incomingBody < gamenumber)
{
// Here we are logging a message to the console that the users guess was too low and they should aim higher
console.log('Too low, aim higher')
// here we are now sending a message back to the user with the result of their guess. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>Good guess, but that was too low, aim higher</Message></Response>");
}
// if the users submitted text does not match the word or the too low check, we are now still going to assume that it must be a guess. We are now going to compare the users submitted message (incomingBody) to the current random number (gamenumber). This case is testing for a guess thats too high.
else if(incomingBody > gamenumber)
{
// Here we are logging a message to the console that the users guess was too high and they should aim lower
console.log('Too high, aim lower')
// here we are now sending a message back to the user with the result of their guess. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>Good guess, but that was too high, aim lower</Message></Response>");
}
// if the users submitted text does not match the too low or too high evaluations, we are still going to assume that it must be a guess. We are now going to compare the users submitted message (incomingBody) to the current random number (gamenumber). This case is testing for a guess thats is equal to the random number.
else if(incomingBody == gamenumber)
{
// Here we are logging a message to the console that the users guess was exactly right
console.log('Nailed it!')
// here we are now sending a message back to the user with the result of their guess. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>Good guess, you nailed it!</Message></Response>");
}
// finally the users submitted text does not match the word start, and all the number evaluations fail, we are now going to assume that it must not be a valid guess. 
else
{
// Here we are logging a message to the console that the users guess didnt match any of the expected values, a number or the word "start".
console.log('unknown entry')
// here we are now sending a message back to the user with the result of their guess. In this case, that we were unable to match it aginst an expected value and they should say Start to begin a game. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>im not sure what you mean, say 'Start' to begin a game</Message></Response>");
}

})

```

This last bit sets up the app on the defined port from the top of our config file and prints to the console that our service is running and on which port. 

```
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

```

And finally lets see it all together. I have also posted it in this repo in the files folder. 
```

const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));

//Define Start Game variable that wil be used to compare against later on for a new number generation, or if the message contains a guess
StartGame='Start';

// a basic app that responds to the root directory with a simple hello world message
app.get('/', (request, response) => {
  response.send('Hello World!')
})

// an app that responds on the numberguess subdirectory, here it is expecting an inbound POST message
app.post('/numberguess', (request, response) => {
 
// creating an object called incomingBody that contains the value from the Body field of the inbound message from Twilio. In this case, Twilo is sending us a JSON formatted message and the Body field contains whatever message the sent via SMS
const incomingBody = request.body.Body;
// Logs the users sumitted text to the console window for troubleshooting and monitoring
console.log('User has submitted '+incomingBody);
//here are are doing a check to see if the user has submitted the word "Start". If they have than the condition is satisified and the code in the "if" block will be processed
if(incomingBody == StartGame)
{
  // defining a varialbe that can be referenced later to check what the random number is. In this case, the 9 means that a number will be selected from 0 - 9 (inclusive of those)
  gamenumber = getRandomInt(9);
  //This is the function to generate a random number that is stored in the above variable
  function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }
// Send a message to the console log that based on the incomingBody and StartGame check, a new game is starting
console.log('Game Starting');
// here the random number that was selected is now printed out to the console for troubleshooting and monitoring 
console.log('the chosen number is '+gamenumber);
// Here we are now going to send a response back to the user who sent in the message. This is formatted using the TwiML XML Response / message tags 
response.send( "<Response><Message>The game is starting, a number from 0 - 9 has been selected, try to guess it</Message></Response>");
} 
// if the users submitted text does not match the word start, we are now going to assume that it must be a guess. We are now going to compare the users submitted message (incomingBody) to the current random number (gamenumber). This case is testing for a guess thats too low.
else if(incomingBody < gamenumber)
{
// Here we are logging a message to the console that the users guess was too low and they should aim higher
console.log('Too low, aim higher')
// here we are now sending a message back to the user with the result of their guess. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>Good guess, but that was too low, aim higher</Message></Response>");
}
// if the users submitted text does not match the word or the too low check, we are now still going to assume that it must be a guess. We are now going to compare the users submitted message (incomingBody) to the current random number (gamenumber). This case is testing for a guess thats too high.
else if(incomingBody > gamenumber)
{
// Here we are logging a message to the console that the users guess was too high and they should aim lower
console.log('Too high, aim lower')
// here we are now sending a message back to the user with the result of their guess. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>Good guess, but that was too high, aim lower</Message></Response>");
}
// if the users submitted text does not match the too low or too high evaluations, we are still going to assume that it must be a guess. We are now going to compare the users submitted message (incomingBody) to the current random number (gamenumber). This case is testing for a guess thats is equal to the random number.
else if(incomingBody == gamenumber)
{
// Here we are logging a message to the console that the users guess was exactly right
console.log('Nailed it!')
// here we are now sending a message back to the user with the result of their guess. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>Good guess, you nailed it!</Message></Response>");
}
// finally the users submitted text does not match the word start, and all the number evaluations fail, we are now going to assume that it must not be a valid guess. 
else
{
// Here we are logging a message to the console that the users guess didnt match any of the expected values, a number or the word "start".
console.log('unknown entry')
// here we are now sending a message back to the user with the result of their guess. In this case, that we were unable to match it aginst an expected value and they should say Start to begin a game. Again this is formatted using the TwiML response / message tags
response.send( "<Response><Message>im not sure what you mean, say 'Start' to begin a game</Message></Response>");
}

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


```

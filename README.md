# My First Twilio App


# Twilio Red Track Jacket 

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

The first part of our code is going to add in the required libraries for our application, and define some variables. As noted in the development environment section, we have installed a few additional libraries, so lets add them to our application. This will make the functionality of the Express library and and body-parser library available to be consumed in our application. \

```
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));

//Define Start Game variable that wil be used to compare against later on for a new number generation, or if the message contains a guess
StartGame='Start';

 ``` 

The next section of our code will define a variable for the start message, this is the value we are looking for in an incoming text to start a new game, and following that we are going to define a function to generate a random number. 
```
//define a variable for the start game incoming message
StartGame = 'Start'

// defines  a function to generate a random number
function getRandomInt(max){
  return Math.floor(Math.random() * max);
```


The next section of our code will create an express webserver application that listens locally on port 3000. This will also print out the status to the local terminal
```
const app = express();

// Create an HTTP server and listen for requests on port 3000
app.listen(3000, () => {
    console.log(
      'Now listening on port 3000. ' +
      'Be sure to restart when you make code changes!'
    );
  });
```

The next section of our application will contain the code that will generate an endpoint that will listen on "/numberguess" - so our service will be running on https://mysite.com/numberguess 
```
app.post('/numberguess', (request, response) => {}
```

So far our code has been building the basic skeleton of our application. The next steps in our code are adding the guts of our application. What we are defining next,  will parse the inbound webhook for the text of the message that the user sends. Twilio will send the text of the users message in a JSON statement. There is a bunch of information that is sent over, the specific value we are interested is the "Body" value. Here are are going to compare the incoming Body message to the StartGame variable, if you look back at the variable definition, its defined as "Start". If the user happens to send the message "Start" if will match, and the message "Game Starting" will be posted into the console, a random number from 0 - 9 (inclusive of those numbers) will be selected, and the number will be posted back into the console. The generated random number will also be stored as a variable called "gamenumber", that we will use later on to evaluate the users submitted guess. Finally, a message back to user will be formed, using the TwiML formatting, and sent back to twilio and ultimately back to the user via SMS. 

```
const incomingBody = request.body.Body;
  if(incomingBody == StartGame)
  {
  console.log('Game Starting');
  gamenumber = getRandomInt(9);
  console.log(gamenumber)
  response.send( "<Response><Message>The game is starting, a number from 0 - 9 has been selected, try to guess it</Message></Response>");
  } 
```

These next steps will be evaluating any user number guesses. The prompt from the previous step is to guess a number from 0 - 9, if the user send in a number guess, that will fail the first condition, which recall was just evaluating to see if the user sent the word "Start". a number guess will fail that check and then fall into these next evaluation conditions. Looking at these statements, the incoming body value is going to be compared to the game number variable. If the number is too low or too high, a message is printed to the console, and a response with a hint is generated and sent back to the user as with the game start message. If the user guesses the right number and the variables match, a congratulations message is generated and returned to the user. Finally a catch all statement, that if a user submits a message that doesn't fit any of the conditions, an "unknown entry" message is printed to the console and a message suggesting the user start a game is returned to the user. 

```
 else if(incomingBody < gamenumber)
  {
  console.log('Too low, aim higher')
  response.send( "<Response><Message>Good guess, but that was too low, aim higher</Message></Response>");
  }
  else if(incomingBody > gamenumber)
  {
  console.log('Too high, aim lower')
  response.send( "<Response><Message>Good guess, but that was too high, aim lower</Message></Response>");
  }
  else if(incomingBody == gamenumber)
  {
  console.log('Nailed it!')
  response.send( "<Response><Message>Good guess, you nailed it! Start another game by saying 'Start'</Message></Response>");
  }
  else
  {
  console.log('unknown entry')
  response.send( "<Response><Message>im not sure what you mean, say 'Start' to begin a game</Message></Response>");
  }
```

To see it all together here is the content of our numberguess.js file, which is our application:

```
const express = require('express');
const urlencoded = require('body-parser').urlencoded;

//define a variable for the start game incoming message
StartGame = 'Start'

// defines  a function to generate a random number
function getRandomInt(max){
  return Math.floor(Math.random() * max);

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));
const app = express();

// Create an HTTP server and listen for requests on port 3000
app.listen(3000, () => {
    console.log(
      'Now listening on port 3000. ' +
      'Be sure to restart when you make code changes!'
    );
  });

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /inbound in our application
app.post('/numberguess', (request, response) => {})
  // Get information about the incoming call
  // Collecting the body of the message to determine the guess
  const incomingBody = request.body.Body;
  if(incomingBody == StartGame)
  {
  console.log('Game Starting');
  gamenumber = getRandomInt(9);
  console.log(gamenumber)
  response.send( "<Response><Message>The game is starting, a number from 0 - 9 has been selected, try to guess it</Message></Response>");
  } 
  else if(incomingBody < gamenumber)
  {
  console.log('Too low, aim higher')
  response.send( "<Response><Message>Good guess, but that was too low, aim higher</Message></Response>");
  }
  else if(incomingBody > gamenumber)
  {
  console.log('Too high, aim lower')
  response.send( "<Response><Message>Good guess, but that was too high, aim lower</Message></Response>");
  }
  else if(incomingBody == gamenumber)
  {
  console.log('Nailed it!')
  response.send( "<Response><Message>Good guess, you nailed it! Start another game by saying 'Start'</Message></Response>");
  }
  else
  {
  console.log('unknown entry')
  response.send( "<Response><Message>im not sure what you mean, say 'Start' to begin a game</Message></Response>");
  }

}

```


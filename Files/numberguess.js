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

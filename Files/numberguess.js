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


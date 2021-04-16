const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.post('/numberguess', (request, response) => {
  //Send a response to the user welcomeing them with instructions
  //res.send("<Response><Message>The game is starting, a number from 0 - 3 has been selected, try to guess it</Message></Response>")
  //res.send('Hello numberguess!');
  //Define Start Game verb to begin generate a new number
StartGame='Start';
const incomingBody = request.body.Body;
console.log('User has submitted '+incomingBody);
if(incomingBody == StartGame)
{
  gamenumber = getRandomInt(9);
  //Define a function to generate a random number
  function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }

console.log('Game Starting');
console.log('the chosen number is '+gamenumber);
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
response.send( "<Response><Message>Good guess, you nailed it!</Message></Response>");
}
else
{
console.log('unknown entry')
response.send( "<Response><Message>im not sure what you mean, say 'Start' to begin a game</Message></Response>");
}

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


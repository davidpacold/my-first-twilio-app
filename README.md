# trackjacket


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
* To make my development easier, I installed another tool, "nodemon". This tool watches your code files and as they are updated automatically reloads the node app, so your always running the latest updated code. 
* Finally to make my application available on the internet, with out having to open firewall ports, make network changes etc.. I am using a tool called ngrok. 

### Building our Application 

After installing the tools mentioned above, we are going to go ahead and start writing our application. In VSCode, I am going to open a new document, and save it as `Numberguess.js`. By saving it as a javascript file, VS Code knows the file type and will do some dynamic text colorization, auto complete, etc.. which is really handy. 

The first part of our code is going to 






## What is TwiML
TwiML is the markup language and formatting used by the twilio services 
Here is a link to the Twilio Docs:
 
- TwiML for [Programmable SMS](https://www.twilio.com/docs/sms/TwiML)

- TwiML for [Programmable Voice](https://www.twilio.com/docs/voice/TwiML)

## 



## Create a TwiML bin

TwiML Bins allow you to create a small application and have Twilio host it. Once you have your code written, and your TwiML Bin is created, you will get a unique URL to access it. We will use that later on, to direct our inbound SMS messages to our application that will handle them. 

- Start by accessing the TwiML Bin feature by selecting the 3 dots from the menu of your Twilio Console and selecting the TwiML Bin feature  
![Navigating to TwiML Bin](images/twimlbinnav.gif?raw=true "Twiml Bin Nav")  

- From the TwiML Bin landing page, click create new TwiML Bin, this will load a new Bin for us to use. For now, give it a name that is descriptive of the app we are making, as for the code, we are just going to copy the example code provided to use on the form. Once we have done that will save our Bin. This will give us the unique url for our fresh TwiML Bin, that we can then use to respond inbound voice or SMS messages.  
![Bin Create](images/bincreate.gif?raw=true "TwiMLbin create")  

- Next we will want to copy the Bin URL that was created after we saved our Bin in the previous step. At the top of the page, a new properties section will be displayed, there are a number of fields displayed such as a SID, the date created and updated and a URL. The URL field is what we are interested in and it conveniently has a little copy button at the end of the field. Hit that to copy the entire url.  
![copy TwiML Bin URL](images/bincopy.gif?raw=true "Twiml Bin copy")  

### Create a basic SMS response

Based on the documentation referenced above, we can see a simple example to get us started. Looking at this example we see the text "Hello World!" wrapped in the Message Tag, which itself is wrapped in the Response Tag. This is an example of the TwiML markup that will inform the Twilio Platform to respond to any incoming SMS with a SMS in return, that simply says "Hello World!"

```

<Response>
    <Message>Hello World!</Message>
</Response>

```
By simply copy and pasting this example into your TwiML Bin, you are on your way to building and running your first SMS application. So lets go ahead and do that. 
Copy the above code example and paste it into your TwiML Bin. After writing any code in the editor, the system will validate the code, so look for the green check at the bottom of the code editor window to ensure it will function properly. 
![TwiML Paste](images/pasteTwiML.gif?raw=true "TwiML paste")

Save the Bin address:
` https://handler.twilio.com/TwiML/EH4f293e58604a4be7e2d86580d55e667a`

go back to phone numbers
change the default SMS webhook from:
`https://demo.twilio.com/welcome/sms/reply`

to the TwiML bin
`https://handler.twilio.com/TwiML/EH4f293e58604a4be7e2d86580d55e667a`

Save the change

Send a test test message to the phone number in your account
If successful you will get the "Hello from Twilio Bootcamp, this is great!" response returned to you

If you account is still in trial status, your message will indicate it as such in the returned response.



# Random notes and things to look up in the future
  Flask and the request module 
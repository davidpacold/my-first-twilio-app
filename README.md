# trackjacket


# Twilio Red Track Jacket 

I recently started at Twilio as a Principal Solution Engineer and as part of the onboarding process, every employee has the opportunity to earn their Track Jacket. 

The process entails building an app that utilizes the Twilio platform and then giving a demo of the app you built. 

This project will document my journey to earning my Track Jacket! Here I will be outlining the general process of setting up a twilio account, the steps I followed to learn and build my app, and provide some tips and tricks as I learn them. 

## Create an account
In this step we will be creating a new Twilio account to get access to a phone number and the Twilio platform services

## Buy a phone number
This step will walk us though buying a phone number in the Twilio platform 

## Convert to employee account
For Twilio Employees only - you have the option to convert your trial account to an employee account. This will allow your account specific priviliges above and beyond the trial account limitations. 

## What is TwiML
TwiML is the markup language and formatting used by the twilio services 
Here is a link to the Twilio Docs:
 
- TwiML for [Programmable SMS](https://www.twilio.com/docs/sms/TwiML)

- TwiML for [Programmable Voice](https://www.twilio.com/docs/voice/twiml)

## Create a TwiML bin

TwiMLBins allow you to create a small application and have Twilio host it. Once you have your code written, and your TwiMLbin is created, you will get a unique URL to access it. We will use that URL as the destination for inbound SMS messages. 

### Create a basic SMS response

```
    <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Hello from Twilio Bootcamp, this is great!</Message>
</Response>
```

Save the Bin address:
https://handler.twilio.com/TwiML/EH4f293e58604a4be7e2d86580d55e667a

go back to phone numbers
change the default SMS webhook from:
https://demo.twilio.com/welcome/sms/reply

to the TwiML bin
https://handler.twilio.com/TwiML/EH4f293e58604a4be7e2d86580d55e667a

Save the change

Send a test test message to the phone number in your account
If successful you will get the "Hello from Twilio Bootcamp, this is great!" response returned to you

If you account is still in trial status, your message will indicate it as such in the returned response.



# Random notes and things to look up in the future
  Flask and the request module 
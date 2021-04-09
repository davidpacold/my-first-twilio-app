# trackjacket


# Twilio Red Track Jacket 

I reciently started at Twilio as a Principal Solution Engineer and as part of the onboarding process, every employee has the oppotunity to earn their Track Jacket. 

The process entails builing an app that utilizes the Twilio platform and then giving a demo of the app you built. 

This project will document my journey to earning my Track Jacket! Here I will be outlining the general process of setting up a twilio account, the steps I followed to learn and build my app, and provide some tips and tricks as I learn them. 

Create an account
Buy a phone number
Convert to employee account
Create a Twiml bin
Create a basic SMS response

```
    <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Hello from Twilio Bootcamp, this is great!</Message>
</Response>
```

Save the Bin address:
https://handler.twilio.com/twiml/EH4f293e58604a4be7e2d86580d55e667a

go back to phone numbers
change the default SMS webhook from:
https://demo.twilio.com/welcome/sms/reply

to the twiml bin
https://handler.twilio.com/twiml/EH4f293e58604a4be7e2d86580d55e667a

Save the change

Send a test test message to the phone number in your account
If successful you will get the "Hello from Twilio Bootcamp, this is great!" response retuned to you

If you account is still in trial status, your message will indiate it as such in the retuned response.

Test code added here

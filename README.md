# GrazittiAtmNode



# Grazitti Atm
Atm machine test

### Prerequisites
* Node and NPM - you can easily install it on MAC OS X by
```
$ brew install node && brew install npm
```


### Running project 
* Clone and go to the project by running command
```
$ git clone git@github.com:rajatgupta-26/grazittiAtmNode.git
$ cd grazittiAtmNode
```

* Then prepare project dependencies with
```
$ npm install
```

* Run project using command
```
$ npm run start
```

The project should start on port 8010

### API structure
1. Default(Without Currency Specified)
```
http://localhost:3008/dispense?amount=2020
```
Response
```
{"responseCode":"0","responseDesc":"SUCCESS","responseStatus":"SUCCESS","currencyBreakdown":"2000 : 1,20 : 1,"}
```

2. With Currency Specified
```
http://localhost:3008/dispense?amount=2020&requiredNotes=100,20
```
Response
```
{"responseCode":"0","responseDesc":"SUCCESS","responseStatus":"SUCCESS","currencyBreakdown":"100 : 20,20 : 1,"}
```

3. Health check API
```
 http://localhost:3008/ping
```
Response
```
{"RESPONSE_DESC":"app is heathly"}
```

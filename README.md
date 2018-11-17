# Attendance Logger

Super simple webapp to allow people to sign in and **let them say whether they'll be going to college, and put up a reason for going/not going** (stemmed from the daily conversations my friends and I had before going to college).

## Stuff used

 - React (+Redux, for maintaining state) on the front
 - Node server (hosted on [Openode.io](https://www.openode.io/))
 - MongoDB (hosted on [mlab.com](https://www.mlab.com))
 - Oh, and sign in with Google OAuth2

Install locally with:

*First, cd into the project folder*

```
$ npm install
$ cd client
$ npm install
```
(will require an internet connection to connect to the dev version of mlab's MongoDB)

* * *
## Screenshots
![not signed in (cannot say yes/no, cannot set a new reason for going/not going)](https://github.com/nabhoneel/attendance-logger/raw/master/screencapture-attendance-openode-io-2018-11-17-15_09_55.png)

![signed in](https://github.com/nabhoneel/attendance-logger/raw/master/screencapture-attendance-openode-io-2018-11-17-15_14_49.png)

Deployed at [attendance.openode.io](http://attendance.openode.io) 

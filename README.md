## Ionic Google Login
---
This is an example of [Ionic](http://ionicframework.com/) application implementing login with Google account functionality. [Ionic](http://ionicframework.com/) is an open source framework for building hybrid mobile application using web technologies: HTML, CSS, and Javascript—in this case [AngularJS](https://angularjs.org/). [Ionic](http://ionicframework.com/) itself is powered by [Apache Cordova](https://cordova.apache.org/), however [Ionic](http://ionicframework.com/) only focus on iOS and Android platforms.

We are using [ngCordova OAuth](http://ngcordova.com/docs/plugins/oauth/) plugin to develop the Google login functionality. This plugin is developed by [Nic Raboy](https://github.com/nraboy), you may check this plugin repository here: [github.com/nraboy/ng-cordova-oauth](https://github.com/nraboy/ng-cordova-oauth).

### Requirements
- [Node.js](https://nodejs.org/)
- [Apache Cordova](http://cordova.apache.org/)
- [Ionic Framework](http://ionicframework.com/)
- [Bower](http://bower.io/)
- [ngCordova InAppBrowser](http://ngcordova.com/docs/plugins/inAppBrowser/) plugin
- [ngCordova OAuth](http://ngcordova.com/docs/plugins/oauth/) plugin

### Installing Required Softwares
In order to run and build this Ionic application, you will need the following softwares:
- [Node.js](https://nodejs.org/)
- [Apache Cordova](http://cordova.apache.org/), you can install it using NPM:
```
$ npm install -g cordova
```
- [Ionic Framework](http://ionicframework.com/), install it using NPM:
```
$ npm install -g cordova
```
- [Bower](http://bower.io/), install it using NPM:
```
$ npm install -g bower
```
Note that you are going to need iOS SDK or Android SDK in order to deploy your application. Make sure you also read the [iOS Platform](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/ios/index.html) guide or [Android Platform](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/android/index.html) guide.

### Running Application

#### Clone Repository
First, clone this repository to your local machine:
```
$ git clone git@github.com:risan/ionic-google-login.git
```
Then `cd` to the created local directory:
```
$ cd ionic-google-login
```

#### Configure Platforms
Now, we need to tell Ionic which platform to enable. To enable iOS:
```
$ ionic platform add ios
```
And to enable Android platform:
```
$ ionic platform add android
```

#### Install Cordova Plugin
Install [ngCordova InAppBrowser](http://ngcordova.com/docs/plugins/inAppBrowser/) plugin:
```
$ cordova plugin add org.apache.cordova.inappbrowser
```

#### Install Ionic & ngCordova OAuth
To install Ionic bundle and ngCordova OAuth plugin, simply run bower command:
```
$ bower install
```

#### Create Google OAuth 2.0 Client Id
In your [Google Console](https://console.developers.google.com) project page, create a new credential for OAuth 2.0 client id. Make sure that the redirect URI has a value of:
```
http://localhost/callback
```
Copy the config file:
```
$ cp cp www/js/config.js.example www/js/config.js
```
Open the copied `config.js` file and update `GOOGLE_CLIENT_ID` value with your own Google client id:
```
angular.module('app.Config', [])
  .constant('GOOGLE_CLIENT_ID', 'REPLACE WITH YOUR GOOGLE CLIENT ID');
```

#### Run The Application
You may run the application on the emulator
```
$ ionic emulate ios
$ ionic emulate android
```
Or even build for the desired platform:
```
$ ionic build ios
$ ionic build android
```
Note that the ngAngular OAuth plugin cannot authenticate via web browser.

### User Service
#### Log the user in
To start the OAuth login process, use `User.login(successCallback, errorCallback)` method. Once the user successfully logged in, The `User` service will store the `user` object in local storage.
```
angular.module('app').controller('LoginCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
  $scope.login = function() {
    User.login(function(user) {
      // Output user object.
      console.log(user);
      // Redirect user to secured page.
      $state.go('secure-page');
    }, function(error) {
      // User failed to login.
      alert(error);
    });
  };
}]);
```

#### Log the user out
To logout the user, simply call `User.logout()` method. This method will delete the `user` object in the local storage.
```
angular.module('app').controller('SecureCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
  $scope.logout = function() {
    User.logout();
    $state.go('login');
  };
}]);
```

#### Get user data
To get the `user` object call `User.get()` method. If user is already logged in, it will return the `user` object other wise it will return `null`.

### Protecting Route
Here is the example of how the `User` service used to secure the protected route.
```
app.run(['$rootScope', '$state', 'User', function($rootScope, $state, User) {
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.name === 'secure-page' && User.get() === null) {
      // User not authenticated, redirect to login page.
      e.preventDefault();
      $state.go('login');
    }

    if (toState.name === 'login' && User.get() !== null) {
      // User is already authenticated, redirect to secure page.
      e.preventDefault();
      $state.go('secure-page');
    }
  });
}]);
```

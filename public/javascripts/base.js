var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var battlenetApp = angular.module('battlenetApp', ['ui.bootstrap']);

//Service
battlenetApp.factory('idAndName', ['$http', function($http) {
    return {
        //get user profile - params: id, name
        getProfile: function(id, name) {
            return $http.get("https://us.api.battle.net/sc2/profile/"+ id +"/1/"+ name +"/?locale=en_US&apikey=pshyp9tgvegq2wuftgu4pu9femmpgbcj")
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    console.log('Something broke', response.status, response.data);
                });
        },
        //get last 25 matches - params: id, name
        getMatches: function(id, name) {
            return $http.get("https://us.api.battle.net/sc2/profile/"+ id +"/1/"+ name +"/matches?locale=en_US&apikey=pshyp9tgvegq2wuftgu4pu9femmpgbcj")
                .then(function(response) {
                    return response.data.matches;
                })
                .catch(function(response) {
                    console.log('Something broke', response.status, response.data);
                });
        }
    };
}]);

//Get User information
battlenetApp.controller('GetUserInformationCtrl', ['$scope', 'idAndName', function($scope, idAndName) {
    //create submit function to get form data
    $scope.processForm = function() {
        idAndName.getProfile($scope.id, $scope.name).then(function(response) {
            //set profile response to scope
            $scope.profile = response;
            //add css classes to animate header to fixed top
            var bg = angular.element(document.querySelector('.bg-wrap'));
            bg.addClass('dark');
            var myEl = angular.element(document.querySelector('.battle-net-form'));
            myEl.addClass('fixed-top');
            //set zerg current and max xp
            $scope.zergMax = $scope.profile.swarmLevels.zerg.totalLevelXP;
            $scope.zergCurrent = $scope.profile.swarmLevels.zerg.currentLevelXP;
            if($scope.zergCurrent == -1) {$sope.zergCurrent = 5850000;}
            //set terran current and max xp
            $scope.terranMax = $scope.profile.swarmLevels.terran.totalLevelXP;
            $scope.terranCurrent = $scope.profile.swarmLevels.terran.currentLevelXP;
            if($scope.terranCurrent == -1) {$scope.terranCurrent = 5850000;}
            //set protoss current and max xp
            $scope.protossMax = $scope.profile.swarmLevels.protoss.totalLevelXP;
            $scope.protossCurrent = $scope.profile.swarmLevels.protoss.currentLevelXP;
            if($scope.protossCurrent == -1) {$scope.protossCurrent = 5850000;}
        });
        idAndName.getMatches($scope.id, $scope.name).then(function(response) {
            $scope.matches = response;
        });
    };
}]);

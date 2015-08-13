var battlenetApp = angular.module('battlenetApp', []);

//Get Profile data
battlenetApp.controller('DisplayProfileCtrl', function($scope, $http) {
    $http.get("https://us.api.battle.net/sc2/profile/582084/1/Bran/?locale=en_US&apikey=pshyp9tgvegq2wuftgu4pu9femmpgbcj")
        .then(function(response) {
            $scope.profile = response.data;
        })
        .catch(function(response) {
            console.log('Oh crap, something broke', response.status, response.data);
        });
});

//Get Match History
battlenetApp.controller('MatchHistoryCtrl', function ($scope, $http) {
    $http.get("https://us.api.battle.net/sc2/profile/582084/1/Bran/matches?locale=en_US&apikey=pshyp9tgvegq2wuftgu4pu9femmpgbcj")
        .then(function(response) {
            $scope.matches = response.data.matches;
        })
        .catch(function(response) {
            console.log('Something broke', response.status, response.data);
        });
})

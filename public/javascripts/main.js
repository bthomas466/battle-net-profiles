var battlenetApp = angular.module('battlenetApp', []);

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
            $scope.profile = response;
            console.log($scope.profile);
        });
        idAndName.getMatches($scope.id, $scope.name).then(function(response) {
            $scope.matches = response;
            console.log($scope.matches);
        });
    };
}]);

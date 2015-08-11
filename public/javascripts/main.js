var battlenetApp = angular.module('battlenetApp', []);

battlenetApp.controller('DisplayProfileCtrl', function($scope, $http) {
    $http.get("https://us.api.battle.net/sc2/profile/582084/1/Bran/?locale=en_US&apikey=pshyp9tgvegq2wuftgu4pu9femmpgbcj")
        .success(function(response) {
            $scope.profile = response;
        });
});

var battlenetApp = angular.module('battlenetApp', ['ui.bootstrap', 'oitozero.ngSweetAlert']);

//Service
battlenetApp.factory('idAndName', ['$http', 'SweetAlert', function($http, SweetAlert) {
    return {
        //get user profile - params: id, name
        getProfile: function(id, name) {
            return $http.get("https://us.api.battle.net/sc2/profile/"+ id +"/1/"+ name +"/?locale=en_US&apikey=pshyp9tgvegq2wuftgu4pu9femmpgbcj")
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    console.log('Something broke', response.status, response.data);
                    SweetAlert.swal('Oops', 'Something went wrong.  Please try again', 'error');
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
battlenetApp.controller('GetUserInformationCtrl', ['$scope', '$timeout', 'idAndName', function($scope, $timeout, idAndName) {
    //create submit function to get form data
    $scope.processForm = function() {
        idAndName.getProfile($scope.id, $scope.name).then(function(response) {
            //set profile response to scope
            $scope.profile = response;
            //set zerg current and max xp
            $scope.zergMax = $scope.profile.swarmLevels.zerg.totalLevelXP;
            $scope.zergCurrent = $scope.profile.swarmLevels.zerg.currentLevelXP;
            if($scope.zergCurrent == -1) {$scope.zergCurrent = 5850000;}
            //set terran current and max xp
            $scope.terranMax = $scope.profile.swarmLevels.terran.totalLevelXP;
            $scope.terranCurrent = $scope.profile.swarmLevels.terran.currentLevelXP;
            if($scope.terranCurrent == -1) {$scope.terranCurrent = 5850000;}
            //set protoss current and max xp
            $scope.protossMax = $scope.profile.swarmLevels.protoss.totalLevelXP;
            $scope.protossCurrent = $scope.profile.swarmLevels.protoss.currentLevelXP;
            if($scope.protossCurrent == -1) {$scope.protossCurrent = 5850000;}
            //swap background image for career container
            var images = ['Rendezvous_SC2_Art1.jpg', 'ui_hots_loading_missionselect_zexpedition01.jpg', 'ui_hots_loading_planetviewkorhal.jpg', 'maxresdefault.jpg', 'free-wallpaper-14.jpg', 'best_game_starcraft_2_wallpapers_hd_10.jpg', 'starcraft-2-battle-1920-1080-6284.jpg'];
            var careerContainer = angular.element(document.querySelector('.career-wrapper'));
            careerContainer.css('background-image', 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')');
            var bnetForm = angular.element(document.querySelector('.battle-net-form'));
            bnetForm.addClass("fixed-top-hide")

            $timeout(function(){
                //add css classes to animate header to fixed top
                var bg = angular.element(document.querySelector('.bg-wrap'));
                bg.addClass('dark');
                bnetForm.removeClass('fixed-top-hide');
                bnetForm.addClass('fixed-top-show');
            }, 0875);
        });
        idAndName.getMatches($scope.id, $scope.name).then(function(response) {
            $timeout(function(){
                $scope.matches = response;
            }, 1750);
        });
    };
}]);

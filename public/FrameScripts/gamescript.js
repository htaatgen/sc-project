/**
 * Created by Rik on 21-3-2016.
 */
angular.module('game', [])
    .controller("gameController", function ($scope, $http, $window) {
            loadUserData();

            $scope.updateActiveUsers = function (data) {
                $scope.activeusernames = data;
                for(var x=0; x<data.length; x++){
                    if(data[x].name == $scope.lblplayername){
                        $scope.lblpoints = data[0].kills;
                        $scope.lbldefeats = data[0].deaths;
                    }
                }
            }


            function loadUserData() {
                $http.get('/LoadUserData').then(function successCallback(response) {
                    "use strict";
                    $scope.lblplayername = response.data.name;
                    $scope.lblshiptype = response.data.shiptype;
                    $scope.lblweapontype = response.data.guntype;
                }, function errorCallback() {
                    "use strict";
                    window.alert("Could not load data!")
                })
            }

            $scope.exitGame = function () {
                "use strict";
                $window.location.href = "/UserScreen"
            }

            $scope.logOut = function () {
                "use strict";
                document.cookie = name +
                    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
                $window.location.href = "/"
            }

        }
    )
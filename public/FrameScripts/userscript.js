/**
 * Created by Rik on 18-3-2016.
 */
angular.module('user', [])
    .controller("userController", function ($scope, $http, $window) {
        loadUserData();

        function loadUserData() {
            $http.get('/LoadUserData').then(function successCallback(response) {
                "use strict";
                $scope.lblplayername = response.data.name;
                $scope.lblvictories = response.data.victories;
                $scope.lbllosses = response.data.gamesplayed - response.data.victories;
                $scope.lbldate = response.data.signup;
                $scope.lblshiptype = response.data.shiptype;
                $scope.lblweapontype = response.data.guntype;
            }, function errorCallback() {
                "use strict";
                window.alert("Could not load data!")
            })
        }

        $scope.updateData = function () {
            "use strict";
            var updatedata = {shiptype: $scope.lblshiptype, guntype: $scope.lblweapontype};
            console.log(updatedata);
            $http.post("/UpdateUserData", updatedata).then(function successCallback() {
                loadUserData();
            }, function errorCallback() {
                window.alert("Could not update!")
            })
        }

        $scope.hostGame = function() {
            "use strict";
            $http.get('/StartAsHost')
            $window.location.href = "SCProject.html";
        }
    });
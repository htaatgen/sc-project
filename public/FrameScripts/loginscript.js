/**
 * Created by Rik on 11-3-2016.
 */
angular.module('login', [])
    .controller("loginController", function ($scope, $http, $window) {

        $scope.loginresult = "Awaiting login...";


        $scope.loginSubmit = function () {
            "use strict";
            var sendData = angular.toJson({name: $scope.loginname, password: $scope.loginpassword});
            $http.post("Login", sendData).then(function successCallback() {
                $scope.loginresult = "Logging in...";
                $window.location.href = "UserScreen.html";

            }, function errorCallback() {
                $scope.loginresult = "Log In Failed!";
            })
        };

        $scope.registerSubmit = function () {
            "use strict";
            var sendData = angular.toJson({name: $scope.loginname, password: $scope.loginpassword});
            $http.post("Register", sendData).then(function successCallback() {
                $scope.loginresult = "Registering...";
            }, function errorCallback() {
                $scope.loginresult = "Register Failed!";
            })
        }
    });
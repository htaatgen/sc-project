/**
 * Created by Rik on 11-3-2016.
 */
angular.module('login', [])
    .controller("loginController", function ($scope, $http) {

        $scope.loginresult = "Awaiting login...";


        $scope.loginsubmit = function () {
            "use strict";
            var sendData = angular.toJson({name: $scope.loginname, password: $scope.loginpassword});
            $http.post("Login", sendData).then(function successCallback() {
        
            })
            $scope.loginresult = "Logging in..."
        }

    })
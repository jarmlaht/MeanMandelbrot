var app = angular.module('MandelbrotApp', []);
app.controller('MandelbrotController', function($scope, $http) {
    $scope.addmandelbrot = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/rest/mandelbrot/add',
            data: {'firstName': $scope.newcontact.firstname,
                'lastName': $scope.newcontact.lastname,
                'phoneNumber': $scope.newcontact.phonenumber,
                'emailAddress': $scope.newcontact.emailaddress,
                'id': 0},
            headers: 'Content-type: application/json'
        }).success(function() {
            console.log("Add successful!");
        });      
    };

    $scope.deletemandelbrot = function() {
        var url = "http://localhost:8080/rest/contact/deletebyname/" + $scope.deletebyname;
        $http({
            method: 'GET',
            url: url
        }).success(function(data) {
            $scope.contacts = data;
        });
    };

    $scope.findall = function() {
        var url = "http://localhost:8080/rest/contact/findall";
        $http({
            method: 'GET',
            url: url
        }).success(function(data) {
            $scope.contacts = data;
            console.log("All the contacts listed.");
        });
    };
}
);


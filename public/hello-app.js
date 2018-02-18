var helloapp = angular.module("helloapp",[])
.controller("HelloController",function($scope){
    $scope.names = ["Vaibhav","Prakash","Fatkal"];
    $scope.sayHello = function(name){
        alert("Hello "+name);
    };
});
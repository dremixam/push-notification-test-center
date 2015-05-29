var app = angular.module('pntc', ['ngMaterial', 'ngMessages']);

app.controller('AndroidCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.isDisabled = false;
  $scope.message = false;

  $scope.defaultValues = {
    'apikey': '',
    'regid': '',
    'collapsekey': 'pushtest',
    'delay': true,
    'ttl': 2419200
  };

  $scope.pushValues = JSON.parse(JSON.stringify($scope.defaultValues));

  $scope.reset = function () {
    $scope.pushValues = JSON.parse(JSON.stringify($scope.defaultValues));
  }

  $scope.send = function () {
    $scope.isDisabled = true;
    $http.post('/postAndroid', $scope.pushValues).
    success(function (data, status, headers, config) {
      console.log('succes ' + JSON.stringify(data));
      if (data.status && data.status.success === 1) {
        $scope.message = 'Success';
      } else {
        $scope.message = 'An unknown error occured';
      }
      $scope.isDisabled = false;
    }).
    error(function (data, status, headers, config) {
      console.log('error : ' + JSON.stringify(data));
      $scope.isDisabled = false;
      $scope.message = 'An error occured';
    });
  }
}]);

app.controller('iosCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.isDisabled = false;
  $scope.message = false;
  $scope.gateways = ['gateway.push.apple.com', 'gateway.sandbox.push.apple.com'];

  $scope.defaultValues = {
    'certfile': '',
    'keyfile': '',
    'gateway': 'gateway.push.apple.com',
    'port': 2195,
    'token': ''
  };

  $scope.setCertFile = function (fileInput) {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      $scope.pushValues.certfile = reader.result;
    }
    reader.readAsText(file);
  }

  $scope.setKeyFile = function (fileInput) {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      $scope.pushValues.keyfile = reader.result;
    }
    reader.readAsText(file);
  }

  $scope.pushValues = JSON.parse(JSON.stringify($scope.defaultValues));

  $scope.reset = function () {
    $scope.pushValues = JSON.parse(JSON.stringify($scope.defaultValues));
  }

  $scope.send = function () {
    $scope.isDisabled = true;
    $http.post('/postiOS', $scope.pushValues).
    success(function (data, status, headers, config) {
      console.log('succes ' + JSON.stringify(data));
      if (data.status && data.status.success === 1) {
        $scope.message = 'Success';
      } else {
        $scope.message = 'An unknown error occured';
      }
      $scope.isDisabled = false;
    }).
    error(function (data, status, headers, config) {
      console.log('error : ' + JSON.stringify(data));
      $scope.isDisabled = false;
      $scope.message = 'An error occured';
    });
  }
          }]);

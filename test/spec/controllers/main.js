'use strict';

describe('Testing the MainCtrl that return albums details as promise', function () {

  // load the controller's module
  beforeEach(module('compucorpJobProjectApp'));

  var $scope;
  var $q;
  var $http;
  var deferred;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$scope_, _$http_, _$q_) {
    $q = _$q_;
    $scope = _$scope_;
    $http = _$http_;

    // We use the $q service to create a mock instance of defer
    deferred = _$q_.defer();

    MainCtrl(getAlbumDetails).and.returnValue(deferred.promise);
  }));

  // Init the controller, passing our spy service instance
  $controller('MainCtrl', {
    $scope: $scope,
    getAlbumDetails: getAlbumDetails
  });

  it('should resolve promise', function () {
    // Setup the data we wish to return for the .then function in the controller
    deferred.resolve([{ id: 1 }, { id: 2 }]);
    
    // We have to call apply for this to work
    $scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect($scope.results).not.toBe(undefined);
    expect($scope.error).toBe(undefined);
  });
  
  it('should reject promise', function () {
    // This will call the .catch function in the controller
    deferred.reject();
    
    // We have to call apply for this to work
    $scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect($scope.results).toBe(undefined);
    expect($scope.error).toBe('There has been an error!');
  });
});

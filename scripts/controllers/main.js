'use strict';

/**
 * @ngdoc function
 * @name compucorpJobProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the compucorpJobProjectApp
 */
angular.module('compucorpJobProjectApp')
  .controller('MainCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

  	$scope.findAlbums = function(artistId) {
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: 'https://api.spotify.com/v1/artists/' + artistId + '/albums'
      }).then(function(response) {
        deferred.resolve(response.data);
          $scope.albums = response.data;
          console.log(response.data);
      }, function(error) {
        deferred.reject(error);
        console.log(error);
      });
      return deferred.promise;
    };

    // search Spotify
    $scope.formSearch = function() {
      var searchedString = $scope.search.string.$viewValue;
      $scope.searched = searchedString;
      var deferred = $q.defer();
      $scope.noMore = false;
      $http({
          method: 'GET',
          url: 'https://api.spotify.com/v1/search?q=' + searchedString + '&type=artist,album&limit=50'
      }).then(function(response) {
        	deferred.resolve(response.data);
        	$scope.limit = 4;
        	$scope.results = response.data;
        	console.log(response.data);
      }, function(error) {
        deferred.reject(error);
        console.log(error);
      });
      return deferred.promise;
    };

    $scope.more = function(results) {
    	var minArtists = Math.min(results.artists.limit, results.artists.total);
    	var minAlbums = Math.min(results.albums.limit, results.albums.total);
    	if (minAlbums + minArtists >= $scope.limit + 4) {
	    	$scope.limit += 4;
    	} else {
    		$scope.noMore = true;
    	}
    }
}]);
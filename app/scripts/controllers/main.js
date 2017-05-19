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
  	var baseUrl = 'https://api.spotify.com/v1/';

  	$scope.getAlbumDetails = function(artist, itemId) {
  		if (artist) {
  			var deferred = $q.defer();
		    $http({
		        method: 'GET',
		        url: baseUrl + 'albums/' + itemId
		    }).then(function(response) {
		      deferred.resolve(response.data);
		        $scope.details = response.data;
		        console.log(response.data);
		    }, function(error) {
		      deferred.reject(error);
		      console.log(error);
		    });
		    return deferred.promise;	
	  	}
    };

  	$scope.findMore = function(type, itemId) {
    	var deferred = $q.defer();
    	console.log(type);
    	if (type == 'artists') {
    		var url = baseUrl + 'artists/' + itemId + '/albums';
    		$scope.artist = true;
    	} else {
    		var url = baseUrl + 'albums/' + itemId + '/tracks';
    		$scope.artist = false;
    	}
    	$http({
    	    method: 'GET',
    	    url: url
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
    	    url: baseUrl + 'search?q=' + searchedString + '&type=artist,album&limit=50'
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
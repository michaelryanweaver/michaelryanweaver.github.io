// Define a new module for our app
var app = angular.module("toySearch", []);

app.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchTerm){

		if(!searchTerm){
			return arr;
		}

		var result = [];

		searchTerm = searchTerm.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.name.toLowerCase().indexOf(searchTerm) !== -1){
				result.push(item);
			}

		});

		return result;
	};

});

// The controller

app.controller('ToySearchController', '$scope', '$http', function($scope, $http) {
	$http.get('data/toys.json').success(function(data) { $scope.items= data;
	}); 
});

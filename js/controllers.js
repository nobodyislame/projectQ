angular.module("app.controller",[])
	.controller('registerCtrl', ['$scope','$rootScope','$state','$timeout',function($scope, $rootScope, $state, $timeout){
		$scope.input = {};

		$scope.message = "(*) Name is required to proceed."
		$scope.error = false;
		$scope.handleData = function(){
			if($scope.input.name){
				$rootScope.name = $scope.input.name;
				$state.go('home.question1');
			}
			else{
				$scope.error = true
			}

		}

		$scope.$watch('error',function(){
			$timeout(function(){
				$scope.error = false;
			},3000);
		})

	}])
	.controller("mainCtrl", ['$scope','$state','$rootScope', 'QuestionService',function($scope, $state,$rootScope, QuestionService){

		$scope.initialize = function(){
			$scope.index = 1;
			$scope.name = $rootScope.name;

			QuestionService.get(function(data){
				$scope.questions = data;
			})
		}

		$scope.changePage = function(){
			if($scope.index < 5){
				$scope.index++;
				$state.go('home.question'+$scope.index);
			}
			else{
				$state.go('home.graph');
			}
			
		}

		$scope.initialize();
	}])

	.controller('dataCtrl',['$scope','AnswerService', 'QuestionService',function($scope, AnswerService, QuestionService){
		
		$scope.answers = AnswerService.get();
		
		QuestionService.get(function(data){
			$scope.questions = data;
			
			$scope.correct =0;
			$scope.wrong = 0;
			
			for(var i =0; i<$scope.questions.length; i++){
				if($scope.answers[i] === $scope.questions[i].correct){
					$scope.correct++;
				}
				else{
					$scope.wrong++;
				}
			}

			$scope.correct = Math.round(($scope.correct/$scope.answers.length) * 100);
			$scope.wrong = Math.round(($scope.wrong/$scope.answers.length) * 100);

			$scope.options = {
	            chart: {
	                type: 'pieChart',
	                height: 500,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: true,
	                duration: 500,
	                labelThreshold: 0.01,
	                labelSunbeamLayout: true,
	                legend: {
	                    margin: {
	                        top: 5,
	                        right: 35,
	                        bottom: 5,
	                        left: 0
	                    },
	                }
	            }
        	};

	        $scope.data = [
	            {
	                key: "Correct",
	                y: $scope.correct 
	            },
	            {
	                key: "Wrong",
	                y: $scope.wrong
	            }
	        ];
		});	
	}])

	.controller('summaryCtrl',['$scope','AnswerService','QuestionService',function($scope, AnswerService, QuestionService){
		
		$scope.entries = [];
		QuestionService.get(function(data){
			var questions = data;
			for(var i=0;i < questions.length;i++){
				var answers = AnswerService.get();
				$scope.entries.push({
					question : questions[i].statement,
					correct : questions[i].correct,
					answered : answers[i]
				});
			}
		});
			
	}]);
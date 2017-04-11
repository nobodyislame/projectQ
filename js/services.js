angular.module('app.services',[])
	.factory('AnswerService',function(){
		var answers = [];
		return {
			put : function(answer){
				answers.push(answer);
			},
			get : function(){
				return answers;
			}
		}
	})
	.factory('QuestionService', function($http){
		return{
			get : function(callback){
				$http.get("./resource/questions.json")
					.then(function(response){
						callback(response.data);
					});
			}
		}
	})
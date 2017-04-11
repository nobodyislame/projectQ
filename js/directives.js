angular.module('app.directive', [])
	.directive('myButton', function($timeout, AnswerService){
		return{
			restrict: 'E',
			replace : true,
			scope: {
				option : '=',
				change : '&'
			},
			templateUrl : 'views/buttons.html',
			link: function(scope, element, attrs){
				var el = angular.element('<div></div>');
				element.on('click',function (e) {
					var di = element[0].clientHeight < element[0].clientWidth ? element[0].clientWidth : element[0].clientHeight;
					el.addClass("circle");
					el.css('width', di+'px');
					el.css('height', di+'px');
					el.css('left', e.clientX - element[0].getBoundingClientRect().left - di/2 +'px');
					el.css('top', e.clientY - element[0].getBoundingClientRect().top - di/2 +'px');
					element.append(el);

					AnswerService.put(scope.option);
					$timeout(function(){
						scope.change();
					}, 1000);
				});
			}
		}
	});
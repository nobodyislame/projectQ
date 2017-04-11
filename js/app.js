angular.module("app",['ngAnimate',
					  'ui.router',
					  'nvd3',
					  'app.controller',
					  'app.directive',
					  'app.services'])
.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('register',{
			url:'/register',
			views : {
				'content@' :{
					templateUrl:'views/register.html',
					controller: 'registerCtrl'
				}
			}
		})

		.state('home',{
			url : '/home',
			views:{
				'content@':{
					templateUrl:"views/home.html",
					controller : 'mainCtrl'
				}
			}
			
		})

		.state('home.question1',{
			url:'/question1',
			views:{
				'details@home' :{
					templateUrl:'views/question1.html',
				}
			}
		})
		.state('home.question2',{
			url:'/question2',
			views:{
				'details@home' :{
					templateUrl:'views/question2.html',
				}
			}
		})
		.state('home.question3',{
			url:'/question3',
			views:{
				'details@home' :{
					templateUrl:'views/question3.html',
				}
			}
		})
		.state('home.question4',{
			url:'/question4',
			views:{
				'details@home' :{
					templateUrl:'views/question4.html',
				}
			}
		})
		.state('home.question5',{
			url:'/question5',
			views:{
				'details@home' :{
					templateUrl:'views/question5.html',
				}
			}
		})
		.state('home.graph',{
			url:'/graph',
			views:{
				'details@home' : {
					templateUrl:'views/graph.html',
					controller :'dataCtrl'
				}
			}
			
		})
		.state('home.summary',{
			url:'/summary',
			views:{
				'details@home' : {
					templateUrl:'views/summary.html',
					controller :'summaryCtrl'
				}
			}
		});

	$urlRouterProvider.otherwise('/register');
})
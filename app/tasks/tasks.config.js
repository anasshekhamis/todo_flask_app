(function () {
	"use strict";

	angular
		.module('app.tasks')
		.config(['$stateProvider', config]);

	function config($stateProvider) {
		$stateProvider
			.state('tasks', {
				url: '/tasks',
				views: {
					'content': {
						templateUrl: 'app/tasks/tasks.html',
                        controller: 'TasksController',
						controllerAs: 'vm',
						resolve: {
							initData: ['dataService', function (dataService) {
								return dataService.getTasks();
							}]
						}
					}
				}
			})
			.state('task-details', {
				url: '/task/:id',
				views: {
					'content': {
						templateUrl: 'app/tasks/task-details.html',
						controller: 'TaskDetailsController',
						controllerAs: 'vm',
						resolve: {
							initData: ['dataService', '$stateParams', function (dataService, $stateParams) {
								return dataService.getTaskDetails($stateParams.id);
						}]
						}
					}
				}
			});
	}

}());
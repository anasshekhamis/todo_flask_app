(function () {
	"use strict";

	angular
		.module('app.core')
		.factory('dataService', dataService);

	dataService.$inject = ['__env', '$http'];

	function dataService(__env, $http) {
		
		return {
			getTasks: getTasks,
			getTaskDetails: getTaskDetails,
            createTask: createTask,
            deleteTask: deleteTask,
            updateTask: updateTask
		};

		///////////////////////////
		
		function getTasks() {			
			return $http({
				method: 'GET',
				url: __env.apiUrl + 'tasks/'
			})
				.then(getTasksComplete, getTasksError)
				.catch(getTasksError);

            function getTasksComplete(response) {
                console.log(response);
				return response.data;
			}

            function getTasksError(error) {
				console.error('XHR Failed for getTasks:', error.data);
			}
		}

		function getTaskDetails(id) {
			return $http({
				method: 'GET',
				url: __env.apiUrl + 'tasks/' + id + '/'
			})
				.then(getTaskDetailsComplete, getTaskDetailsError)
				.catch(getTaskDetailsError);

			function getTaskDetailsComplete(response) {
				return response.data;
			}

			function getTaskDetailsError(error) {
				console.error('XHR Failed for getTaskDetails:', error.data);
			}
		}
        
        function createTask(task) {
            return $http({
                method: 'POST',
                url: __env.apiUrl + 'tasks/',
                data: task
            })
                .then(createTaskComplete, createTaskError)
                .catch(createTaskError);

            function createTaskComplete(response) {
                return response.data.success;
            }

            function createTaskError(error) {
                console.error('XHR Failed for createTask:', error.data);
            }
        }
        
        function deleteTask(id) {
            return $http({
                method: 'DELETE',
                url: __env.apiUrl + 'tasks/' + id + '/'
            })
                .then(deleteTaskComplete, deleteTaskError)
                .catch(deleteTaskError);

            function deleteTaskComplete(response) {
                return response.data.success;
            }

            function deleteTaskError(error) {
                console.error('XHR Failed for deleteTask:', error.data);
            }
        }
        
        function updateTask(task, id) {
            return $http({
                method: 'PUT',
                url: __env.apiUrl + 'tasks/' + id + '/',
                data: task
            })
                .then(updateTaskComplete, updateTaskError)
                .catch(updateTaskError);

            function updateTaskComplete(response) {
                return response.data.success;
            }

            function updateTaskError(error) {
                console.error('XHR Failed for updateTask:', error.data);
            }
        }
        
        
	}
}());
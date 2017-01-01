(function () {
	"use strict";

	angular
		.module('app.tasks')
        .controller('TasksController', TasksController);

	// Inject
    TasksController.$inject = ['initData', 'dataService', '$state', '$timeout'];

    function TasksController(initData, dataService, $state, $timeout) {
		var vm = this;

		vm.tasks = [];
        vm.createTask = {};
        vm.submitNewTask = submitNewTask;
        
        vm.deleteTask = {};
        vm.assignDeleteTask = assignDeleteTask;
        vm.submitDeleteTask = submitDeleteTask;
        
        vm.editTask = {};
        vm.assignEditTask = assignEditTask;
        vm.submitEditTask = submitEditTask;
        
        vm.markIt = markIt;
        
        vm.reloadState = reloadState;
        
		init();

		/////////////////////////////

		function init() {
            vm.tasks = initData.tasks;
		}
        
        function assignDeleteTask(task) {
            vm.deleteTask = task;
        }
        
        function assignEditTask(task) {
            vm.editTask = task;
        }
        
        function reloadState() {
            $timeout(function () {
                $state.reload();
            }, 500);
        }
        
        function submitNewTask(isValid) {
            if (isValid) {
                var task = prepareTaskObj();
                dataService.createTask(task).then(onComplete);
            }
            
            // Private
            function prepareTaskObj() {
                return {
                    title: vm.createTask.title
                }
            }
            
            // Success
            function onComplete(response) {
                if (response == true) {
                    alert('Task has been added successfully!');
                } else {
                    alert('Could not add task!');
                }
            }
        }
        
        function submitDeleteTask() {
            dataService.deleteTask(vm.deleteTask.id).then(onComplete);

            // Success
            function onComplete(response) {
                if (response == true) {
                    alert('Task has been added deleted successfully!');
                    jQuery('#deleteModal').modal('hide');
                    reloadState();
                } else {
                    alert('Could not delete task!');
                }
            }
        }
        
        function submitEditTask(isValid) {
            if (isValid) {
                var task = prepareTaskObj();
                dataService.updateTask(task, vm.editTask.id).then(onComplete);
            }

            // Private
            function prepareTaskObj() {
                return {
                    title: vm.editTask.title,
                    active: vm.editTask.active
                }
            }

            // Success
            function onComplete(response) {
                if (response == true) {
                    alert('Task has been updated successfully!');
                } else {
                    alert('Could not update task!');
                }
            }
        }
        
        function markIt(t, mark) {
            var task = prepareTaskObj();
            dataService.updateTask(task, t.id).then(onComplete);

            // Private
            function prepareTaskObj() {
                var preTask = {
                    title: t.title,
                    active: true
                }
                
                if (mark == 'done') {
                    preTask.active = false;
                }
                
                return preTask;
            }

            // Success
            function onComplete(response) {
                if (response == true) {
                    alert('Task has been marked done');
                    reloadState();
                } else {
                    alert('Could not mark task as done!');
                }
            }
            
        }
        
	}
}());
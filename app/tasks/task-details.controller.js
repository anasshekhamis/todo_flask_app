(function () {
	"use strict";

	angular
		.module('app.tasks')
		.controller('TaskDetailsController', TaskDetailsController);

	// Inject
	TaskDetailsController.$inject = ['initData'];

	function TaskDetailsController(initData) {
		var vm = this;

		vm.taskDetails = {};

		init();

		/////////////////////////////

		function init() {
			vm.taskDetails = initData;
		}

	}
}());
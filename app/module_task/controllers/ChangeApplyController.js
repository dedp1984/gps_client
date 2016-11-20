'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ChangeApplyController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService) {
        $scope.initChangeApply = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.changeReasonList = SysDictService.queryDictDataByTypeCode("bgyy").$object;
            $scope.changeApplyInfoVo ={};
            //$scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        $scope.commitChangeApplyInfoTask = function(){
            TaskService.commitChangeApplyInfoTask($scope.changeApplyInfoVo,$stateParams.businessKey,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交变更申请任务成功')
            })
        };
        $scope.initApproveChangeApply = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.changeReasonList = SysDictService.queryDictDataByTypeCode("bgyy").$object;
            $scope.changeApplyInfoVo = TaskService.queryLatestChangeApplyInfo($stateParams.taskId).$object;
            $scope.approveResultList =  SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        $scope.commitApproveChangeApplyInfoTask = function(){
            TaskService.commitApproveChangeApplyInfoTask($scope.changeApplyInfoVo,$stateParams.businessKey,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交审核变更申请任务成功')
            })
        };
        $scope.initCancelApplyInfoTask = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.cancelReasonList = SysDictService.queryDictDataByTypeCode("qxsqyy").$object;
            $scope.cancelApplyInfoVo ={};
        };
        $scope.commitCancelApplyInfoTask = function(){
            TaskService.commitCancelApplyInfoTask($scope.cancelApplyInfoVo,$stateParams.businessKey,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交取消申请任务成功')
            })
        }
        $scope.initApproveCancelApply = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.cancelReasonList = SysDictService.queryDictDataByTypeCode("qxsqyy").$object;
            $scope.cancelApplyInfoVo = TaskService.queryLatestCancelApplyInfo($stateParams.taskId).$object;
            $scope.approveResultList =  SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        $scope.commitApproveCancelApplyInfoTask = function(){
            TaskService.commitApproveCancelApplyInfoTask($scope.cancelApplyInfoVo,$stateParams.businessKey,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交审核取消申请任务成功')
            })
        };
    })
;
'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('AssigneeController',function ($scope, $rootScope, $state,$stateParams,modal, toaster, $uibModal,TaskService,SysDictService) {
        $scope.queryToAssigneeList = function(){
            $scope.toDoTaskList = TaskService.queryToDoTaskList('0').$object;
        };
        $scope.checkAll = function(){
            angular.forEach($scope.toDoTaskList,function(item){
                item.checked = $scope.selectAllStatus;
            })
        };
        $scope.selectAssigneeList = function(){
            var selTask=[];
            angular.forEach($scope.toDoTaskList,function(item){
                if(item.checked == true){
                    selTask.push(item);
                }
            });
            if(selTask.length==0){
                modal.info("操作提醒","请选择至少一个任务");
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_task/tpl/dialog-selectassignee.html',
                controller:function($scope,RestApi,modal,TaskService){
                    $scope.accounts = TaskService.queryCheckWorkgroupOnlineAcct().$object;
                    $scope.checkAll = function(){
                        angular.forEach($scope.accounts,function(item){
                            item.checked = $scope.selectAllStatus;
                        })
                    };
                    $scope.ok=function(){
                        var setAccounts=[];
                        angular.forEach($scope.accounts,function(item){
                            if(item.checked == true){
                                setAccounts.push(item);
                            }
                        });
                        if(setAccounts.length==0){
                            modal.info("操作提醒","请选择至少一个用户");
                            return;
                        }

                        modalInstance.close(setAccounts);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                if(selTask.length<response.length){
                    modal.info("操作提醒","任务数量小于分配用户数");
                }
                var selAccounts = [];
                angular.forEach(response,function(item){
                    selAccounts.push(item.accountId);
                })
                TaskService.doCheckBatchAssigneeTask(selTask,selAccounts).then(function(response){
                    toaster.pop('success', '操作提醒', "分单成功");
                })
            })
        }
    })
;
angular.module('pu.settle.services')
    .service("SettleService",function($window,RestApi,$uibModal,toaster) {
        this.getAllSettleFeeItem = function (appId, settleEffectDate) {
            return RestApi.one("/settle/getAllSettleFeeItem", appId).get({'settleEffectDate': settleEffectDate});
        };
        this.commitApplySettleTask = function (appId, settleType, params) {
            return RestApi.all("/settle/commitApplySettleTask").all(appId).all(settleType).post(params);
        };
        this.getApplySettleInfo = function (id) {
            return RestApi.one("/settle/getApplySettleInfo", id).get();
        };
        this.commitApproveSettleTask = function (taskId, params) {
            return RestApi.all("/settle/commitApproveSettleTask").all(taskId).post(params);
        };
        this.getApplySettleTaskList = function (settleType) {
            return RestApi.all("/settle/getApplySettleTaskList").getList({"settleType":settleType});
        };
        this.commitApplyConfirmSettleTask = function(taskId,params){
            return RestApi.all("/settle/commitApplyConfirmSettleTask").all(taskId).post(params);
        }
        this.addSettleApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_settle/tpl/dialog-settle-add.html',
                controller: function ($scope, RestApi, SettleService, ToolsService, modal, LoanQueryService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    LoanQueryService.getAfterCurrentPeriodRemainPeroidList($scope.appId).then(function (response) {
                        $scope.applyVo.beginPeriod = response[0];
                        $scope.applyVo.endPeriod = response[response.length - 1];
                    })
                    $scope.$watch('applyVo.applyEffectDate', function (newVal, oldVal) {
                        if (newVal == oldVal || newVal == undefined)
                            return;
                        SettleService.getAllSettleFeeItem($scope.appId, $scope.applyVo.applyEffectDate).then(function (response) {
                            $scope.applyVo.feeItem = response;
                        })
                        $scope.ok = function () {
                            modal.confirm("操作提醒", "确认提交申请").then(function () {
                                SettleService.commitApplySettleTask($scope.appId, 'jqlx01', $scope.applyVo).then(function () {
                                    modalInstance.close();
                                })
                            })
                        };
                        $scope.cancel = function () {
                            modalInstance.dismiss('cancel');
                        };
                    });
                    modalInstance.result.then(function (response) {
                        toaster.pop('success', '操作提醒', "提交任务成功");
                    })
                }
            });
        }
    });
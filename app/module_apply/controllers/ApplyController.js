'use strict';

/* Controllers */
// signin controllers
angular.module("pu.apply.controllers")
    .controller('ApplyController',function ($scope, $rootScope, $state, toaster, $uibModal,
                                            SysDictService,ProductService,CarService) {
        $scope.initApplyAdd = function () {
            //申请信息
            $scope.applyInfo = {};
            $scope.applyInfo.finances = [{seq:1,select:true},{seq:2,select:true},{seq:3,select:false}];
            $scope.initSelectList();
        };
        $scope.initSelectList = function(){
            //可选产品
            $scope.productList = ProductService.queryBranchEnableProductList().$object;
            //可选还款方式可选项
            $scope.repayModeList  = SysDictService.queryDictDataByTypeCode('hkfs').$object;
            //证件类型可选项
            $scope.idTypeList  = SysDictService.queryDictDataByTypeCode("zjlx").$object;
            //性别可选性
            $scope.sexList = SysDictService.queryDictDataByTypeCode("xb").$object;
            //学历可选项
            $scope.educationList = SysDictService.queryDictDataByTypeCode("xl").$object;
            //婚姻状况可选项
            $scope.marryStatusList = SysDictService.queryDictDataByTypeCode("hyzk").$object;
            //住所权属可选项
            $scope.houseOwnerList = SysDictService.queryDictDataByTypeCode("zsqs").$object;
            //同住人可选项
            $scope.houseMateList = SysDictService.queryDictDataByTypeCode("tzr").$object;
            //户籍所属可选项
            $scope.houseHoldList = SysDictService.queryDictDataByTypeCode("hjss").$object;
            //家庭成员可选项
            $scope.familyMemberList = SysDictService.queryDictDataByTypeCode("jtcy").$object;
            //来本地时长可选项
            $scope.liveTimeList = SysDictService.queryDictDataByTypeCode("lbdsc").$object;
            //房产状态可选项
            $scope.houseStatusList = SysDictService.queryDictDataByTypeCode("fczt").$object;
            //车产状态可选项
            $scope.carStatusList = SysDictService.queryDictDataByTypeCode("cczt").$object;
            //单位类型可选项
            $scope.unitTypeList = SysDictService.queryDictDataByTypeCode("dwlx").$object;
            //行业可选项
            $scope.unitIndustryList =SysDictService.queryDictDataByTypeCode("hy").$object;
            //职位级别可选项
            $scope.rankList = SysDictService.queryDictDataByTypeCode("zwjb").$object;
            //与本人关系可选项
            $scope.relateList = SysDictService.queryDictDataByTypeCode("gx").$object;
            //是否知道购车可选项
            $scope.isKnowBuyCarList = SysDictService.queryDictDataByTypeCode("sfzdgc").$object;
        }
        $scope.selectCar = function(item){
            CarService.selectCar(item).then(function(response){
                item.carStyle={};
                angular.copy(response,item.carStyle);
            });
        };
        $scope.onIsFinanceGpsClick = function(item){

        }
    })
;
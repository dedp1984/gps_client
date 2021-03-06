/**
 * Created by dengpan on 2016/9/27
 * 实现多选下拉框功能
 * 参数
 * choices 可选下拉框列表 数组
 * seperator 当modelFormat为字符串时按照seperator分割，默认为‘,’
 * trackBy model值与choices按照指定域进行匹配
 * showField 当选择下拉框后在文本框显示字段
 * modelFormat 模型类型string或array
 * ngRequired 是否必须
 * ngDisabled 是否禁用.
 */
angular.module('pu.utils.directives')
    .directive('uiMultiselect',function(){
        return {
            restrict:'E',
            require:'?^ngModel',
            scope:{
                choices:'=',
                seperator:'@',
                trackBy:'@',
                showField:'@',
                modelFormat:'@',
                ngRequired:'=',
                ngDisabled:'=',
                placeholder:'@',
                groupBy:'@',
                onItemClick:'='
            },
            transclude:true,
            templateUrl:'module_utils/tpl/ui-multiselect.html',
            link:function($scope,element,attrs,ngModelCtrl){
                if(!ngModelCtrl){
                    return;
                }
                /*
                if(!angular.isArray($scope.choices)){
                    console.error("choices属性必须为列表格式");
                    return;
                }*/
                if($scope.showField == undefined){
                    console.error("未设置showField属性");
                    return;
                }
                if($scope.seperator == undefined){
                    $scope.seperator=',';
                }
                if($scope.trackBy == undefined){
                    $scope.trackBy='id';
                }
                $scope.choicesItems=[];
                ngModelCtrl.$formatters.push(function(modelValue){
                    $scope.convertModelValue(modelValue);
                    return modelValue;
                });
                //对模型值进行转换操作
                $scope.convertModelValue = function(modelValue){
                    if(modelValue==undefined)
                        return;
                    var modelValArray=[];
                    if(angular.isArray($scope.choicesItems) && $scope.choicesItems.length>0){
                        if($scope.modelFormat=='string'){
                            if($scope.seperator!=undefined){
                                modelValArray = modelValue.split($scope.seperator);
                            }else{
                                modelValArray = modelValue.split(",");
                            };

                        }else{
                            modelValArray = modelValue;
                        }
                        if(!$scope.trackBy){
                            $scope.trackBy='id';
                        };
                        if(modelValArray == undefined)
                            return;
                        for(var i  = 0 ;i<modelValArray.length;i++){
                            for(var j = 0 ;j<$scope.choicesItems.length;j++){
                                if(angular.isString(modelValArray[i])){
                                    if($scope.choicesItems[j][$scope.trackBy]==modelValArray[i]){
                                        $scope.choicesItems[j].checked=true;
                                    }
                                }else if(angular.isObject(modelValArray[i])){
                                    if($scope.choicesItems[j][$scope.trackBy]==modelValArray[i][$scope.trackBy]){
                                        $scope.choicesItems[j].checked=true;
                                    }
                                }
                            }
                        };
                        if($scope.groupBy != undefined){
                            $scope.groupList = [];
                            for(var i = 0 ;i<$scope.choicesItems.length;i++){
                                var item = $scope.choicesItems[i];
                                var findFlag = false;
                                for(var j = 0 ; j<$scope.groupList.length;j++){
                                    var groupItem = $scope.groupList[j];
                                    //如果在组中找到了则加入当前节点INDEX至groupItem中
                                    if(item[$scope.groupBy]==groupItem.key){
                                        groupItem.child.push(item);
                                        findFlag = true;
                                        break;
                                    }
                                }
                                if(findFlag==false){
                                    var obj = {'key':item[$scope.groupBy],child:[]};
                                    obj.child.push(item);
                                    $scope.groupList.push(obj);
                                }

                            }
                            console.log($scope.groupList);
                        }
                        $scope.setViewValue();

                    }
                }
                $scope.onCheck = function(item){
                    item.checked = !item.checked;
                    $scope.setViewValue();
                    $scope.setModelValue();
                    if($scope.onItemClick!=undefined){
                        $scope.onItemClick(item);
                    }
                };
                $scope.setModelValue = function(){
                    if($scope.modelFormat =="string"){
                        var newModelValue="";
                        angular.forEach($scope.choicesItems,function(item){
                            if(item.checked==true){
                                newModelValue+=item[$scope.trackBy]+$scope.seperator;
                            }
                        });
                        if(newModelValue.length>0){
                            newModelValue = newModelValue.substring(0,newModelValue.length-1);
                        }
                        ngModelCtrl.$setViewValue(newModelValue);
                    }else{
                        var modelList =[];
                        angular.forEach($scope.choicesItems,function(item){
                            if(item.checked==true){
                                modelList.push(item);
                            }
                        });
                        ngModelCtrl.$setViewValue(modelList);
                    }
                }
                $scope.setViewValue = function(){
                    var viewValue="";
                    angular.forEach($scope.choicesItems,function(item){
                        if(item.checked==true){
                            viewValue+=item[$scope.showField]+",";
                        }
                    });
                    if(viewValue.length>0)
                        viewValue = viewValue.substring(0,viewValue.length-1);
                    $scope.selectedViewValue = viewValue;
                }
                var watchChoices = $scope.$watch('choices',function(newVal,oldVal){
                    if(newVal==undefined || newVal.length==0){
                        return;
                    };

                    angular.copy($scope.choices,$scope.choicesItems);
                    angular.forEach($scope.choicesItems,function(item){
                        item.checked=false;
                    })
                    $scope.convertModelValue(ngModelCtrl.$modelValue);
                    watchChoices();
                },true)
            }

        }
    })
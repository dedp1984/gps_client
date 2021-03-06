'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //申请单录入
                .state('app.apply', {
                    url: '/apply',
                    abstract: true,
                    template:'<div ui-view=""></div>'
                })
                .state('app.apply.list',{
                    url:'/list',
                    templateUrl:'module_apply/tpl/apply-list.html',
                    controller:'ApplyController'
                })
                //新增申请单
                .state('app.apply.add',{
                    url:'/add',
                    templateUrl:'module_apply/tpl/apply-add.html',
                    controller:'ApplyController'
                })
                //编辑申请单
                .state('app.apply.edit',{
                    url:'/edit/:appId',
                    templateUrl:'module_apply/tpl/apply-edit.html',
                    controller:'ApplyController'
                })


        }
    ]
);
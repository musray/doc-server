'use strict';
angular.module('docApp')
    .directive('stkMainOptionsPanel', function() {
        return {
          templateUrl: './client/views/templates/main-options-panel.html',
          restrict: 'E',
          scope: {},
            link: function ($scope) {

                var FirmsysDocModel = {
                  'IED': [
                    'FD',
                    '接线图',
                    '设备清单'
                  ],
                  'CIN': ['default'],
                  '光盘送测单': ['default'],
                  '文件发布': ['default']
                };

                var MELTACDocModel = {
                  'IED': [
                     'BDSD',
                     'IO List',
                     'Software Diagram',
                     'Wiring Diagram(IF)'
                  ],
                  'CIN': ['default'],
                  '光盘送测单': ['default'],
                  '文件发布': ['default']
                };

                var GeneralDocModel = {
                  '流程规范': ['default'],
                  '文件发布': ['项目文件发布', '组级文件发布']
                };

                $scope.selectedOption = {
                  project: ''
                };

                $scope.projects = [
                  'CPR1000',
                  'YJ56',
                  'HYH34',
                  'TW56',
                  'FCG34',
                  '组级文件'
                ];
                $scope.docTypes = [
                  'IED',
                  'CIN',
                  '光盘送测单',
                  '流程规范',
                  '文件发布'
                ];
                $scope.subDocTypes = {
                    'CPR1000': MELTACDocModel,
                    'YJ56':    FirmsysDocModel,
                    'HYH56':   FirmsysDocModel,
                    'TW56':    FirmsysDocModel,
                    'FCG34':   FirmsysDocModel,
                    '组级文件':   GeneralDocModel,
                };
            }
        }
    })

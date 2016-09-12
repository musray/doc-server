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

                var selectedOption = {
                  project: ''
                };

                $scope.mainOptions = [
                  {
                    project: 'CPR1000',
                    categories: MELTACDocModel
                  },
                  {
                    project: 'YJ34',
                    categories: FirmsysDocModel
                  },
                  {
                    project: 'HYH56',
                    categories: FirmsysDocModel
                  },
                  {
                    project: 'TW56',
                    categories: FirmsysDocModel
                  },
                  {
                    project: 'FCG34',
                    categories: FirmsysDocModel
                  }
            ]
            }
        }
    })

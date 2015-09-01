'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.AttributeCategory
 * @description
 * # AttributeCategory
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('AttributeCategory', ['dbService', function (dbService) {
    // Service logic

    // Public API here
    return [
      {
        Id: 1,
        Label: 'Size',
        Attributes: [
          {Id: 1, Label: 'S'},
          {Id: 2, Label: 'M'},
          {Id: 3, Label: 'L'},
          {Id: 4, Label: 'XL'},
          {Id: 5, Label: '21'},
          {Id: 6, Label: '22'},
          {Id: 7, Label: '23'},
          {Id: 8, Label: '24'},
          {Id: 9, Label: '25'},
          {Id: 10, Label: '26'},
          {Id: 11, Label: '27'},
          {Id: 12, Label: '28'},
          {Id: 13, Label: '29'},
          {Id: 14, Label: '30'},
          {Id: 15, Label: '31'},
          {Id: 16, Label: '32'},
          {Id: 17, Label: '33'},
          {Id: 18, Label: '34'},
          {Id: 19, Label: '35'}
        ]
      },
      {
        Id: 2,
        Label: 'Color',
        Attributes: [
          {Id: 20, Label: 'Blue'},
          {Id: 21, Label: 'Red'},
          {Id: 22, Label: 'Violet'},
          {Id: 23, Label: 'Yellow'},
          {Id: 24, Label: 'Brown'},
          {Id: 25, Label: 'Black'},
          {Id: 26, Label: 'White'},
          {Id: 27, Label: 'Green'},
          {Id: 28, Label: 'Orange'}
        ]
      }
    ];


  }]);

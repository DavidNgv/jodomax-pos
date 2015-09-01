'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.AttributeGroup
 * @description
 * # AttributeGroup
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('AttributeGroup', ['dbService', '$q', function (dbService, $q) {
    // Service logic

    // Public API here
    return {
      getAll: function () {
        var deferred = $q.defer();
        var db = dbService.getDb();

        db.AttributeGroup.toArray(function(ags){
          var attributeGroup = _.map(ags, function(el){
            return el.initData;
          });

          async.map(attributeGroup, function(el, cb){
            var groupId = el.Id;
            //console.log(groupId);
            db.Attribute.filter(function (item) {
              return (item.FK_group==this.groupId);
            }, {groupId: groupId}).toArray(function(items){
              el.Attributes = _.map(items, function(it){
                return it.initData;
              });
              cb(null, el);
            });
          }, function(err, results){
            deferred.resolve(results);
          });
        });

        return deferred.promise;
      }
    };
  }]);

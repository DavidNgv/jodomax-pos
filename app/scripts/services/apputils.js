'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.AppUtils
 * @description
 * # AppUtils
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('AppUtils', function () {
    // Service logic
    // ...
    var
      __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) {
        for (var key in parent) {
          if (__hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      };

    var AppUtils = {
      deserializeAttribute: function (val) {
        if (val==undefined || val=='') return [];

        var res = val.split(',');

        res = _.map(res, function(el){
          var el_array = el.split(':');
          if (el_array.length>1) {
            var id = el_array[0];
            var attr_str = el_array[1];
            var attr_id = attr_str.split(';');
            return {
              Id: id,
              AttributeId: attr_id
            };
          } else {
            return {
              Id: el,
              AttributeId: []
            };
          }
        });

        return res;
      },

      serializeAttribute : function(itemAttributeCategory) {
        var selected = 'Selected';
        var res = _.reduce(itemAttributeCategory, function(start_val, el){
          if (el[selected]) {
            var el_attributes = _.reduce(el.Attributes, function(holder, el_attr){
              if(el_attr[selected]){
                return  (holder=='' ? el_attr.Id : holder + ';' + el_attr.Id);
              } else {
                return holder;
              }
            }, '');
            var el_res = el.Id + ':' + el_attributes;
            return (start_val=='' ? el_res : start_val + ',' + el_res);
          } else {
            return start_val;
          }
        },'');
        return res;
      },

      extend : function(child, parent) {
        return __extends(child, parent)
      },

      reduceAttribute: function(attributes, reduceArray) {
        var res = _.reduce(attributes, function(startAttr, el) {
          var foundAc = _.find(reduceArray, function(ac) {
            return (ac.Id==el.Id);
          });

          el.Attributes = _.reduce(el.Attributes, function(startElAttr, elAttr){
            if (foundAc!=undefined) {
              var foundAttr = _.find(foundAc.AttributeId, function(attr_id){
                return (elAttr.Id==attr_id);
              });

              if (foundAttr!=undefined) {
                startElAttr.push(elAttr);
              }
            }
            return startElAttr;
          }, []);

          if (foundAc!=undefined) {
            startAttr.push(el);
          }

          return startAttr;
        }, []);

        return res;
      },

      mapAttribute: function(attributes, mapArray, selected) {
        var res = _.map(attributes, function(el) {
          var el_id = el.Id;

          var foundAc = _.find(mapArray, function(ac) {
            return (ac.Id==el_id);
          });

          el[selected] = (foundAc!=undefined);

          var attributes = el.Attributes;
          el.Attributes = _.map(attributes, function(elAttr){
            if (foundAc!=undefined) {
              var foundAttr = _.find(foundAc.AttributeId, function(attr_id){
                return (elAttr.Id==attr_id);
              });
              elAttr[selected] = (foundAttr!=undefined);
            } else {
              elAttr[selected] = false;
            }

            return elAttr;
          });

          return el;
        });

        return res;
      },

      formatMoney : function(n, c, d, t){
        var //n = this,
          c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
          j = i.length;
          j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
      }

    };

    // Public API here
    return AppUtils;
  });


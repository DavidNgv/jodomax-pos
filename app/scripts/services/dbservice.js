'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.dbService
 * @description
 * # dbService
 * Service in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .service('dbService', ['$q', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var globalJodomaxDB;

    // Promise-based API
    return {
      dbDef : function() {
        window.$data.Entity.extend('Attribute', {
          Id: { type: 'int', key: true, computed: true },
          Label: { type: String, required: true, maxLength: 20 },
          //AttributeGroup: { type: 'AttributeGroup', inverseProperty: 'Attributes' }
          FK_group: { type: 'int'}
        });

        window.$data.Entity.extend('AttributeGroup', {
          Id: { type: 'int', key: true, computed: true },
          Label: { type: String, required: true, maxLength: 20 }
          //Attributes: {type: Array, elementType: window.Attribute, inverseProperty: 'AttributeGroup' }
        });

        window.$data.Entity.extend('User', {
          Id: { type: 'int', key: true, computed: true },
          UserName: { type: String, required: true, maxLength: 48 },
          FullName: { type: String, required: true, maxLength: 48 },
          Password: { type: String, required: true, maxLength: 48 },
          FK_group: { type: 'int'}
        });

        window.$data.Entity.extend('UserGroup', {
          Id: { type: 'int', key: true, computed: true },
          Label: { type: String, required: true, maxLength: 32 }
        });

        window.$data.Entity.extend('Discount', {
          Id: { type: 'int', key: true, computed: true },
          Label: { type: String, required: true, maxLength: 20 },
          Percent: { type: Number, required: true}
        });

        window.$data.Entity.extend('Product', {
          Id: { type: 'int', key: true, computed: true },
          Code: { type: String, required: true, maxLength: 10 },
          Title: { type: String, required: true, maxLength: 100 },
          Price: { type: Number, required: true},
          //Category: { type: 'Category', inverseProperty: 'Products' },
          FK_category: { type: 'int'},
          FK_discount: { type: 'int'},
          Attributes: { type: String, maxLength: 100 },
          Image: { type: String, maxLength: 128 }
        });

        window.$data.Entity.extend('Category', {
          Id: { type: 'int', key: true, computed: true },
          Label: { type: String, required: true, maxLength: 100 },
          //Products: {type: Array, elementType: window.Product, inverseProperty: 'Category' },
          Attributes: { type: String, required: true, maxLength: 100 }
        });

        window.$data.Entity.extend('SalesDetail', {
          Id: { type: 'int', key: true, computed: true },
          FK_sales: { type: 'int', required: true},
          FK_product: { type: 'int', required: true},
          Code: { type: String, required: true, maxLength: 10 },
          Title: { type: String, required: true, maxLength: 100 },
          Price: { type: Number, required: true},
          Disc: { type: Number, required: true},
          Qty: { type: Number, required: true},
          Attributes: { type: String, maxLength: 100 }
        });

        window.$data.Entity.extend('StockInDetail', {
          Id: { type: 'int', key: true, computed: true },
          FK_stockin: { type: 'int', required: true},
          FK_product: { type: 'int', required: true},
          Code: { type: String, required: true, maxLength: 10 },
          Title: { type: String, required: true, maxLength: 100 },
          Price: { type: Number, required: true},
          Disc: { type: Number, required: true},
          Qty: { type: Number, required: true},
          Attributes: { type: String, required: true, maxLength: 100 }
        });

        window.$data.Entity.extend('Sales', {
          Id: { type: 'int', key: true, computed: true },
          FK_user: { type: 'int'},
          FK_store: { type: 'int'},
          FK_customer: { type: 'int'},
          discPercent: { type: Number},
          discAmount: { type: Number},
          paymentCash: { type: Number},
          paymentCreditCard: { type: Number},
          paymentAdvanceCash: { type: Number},
          paymentAdvanceCreditCard: { type: Number},
          salesDate: { type: Date, required: true}
        });

        window.$data.Entity.extend('StockIn', {
          Id: { type: 'int', key: true, computed: true },
          FK_user: { type: 'int'},
          FK_supplier: { type: 'int'},
          FK_store: { type: 'int'},
          totalAmount: { type: Number},
          inDate: { type: Date, required: true}
        });

        window.$data.Entity.extend('Customer', {
          Id: { type: 'int', key: true, computed: true },
          Name: { type: String, required: true, maxLength: 50 },
          Mobile: { type: String, required: true, maxLength: 30 }
        });

        window.$data.Entity.extend('Supplier', {
          Id: { type: 'int', key: true, computed: true },
          Name: { type: String, required: true, maxLength: 50 },
          Mobile: { type: String, required: true, maxLength: 30 }
        });

        window.$data.Entity.extend('Store', {
          Id: { type: 'int', key: true, computed: true },
          Label: { type: String, required: true, maxLength: 50 },
          IsSales: { type: Boolean, required: true},
          IsStockIn: { type: Boolean, required: true}
        });

        window.$data.EntityContext.extend('JodomaxDatabase', {
          Category: { type: window.$data.EntitySet, elementType: window.Category },
          Product: { type: window.$data.EntitySet, elementType: window.Product },
          Attribute: { type: window.$data.EntitySet, elementType: window.Attribute },
          AttributeGroup: { type: window.$data.EntitySet, elementType: window.AttributeGroup },
          UserGroup: { type: window.$data.EntitySet, elementType: window.UserGroup },
          User: { type: window.$data.EntitySet, elementType: window.User },
          Discount: { type: window.$data.EntitySet, elementType: window.Discount },
          Sales: { type: window.$data.EntitySet, elementType: window.Sales },
          SalesDetail: { type: window.$data.EntitySet, elementType: window.SalesDetail },
          StockIn: { type: window.$data.EntitySet, elementType: window.StockIn },
          StockInDetail: { type: window.$data.EntitySet, elementType: window.StockInDetail },
          Customer: { type: window.$data.EntitySet, elementType: window.Customer },
          Supplier: { type: window.$data.EntitySet, elementType: window.Supplier },
          Store: { type: window.$data.EntitySet, elementType: window.Store }
        });
      },

      dbInit: function() {
        var deferred = $q.defer();

        globalJodomaxDB = new window.JodomaxDatabase('Jodomax');
        globalJodomaxDB.onReady(function() {
          console.log('db ready to use');
          deferred.resolve(globalJodomaxDB);
        });

        return deferred.promise;
      },

      getDb: function() {
        return globalJodomaxDB;
      },

      find: function(tableName, id, cb) {
        var _db = this.getDb();
        var _table = _db[tableName];
        _table.find(id).then(function(item){
          cb(item);
        });
      }
    };
}]);

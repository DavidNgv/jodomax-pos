'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.StockInModel
 * @description
 * # StockInModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('StockInModel', [
    'AppUtils',
    'BaseModel',
    'StockInDetailListModel',
    'dbService',
    function (
      AppUtils,
      BaseModel,
      StockInDetailListModel,
      dbService
    ) {
    // Service logic

    var StockInModel = (function(superClass) {
      AppUtils.extend(StockInModel, superClass);

      function StockInModel() {
        return StockInModel.__super__.constructor.apply(this, arguments);
      }

      StockInModel.tableName = 'StockIn';

      StockInModel.prototype.afterExtendData = function() {
        this.stockInDetailList = new StockInDetailListModel();
      };

      StockInModel.prototype.beforeSave = function() {
        this.saveData.inDate = new Date();
      };

      StockInModel.prototype.calculateBill = function(callback) {
        var stockInDetailList = this.stockInDetailList.itemList;

        var summary = {
          totalAmount: 0
        };

        summary = _.reduce(stockInDetailList, function(sum, el){
          sum.totalAmount += el.getAmount();

          return sum;
        }, summary);

        this.totalAmount = summary.totalAmount;
      };

      StockInModel.prototype.fetchDetail = function($scope){
        var _this = this;
        var stockInId = this.Id;

        var filterFn = function(item){
          return (item.FK_stockin == this.stockInId);
        };

        var filterData = {
          stockInId: stockInId
        };


        this.stockInDetailList.fetchList($scope, filterFn, filterData, function(){
          _this.calculateBill();
        });

      };

      StockInModel.prototype.getTotalAmount = function() {
        return AppUtils.formatMoney(this.totalAmount, 0, ',', '.');
      };

      StockInModel.prototype.saveStockIn = function(callback) {
        var _this = this;
        _this.save(function(isNew, item){
          if (isNew) {
            var newId = item.Id;

            _this.stockInDetailList.saveList(newId, function(err, results){
              console.log('Save new StockIn done !');
              callback();
            });
          } else {
            console.log('Save edited StockIn done !');
            callback();
          }
        });
      };

      StockInModel.prototype.genTable = function() {
        var _this = this;
        var table_section = document.getElementById("table_section");
        var table = document.getElementById("preview_table");
        var space_section = document.getElementById("space_section");

        if (table) {
          table_section.removeChild(table);
        }

        table = document.createElement("table");
        table.setAttribute("id","preview_table");

        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        var th2 = document.createElement("th");
        var th3 = document.createElement("th");
        var th4 = document.createElement("th");
        var th5 = document.createElement("th");

        th2.setAttribute("class","text-right-align");
        th3.setAttribute("class","text-right-align");
        th4.setAttribute("class","text-right-align");
        th5.setAttribute("class","text-right-align");

        th1.appendChild(document.createTextNode('Tên'));
        th2.appendChild(document.createTextNode('Đơn giá'));
        th3.appendChild(document.createTextNode('SL'));
        th4.appendChild(document.createTextNode('KM'));
        th5.appendChild(document.createTextNode('Thành tiền'));

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);

        table.appendChild(tr);

        _this.stockInDetailList.itemList.forEach(function(each_item){

          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          var td2 = document.createElement("td");
          var td3 = document.createElement("td");
          var td4 = document.createElement("td");
          var td5 = document.createElement("td");

          var name = document.createTextNode(each_item.Title);
          var price = document.createTextNode(each_item.getPriceText());
          var qty = document.createTextNode(each_item.Qty);
          var disc = document.createTextNode(each_item.Disc + "%");
          var amount = document.createTextNode(each_item.getAmountText());

          td1.appendChild(name);
          td2.appendChild(price);
          td3.appendChild(qty);
          td4.appendChild(disc);
          td5.appendChild(amount);

          td2.setAttribute("class","text-right-align");
          td3.setAttribute("class","text-right-align");
          td4.setAttribute("class","text-right-align");
          td5.setAttribute("class","text-right-align");

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);

          table.appendChild(tr);
        });

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td2.setAttribute("colspan","4");
        td2.setAttribute("class","text-right-align");

        td1.appendChild(document.createTextNode('Tiền hàng'));
        td2.appendChild(document.createTextNode(_this.getTotalAmount()));
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);

        table_section.appendChild(table);

        var space_height = 500 - _this.stockInDetailList.itemList.length * 50;
        if (space_height <0) {
          space_height = 100;
        }
        space_section.setAttribute("style", "height: " + space_height + "px;");

      };

      StockInModel.prototype.getUserName = function(cb) {
        var userId = this.FK_user;
        if (userId) {
          var db = dbService.getDb();
          db.User.find(userId, function(user){
            cb(user.FullName);
          })
        } else {
          cb('User not found');
        }
      };

      StockInModel.prototype.getStoreName = function(cb) {
        var storeId = this.FK_store;
        if (storeId) {
          var db = dbService.getDb();
          db.Store.find(storeId, function(store){
            cb(store.Label);
          })
        } else {
          cb('Store not found');
        }
      };

      StockInModel.prototype.getSupplierName = function(cb) {
        var supplierId = this.FK_supplier;
        if (supplierId) {
          var db = dbService.getDb();
          db.Supplier.find(supplierId, function(supplier){
            cb(supplier.Name);
          })
        } else {
          cb('Supplier not found');
        }
      };

      StockInModel.prototype.printInvoice = function() {
        var _this = this;
        this.genTable();

        var d = new Date();
        var print_date_time = d.toLocaleDateString() + " " + d.toLocaleTimeString();
        var printContent = document.getElementById('print_content');

        var print_html = '<html> \
        <head> \
          <meta charset="utf-8">\
          <style> \
            body { \
              background-color: #fff !important; \
            } \
          </style> \
        </head> \
        <body>';

        async.waterfall([
          function(cb) {
            _this.getUserName(function(userName) {
              cb(null, userName);
            })
          },
          function(userName, cb) {
            _this.getStoreName(function(storeName){
              cb(null, userName, storeName);
            })
          },
          function(userName, storeName, cb) {
            _this.getSupplierName(function(supplierName){
              cb(null, userName, storeName, supplierName);
            })
          }
        ], function(error, userName, storeName, supplierName){
          if (error) {

          } else {
            print_html += ' \
            <h2 style="text-align: center;">Nhà nghỉ Tiến-Lan</h2> \
            <div style="text-align: center;"><i>Địa chỉ: 123, Lào Cai</i></div> \
            <div style="text-align: center;"><i>Số điện thoại: 09 13 59 33 33</i></div> \
            <h3 style="text-align: center;">PHIẾU NHẬP KHO</h3> \
            <div style="text-align: center;">Nhân viên: ' + userName + '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Ngày: ' + print_date_time +'</div> \
            <div style="text-align: center;">Nhà cung cấp: ' + supplierName +'</div> \
            <div style="text-align: center;">Kho nhập: ' + storeName +'</div> \
            <br /> \
            ';

            print_html += printContent.innerHTML;
            print_html += "</body></html>";

            var myWindow = window.open('','','width=1000,height=800');
            myWindow.document.write(print_html);

            myWindow.focus();
            myWindow.print();

            myWindow.close();
          }
        });

        /*this.getUserName(function(userName){
          print_html += ' \
          <h2 style="text-align: center;">Nhà nghỉ Tiến-Lan</h2> \
          <div style="text-align: center;"><i>Địa chỉ: 123, Lào Cai</i></div> \
          <div style="text-align: center;"><i>Số điện thoại: 09 13 59 33 33</i></div> \
          <h3 style="text-align: center;">PHIẾU NHẬP KHO</h3> \
          <div style="text-align: center;">Người nhập: ' + userName + '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Ngày: ' + print_date_time +'</div> \
          <br /> \
          ';

          print_html += printContent.innerHTML;
          print_html += "</body></html>";

          var myWindow = window.open('','','width=1000,height=800');
          myWindow.document.write(print_html);

          myWindow.focus();
          myWindow.print();

          myWindow.close();
        });*/
      };


      return StockInModel;
    })(BaseModel);

    return StockInModel;
  }]);

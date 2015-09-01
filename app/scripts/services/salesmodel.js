'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.SalesModel
 * @description
 * # SalesModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('SalesModel', [
    'AppUtils',
    'BaseModel',
    'SalesDetailListModel',
    'Auth',
    'dbService',
    function (
      AppUtils,
      BaseModel,
      SalesDetailListModel,
      Auth,
      dbService
    ) {
    // Service logic

    var SalesModel = (function(superClass) {
      AppUtils.extend(SalesModel, superClass);

      function SalesModel() {
        return SalesModel.__super__.constructor.apply(this, arguments);
      }

      SalesModel.tableName = 'Sales';

      SalesModel.prototype.afterExtendData = function() {
        this.salesDetailList = new SalesDetailListModel();
      };

      SalesModel.prototype.beforeSave = function() {
        this.saveData.salesDate = new Date();
      };

      SalesModel.prototype.calculateBill = function(callback) {
        var salesDetailList = this.salesDetailList.itemList;

        var discPercent = this.discPercent;
        var paymentCreditCard = this.paymentCreditCard;
        var paymentCash = this.paymentCash;
        var paymentAdvanceCash = this.paymentAdvanceCash;
        var paymentAdvanceCreditCard = this.paymentAdvanceCreditCard;

        var salesDetailSummary = {
          totalCharged: 0,
          totalPromo: 0,
          totalAmount: 0,
          totalAmountNotPromo: 0
        };

        salesDetailSummary = _.reduce(salesDetailList, function(sum, el){
          sum.totalCharged += el.getAmountCharged();
          sum.totalPromo += el.getPromo();
          sum.totalAmount += el.getAmount();
          sum.totalAmountNotPromo += el.getAmountNotDisc();

          return sum;
        }, salesDetailSummary);

        var billDisc = salesDetailSummary.totalAmountNotPromo * discPercent / 100;
        var totalDue = salesDetailSummary.totalAmount - billDisc;
        var totalDueLeft = 0;

        if (paymentAdvanceCash>0 || paymentAdvanceCreditCard>0) {
          paymentCash = 0;
          paymentCreditCard = 0;
          totalDueLeft = totalDue - paymentAdvanceCash - paymentAdvanceCreditCard;
        } else {
          paymentCash = totalDue - paymentCreditCard;
        }

        this.totalCharged = salesDetailSummary.totalCharged;
        this.totalPromo = salesDetailSummary.totalPromo;
        this.totalAmount = salesDetailSummary.totalAmount;
        this.billDisc = billDisc;
        this.totalPromoDisc = billDisc + salesDetailSummary.totalPromo;
        this.totalDue = totalDue;
        this.totalDueLeft = totalDueLeft;

        this.paymentCash = paymentCash;
        this.paymentCreditCard = paymentCreditCard;
      };

      SalesModel.prototype.fetchSalesDetail = function($scope){
        var _this = this;
        var salesId = this.Id;

        var filterFn = function(item){
          return (item.FK_sales == this.salesId);
        };

        var filterData = {
          salesId: salesId
        };


        this.salesDetailList.fetchList($scope, filterFn, filterData, function(){
          _this.calculateBill();
        });

      };

      SalesModel.prototype.getTotalCharged = function() {
        return AppUtils.formatMoney(this.totalCharged, 0, ',', '.');
      };

      SalesModel.prototype.getTotalPromo = function() {
        return AppUtils.formatMoney(this.totalPromo, 0, ',', '.');
      };

      SalesModel.prototype.getTotalPromoDisc = function() {
        return AppUtils.formatMoney(this.totalPromoDisc, 0, ',', '.');
      };

      SalesModel.prototype.getTotalAmount = function() {
        return AppUtils.formatMoney(this.totalAmount, 0, ',', '.');
      };

      SalesModel.prototype.getBillDisc = function() {
        return AppUtils.formatMoney(this.billDisc, 0, ',', '.');
      };

      SalesModel.prototype.getTotalDue = function() {
        return AppUtils.formatMoney(this.totalDue, 0, ',', '.');
      };

      SalesModel.prototype.getTotalDueLeft = function() {
        return AppUtils.formatMoney(this.totalDueLeft, 0, ',', '.');
      };

      SalesModel.prototype.saveSales = function(callback) {
        var _this = this;
        _this.save(function(isNew, item){
          if (isNew) {
            var newSalesId = item.Id;

            _this.salesDetailList.saveList(newSalesId, function(err, results){
              console.log('Save new sales done !');
              callback();
            });
          } else {
            console.log('Save edited sales done !');
            callback();
          }
        });
      };

      SalesModel.prototype.genTable = function() {
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

        _this.salesDetailList.itemList.forEach(function(each_item){

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
        td2.appendChild(document.createTextNode(_this.getTotalCharged()));
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);

        if (_this.totalPromoDisc > 0) {
          tr = document.createElement("tr");
          td1 = document.createElement("td");
          td2 = document.createElement("td");
          td2.setAttribute("colspan","4");
          td2.setAttribute("class","text-right-align");

          td1.appendChild(document.createTextNode('Khuyến mại'));
          td2.appendChild(document.createTextNode(_this.getTotalPromoDisc()));
          tr.appendChild(td1);
          tr.appendChild(td2);
          table.appendChild(tr);
        }

        tr = document.createElement("tr");
        td1 = document.createElement("th");
        td2 = document.createElement("th");

        td1.setAttribute("class","text-left-align");
        td2.setAttribute("colspan","4");
        td2.setAttribute("class","text-right-align");

        td1.appendChild(document.createTextNode('Tổng tiền'));
        td2.appendChild(document.createTextNode(_this.getTotalDue()));
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);

        table_section.appendChild(table);

        var space_height = 500 - _this.salesDetailList.itemList.length * 50;
        if (space_height <0) {
          space_height = 100;
        }
        space_section.setAttribute("style", "height: " + space_height + "px;");

      };

      SalesModel.prototype.getUserName = function(cb) {
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

      SalesModel.prototype.printInvoice = function() {
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

        //var userName = Auth.getLoginName();
        this.getUserName(function(userName){
          print_html += ' \
          <h2 style="text-align: center;">Nhà nghỉ Tiến-Lan</h2> \
          <div style="text-align: center;"><i>Địa chỉ: 123, Lào Cai</i></div> \
          <div style="text-align: center;"><i>Số điện thoại: 09 13 59 33 33</i></div> \
          <h3 style="text-align: center;">HÓA ĐƠN BÁN LẺ</h3> \
          <div style="text-align: center;">Tên thu ngân: ' + userName + '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Ngày: ' + print_date_time +'</div> \
          <br /> \
          ';

          print_html += printContent.innerHTML;
          print_html += "</body></html>";

          var myWindow = window.open('','','width=1000,height=800');
          myWindow.document.write(print_html);

          myWindow.focus();
          myWindow.print();

          myWindow.close();
        });
      };


      return SalesModel;
    })(BaseModel);

    return SalesModel;
  }]);

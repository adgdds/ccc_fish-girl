
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Lobby/LobbyMall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '022fboxbYJOwavPxfpDs/gz', 'LobbyMall');
// Script/Lobby/LobbyMall.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    shouhuo_bg: cc.Node,
    xiangqing: cc.Node,
    duihuanjilu: cc.Node,
    diamondLab: cc.Label,
    bangzhu: cc.Node,
    //帮助界面
    typeScroll: cc.ScrollView,
    //商品类别列表
    typePreb: cc.Prefab,
    shopList: cc.ScrollView,
    //商品列表
    goodsItem: cc.Prefab,
    recordList: cc.ScrollView,
    //兑换记录列表
    recordItem: cc.Prefab,
    //商品详情页
    goodsSp: cc.Sprite,
    goodsIdLab: cc.Label,
    goodsPirceLab: cc.Label,
    goodsNumLab: cc.Label,
    goodsNameLab: cc.Label,
    goodsDecLab: cc.Label,
    needNumLb: cc.Label,
    //收货信息页
    shouhuoAdressEdit: cc.EditBox,
    shouhuoNameEdit: cc.EditBox,
    shouhuoPhoneEdit: cc.EditBox
  },
  onLoad: function onLoad() {
    this.init();
    this.playerInfo = require("PlayerInfo").getInstant;
    this.netWork = require("LobbyNetWork");
  },
  start: function start() {},
  //初始化
  init: function init() {
    this.shouhuo_bg.active = false;
    this.xiangqing.active = false;
    this.duihuanjilu.active = false;
    this.bangzhu.active = false;
  },
  //打开商城面板
  onOpenPanel: function onOpenPanel(ret) {
    this.typeScroll.content.removeAllChildren();
    this.diamondLab.string = this.playerInfo.playerDiamond;
    this.goodsList = ret;

    for (var i in ret) {
      var newNode = cc.instantiate(this.typePreb);
      this.typeScroll.content.addChild(newNode);
      newNode.getComponent("typeToggleCtrl").setView(i);
    }

    this.updateList(Object.keys(ret)[0]);
  },
  updateList: function updateList(type) {
    this.shopList.content.removeAllChildren();

    for (var i in this.goodsList[type]) {
      var newNode = cc.instantiate(this.goodsItem);
      this.shopList.content.addChild(newNode);
      newNode.getComponent("goodsItem").setView(this.goodsList[type][i]);
    }
  },
  //点击收货
  onBtnClick_exchange: function onBtnClick_exchange() {
    this.shouhuo_bg.active = true;
    this.netWork.socket.emit("getShopPlayerInfo");
  },
  //更新收货信息
  updateShouhuo: function updateShouhuo(res) {
    this.shouhuoAdressEdit.string = res[0].address;
    this.shouhuoNameEdit.string = res[0].playerName;
    this.shouhuoPhoneEdit.string = res[0].phone;
  },
  //提交收货信息
  onBtnClick_submitInfo: function onBtnClick_submitInfo() {
    this.shouhuo_bg.active = false;
    this.netWork.socket.emit("updateShopPlayerInfo", {
      adress: this.shouhuoAdressEdit.string,
      userName: this.shouhuoNameEdit.string,
      phone: this.shouhuoPhoneEdit.string
    });
  },
  //点击详情
  onBtnClick_xiangqin: function onBtnClick_xiangqin(data) {
    var _this = this;

    this.xiangqing.active = true;
    Helper.loadHead(data.goodsUrl, function (sp) {
      _this.goodsSp.spriteFrame = sp;
    });
    this.nowId = data.id;
    this.goodsIdLab.string = "ID : " + data.id;
    this.goodsPirceLab.string = data.goodsPrice;
    this.goodsNumLab.string = data.goodsNum;
    this.goodsNameLab.string = data.goodsName;
    this.goodsDecLab.string = data.goodsDescribe;
    this.needNumLb.string = 1;
    this.goodsPrice = data.goodsPrice;
  },
  //详情页增减数量
  addBtn: function addBtn() {
    if (parseInt(this.needNumLb.string) + 1 > parseInt(this.goodsNumLab.string)) {
      return;
    }

    this.needNumLb.string = parseInt(this.needNumLb.string) + 1;
    this.goodsPirceLab.string = this.goodsPrice * parseInt(this.needNumLb.string);
  },
  sunBtn: function sunBtn() {
    if (parseInt(this.needNumLb.string) <= 1) {
      return;
    }

    this.needNumLb.string = parseInt(this.needNumLb.string) - 1;
    this.goodsPirceLab.string = this.goodsPrice * parseInt(this.needNumLb.string);
  },
  onBtnClick_submit: function onBtnClick_submit() {
    this.xiangqing.active = false;
    this.netWork.socket.emit("requestGetShopItem", {
      id: this.nowId,
      needNum: parseInt(this.needNumLb.string)
    });
  },
  //刷新商品数据
  updateListData: function updateListData() {
    this.netWork.socket.emit("getShoppingList");
  },
  //点击兑换记录
  onBtnClick_duihuanjilu: function onBtnClick_duihuanjilu() {
    this.duihuanjilu.active = true;
    this.netWork.socket.emit("getShouhuoRecord");
  },
  updateRecordData: function updateRecordData(data) {
    this.recordList.content.removeAllChildren();

    for (var i in data) {
      var newNode = cc.instantiate(this.recordItem);
      this.recordList.content.addChild(newNode);
      newNode.getComponent("shop_recordItem").setView(data[i]);
    }
  },
  //点击帮助
  onBtnClick_bangzhu: function onBtnClick_bangzhu() {
    this.bangzhu.active = true;
  },
  //通用关闭界面
  onBtnClick_closePanel: function onBtnClick_closePanel(event) {
    //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
    event.target.parent.active = false;
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieVxcTG9iYnlNYWxsLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic2hvdWh1b19iZyIsIk5vZGUiLCJ4aWFuZ3FpbmciLCJkdWlodWFuamlsdSIsImRpYW1vbmRMYWIiLCJMYWJlbCIsImJhbmd6aHUiLCJ0eXBlU2Nyb2xsIiwiU2Nyb2xsVmlldyIsInR5cGVQcmViIiwiUHJlZmFiIiwic2hvcExpc3QiLCJnb29kc0l0ZW0iLCJyZWNvcmRMaXN0IiwicmVjb3JkSXRlbSIsImdvb2RzU3AiLCJTcHJpdGUiLCJnb29kc0lkTGFiIiwiZ29vZHNQaXJjZUxhYiIsImdvb2RzTnVtTGFiIiwiZ29vZHNOYW1lTGFiIiwiZ29vZHNEZWNMYWIiLCJuZWVkTnVtTGIiLCJzaG91aHVvQWRyZXNzRWRpdCIsIkVkaXRCb3giLCJzaG91aHVvTmFtZUVkaXQiLCJzaG91aHVvUGhvbmVFZGl0Iiwib25Mb2FkIiwiaW5pdCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm5ldFdvcmsiLCJzdGFydCIsImFjdGl2ZSIsIm9uT3BlblBhbmVsIiwicmV0IiwiY29udGVudCIsInJlbW92ZUFsbENoaWxkcmVuIiwic3RyaW5nIiwicGxheWVyRGlhbW9uZCIsImdvb2RzTGlzdCIsImkiLCJuZXdOb2RlIiwiaW5zdGFudGlhdGUiLCJhZGRDaGlsZCIsImdldENvbXBvbmVudCIsInNldFZpZXciLCJ1cGRhdGVMaXN0IiwiT2JqZWN0Iiwia2V5cyIsInR5cGUiLCJvbkJ0bkNsaWNrX2V4Y2hhbmdlIiwic29ja2V0IiwiZW1pdCIsInVwZGF0ZVNob3VodW8iLCJyZXMiLCJhZGRyZXNzIiwicGxheWVyTmFtZSIsInBob25lIiwib25CdG5DbGlja19zdWJtaXRJbmZvIiwiYWRyZXNzIiwidXNlck5hbWUiLCJvbkJ0bkNsaWNrX3hpYW5ncWluIiwiZGF0YSIsIkhlbHBlciIsImxvYWRIZWFkIiwiZ29vZHNVcmwiLCJzcCIsInNwcml0ZUZyYW1lIiwibm93SWQiLCJpZCIsImdvb2RzUHJpY2UiLCJnb29kc051bSIsImdvb2RzTmFtZSIsImdvb2RzRGVzY3JpYmUiLCJhZGRCdG4iLCJwYXJzZUludCIsInN1bkJ0biIsIm9uQnRuQ2xpY2tfc3VibWl0IiwibmVlZE51bSIsInVwZGF0ZUxpc3REYXRhIiwib25CdG5DbGlja19kdWlodWFuamlsdSIsInVwZGF0ZVJlY29yZERhdGEiLCJvbkJ0bkNsaWNrX2Jhbmd6aHUiLCJvbkJ0bkNsaWNrX2Nsb3NlUGFuZWwiLCJldmVudCIsInRhcmdldCIsInBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSyxJQURQO0FBRVJDLElBQUFBLFNBQVMsRUFBRU4sRUFBRSxDQUFDSyxJQUZOO0FBR1JFLElBQUFBLFdBQVcsRUFBRVAsRUFBRSxDQUFDSyxJQUhSO0FBSVJHLElBQUFBLFVBQVUsRUFBRVIsRUFBRSxDQUFDUyxLQUpQO0FBS1JDLElBQUFBLE9BQU8sRUFBRVYsRUFBRSxDQUFDSyxJQUxKO0FBS1M7QUFDakJNLElBQUFBLFVBQVUsRUFBRVgsRUFBRSxDQUFDWSxVQU5QO0FBTWtCO0FBQzFCQyxJQUFBQSxRQUFRLEVBQUViLEVBQUUsQ0FBQ2MsTUFQTDtBQVFSQyxJQUFBQSxRQUFRLEVBQUVmLEVBQUUsQ0FBQ1ksVUFSTDtBQVFnQjtBQUN4QkksSUFBQUEsU0FBUyxFQUFFaEIsRUFBRSxDQUFDYyxNQVROO0FBVVJHLElBQUFBLFVBQVUsRUFBRWpCLEVBQUUsQ0FBQ1ksVUFWUDtBQVVrQjtBQUMxQk0sSUFBQUEsVUFBVSxFQUFFbEIsRUFBRSxDQUFDYyxNQVhQO0FBWVI7QUFDQUssSUFBQUEsT0FBTyxFQUFFbkIsRUFBRSxDQUFDb0IsTUFiSjtB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Q0FBcEQ7QUFDSDtBQUNKLEdBOUlJO0FBK0lMO0FBQ0EwQyxFQUFBQSxrQkFoSkssZ0NBZ0pnQjtBQUNqQixTQUFLOUUsT0FBTCxDQUFhNEIsTUFBYixHQUFzQixJQUF0QjtBQUNILEdBbEpJO0FBbUpMO0FBQ0FtRCxFQUFBQSxxQkFwSkssaUNBb0ppQkMsS0FwSmpCLEVBb0p3QjtBQUN6QjtBQUNBQSxJQUFBQSxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsTUFBYixDQUFvQnRELE1BQXBCLEdBQTZCLEtBQTdCO0FBQ0g7QUF2SkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzaG91aHVvX2JnOiBjYy5Ob2RlLFxyXG4gICAgICAgIHhpYW5ncWluZzogY2MuTm9kZSxcclxuICAgICAgICBkdWlodWFuamlsdTogY2MuTm9kZSxcclxuICAgICAgICBkaWFtb25kTGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBiYW5nemh1OiBjYy5Ob2RlLC8v5biu5Yqp55WM6Z2iXHJcbiAgICAgICAgdHlwZVNjcm9sbDogY2MuU2Nyb2xsVmlldywvL+WVhuWTgeexu+WIq+WIl+ihqFxyXG4gICAgICAgIHR5cGVQcmViOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc2hvcExpc3Q6IGNjLlNjcm9sbFZpZXcsLy/llYblk4HliJfooahcclxuICAgICAgICBnb29kc0l0ZW06IGNjLlByZWZhYixcclxuICAgICAgICByZWNvcmRMaXN0OiBjYy5TY3JvbGxWaWV3LC8v5YWR5o2i6K6w5b2V5YiX6KGoXHJcbiAgICAgICAgcmVjb3JkSXRlbTogY2MuUHJlZmFiLFxyXG4gICAgICAgIC8v5ZWG5ZOB6K+m5oOF6aG1XHJcbiAgICAgICAgZ29vZHNTcDogY2MuU3ByaXRlLFxyXG4gICAgICAgIGdvb2RzSWRMYWI6IGNjLkxhYmVsLFxyXG4gICAgICAgIGdvb2RzUGlyY2VMYWI6IGNjLkxhYmVsLFxyXG4gICAgICAgIGdvb2RzTnVtTGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBnb29kc05hbWVMYWI6IGNjLkxhYmVsLFxyXG4gICAgICAgIGdvb2RzRGVjTGFiOiBjYy5MYWJlbCxcclxuICAgICAgICBuZWVkTnVtTGI6IGNjLkxhYmVsLFxyXG4gICAgICAgIC8v5pS26LSn5L+h5oGv6aG1XHJcbiAgICAgICAgc2hvdWh1b0FkcmVzc0VkaXQ6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgc2hvdWh1b05hbWVFZGl0OiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIHNob3VodW9QaG9uZUVkaXQ6IGNjLkVkaXRCb3gsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIHRoaXMubmV0V29yayA9IHJlcXVpcmUoXCJMb2JieU5ldFdvcmtcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMllxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNob3VodW9fYmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy54aWFuZ3FpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kdWlodWFuamlsdS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJhbmd6aHUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/miZPlvIDllYbln47pnaLmnb9cclxuICAgIG9uT3BlblBhbmVsKHJldCkge1xyXG4gICAgICAgIHRoaXMudHlwZVNjcm9sbC5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kTGFiLnN0cmluZyA9IHRoaXMucGxheWVySW5mby5wbGF5ZXJEaWFtb25kO1xyXG4gICAgICAgIHRoaXMuZ29vZHNMaXN0ID0gcmV0O1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gcmV0KSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50eXBlUHJlYik7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZVNjcm9sbC5jb250ZW50LmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgICAgICBuZXdOb2RlLmdldENvbXBvbmVudChcInR5cGVUb2dnbGVDdHJsXCIpLnNldFZpZXcoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlTGlzdChPYmplY3Qua2V5cyhyZXQpWzBdKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlTGlzdCh0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5zaG9wTGlzdC5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmdvb2RzTGlzdFt0eXBlXSkge1xyXG4gICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ29vZHNJdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5zaG9wTGlzdC5jb250ZW50LmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgICAgICBuZXdOb2RlLmdldENvbXBvbmVudChcImdvb2RzSXRlbVwiKS5zZXRWaWV3KHRoaXMuZ29vZHNMaXN0W3R5cGVdW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vmlLbotKdcclxuICAgIG9uQnRuQ2xpY2tfZXhjaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5zaG91aHVvX2JnLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLnNvY2tldC5lbWl0KFwiZ2V0U2hvcFBsYXllckluZm9cIik7XHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrDmlLbotKfkv6Hmga9cclxuICAgIHVwZGF0ZVNob3VodW8ocmVzKSB7XHJcbiAgICAgICAgdGhpcy5zaG91aHVvQWRyZXNzRWRpdC5zdHJpbmcgPSByZXNbMF0uYWRkcmVzcztcclxuICAgICAgICB0aGlzLnNob3VodW9OYW1lRWRpdC5zdHJpbmcgPSByZXNbMF0ucGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLnNob3VodW9QaG9uZUVkaXQuc3RyaW5nID0gcmVzWzBdLnBob25lO1xyXG4gICAgfSxcclxuICAgIC8v5o+Q5Lqk5pS26LSn5L+h5oGvXHJcbiAgICBvbkJ0bkNsaWNrX3N1Ym1pdEluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5zaG91aHVvX2JnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmV0V29yay5zb2NrZXQuZW1pdChcInVwZGF0ZVNob3BQbGF5ZXJJbmZvXCIsIHtcclxuICAgICAgICAgICAgYWRyZXNzOiB0aGlzLnNob3VodW9BZHJlc3NFZGl0LnN0cmluZyxcclxuICAgICAgICAgICAgdXNlck5hbWU6IHRoaXMuc2hvdWh1b05hbWVFZGl0LnN0cmluZyxcclxuICAgICAgICAgICAgcGhvbmU6IHRoaXMuc2hvdWh1b1Bob25lRWRpdC5zdHJpbmdcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+ivpuaDhVxyXG4gICAgb25CdG5DbGlja194aWFuZ3FpbihkYXRhKSB7XHJcbiAgICAgICAgdGhpcy54aWFuZ3FpbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBIZWxwZXIubG9hZEhlYWQoZGF0YS5nb29kc1VybCwgc3AgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdvb2RzU3Auc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vd0lkID0gZGF0YS5pZDtcclxuICAgICAgICB0aGlzLmdvb2RzSWRMYWIuc3RyaW5nID0gXCJJRCA6IFwiICsgZGF0YS5pZDtcclxuICAgICAgICB0aGlzLmdvb2RzUGlyY2VMYWIuc3RyaW5nID0gZGF0YS5nb29kc1ByaWNlO1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW1MYWIuc3RyaW5nID0gZGF0YS5nb29kc051bTtcclxuICAgICAgICB0aGlzLmdvb2RzTmFtZUxhYi5zdHJpbmcgPSBkYXRhLmdvb2RzTmFtZTtcclxuICAgICAgICB0aGlzLmdvb2RzRGVjTGFiLnN0cmluZyA9IGRhdGEuZ29vZHNEZXNjcmliZTtcclxuICAgICAgICB0aGlzLm5lZWROdW1MYi5zdHJpbmcgPSAxO1xyXG4gICAgICAgIHRoaXMuZ29vZHNQcmljZSA9IGRhdGEuZ29vZHNQcmljZTtcclxuICAgIH0sXHJcbiAgICAvL+ivpuaDhemhteWinuWHj+aVsOmHj1xyXG4gICAgYWRkQnRuKCkge1xyXG4gICAgICAgIGlmIChwYXJzZUludCh0aGlzLm5lZWROdW1MYi5zdHJpbmcpICsgMSA+IHBhcnNlSW50KHRoaXMuZ29vZHNOdW1MYWIuc3RyaW5nKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmVlZE51bUxiLnN0cmluZyA9IHBhcnNlSW50KHRoaXMubmVlZE51bUxiLnN0cmluZykgKyAxO1xyXG4gICAgICAgIHRoaXMuZ29vZHNQaXJjZUxhYi5zdHJpbmcgPSB0aGlzLmdvb2RzUHJpY2UgKiBwYXJzZUludCh0aGlzLm5lZWROdW1MYi5zdHJpbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdW5CdG4oKSB7XHJcbiAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMubmVlZE51bUxiLnN0cmluZykgPD0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmVlZE51bUxiLnN0cmluZyA9IHBhcnNlSW50KHRoaXMubmVlZE51bUxiLnN0cmluZykgLSAxO1xyXG4gICAgICAgIHRoaXMuZ29vZHNQaXJjZUxhYi5zdHJpbmcgPSB0aGlzLmdvb2RzUHJpY2UgKiBwYXJzZUludCh0aGlzLm5lZWROdW1MYi5zdHJpbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkJ0bkNsaWNrX3N1Ym1pdCgpIHtcclxuICAgICAgICB0aGlzLnhpYW5ncWluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJyZXF1ZXN0R2V0U2hvcEl0ZW1cIiwge1xyXG4gICAgICAgICAgICBpZDogdGhpcy5ub3dJZCxcclxuICAgICAgICAgICAgbmVlZE51bTogcGFyc2VJbnQodGhpcy5uZWVkTnVtTGIuc3RyaW5nKSxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOWVhuWTgeaVsOaNrlxyXG4gICAgdXBkYXRlTGlzdERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5uZXRXb3JrLnNvY2tldC5lbWl0KFwiZ2V0U2hvcHBpbmdMaXN0XCIpO1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye75YWR5o2i6K6w5b2VXHJcbiAgICBvbkJ0bkNsaWNrX2R1aWh1YW5qaWx1KCkge1xyXG4gICAgICAgIHRoaXMuZHVpaHVhbmppbHUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5ldFdvcmsuc29ja2V0LmVtaXQoXCJnZXRTaG91aHVvUmVjb3JkXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVSZWNvcmREYXRhKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnJlY29yZExpc3QuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVjb3JkSXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkTGlzdC5jb250ZW50LmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgICAgICBuZXdOb2RlLmdldENvbXBvbmVudChcInNob3BfcmVjb3JkSXRlbVwiKS5zZXRWaWV3KGRhdGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+W4ruWKqVxyXG4gICAgb25CdG5DbGlja19iYW5nemh1KCkge1xyXG4gICAgICAgIHRoaXMuYmFuZ3podS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8v6YCa55So5YWz6Zet55WM6Z2iXHJcbiAgICBvbkJ0bkNsaWNrX2Nsb3NlUGFuZWwoZXZlbnQpIHtcclxuICAgICAgICAvL+i/memHjCBldmVudCDmmK/kuIDkuKogVG91Y2ggRXZlbnQg5a+56LGh77yM5L2g5Y+v5Lul6YCa6L+HIGV2ZW50LnRhcmdldCDlj5bliLDkuovku7bnmoTlj5HpgIHoioLngrlcclxuICAgICAgICBldmVudC50YXJnZXQucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_TaiJiXiongMao/js/TaijiPandaWheel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ce17XxOLlHra/o/KGuqvU6', 'TaijiPandaWheel');
// Texture/Slot_TaiJiXiongMao/js/TaijiPandaWheel.js

"use strict";

var ROLENUM = 40; //每一轮的角色数量

var TIMEMIN = 1; //第一轮摇奖时间

cc.Class({
  "extends": cc.Component,
  properties: {
    wheelId: 0,
    excludeId: {
      "default": 0,
      displayName: '不会出现的数字id'
    }
  },
  onLoad: function onLoad() {
    this.audio = cc.director.getScene().getChildByName('Canvas').getComponent('TaijiPandaAudio');
    this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('TaijiPandaMain');
    this.mainObj.wheelList[this.wheelId] = this;
    this.status = 0; //0停止 1转 

    this.lastResult = [0, 0, 0, 0, 0]; //中间三位是上一局结果 首位末尾是为了防止露出部分转起来不一样 

    this.rolePbList = []; //roles

    this.roleIdList = []; //role ID
  },
  start: function start() {
    //初始化场景role
    this.initWheel();
  },
  initWheel: function initWheel() {
    this.rolePbList = [];
    this.roleIdList = [];
    this.node.removeAllChildren();

    for (var i = 0; i < ROLENUM - 12; i++) {
      this.addRole(this.getRandomId());
    }

    this.addRole(this.getRandomId());
    this.node.y = 0;
    this.mainObj.rollIndex++;
    this.mainObj.closeShine();
  },
  startRoll: function startRoll() {
    var _this = this;

    this.status = 1;
    this.rolePbList = [];
    this.roleIdList = [];
    this.node.removeAllChildren();
    this.node.y = 0;

    for (var i in this.lastResult) {
      this.lastResult[i] = this.lastResult[i] == 0 ? this.getRandomId() : this.lastResult[i];
      this.addRole(this.lastResult[i]);
    }

    for (var _i = 0; _i < ROLENUM - 12; _i++) {
      this.addRole(this.getRandomId());
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    for (var _i2 in args) {
      this.addRole(args[_i2]);
    }

    this.addRole(this.getRandomId());
    setTimeout(function () {
      var timer = TIMEMIN + _this.wheelId * 0.2;
      timer = !_this.mainObj.auto ? TIMEMIN : timer;

      _this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.moveTo(timer, cc.v2(_this.node.x, -_this.node.height + 585)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 640)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 585)), cc.callFunc(_this.rollCallBack.bind(_this))));
    }, 100);
  },
  getRandomId: function getRandomId() {
    var randomId = 0;

    while (randomId == 0) {
      if (this.mainObj.freeTimes > 0 || this.mainObj.stopFree) {
        randomId = Math.floor(Math.random() * (this.mainObj.rolePb.length - 1) + 1);
        randomId = randomId == 9 ? 1 : randomId;
      } else {
        randomId = Math.floor(Math.random() * (this.mainObj.rolePb.length - 1) + 1);
      }

      randomId = randomId == this.excludeId ? 0 : randomId;
    }

    ;
    return randomId;
  },
  addRole: function addRole(id) {
    var pb = cc.instantiate(this.mainObj.rolePb[id]);
    this.rolePbList.push(pb);
    this.roleIdList.push(id);
    this.node.addChild(pb);
  },
  rollCallBack: function rollCallBack() {
    this.audio.playStopWheel();
    this.lastResult = this.roleIdList.slice(-5);
    this.status = 0;
    this.mainObj.stateCallBack();
  },
  stopImmediately: function stopImmediately() {
    var _this2 = this;

    this.lastResult = this.roleIdList.slice(-5);
    this.node.stopAllActions();
    setTimeout(function () {
      _this2.node.y = -_this2.node.height + 585;
    }, 50);
    this.status = 0;
    this.mainObj.stateCallBack();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9UYWlKaVhpb25nTWFvXFxqc1xcVGFpamlQYW5kYVdoZWVsLmpzIl0sIm5hbWVzIjpbIlJPTEVOVU0iLCJUSU1FTUlOIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ3aGVlbElkIiwiZXhjbHVkZUlkIiwiZGlzcGxheU5hbWUiLCJvbkxvYWQiLCJhdWRpbyIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIm1haW5PYmoiLCJ3aGVlbExpc3QiLCJzdGF0dXMiLCJsYXN0UmVzdWx0Iiwicm9sZVBiTGlzdCIsInJvbGVJZExpc3QiLCJzdGFydCIsImluaXRXaGVlbCIsIm5vZGUiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImkiLCJhZGRSb2xlIiwiZ2V0UmFuZG9tSWQiLCJ5Iiwicm9sbEluZGV4IiwiY2xvc2VTaGluZSIsInN0YXJ0Um9sbCIsImFyZ3MiLCJzZXRUaW1lb3V0IiwidGltZXIiLCJhdXRvIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJtb3ZlVG8iLCJ2MiIsIngiLCJoZWlnaHQiLCJjYWxsRnVuYyIsInJvbGxDYWxsQmFjayIsImJpbmQiLCJyYW5kb21JZCIsImZyZWVUaW1lcyIsInN0b3BGcmVlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicm9sZVBiIiwibGVuZ3RoIiwiaWQiLCJwYiIsImluc3RhbnRpYXRlIiwicHVzaCIsImFkZENoaWxkIiwicGxheVN0b3BXaGVlbCIsInNsaWNlIiwic3RhdGVDYWxsQmFjayIsInN0b3BJbW1lZGlhdGVseSIsInN0b3BBbGxBY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU8sR0FBRyxFQUFoQixFQUFvQjs7QUFDcEIsSUFBTUMsT0FBTyxHQUFHLENBQWhCLEVBQW1COztBQUVuQkMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFD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SywwQkE0RlU7QUFDWCxTQUFLbEMsS0FBTCxDQUFXaUQsYUFBWDtBQUNBLFNBQUt6QyxVQUFMLEdBQWtCLEtBQUtFLFVBQUwsQ0FBZ0J3QyxLQUFoQixDQUFzQixDQUFDLENBQXZCLENBQWxCO0FBQ0EsU0FBSzNDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0YsT0FBTCxDQUFhOEMsYUFBYjtBQUNILEdBakdJO0FBbUdMQyxFQUFBQSxlQW5HSyw2QkFtR2E7QUFBQTs7QUFDZCxTQUFLNUMsVUFBTCxHQUFrQixLQUFLRSxVQUFMLENBQWdCd0MsS0FBaEIsQ0FBc0IsQ0FBQyxDQUF2QixDQUFsQjtBQUNBLFNBQUtyQyxJQUFMLENBQVV3QyxjQUFWO0FBQ0E5QixJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLE1BQUEsTUFBSSxDQUFDVixJQUFMLENBQVVLLENBQVYsR0FBYyxDQUFDLE1BQUksQ0FBQ0wsSUFBTCxDQUFVbUIsTUFBWCxHQUFvQixHQUFsQztBQUNILEtBRlMsRUFFUCxFQUZPLENBQVY7QUFHQSxTQUFLekIsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLRixPQUFMLENBQWE4QyxhQUFiO0FBQ0g7QUEzR0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUk9MRU5VTSA9IDQwOyAvL+avj+S4gOi9rueahOinkuiJsuaVsOmHj1xyXG5jb25zdCBUSU1FTUlOID0gMTsgLy/nrKzkuIDova7mkYflpZbml7bpl7RcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgd2hlZWxJZDogMCxcclxuICAgICAgICBleGNsdWRlSWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuI3kvJrlh7rnjrDnmoTmlbDlrZdpZCcsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ1RhaWppUGFuZGFBdWRpbycpO1xyXG4gICAgICAgIHRoaXMubWFpbk9iaiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnVGFpamlQYW5kYU1haW4nKTtcclxuICAgICAgICB0aGlzLm1haW5PYmoud2hlZWxMaXN0W3RoaXMud2hlZWxJZF0gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDsgLy8w5YGc5q2iIDHovawgXHJcbiAgICAgICAgdGhpcy5sYXN0UmVzdWx0ID0gWzAsIDAsIDAsIDAsIDBdOyAvL+S4remXtOS4ieS9jeaYr+S4iuS4gOWxgOe7k+aenCDpppbkvY3mnKvlsL7mmK/kuLrkuobpmLLmraLpnLLlh7rpg6jliIbovazotbfmnaXkuI3kuIDmoLcgXHJcbiAgICAgICAgdGhpcy5yb2xlUGJMaXN0ID0gW107IC8vcm9sZXNcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QgPSBbXTsgLy9yb2xlIElEXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Zy65pmvcm9sZVxyXG4gICAgICAgIHRoaXMuaW5pdFdoZWVsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRXaGVlbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGVQYkxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPTEVOVU0gLSAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZSh0aGlzLmdldFJhbmRvbUlkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFJvbGUodGhpcy5nZXRSYW5kb21JZCgpKTtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLnJvbGxJbmRleCsrO1xyXG4gICAgICAgIHRoaXMubWFpbk9iai5jbG9zZVNoaW5lKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0Um9sbCguLi5hcmdzKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xyXG4gICAgICAgIHRoaXMucm9sZVBiTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sZUlkTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMubm9kZS55ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGFzdFJlc3VsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RSZXN1bHRbaV0gPSB0aGlzLmxhc3RSZXN1bHRbaV0gPT0gMCA/IHRoaXMuZ2V0UmFuZG9tSWQoKSA6IHRoaXMubGFzdFJlc3VsdFtpXTtcclxuICAgICAgICAgICAgdGhpcy5hZGRSb2xlKHRoaXMubGFzdFJlc3VsdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9MRU5VTSAtIDEyOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSb2xlKHRoaXMuZ2V0UmFuZG9tSWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gYXJncykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJvbGUoYXJnc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkUm9sZSh0aGlzLmdldFJhbmRvbUlkKCkpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGltZXIgPSBUSU1FTUlOICsgdGhpcy53aGVlbElkICogMC4yO1xyXG4gICAgICAgICAgICB0aW1lciA9ICF0aGlzLm1haW5PYmouYXV0byA/IFRJTUVNSU4gOiB0aW1lcjtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0aW1lciwgY2MudjIodGhpcy5ub2RlLngsIC10aGlzLm5vZGUuaGVpZ2h0ICsgNTg1KSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMSwgY2MudjIodGhpcy5ub2RlLngsIC10aGlzLm5vZGUuaGVpZ2h0ICsgNjQwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMSwgY2MudjIodGhpcy5ub2RlLngsIC10aGlzLm5vZGUuaGVpZ2h0ICsgNTg1KSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmModGhpcy5yb2xsQ2FsbEJhY2suYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb21JZCgpIHtcclxuICAgICAgICBsZXQgcmFuZG9tSWQgPSAwO1xyXG4gICAgICAgIHdoaWxlIChyYW5kb21JZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1haW5PYmouZnJlZVRpbWVzID4gMCB8fCB0aGlzLm1haW5PYmouc3RvcEZyZWUpIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMubWFpbk9iai5yb2xlUGIubGVuZ3RoIC0gMSkgKyAxKTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbUlkID0gcmFuZG9tSWQgPT0gOSA/IDEgOiByYW5kb21JZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMubWFpbk9iai5yb2xlUGIubGVuZ3RoIC0gMSkgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYW5kb21JZCA9IHJhbmRvbUlkID09IHRoaXMuZXhjbHVkZUlkID8gMCA6IHJhbmRvbUlkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJhbmRvbUlkO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRSb2xlKGlkKSB7XHJcbiAgICAgICAgbGV0IHBiID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYWluT2JqLnJvbGVQYltpZF0pO1xyXG4gICAgICAgIHRoaXMucm9sZVBiTGlzdC5wdXNoKHBiKTtcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QucHVzaChpZCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBiKTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbENhbGxCYWNrKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheVN0b3BXaGVlbCgpO1xyXG4gICAgICAgIHRoaXMubGFzdFJlc3VsdCA9IHRoaXMucm9sZUlkTGlzdC5zbGljZSgtNSk7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMubWFpbk9iai5zdGF0ZUNhbGxCYWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICB0aGlzLmxhc3RSZXN1bHQgPSB0aGlzLnJvbGVJZExpc3Quc2xpY2UoLTUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IC10aGlzLm5vZGUuaGVpZ2h0ICsgNTg1O1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLnN0YXRlQ2FsbEJhY2soKTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
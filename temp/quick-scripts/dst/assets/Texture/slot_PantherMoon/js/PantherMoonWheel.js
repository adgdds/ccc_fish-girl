
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/slot_PantherMoon/js/PantherMoonWheel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fc1efJlyldJib2XFStkBnar', 'PantherMoonWheel');
// Texture/slot_PantherMoon/js/PantherMoonWheel.js

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
    this.audio = cc.director.getScene().getChildByName('Canvas').getComponent('PantherMoonAudio');
    this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('PantherMoonMain');
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

    for (var i in this.lastResult) {
      this.lastResult[i] = this.getRandomId();
      this.addRole(this.lastResult[i]);
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
    this.node.y = 0; //滚轮启动位移距离

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
        randomId = randomId == 6 ? 12 : randomId;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcc2xvdF9QYW50aGVyTW9vblxcanNcXFBhbnRoZXJNb29uV2hlZWwuanMiXSwibmFtZXMiOlsiUk9MRU5VTSIsIlRJTUVNSU4iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIndoZWVsSWQiLCJleGNsdWRlSWQiLCJkaXNwbGF5TmFtZSIsIm9uTG9hZCIsImF1ZGlvIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwibWFpbk9iaiIsIndoZWVsTGlzdCIsInN0YXR1cyIsImxhc3RSZXN1bHQiLCJyb2xlUGJMaXN0Iiwicm9sZUlkTGlzdCIsInN0YXJ0IiwiaW5pdFdoZWVsIiwibm9kZSIsInJlbW92ZUFsbENoaWxkcmVuIiwiaSIsImdldFJhbmRvbUlkIiwiYWRkUm9sZSIsInkiLCJyb2xsSW5kZXgiLCJjbG9zZVNoaW5lIiwic3RhcnRSb2xsIiwiYXJncyIsInNldFRpbWVvdXQiLCJ0aW1lciIsImF1dG8iLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImRlbGF5VGltZSIsIm1vdmVUbyIsInYyIiwieCIsImhlaWdodCIsImNhbGxGdW5jIiwicm9sbENhbGxCYWNrIiwiYmluZCIsInJhbmRvbUlkIiwiZnJlZVRpbWVzIiwic3RvcEZyZWUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyb2xlUGIiLCJsZW5ndGgiLCJpZCIsInBiIiwiaW5zdGFudGlhdGUiLCJwdXNoIiwiYWRkQ2hpbGQiLCJwbGF5U3RvcFdoZWVsIiwic2xpY2UiLCJzdGF0ZUNhbGxCYWNrIiwic3RvcEltbWVkaWF0ZWx5Iiwic3RvcEFsbEFjdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHLEVBQWhCLEVBQW9COztBQUNwQixJQUFNQyxPQUFPLEdBQUcsQ0FBaEIsRUFBbUI7O0FBRW5CQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNM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QUFDSCxHQTNGSTtBQTZGTFgsRUFBQUEsWUE3RkssMEJBNkZVO0FBQ1gsU0FBS2xDLEtBQUwsQ0FBV2lELGFBQVg7QUFDQSxTQUFLekMsVUFBTCxHQUFrQixLQUFLRSxVQUFMLENBQWdCd0MsS0FBaEIsQ0FBc0IsQ0FBQyxDQUF2QixDQUFsQjtBQUNBLFNBQUszQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtGLE9BQUwsQ0FBYThDLGFBQWI7QUFDSCxHQWxHSTtBQW9HTEMsRUFBQUEsZUFwR0ssNkJBb0dhO0FBQUE7O0FBQ2QsU0FBSzVDLFVBQUwsR0FBa0IsS0FBS0UsVUFBTCxDQUFnQndDLEtBQWhCLENBQXNCLENBQUMsQ0FBdkIsQ0FBbEI7QUFDQSxTQUFLckMsSUFBTCxDQUFVd0MsY0FBVjtBQUNBOUIsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixNQUFBLE1BQUksQ0FBQ1YsSUFBTCxDQUFVSyxDQUFWLEdBQWMsQ0FBQyxNQUFJLENBQUNMLElBQUwsQ0FBVW1CLE1BQVgsR0FBb0IsR0FBbEM7QUFDSCxLQUZTLEVBRVAsRUFGTyxDQUFWO0FBR0EsU0FBS3pCLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0YsT0FBTCxDQUFhOEMsYUFBYjtBQUNIO0FBNUdJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJPTEVOVU0gPSA0MDsgLy/mr4/kuIDova7nmoTop5LoibLmlbDph49cclxuY29uc3QgVElNRU1JTiA9IDE7IC8v56ys5LiA6L2u5pGH5aWW5pe26Ze0XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHdoZWVsSWQ6IDAsXHJcbiAgICAgICAgZXhjbHVkZUlkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAn5LiN5Lya5Ye6546w55qE5pWw5a2XaWQnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdQYW50aGVyTW9vbkF1ZGlvJyk7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdQYW50aGVyTW9vbk1haW4nKTtcclxuICAgICAgICB0aGlzLm1haW5PYmoud2hlZWxMaXN0W3RoaXMud2hlZWxJZF0gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDsgLy8w5YGc5q2iIDHovawgXHJcbiAgICAgICAgdGhpcy5sYXN0UmVzdWx0ID0gWzAsIDAsIDAsIDAsIDBdOyAvL+S4remXtOS4ieS9jeaYr+S4iuS4gOWxgOe7k+aenCDpppbkvY3mnKvlsL7mmK/kuLrkuobpmLLmraLpnLLlh7rpg6jliIbovazotbfmnaXkuI3kuIDmoLcgXHJcbiAgICAgICAgdGhpcy5yb2xlUGJMaXN0ID0gW107IC8vcm9sZXNcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QgPSBbXTsgLy9yb2xlIElEXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Zy65pmvcm9sZVxyXG4gICAgICAgIHRoaXMuaW5pdFdoZWVsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRXaGVlbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGVQYkxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMubGFzdFJlc3VsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RSZXN1bHRbaV0gPSB0aGlzLmdldFJhbmRvbUlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZSh0aGlzLmxhc3RSZXN1bHRbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFJvbGUodGhpcy5nZXRSYW5kb21JZCgpKTtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IDA7ICBcclxuICAgICAgICB0aGlzLm1haW5PYmoucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLmNsb3NlU2hpbmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRSb2xsKC4uLmFyZ3MpIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgdGhpcy5yb2xlUGJMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xlSWRMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAwOyAvL+a7mui9ruWQr+WKqOS9jeenu+i3neemu1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYXN0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFJlc3VsdFtpXSA9IHRoaXMubGFzdFJlc3VsdFtpXSA9PSAwID8gdGhpcy5nZXRSYW5kb21JZCgpIDogdGhpcy5sYXN0UmVzdWx0W2ldO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJvbGUodGhpcy5sYXN0UmVzdWx0W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBST0xFTlVNIC0gMTI7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJvbGUodGhpcy5nZXRSYW5kb21JZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBhcmdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZShhcmdzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRSb2xlKHRoaXMuZ2V0UmFuZG9tSWQoKSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lciA9IFRJTUVNSU4gKyB0aGlzLndoZWVsSWQgKiAwLjI7XHJcbiAgICAgICAgICAgIHRpbWVyID0gIXRoaXMubWFpbk9iai5hdXRvID8gVElNRU1JTiA6IHRpbWVyO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKHRpbWVyLCBjYy52Mih0aGlzLm5vZGUueCwgLXRoaXMubm9kZS5oZWlnaHQgKyA1ODUpKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC4xLCBjYy52Mih0aGlzLm5vZGUueCwgLXRoaXMubm9kZS5oZWlnaHQgKyA2NDApKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC4xLCBjYy52Mih0aGlzLm5vZGUueCwgLXRoaXMubm9kZS5oZWlnaHQgKyA1ODUpKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYyh0aGlzLnJvbGxDYWxsQmFjay5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbUlkKCkge1xyXG4gICAgICAgIGxldCByYW5kb21JZCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKHJhbmRvbUlkID09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFpbk9iai5mcmVlVGltZXMgPiAwIHx8IHRoaXMubWFpbk9iai5zdG9wRnJlZSkge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYWluT2JqLnJvbGVQYi5sZW5ndGggLSAxKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tSWQgPSByYW5kb21JZCA9PSA2ID8gMTIgOiByYW5kb21JZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMubWFpbk9iai5yb2xlUGIubGVuZ3RoIC0gMSkgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYW5kb21JZCA9IHJhbmRvbUlkID09IHRoaXMuZXhjbHVkZUlkID8gMCA6IHJhbmRvbUlkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJhbmRvbUlkO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRSb2xlKGlkKSB7XHJcbiAgICAgICAgbGV0IHBiID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYWluT2JqLnJvbGVQYltpZF0pO1xyXG4gICAgICAgIHRoaXMucm9sZVBiTGlzdC5wdXNoKHBiKTtcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QucHVzaChpZCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBiKTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbENhbGxCYWNrKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheVN0b3BXaGVlbCgpO1xyXG4gICAgICAgIHRoaXMubGFzdFJlc3VsdCA9IHRoaXMucm9sZUlkTGlzdC5zbGljZSgtNSk7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMubWFpbk9iai5zdGF0ZUNhbGxCYWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICB0aGlzLmxhc3RSZXN1bHQgPSB0aGlzLnJvbGVJZExpc3Quc2xpY2UoLTUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IC10aGlzLm5vZGUuaGVpZ2h0ICsgNTg1O1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLnN0YXRlQ2FsbEJhY2soKTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
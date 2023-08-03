
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_caishendao/js/CSDWheel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e4ad2gCLuhA46xJp9jsjGU2', 'CSDWheel');
// Texture/Slot_caishendao/js/CSDWheel.js

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
    this.audio = cc.find('Canvas').getComponent('CSDAudio');
    this.mainObj = cc.director.getScene().getChildByName('Canvas').getComponent('CSDMain');
    this.mainObj.wheelList[this.wheelId] = this;
    this.status = 0; //0停止 1转 

    this.lastResult = [0, 0, 0, 0, 0]; //中间三位是上一局结果 首位末尾是为了防止露出部分转起来不一样 

    this.rolePbList = []; //role

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

    for (var i = 0; i < ROLENUM - 9; i++) {
      this.addRole(this.getRandomId());
    }

    this.addRole(this.getRandomId());
    this.node.y = -200;
    this.mainObj.rollIndex++;
    this.mainObj.closeShine();
  },
  startRoll: function startRoll() {
    var _this = this;

    this.status = 1;
    this.rolePbList = [];
    this.roleIdList = [];
    this.node.removeAllChildren();
    this.node.y = -200;

    for (var i in this.lastResult) {
      this.lastResult[i] = this.lastResult[i] == 0 ? this.getRandomId() : this.lastResult[i];
      this.addRole(this.lastResult[i]);
    }

    for (var _i = 0; _i < ROLENUM - 9; _i++) {
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

      _this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.moveTo(timer, cc.v2(_this.node.x, -_this.node.height + 840)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 800)), cc.moveTo(0.1, cc.v2(_this.node.x, -_this.node.height + 840)), cc.callFunc(_this.rollCallBack.bind(_this))));
    }, 100);
  },
  getRandomId: function getRandomId() {
    var randomId = 0;

    while (randomId == 0) {
      if (this.mainObj.freeTimes > 0 || this.mainObj.stopFree) {
        randomId = Math.floor(Math.random() * 6 + 8);
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
      _this2.node.y = -_this2.node.height + 840;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9jYWlzaGVuZGFvXFxqc1xcQ1NEV2hlZWwuanMiXSwibmFtZXMiOlsiUk9MRU5VTSIsIlRJTUVNSU4iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIndoZWVsSWQiLCJleGNsdWRlSWQiLCJkaXNwbGF5TmFtZSIsIm9uTG9hZCIsImF1ZGlvIiwiZmluZCIsImdldENvbXBvbmVudCIsIm1haW5PYmoiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJ3aGVlbExpc3QiLCJzdGF0dXMiLCJsYXN0UmVzdWx0Iiwicm9sZVBiTGlzdCIsInJvbGVJZExpc3QiLCJzdGFydCIsImluaXRXaGVlbCIsIm5vZGUiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImkiLCJhZGRSb2xlIiwiZ2V0UmFuZG9tSWQiLCJ5Iiwicm9sbEluZGV4IiwiY2xvc2VTaGluZSIsInN0YXJ0Um9sbCIsImFyZ3MiLCJzZXRUaW1lb3V0IiwidGltZXIiLCJhdXRvIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJtb3ZlVG8iLCJ2MiIsIngiLCJoZWlnaHQiLCJjYWxsRnVuYyIsInJvbGxDYWxsQmFjayIsImJpbmQiLCJyYW5kb21JZCIsImZyZWVUaW1lcyIsInN0b3BGcmVlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicm9sZVBiIiwibGVuZ3RoIiwiaWQiLCJwYiIsImluc3RhbnRpYXRlIiwicHVzaCIsImFkZENoaWxkIiwicGxheVN0b3BXaGVlbCIsInNsaWNlIiwic3RhdGVDYWxsQmFjayIsInN0b3BJbW1lZGlhdGVseSIsInN0b3BBbGxBY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU8sR0FBRyxFQUFoQixFQUFvQjs7QUFDcEIsSUFBTUMsT0FBTyxHQUFHLENBQWhCLEVBQW1COztBQUVuQkMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRSxDQUREO0FBRVJDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLENBREY7QUFFUEMsTUFBQUEsV0FBVyxFQUFFO0FBRk47QUFGSCxHQUhQO0FBV0xDLEVBQUFBLE1BWEssb0JBV0k7QUFDTCxTQUFLQyxLQUFMLEdBQWFSLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JDLFlBQWxCLENBQStCLFVBQS9CLENBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVYLEVBQUUsQ0FBQ1ksUUFBSCxDQUFZQyxRQUFaLEdBQXVCQyxjQUF2QixDQUFzQyxRQUF0QyxFQUFnREosWUFBaEQsQ0FBNkQsU0FBN0QsQ0FBZjtBQUNBLFNBQUtDLE9BQUwsQ0FBYUksU0FBYixDQUF1QixLQUFLWCxPQUE1QixJQUF1QyxJQUF2QztBQUNBLFNBQUtZLE1BQUwsR0FBYyxDQUFkLENBSkssQ0FJWTs7QUFDakIsU0FBS0MsVUFBTCxHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBQWxCLENBTEssQ0FLOEI7O0FBQ25DLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEIsQ0FOSyxDQU1pQjs7QUFDdEIsU0FBS0MsVUFBTCxHQUFrQixFQUFsQixDQVBLLENBT2lCO0FBQ3pCLEdBbkJJO0FBcUJMQyxFQUFBQSxLQXJCSyxtQkFxQkc7QUFDSjtBQUNBLFNBQUtDLFNBQUw7QUFDSCxHQXhCSTtBQTBCTEEsRUFBQUEsU0ExQkssdUJBMEJPO0FBQ1IsU0FBS0gsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLRyxJQUFMLENBQVVDLGlCQUFWOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzFCLE9BQU8sR0FBRyxDQUE5QixFQUFpQzBCLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsV0FBS0MsT0FBTCxDQUFhLEtBQUtDLFdBQUwsRUFBYjtBQUNIOztBQUNELFNBQUtELE9BQUwsQ0FBYSxLQUFLQyxXQUFMLEVBQWI7QUFDQSxTQUFLSixJQUFMLENBQVVLLENBQVYsR0FBYyxDQUFDLEdBQWY7QUFDQSxTQUFLaEIsT0FBTCxDQUFhaUIsU0FBYjtBQUNBLFNBQUtqQixPQUFMLENBQWFrQixVQUFiO0FBQ0gsR0FyQ0k7QUF1Q0xDLEVBQUFBLFNBdkNLLHVCQXVDYztBQUFBOztBQUNmLFNBQUtkLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0UsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLRyxJQUFMLENBQVVDLGlCQUFWO0FBQ0EsU0FBS0QsSUFBTCxDQUFVSyxDQUFWLEdBQWMsQ0FBQyxHQUFmOztBQUNBLFNBQUssSUFBSUgsQ0FBVCxJQUFjLEtBQUtQLFVBQW5CLEVBQStCO0FBQzNCLFdBQUtBLFVBQUwsQ0FBZ0JPLENBQWhCLElBQXFCLEtBQUtQLFVBQUwsQ0FBZ0JPLENBQWhCLEtBQXNCLENBQXRCLEdBQTBCLEtBQUtFLFdBQUwsRUFBMUIsR0FBK0MsS0FBS1QsVUFBTCxDQUFnQk8sQ0FBaEIsQ0FBcEU7QUFDQSxXQUFLQyxPQUFMLENBQWEsS0FBS1IsVUFBTCxDQUFnQk8sQ0FBaEIsQ0FBYjtBQUNIOztBQUNELFNBQUssSUFBSUEsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBRzFCLE9BQU8sR0FBRyxDQUE5QixFQUFpQzBCLEVBQUMsRUFBbEMsRUFBc0M7QUFDbEMsV0FBS0MsT0FBTCxDQUFhLEtBQUtDLFdBQUwsRUFBYjtBQUNIOztBQVpjLHNDQUFOSyxJQUFNO0FBQU5BLE1BQUFBLElBQU07QUFBQTs7QUFhZixTQUFLLElBQUlQLEdBQVQsSUFBY08sSUFBZCxFQUFvQjtBQUNoQixXQUFLTixPQUFMLENBQWFNLElBQUksQ0FBQ1AsR0FBRCxDQUFqQjtBQUNIOztBQUNELFNBQUtDLE9BQUwsQ0FBYSxLQUFLQyxXQUFMLEVBQWI7QUFDQU0sSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixVQUFJQyxLQUFLLEdBQUdsQyxPQUFPLEdBQUcsS0FBSSxDQUFDSyxPQUFMLEdBQWUsR0FBckM7QUFDQTZCLE1BQUFBLEtBQUssR0FBRyxDQUFDLEtBQUksQ0FBQ3RCLE9BQUwsQ0FBYXVCLElBQWQsR0FBcUJuQyxPQUFyQixHQUErQmtDLEtBQXZDOztBQUNBLE1BQUEsS0FBSSxDQUFDWCxJQUFMLENBQVVhLFNBQVYsQ0FDSW5DLEVBQUUsQ0FBQ29DLFFBQUgsQ0FDSXBDLEVBQUUsQ0FBQ3FDLFNBQUgsQ0FBYSxHQUFiLENBREosRUFFSXJDLEVBQUUsQ0FBQ3NDLE1BQUgsQ0FBVUwsS0FBVixFQUFpQmpDLEVBQUUsQ0FBQ3VDLEVBQUgsQ0FBTSxLQUFJLENBQUNqQixJQUFMLENBQVVrQixDQUFoQixFQUFtQixDQUFDLEtBQUksQ0FBQ2xCLElBQUwsQ0FBVW1CLE1BQVgsR0FBb0IsR0FBdkMsQ0FBakIsQ0FGSixFQUdJekMsRUFBRSxDQUFDc0MsTUFBSCxDQUFVLEdBQVYsRUFBZXRDLEVBQUUsQ0FBQ3VDLEVBQUgsQ0FBTSxLQUFJLENBQUNqQixJQUFMLENBQVVrQixDQUFoQixFQUFtQixDQUFDLEtBQUksQ0FBQ2xCLElBQUwsQ0FBVW1CLE1BQVgsR0FBb0IsR0FBdkMsQ0FBZixDQUhKLEVBSUl6QyxFQUFFLENBQUNzQyxNQUFILENBQVUsR0FBVixFQUFldEMsRUFBRSxDQUFDdUMsRUFBSCxDQUFNLEtBQUksQ0FBQ2pCLElBQUwsQ0FBVWtCLENBQWhCLEVBQW1CLENBQUMsS0FBSSxDQUFDbEIsSUFBTCxDQUFVbUIsTUFBWCxHQUFvQixHQUF2QyxDQUFmLENBSkosRUFLSXpDLEVBQUUsQ0FBQzBDLFFBQUgsQ0FBWSxLQUFJLENBQUNDLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLEtBQXZCLENBQVosQ0FMSixDQURKO0FBU0gsS0FaUyxFQVlQLEdBWk8sQ0FBVjtBQWFILEdBckVJO0FBdUVMbEIsRUFBQUEsV0F2RUsseUJBdUVTO0FBQ1YsUUFBSW1CLFFBQVEsR0FBRyxDQUFmOztBQUNBLFdBQU9BLFFBQVEsSUFBSSxDQUFuQixFQUFzQjtBQUNsQixVQUFJLEtBQUtsQyxPQUFMLENBQWFtQyxTQUFiLEdBQXlCLENBQXpCLElBQThCLEtBQUtuQyxPQUFMLENBQWFvQyxRQUEvQyxFQUF5RDtBQUNyREYsUUFBQUEsUUFBUSxHQUFHRyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLENBQWhCLEdBQW9CLENBQS9CLENBQVg7QUFDSCxPQUZELE1BRU87QUFDSEwsUUFBQUEsUUFBUSxHQUFHRyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLE1BQWlCLEtBQUt2QyxPQUFMLENBQWF3QyxNQUFiLENBQW9CQyxNQUFwQixHQUE2QixDQUE5QyxJQUFtRCxDQUE5RCxDQUFYO0FBQ0g7O0FBQ0RQLE1BQUFBLFFBQVEsR0FBR0EsUUFBUSxJQUFJLEtBQUt4QyxTQUFqQixHQUE2QixDQUE3QixHQUFpQ3dDLFFBQTVDO0FBQ0g7O0FBQUE7QUFDRCxXQUFPQSxRQUFQO0FBQ0gsR0FsRkk7QUFvRkxwQixFQUFBQSxPQXBGSyxtQkFvRkc0QixFQXBGSCxFQW9GTztBQUNSLFFBQUlDLEVBQUUsR0FBR3RELEVBQUUsQ0FBQ3VELFdBQUgsQ0FBZSxLQUFLNUMsT0FBTCxDQUFhd0MsTUFBYixDQUFvQkUsRUFBcEIsQ0FBZixDQUFUO0FBQ0EsU0FBS25DLFVBQUwsQ0FBZ0JzQyxJQUFoQixDQUFxQkYsRUFBckI7QUFDQSxTQUFLbkMsVUFBTCxDQUFnQnFDLElBQWhCLENBQXFCSCxFQUFyQjtBQUNBLFNBQUsvQixJQUFMLENBQVVtQyxRQUFWLENBQW1CSCxFQUFuQjtBQUNILEdBekZJO0FBMkZMWCxFQUFBQSxZQTNGSywwQkEyRlU7QUFDWCxTQUFLbkMsS0FBTCxDQUFXa0QsYUFBWDtBQUNBLFNBQUt6QyxVQUFMLEdBQWtCLEtBQUtFLFVBQUwsQ0FBZ0J3QyxLQUFoQixDQUFzQixDQUFDLENBQXZCLENBQWxCO0FBQ0EsU0FBSzNDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0wsT0FBTCxDQUFhaUQsYUFBYjtBQUNILEdBaEdJO0FBa0dMQyxFQUFBQSxlQWxHSyw2QkFrR2E7QUFBQTs7QUFDZCxTQUFLNUMsVUFBTCxHQUFrQixLQUFLRSxVQUFMLENBQWdCd0MsS0FBaEIsQ0FBc0IsQ0FBQyxDQUF2QixDQUFsQjtBQUNBLFNBQUtyQyxJQUFMLENBQVV3QyxjQUFWO0FBQ0E5QixJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLE1BQUEsTUFBSSxDQUFDVixJQUFMLENBQVVLLENBQVYsR0FBYyxDQUFDLE1BQUksQ0FBQ0wsSUFBTCxDQUFVbUIsTUFBWCxHQUFvQixHQUFsQztBQUNILEtBRlMsRUFFUCxFQUZPLENBQVY7QUFHQSxTQUFLekIsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLTCxPQUFMLENBQWFpRCxhQUFiO0FBQ0g7QUExR0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUk9MRU5VTSA9IDQwOyAvL+avj+S4gOi9rueahOinkuiJsuaVsOmHj1xyXG5jb25zdCBUSU1FTUlOID0gMTsgLy/nrKzkuIDova7mkYflpZbml7bpl7RcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgd2hlZWxJZDogMCxcclxuICAgICAgICBleGNsdWRlSWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICfkuI3kvJrlh7rnjrDnmoTmlbDlrZdpZCcsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0NTREF1ZGlvJyk7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdDU0RNYWluJyk7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLndoZWVsTGlzdFt0aGlzLndoZWVsSWRdID0gdGhpcztcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7IC8vMOWBnOatoiAx6L2sIFxyXG4gICAgICAgIHRoaXMubGFzdFJlc3VsdCA9IFswLCAwLCAwLCAwLCAwXTsgLy/kuK3pl7TkuInkvY3mmK/kuIrkuIDlsYDnu5Pmnpwg6aaW5L2N5pyr5bC+5piv5Li65LqG6Ziy5q2i6Zyy5Ye66YOo5YiG6L2s6LW35p2l5LiN5LiA5qC3IFxyXG4gICAgICAgIHRoaXMucm9sZVBiTGlzdCA9IFtdOyAvL3JvbGVcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QgPSBbXTsgLy9yb2xlIElEXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Zy65pmvcm9sZVxyXG4gICAgICAgIHRoaXMuaW5pdFdoZWVsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRXaGVlbCgpIHtcclxuICAgICAgICB0aGlzLnJvbGVQYkxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPTEVOVU0gLSA5OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSb2xlKHRoaXMuZ2V0UmFuZG9tSWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkUm9sZSh0aGlzLmdldFJhbmRvbUlkKCkpO1xyXG4gICAgICAgIHRoaXMubm9kZS55ID0gLTIwMDtcclxuICAgICAgICB0aGlzLm1haW5PYmoucm9sbEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLmNsb3NlU2hpbmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRSb2xsKC4uLmFyZ3MpIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgdGhpcy5yb2xlUGJMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xlSWRMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAtMjAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5sYXN0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFJlc3VsdFtpXSA9IHRoaXMubGFzdFJlc3VsdFtpXSA9PSAwID8gdGhpcy5nZXRSYW5kb21JZCgpIDogdGhpcy5sYXN0UmVzdWx0W2ldO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJvbGUodGhpcy5sYXN0UmVzdWx0W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBST0xFTlVNIC0gOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZSh0aGlzLmdldFJhbmRvbUlkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpIGluIGFyZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSb2xlKGFyZ3NbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFJvbGUodGhpcy5nZXRSYW5kb21JZCgpKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRpbWVyID0gVElNRU1JTiArIHRoaXMud2hlZWxJZCAqIDAuMjtcclxuICAgICAgICAgICAgdGltZXIgPSAhdGhpcy5tYWluT2JqLmF1dG8gPyBUSU1FTUlOIDogdGltZXI7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4yKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8odGltZXIsIGNjLnYyKHRoaXMubm9kZS54LCAtdGhpcy5ub2RlLmhlaWdodCArIDg0MCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjEsIGNjLnYyKHRoaXMubm9kZS54LCAtdGhpcy5ub2RlLmhlaWdodCArIDgwMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjEsIGNjLnYyKHRoaXMubm9kZS54LCAtdGhpcy5ub2RlLmhlaWdodCArIDg0MCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKHRoaXMucm9sbENhbGxCYWNrLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tSWQoKSB7XHJcbiAgICAgICAgbGV0IHJhbmRvbUlkID0gMDtcclxuICAgICAgICB3aGlsZSAocmFuZG9tSWQgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYWluT2JqLmZyZWVUaW1lcyA+IDAgfHwgdGhpcy5tYWluT2JqLnN0b3BGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21JZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYgKyA4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMubWFpbk9iai5yb2xlUGIubGVuZ3RoIC0gMSkgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYW5kb21JZCA9IHJhbmRvbUlkID09IHRoaXMuZXhjbHVkZUlkID8gMCA6IHJhbmRvbUlkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJhbmRvbUlkO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRSb2xlKGlkKSB7XHJcbiAgICAgICAgbGV0IHBiID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYWluT2JqLnJvbGVQYltpZF0pO1xyXG4gICAgICAgIHRoaXMucm9sZVBiTGlzdC5wdXNoKHBiKTtcclxuICAgICAgICB0aGlzLnJvbGVJZExpc3QucHVzaChpZCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBiKTtcclxuICAgIH0sXHJcblxyXG4gICAgcm9sbENhbGxCYWNrKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheVN0b3BXaGVlbCgpO1xyXG4gICAgICAgIHRoaXMubGFzdFJlc3VsdCA9IHRoaXMucm9sZUlkTGlzdC5zbGljZSgtNSk7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMubWFpbk9iai5zdGF0ZUNhbGxCYWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVseSgpIHtcclxuICAgICAgICB0aGlzLmxhc3RSZXN1bHQgPSB0aGlzLnJvbGVJZExpc3Quc2xpY2UoLTUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IC10aGlzLm5vZGUuaGVpZ2h0ICsgODQwO1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5tYWluT2JqLnN0YXRlQ2FsbEJhY2soKTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
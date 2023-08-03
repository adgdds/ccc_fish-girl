
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/senlinwuhui/SH_Network.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6e202NmXPtCD4EhkMtY+Xcm', 'SH_Network');
// Script/senlinwuhui/SH_Network.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.gameMain = this.node.getComponent('SH_Main');
    this.sign = this.playerInfo.gameSign;
    this.userId = this.playerInfo.playerId;
    this.port = ':15201';
    this.timer = 0; //连接网络

    if (cc.sys.isNative) {
      this.socket = SocketIO.connect(Lhjconfig.Server_IP + this.port);
    } else {
      var socket = require("socket-io");

      this.socket = socket(Lhjconfig.Server_IP + this.port);
    }

    this.registEvent();
  },
  //BetPool
  registEvent: function registEvent() {
    var _this = this;

    this.socket.on("connected", function (ret) {
      cc.log('connected:' + ret);

      if (ret) {
        _this.socket.emit("LoginGame", JSON.stringify({
          userid: _this.userId,
          //用户ID
          gametype: 11,
          //游戏类型
          sign: _this.sign //签名

        }));
      }
    });
    this.socket.on("loginGameResult", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('游戏登陆成功=======================' + JSON.stringify(result));
      XYZB_LOBBYNET.disconnect();

      if (result.resultid) {
        //游戏登录成功
        _this.userName = result.Obj.nickname;
        _this.userCoin = result.Obj.score / 100;
        _this.headUrl = result.Obj.headimgurl;
        _this.gameTime = result.Obj.gameTime;
        _this.gameMain.colorList = [].concat(result.game_color_list);

        _this.gameMain.showInfo();

        _this.gameMain.loginInitColor();

        _this.gameMain.showNextTime();

        _this.socket.emit('getGameRecord');
      } else {
        cc.log(result.msg);
      }
    });
    this.socket.on("BetStart", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('BetStart:', result);
      _this.gameMain.colorList = [].concat(result.game_color_list);
      _this.gameMain.betList = [].concat(result.game_odd);

      _this.socket.emit('getGameRecord');

      _this.timer = new Date().getTime() / 1000;

      _this.gameMain.startBets();
    });
    this.socket.on("OpenWinResult", function (ret) {
      cc.log('OpenWinResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      if (result.ResultCode) {
        _this.userCoin = result.score / 100;

        _this.gameMain.getResult(result);
      }
    });
    this.socket.on("lotteryResult", function (ret) {
      cc.log('lotteryResult:', ret);
    });
    this.socket.on("BetPool", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      console.log('BetPool' + JSON.stringify(result));
      var index = 0;

      for (var i in _this.gameMain.otherOdd) {
        for (var j in _this.gameMain.otherOdd[i]) {
          _this.gameMain.otherOdd[i][j] = result.result[index];
          index++;
        }
      }

      _this.gameMain.rfOdds();
    });
    this.socket.on("getGameRecordResult", function (ret) {
      cc.log('getGameRecordResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      var historyList = _this.gameMain.historyNode.children;

      for (var i in historyList) {
        historyList[i].active = false;
      }

      if (result.game_record.length > 0) {
        for (var _i in result.game_record) {
          var color = result.game_record[_i].win_color;
          var aid = result.game_record[_i].win_card;
          var sp = null;

          if (color == 0) {
            sp = _this.gameMain.redAnimSp[aid];
          } else if (color == 1) {
            sp = _this.gameMain.greenAnimSp[aid];
          } else if (color == 2) {
            sp = _this.gameMain.yellowAnimSp[aid];
          }

          var j = result.game_record.length - 1 - _i;
          historyList[j].active = true;
          historyList[j].getComponent(cc.Sprite).spriteFrame = sp;
        }
      }
    });
    this.socket.on("BetStop", function (ret) {
      cc.log('BetStop:', ret);

      _this.gameMain.closeBets();
    });
  },
  changeResultJSON_Function: function changeResultJSON_Function(ret) {
    if (cc.sys.isNative) {
      return JSON.parse(ret);
    }

    return ret;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZW5saW53dWh1aVxcU0hfTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50Iiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiZ2FtZU1haW4iLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic2lnbiIsImdhbWVTaWduIiwidXNlcklkIiwicGxheWVySWQiLCJwb3J0IiwidGltZXIiLCJzeXMiLCJpc05hdGl2ZSIsInNvY2tldCIsIlNvY2tldElPIiwiY29ubmVjdCIsIkxoamNvbmZpZyIsIlNlcnZlcl9JUCIsInJlZ2lzdEV2ZW50Iiwib24iLCJyZXQiLCJsb2ciLCJlbWl0IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJpZCIsImdhbWV0eXBlIiwicmVzdWx0IiwiY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbiIsIlhZWkJfTE9CQllORVQiLCJkaXNjb25uZWN0IiwicmVzdWx0aWQiLCJ1c2VyTmFtZSIsIk9iaiIsIm5pY2tuYW1lIiwidXNlckNvaW4iLCJzY29yZSIsImhlYWRVcmwiLCJoZWFkaW1ndXJsIiwiZ2FtZVRpbWUiLCJjb2xvckxpc3QiLCJnYW1lX2NvbG9yX2xpc3QiLCJzaG93SW5mbyIsImxvZ2luSW5pdENvbG9yIiwic2hvd05leHRUaW1lIiwibXNnIiwiYmV0TGlzdCIsImdhbWVfb2RkIiwiRGF0ZSIsImdldFRpbWUiLCJzdGFydEJldHMiLCJSZXN1bHRDb2RlIiwiZ2V0UmVzdWx0IiwiY29uc29sZSIsImluZGV4IiwiaSIsIm90aGVyT2RkIiwiaiIsInJmT2RkcyIsImhpc3RvcnlMaXN0IiwiaGlzdG9yeU5vZGUiLCJjaGlsZHJlbiIsImFjdGl2ZSIsImdhbWVfcmVjb3JkIiwibGVuZ3RoIiwiY29sb3IiLCJ3aW5fY29sb3IiLCJhaWQiLCJ3aW5fY2FyZCIsInNwIiwicmVkQW5pbVNwIiwiZ3JlZW5BbmltU3AiLCJ5ZWxsb3dBbmltU3AiLCJTcHJp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QXhCO0FBQ0FILFVBQUFBLFdBQVcsQ0FBQ0YsQ0FBRCxDQUFYLENBQWVyRCxZQUFmLENBQTRCVCxFQUFFLENBQUM4RSxNQUEvQixFQUF1Q0MsV0FBdkMsR0FBcURMLEVBQXJEO0FBQ0g7QUFDSjtBQUNKLEtBeEJEO0FBMEJBLFNBQUt4RCxNQUFMLENBQVlNLEVBQVosQ0FBZSxTQUFmLEVBQTBCLFVBQUFDLEdBQUcsRUFBSTtBQUM3QnpCLE1BQUFBLEVBQUUsQ0FBQzBCLEdBQUgsQ0FBTyxVQUFQLEVBQW1CRCxHQUFuQjs7QUFDQSxNQUFBLEtBQUksQ0FBQ2xCLFFBQUwsQ0FBY3lFLFNBQWQ7QUFDSCxLQUhEO0FBSUgsR0FySEk7QUF1SEwvQyxFQUFBQSx5QkF2SEsscUNBdUhxQlIsR0F2SHJCLEVBdUgwQjtBQUMzQixRQUFJekIsRUFBRSxDQUFDZ0IsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLGFBQU9XLElBQUksQ0FBQ3FELEtBQUwsQ0FBV3hELEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSDtBQTVISSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFpbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1NIX01haW4nKTtcclxuICAgICAgICB0aGlzLnNpZ24gPSB0aGlzLnBsYXllckluZm8uZ2FtZVNpZ247XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLnBsYXllckluZm8ucGxheWVySWQ7XHJcbiAgICAgICAgdGhpcy5wb3J0ID0gJzoxNTIwMSc7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XHJcbiAgICAgICAgLy/ov57mjqXnvZHnu5xcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gU29ja2V0SU8uY29ubmVjdChMaGpjb25maWcuU2VydmVyX0lQICsgdGhpcy5wb3J0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc29ja2V0ID0gcmVxdWlyZShcInNvY2tldC1pb1wiKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQoTGhqY29uZmlnLlNlcnZlcl9JUCArIHRoaXMucG9ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVnaXN0RXZlbnQoKTtcclxuICAgIH0sXHJcbiAgICAvL0JldFBvb2xcclxuICAgIHJlZ2lzdEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKFwiY29ubmVjdGVkXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnY29ubmVjdGVkOicgKyByZXQpO1xyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KFwiTG9naW5HYW1lXCIsIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHRoaXMudXNlcklkLCAvL+eUqOaIt0lEXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZXR5cGU6IDExLCAvL+a4uOaIj+exu+Wei1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ246IHRoaXMuc2lnbiAvL+etvuWQjVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKFwibG9naW5HYW1lUmVzdWx0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgY2MubG9nKCfmuLjmiI/nmbvpmYbmiJDlip89PT09PT09PT09PT09PT09PT09PT09PScgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgWFlaQl9MT0JCWU5FVC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0aWQpIHsgLy/muLjmiI/nmbvlvZXmiJDlip9cclxuICAgICAgICAgICAgICAgIHRoaXMudXNlck5hbWUgPSByZXN1bHQuT2JqLm5pY2tuYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ29pbiA9IHJlc3VsdC5PYmouc2NvcmUgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRVcmwgPSByZXN1bHQuT2JqLmhlYWRpbWd1cmw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVUaW1lID0gcmVzdWx0Lk9iai5nYW1lVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1haW4uY29sb3JMaXN0ID0gWy4uLnJlc3VsdC5nYW1lX2NvbG9yX2xpc3RdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5zaG93SW5mbygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5sb2dpbkluaXRDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5zaG93TmV4dFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2dldEdhbWVSZWNvcmQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhyZXN1bHQubXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcIkJldFN0YXJ0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgY2MubG9nKCdCZXRTdGFydDonLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVNYWluLmNvbG9yTGlzdCA9IFsuLi5yZXN1bHQuZ2FtZV9jb2xvcl9saXN0XTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5iZXRMaXN0ID0gWy4uLnJlc3VsdC5nYW1lX29kZF07XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2dldEdhbWVSZWNvcmQnKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5zdGFydEJldHMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oXCJPcGVuV2luUmVzdWx0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnT3BlbldpblJlc3VsdDonLCByZXQpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ29pbiA9IHJlc3VsdC5zY29yZSAvIDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1haW4uZ2V0UmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oXCJsb3R0ZXJ5UmVzdWx0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnbG90dGVyeVJlc3VsdDonLCByZXQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcIkJldFBvb2xcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQmV0UG9vbCcgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmdhbWVNYWluLm90aGVyT2RkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIHRoaXMuZ2FtZU1haW4ub3RoZXJPZGRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVNYWluLm90aGVyT2RkW2ldW2pdID0gcmVzdWx0LnJlc3VsdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVNYWluLnJmT2RkcygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcImdldEdhbWVSZWNvcmRSZXN1bHRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgY2MubG9nKCdnZXRHYW1lUmVjb3JkUmVzdWx0OicsIHJldCk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgbGV0IGhpc3RvcnlMaXN0ID0gdGhpcy5nYW1lTWFpbi5oaXN0b3J5Tm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBoaXN0b3J5TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeUxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5nYW1lX3JlY29yZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHJlc3VsdC5nYW1lX3JlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHJlc3VsdC5nYW1lX3JlY29yZFtpXS53aW5fY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFpZCA9IHJlc3VsdC5nYW1lX3JlY29yZFtpXS53aW5fY2FyZDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gdGhpcy5nYW1lTWFpbi5yZWRBbmltU3BbYWlkXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbG9yID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSB0aGlzLmdhbWVNYWluLmdyZWVuQW5pbVNwW2FpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2xvciA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gdGhpcy5nYW1lTWFpbi55ZWxsb3dBbmltU3BbYWlkXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGogPSByZXN1bHQuZ2FtZV9yZWNvcmQubGVuZ3RoIC0gMSAtIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeUxpc3Rbal0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5TGlzdFtqXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKFwiQmV0U3RvcFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICBjYy5sb2coJ0JldFN0b3A6JywgcmV0KTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5jbG9zZUJldHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LFxyXG59KTsiXX0=
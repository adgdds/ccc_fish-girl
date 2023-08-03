
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/game_saima/sm_Network.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27f91OJQ0dCpYhw4Vi1HCDY', 'sm_Network');
// Texture/game_saima/sm_Network.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    this.playerInfo = require("PlayerInfo").getInstant;
    this.gameMain = this.node.getComponent('saima');
    this.sign = this.playerInfo.gameSign;
    this.userId = this.playerInfo.playerId;
    this.port = ':16006';
    this.time_betClose = 0;
    this.time_openPrice = 0;
    this.time_oneGame = 0; //连接网络

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

      if (result.resultid) {
        //游戏登录成功
        _this.userName = result.Obj.nickname;
        _this.userCoin = result.Obj.score / _this.playerInfo.exchangeRate;
        _this.headUrl = result.Obj.headimgurl;
        _this.time_betClose = result.Obj.time_betClose;
        _this.time_openPrice = result.Obj.time_openPrice;
        _this.time_oneGame = result.Obj.time_oneGame;

        _this.gameMain.showInfo(result.Obj);

        _this.socket.emit('getGameRecord');
      } else {
        cc.log(result.msg);
      }
    });
    this.socket.on("BetStart", function (ret) {
      var result = _this.changeResultJSON_Function(ret);

      cc.log('BetStart:', result);

      _this.socket.emit('getGameRecord');

      _this.gameMain.startBets(result.obj);
    });
    this.socket.on("OpenWinResult", function (ret) {
      cc.log('OpenWinResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      if (result.ResultCode) {
        _this.userCoin = result.score / _this.playerInfo.exchangeRate;

        _this.gameMain.getResult(result);
      }
    });
    this.socket.on("lotteryResult", function (ret) {
      cc.log('lotteryResult:', ret);
    });
    this.socket.on("BetPool", function (ret) {
      var result = _this.changeResultJSON_Function(ret); // console.log('BetPool' + JSON.stringify(result));


      var index = 0;

      for (var i in _this.gameMain.otherOdd) {
        for (var j in _this.gameMain.otherOdd[i]) {
          _this.gameMain.otherOdd[i][j] = result.result[index];
          index++;
        }
      }
    });
    this.socket.on("getGameRecordResult", function (ret) {
      cc.log('getGameRecordResult:', ret);

      var result = _this.changeResultJSON_Function(ret);

      if (result.game_record.length > 0) {
        _this.gameMain.gameRecord = result.game_record;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcZ2FtZV9zYWltYVxcc21fTmV0d29yay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50Iiwib25Mb2FkIiwicGxheWVySW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50IiwiZ2FtZU1haW4iLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic2lnbiIsImdhbWVTaWduIiwidXNlcklkIiwicGxheWVySWQiLCJwb3J0IiwidGltZV9iZXRDbG9zZSIsInRpbWVfb3BlblByaWNlIiwidGltZV9vbmVHYW1lIiwic3lzIiwiaXNOYXRpdmUiLCJzb2NrZXQiLCJTb2NrZXRJTyIsImNvbm5lY3QiLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJyZWdpc3RFdmVudCIsIm9uIiwicmV0IiwibG9nIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyaWQiLCJnYW1ldHlwZSIsInJlc3VsdCIsImNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24iLCJyZXN1bHRpZCIsInVzZXJOYW1lIiwiT2JqIiwibmlja25hbWUiLCJ1c2VyQ29pbiIsInNjb3JlIiwiZXhjaGFuZ2VSYXRlIiwiaGVhZFVybCIsImhlYWRpbWd1cmwiLCJzaG93SW5mbyIsIm1zZyIsInN0YXJ0QmV0cyIsIm9iaiIsIlJlc3VsdENvZGUiLCJnZXRSZXN1bHQiLCJpbmRleCIsImkiLCJvdGhlck9kZCIsImoiLCJnYW1lX3JlY29yZCIsImxlbmd0aCIsImdhbWVSZWNvcmQiLCJjbG9zZUJldHMiLCJwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsTUFISyxvQkFHSTtBQUNMLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQXhDO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFLQyxJQUFMLENBQVVD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QzZCLEtBQUwsQ0FBV2hDLEdBQVgsQ0FBUDtBQUNIOztBQUNELFdBQU9BLEdBQVA7QUFDSDtBQXRHSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFpbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ3NhaW1hJyk7XHJcbiAgICAgICAgdGhpcy5zaWduID0gdGhpcy5wbGF5ZXJJbmZvLmdhbWVTaWduO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkO1xyXG4gICAgICAgIHRoaXMucG9ydCA9ICc6MTYwMDYnO1xyXG4gICAgICAgIHRoaXMudGltZV9iZXRDbG9zZSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lX29wZW5QcmljZSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lX29uZUdhbWUgPSAwO1xyXG4gICAgICAgIC8v6L+e5o6l572R57ucXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IFNvY2tldElPLmNvbm5lY3QoTGhqY29uZmlnLlNlcnZlcl9JUCArIHRoaXMucG9ydCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHNvY2tldCA9IHJlcXVpcmUoXCJzb2NrZXQtaW9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0KExoamNvbmZpZy5TZXJ2ZXJfSVAgKyB0aGlzLnBvcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZ2lzdEV2ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy9CZXRQb29sXHJcbiAgICByZWdpc3RFdmVudCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcImNvbm5lY3RlZFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICBjYy5sb2coJ2Nvbm5lY3RlZDonICsgcmV0KTtcclxuICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdChcIkxvZ2luR2FtZVwiLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB0aGlzLnVzZXJJZCwgLy/nlKjmiLdJRFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWV0eXBlOiAxMSwgLy/muLjmiI/nsbvlnotcclxuICAgICAgICAgICAgICAgICAgICBzaWduOiB0aGlzLnNpZ24gLy/nrb7lkI1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcImxvZ2luR2FtZVJlc3VsdFwiLCByZXQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgIGNjLmxvZygn5ri45oiP55m76ZmG5oiQ5YqfPT09PT09PT09PT09PT09PT09PT09PT0nICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0aWQpIHsgLy/muLjmiI/nmbvlvZXmiJDlip9cclxuICAgICAgICAgICAgICAgIHRoaXMudXNlck5hbWUgPSByZXN1bHQuT2JqLm5pY2tuYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ29pbiA9IHJlc3VsdC5PYmouc2NvcmUgLyB0aGlzLnBsYXllckluZm8uZXhjaGFuZ2VSYXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkVXJsID0gcmVzdWx0Lk9iai5oZWFkaW1ndXJsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lX2JldENsb3NlID0gcmVzdWx0Lk9iai50aW1lX2JldENsb3NlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lX29wZW5QcmljZSA9IHJlc3VsdC5PYmoudGltZV9vcGVuUHJpY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVfb25lR2FtZSA9IHJlc3VsdC5PYmoudGltZV9vbmVHYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTWFpbi5zaG93SW5mbyhyZXN1bHQuT2JqKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2dldEdhbWVSZWNvcmQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhyZXN1bHQubXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcIkJldFN0YXJ0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgY2MubG9nKCdCZXRTdGFydDonLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdnZXRHYW1lUmVjb3JkJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1haW4uc3RhcnRCZXRzKHJlc3VsdC5vYmopO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcIk9wZW5XaW5SZXN1bHRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgY2MubG9nKCdPcGVuV2luUmVzdWx0OicsIHJldCk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJDb2luID0gcmVzdWx0LnNjb3JlIC8gdGhpcy5wbGF5ZXJJbmZvLmV4Y2hhbmdlUmF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1haW4uZ2V0UmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oXCJsb3R0ZXJ5UmVzdWx0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnbG90dGVyeVJlc3VsdDonLCByZXQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcIkJldFBvb2xcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQmV0UG9vbCcgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmdhbWVNYWluLm90aGVyT2RkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIHRoaXMuZ2FtZU1haW4ub3RoZXJPZGRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVNYWluLm90aGVyT2RkW2ldW2pdID0gcmVzdWx0LnJlc3VsdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcImdldEdhbWVSZWNvcmRSZXN1bHRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgY2MubG9nKCdnZXRHYW1lUmVjb3JkUmVzdWx0OicsIHJldCk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5nYW1lX3JlY29yZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVNYWluLmdhbWVSZWNvcmQgPSByZXN1bHQuZ2FtZV9yZWNvcmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oXCJCZXRTdG9wXCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnQmV0U3RvcDonLCByZXQpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVNYWluLmNsb3NlQmV0cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcbn0pOyJdfQ==
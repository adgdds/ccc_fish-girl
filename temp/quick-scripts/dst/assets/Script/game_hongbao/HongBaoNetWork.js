
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game_hongbao/HongBaoNetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '319feRnDwVJfqqYmu6rcWJZ', 'HongBaoNetWork');
// Script/game_hongbao/HongBaoNetWork.js

"use strict";

/**
 * 红包达人SOCKET通讯
 */
var HongBaoNetWork = function () {
  /**
   * 单例模式
   */
  function getInstant() {
    var _instance;

    if (_instance === undefined) {
      _instance = new Single();
    }

    return _instance;
  }
  /**
   * 逻辑层
   */


  function Single() {
    this.lobbyMain = null;
    this.gameMain = null;
    this.gameSocket = null;
    this.playerInfo = null;
    this.tableId = -1;
    this.seatId = -1;
    this.playerHead = null;
    this.tax = -1;
    this.addScore = 0;
    this.eventOn = false;
    /**
     * 初始化
     */

    this.init = function () {
      this.playerInfo = require("PlayerInfo").getInstant;
    },
    /**
     * 进入游戏
     * @param {*} loginIP 
     * @param {*} port 
     * @param {*} userid 
     * @param {*} sign 
     */
    this.loginGame_Function = function (loginIP, port, userid, sign) {
      console.log('loginIP:', loginIP);
      console.log('port:', port);
      console.log('userid:', userid);
      console.log('sign:', sign);
      loginIP = "60.205.191.87";
      var self = this;
      var socket = null;

      if (cc.sys.isNative) {
        self.gameSocket = SocketIO.connect(loginIP + ":" + port);
      } else {
        socket = require("socket-io");
        self.gameSocket = socket(loginIP + ":" + port);
      } //用户连接游戏服务器


      this.connectServer_Function(userid, sign); //连接失败

      this.gameSocket.on("error", function () {
        cc.sys.isBrowser && self.gameSocket.close();
        self.gameSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("hongbao");
      }), //连接失败
      this.gameSocket.on("connect_error", function () {
        cc.sys.isBrowser && self.gameSocket.close();
        self.gameSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("hongbao");
      }); //连接超时

      this.gameSocket.on("connect_timeout", function () {
        cc.sys.isBrowser && self.gameSocket.close();
        self.gameSocket = null;
        self.playerInfo.gameDisconnect || self.lobbyMain.contentGameServerFail_Function("hongbao");
      }); //连接

      this.gameSocket.on("connected", function (ret) {
        if (ret) {
          try {
            //进入游戏
            self.gameSocket.emit("LoginGame", {
              userid: userid,
              //用户ID
              nickname: self.playerInfo.playerName,
              headimgurl: self.playerInfo.playerHeadId,
              gametype: 4,
              //游戏类型
              sign: sign //签名

            });
          } catch (error) {}
        }
      });
    };
    /**
     * 连接红包达人服务器
     * @param {*} userid 
     * @param {*} sign 
     */

    this.connectServer_Function = function (userid, sign) {
      var self = this;
      this.gameSocket && this.gameSocket.on("loginGameResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        console.log("红包达人登录游戏返回：", result);

        if (result.resultid) {
          //游戏登录成功
          self.playerInfo.playerCoin = result.Obj.score;
          self.lobbyMain.getComponent("LobbyMain").netWork.socket.disconnect();
          self.loginRoom_Function();
          self.bindSocketCallback();
        } else {
          //游戏登录失败
          self.lobbyMain.getComponent("LobbyMain").loadGameScene = false;
          self.lobbyMain.getComponent("LobbyMain").showMessagebox_Function(result.msg, 1, 4);
          self.eventOn = true;
        }
      });
    };
    /**
     * 进入房间
     */


    this.loginRoom_Function = function () {
      this.lobbyMain.bg_Black.active = true;
      this.playerInfo.gameDisconnect = false;
      this.playerInfo.gameName = "hongbao";
      cc.audioEngine.stopAll();
      cc.find("Canvas/buttonCtrl").getComponent("LobbyButtonClick").QieHuanScene_normal("Game_hongbao");
    };
    /**
     * 红包达人长连通讯
     */


    this.bindSocketCallback = function () {
      var self = this;
      /**
      * 红包场次信息
      */

      this.gameSocket.on("hbInit", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.gameInit(result);
      });
      /**
      * 获取红包列表
      */

      this.gameSocket.on("hongbaoList", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.updateHongBaoList(result);
      });
      /**
      * 领红包结果返回
      */

      this.gameSocket.on("getHbResult", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.getHongBao(result);
      });
      /**
       * 本局金币结算回调,输了为负数
       */

      this.gameSocket.on("open", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.billing_Function(result);
      });
      /**
       * 广播消息
       */

      this.gameSocket.on("hbTip", function (ret) {
        var result = self.changeResultJSON_Function(ret);
        self.gameMain.horseLamp(result);
      });
      /**
       * 金币不足,踢出房间
       */

      this.gameSocket.on("notEnouhtScore", function () {
        self.gameMain.noMoneyOut_Function();
      });
      /**
       * 长连接断开监听
       */

      this.gameSocket.on("disconnect", function (ret) {
        if (!self.gameMain.gameExit) {
          self.gameMain.disconnectNetWork_Function();
        }
      });
      this.gameSocket.on("noExit", function (ret) {
        ret = self.changeResultJSON_Function(ret);

        if (!!ret) {
          cc.find('Canvas/com_ingame_tips').active = true;
        } else {
          self.gameMain.gameExit = true;
          self.gameMain.exitGame_Function();
        }
      });
      this.gameSocket.on("CanExit", function (ret) {
        ret = self.changeResultJSON_Function(ret);
        console.log('canExit', ret.result);
        self.gameMain.com_Button.getChildByName("bt_Exit").active = ret.result; // cc.find('Canvas/com_exit_tips').active = ret.result;
      });
    },
    /**
     * 传递this作用域
     * @param {*} scene 来自LobbyMain.js
     */
    this.setLobbyMainObj_Function = function (scene) {
      this.lobbyMain = scene;
    },
    /**
     * 传递this作用域
     * @param {*} scene 来自hongbaoMain.js
     */
    this.sethongbaoObj_Function = function (scene) {
      this.gameMain = scene;
    },
    /**
     * 解析JSON数据
     * @param {*} ret 
     */
    this.changeResultJSON_Function = function (ret) {
      if (cc.sys.isNative) {
        return JSON.parse(ret);
      }

      return ret;
    }, this.init();
  }

  return {
    getInstant: new getInstant()
  };
}();

module.exports = HongBaoNetWork;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lX2hvbmdiYW9cXEhvbmdCYW9OZXRXb3JrLmpzIl0sIm5hbWVzIjpbIkhvbmdCYW9OZXRXb3JrIiwiZ2V0SW5zdGFudCIsIl9pbnN0YW5jZSIsInVuZGVmaW5lZCIsIlNpbmdsZSIsImxvYmJ5TWFpbiIsImdhbWVNYWluIiwiZ2FtZVNvY2tldCIsInBsYXllckluZm8iLCJ0YWJsZUlkIiwic2VhdElkIiwicGxheWVySGVhZCIsInRheCIsImFkZFNjb3JlIiwiZXZlbnRPbiIsImluaXQiLCJyZXF1aXJlIiwibG9naW5HYW1lX0Z1bmN0aW9uIiwibG9naW5JUCIsInBvcnQiLCJ1c2VyaWQiLCJzaWduIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJzb2NrZXQiLCJjYyIsInN5cyIsImlzTmF0aXZlIiwiU29ja2V0SU8iLCJjb25uZWN0IiwiY29ubmVjdFNlcnZlcl9GdW5jdGlvbiIsIm9uIiwiaXNCcm93c2VyIiwiY2xvc2UiLCJnYW1lRGlzY29ubmVjdCIsImNvbnRlbnRHYW1lU2VydmVyRmFpbF9GdW5jdGlvbiIsInJldCIsImVtaXQiLCJuaWNrbmFtZSIsInBsYXllck5hbWUiLCJoZWFkaW1ndXJsIiwicGxheWVySGVhZElkIiwiZ2FtZXR5cGUiLCJlcnJvciIsInJlc3VsdCIsImNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24iLCJyZXN1bHRpZCIsInBsYXllckNvaW4iLCJPYmoiLCJzY29yZSIsImdldENvbXBvbmVudCIsIm5ldFdvcmsiLCJkaXNjb25uZWN0IiwibG9naW5Sb29tX0Z1bmN0aW9uIiwiYmluZFNvY2tldENhbGxiYWNrIiwibG9hZEdhbWVTY2VuZSIsInNob3dNZXNzYWdlYm94X0Z1bmN0aW9uIiwibXNnIiwiYmdfQmxhY2siLCJhY3RpdmUiLCJnYW1lTmFtZSIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsImZpbmQiLCJRaWVIdWFuU2NlbmVfbm9ybWFsIiwiZ2FtZUluaXQiLCJ1cGRhdGVIb25nQmFvTGlzdCIsImdldEhvbmdCYW8iLCJiaWxsaW5nX0Z1bmN0aW9uIiwiaG9yc2VMYW1wIiwibm9Nb25leU91dF9GdW5jdGlvbiIsImdhbWVFeGl0IiwiZGlzY29ubmVjdE5ldFdvcmtfRnVuY3Rpb24iLCJleGl0R2FtZV9GdW5jdGlvbiIsImNvbV9CdXR0b24iLCJnZXRDaGlsZEJ5TmFtZSIsInNldExvYmJ5TWFpbk9ial9GdW5jdGlvbiIsInNjZW5lIiwic2V0aG9uZ2Jhb09ial9GdW5jdGlvbiIsIkpTT04iLCJwYXJzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsY0FBYyxHQUFJLFlBQVk7QUFDOUI7QUFDSjtBQUNBO0FBQ0ksV0FBU0MsVUFBVCxHQUFzQjtBQUNsQixRQUFJQyxTQUFKOztBQUNBLFFBQUlBLFNBQVMsS0FBS0MsU0FBbEIsRUFBNkI7QUFDekJELE1BQUFBLFNBQVMsR0FBRyxJQUFJRSxNQUFKLEVBQVo7QUFDSDs7QUFDRCxXQUFPRixTQUFQO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7OztBQUNJLFdBQVNFLE1BQVQsR0FBa0I7QUFDZCxTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQUMsQ0FBaEI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxDQUFDLENBQVo7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFFQTtBQUNSO0FBQ0E7O0FBQ1EsU0FBS0MsSUFBTCxHQUFZLFlBQVk7QUFDcEIsV0FBS1AsVUFBTCxHQUFrQlEsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQmYs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Q0FJakM7QUFDSCxPQUxEO0FBTUgsS0E3RUQ7QUErRUk7QUFDWjtBQUNBO0FBQ0E7QUFDWSxTQUFLZ0Msd0JBQUwsR0FBZ0MsVUFBVUMsS0FBVixFQUFpQjtBQUM3QyxXQUFLekUsU0FBTCxHQUFpQnlFLEtBQWpCO0FBQ0gsS0FyRkw7QUF1Rkk7QUFDWjtBQUNBO0FBQ0E7QUFDWSxTQUFLQyxzQkFBTCxHQUE4QixVQUFVRCxLQUFWLEVBQWlCO0FBQzNDLFdBQUt4RSxRQUFMLEdBQWdCd0UsS0FBaEI7QUFDSCxLQTdGTDtBQStGSTtBQUNaO0FBQ0E7QUFDQTtBQUNZLFNBQUtoQyx5QkFBTCxHQUFpQyxVQUFVVCxHQUFWLEVBQWU7QUFDNUMsVUFBSVgsRUFBRSxDQUFDQyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsZUFBT29ELElBQUksQ0FBQ0MsS0FBTCxDQUFXNUMsR0FBWCxDQUFQO0FBQ0g7O0FBQ0QsYUFBT0EsR0FBUDtBQUNILEtBeEdMLEVBeUdJLEtBQUt0QixJQUFMLEVBekdKO0FBMEdIOztBQUNELFNBQU87QUFDSGQsSUFBQUEsVUFBVSxFQUFFLElBQUlBLFVBQUo7QUFEVCxHQUFQO0FBR0gsQ0FoUG9CLEVBQXJCOztBQWtQQWlGLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5GLGNBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog57qi5YyF6L6+5Lq6U09DS0VU6YCa6K6vXHJcbiAqL1xyXG52YXIgSG9uZ0Jhb05ldFdvcmsgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDljZXkvovmqKHlvI9cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5zdGFudCgpIHtcclxuICAgICAgICB2YXIgX2luc3RhbmNlO1xyXG4gICAgICAgIGlmIChfaW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBfaW5zdGFuY2UgPSBuZXcgU2luZ2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmAu+i+keWxglxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBTaW5nbGUoKSB7XHJcbiAgICAgICAgdGhpcy5sb2JieU1haW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1haW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2FtZVNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRhYmxlSWQgPSAtMTtcclxuICAgICAgICB0aGlzLnNlYXRJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMucGxheWVySGVhZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50YXggPSAtMTtcclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLmV2ZW50T24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yid5aeL5YyWXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8gPSByZXF1aXJlKFwiUGxheWVySW5mb1wiKS5nZXRJbnN0YW50O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6L+b5YWl5ri45oiPXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gbG9naW5JUCBcclxuICAgICAgICAgICAgICogQHBhcmFtIHsqfSBwb3J0IFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHVzZXJpZCBcclxuICAgICAgICAgICAgICogQHBhcmFtIHsqfSBzaWduIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5sb2dpbkdhbWVfRnVuY3Rpb24gPSBmdW5jdGlvbiAobG9naW5JUCwgcG9ydCwgdXNlcmlkLCBzaWduKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9naW5JUDonLCBsb2dpbklQKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwb3J0OicsIHBvcnQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VzZXJpZDonLCB1c2VyaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NpZ246Jywgc2lnbik7XHJcbiAgICAgICAgICAgICAgICBsb2dpbklQID0gXCI2MC4yMDUuMTkxLjg3XCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgc29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVTb2NrZXQgPSBTb2NrZXRJTy5jb25uZWN0KGxvZ2luSVAgKyBcIjpcIiArIHBvcnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb2NrZXQgPSByZXF1aXJlKFwic29ja2V0LWlvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZVNvY2tldCA9IHNvY2tldChsb2dpbklQICsgXCI6XCIgKyBwb3J0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v55So5oi36L+e5o6l5ri45oiP5pyN5Yqh5ZmoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RTZXJ2ZXJfRnVuY3Rpb24odXNlcmlkLCBzaWduKTtcclxuICAgICAgICAgICAgICAgIC8v6L+e5o6l5aSx6LSlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTb2NrZXQub24oXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmlzQnJvd3NlciAmJiBzZWxmLmdhbWVTb2NrZXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVTb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySW5mby5nYW1lRGlzY29ubmVjdCB8fCBzZWxmLmxvYmJ5TWFpbi5jb250ZW50R2FtZVNlcnZlckZhaWxfRnVuY3Rpb24oXCJob25nYmFvXCIpO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy/ov57mjqXlpLHotKVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTb2NrZXQub24oXCJjb25uZWN0X2Vycm9yXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmlzQnJvd3NlciAmJiBzZWxmLmdhbWVTb2NrZXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nYW1lU29ja2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0IHx8IHNlbGYubG9iYnlNYWluLmNvbnRlbnRHYW1lU2VydmVyRmFpbF9GdW5jdGlvbihcImhvbmdiYW9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+i/nuaOpei2heaXtlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU29ja2V0Lm9uKFwiY29ubmVjdF90aW1lb3V0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMuaXNCcm93c2VyICYmIHNlbGYuZ2FtZVNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZVNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLmdhbWVEaXNjb25uZWN0IHx8IHNlbGYubG9iYnlNYWluLmNvbnRlbnRHYW1lU2VydmVyRmFpbF9GdW5jdGlvbihcImhvbmdiYW9cIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v6L+e5o6lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTb2NrZXQub24oXCJjb25uZWN0ZWRcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b5YWl5ri45oiPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVTb2NrZXQuZW1pdChcIkxvZ2luR2FtZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsIC8v55So5oi3SURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrbmFtZTogc2VsZi5wbGF5ZXJJbmZvLnBsYXllck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGltZ3VybDogc2VsZi5wbGF5ZXJJbmZvLnBsYXllckhlYWRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1ldHlwZTogNCwgLy/muLjmiI/nsbvlnotcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduOiBzaWduIC8v562+5ZCNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov57mjqXnuqLljIXovr7kurrmnI3liqHlmahcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHVzZXJpZCBcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHNpZ24gXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb25uZWN0U2VydmVyX0Z1bmN0aW9uID0gZnVuY3Rpb24gKHVzZXJpZCwgc2lnbikge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdhbWVTb2NrZXQgJiYgdGhpcy5nYW1lU29ja2V0Lm9uKFwibG9naW5HYW1lUmVzdWx0XCIsIGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi57qi5YyF6L6+5Lq655m75b2V5ri45oiP6L+U5Zue77yaXCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdGlkKSB7IC8v5ri45oiP55m75b2V5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJJbmZvLnBsYXllckNvaW4gPSByZXN1bHQuT2JqLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5uZXRXb3JrLnNvY2tldC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpblJvb21fRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJpbmRTb2NrZXRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+a4uOaIj+eZu+W9leWksei0pVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9iYnlNYWluLmdldENvbXBvbmVudChcIkxvYmJ5TWFpblwiKS5sb2FkR2FtZVNjZW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2JieU1haW4uZ2V0Q29tcG9uZW50KFwiTG9iYnlNYWluXCIpLnNob3dNZXNzYWdlYm94X0Z1bmN0aW9uKHJlc3VsdC5tc2csIDEsIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXZlbnRPbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOi/m+WFpeaIv+mXtFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubG9naW5Sb29tX0Z1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5TWFpbi5iZ19CbGFjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckluZm8uZ2FtZURpc2Nvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbmZvLmdhbWVOYW1lID0gXCJob25nYmFvXCI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9idXR0b25DdHJsXCIpLmdldENvbXBvbmVudChcIkxvYmJ5QnV0dG9uQ2xpY2tcIikuUWllSHVhblNjZW5lX25vcm1hbChcIkdhbWVfaG9uZ2Jhb1wiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnuqLljIXovr7kurrplb/ov57pgJrorq9cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJpbmRTb2NrZXRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICog57qi5YyF5Zy65qyh5L+h5oGvXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNvY2tldC5vbihcImhiSW5pdFwiLCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKHJldCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmdhbWVNYWluLmdhbWVJbml0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICog6I635Y+W57qi5YyF5YiX6KGoXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNvY2tldC5vbihcImhvbmdiYW9MaXN0XCIsIChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2FtZU1haW4udXBkYXRlSG9uZ0Jhb0xpc3QocmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiDpoobnuqLljIXnu5Pmnpzov5Tlm55cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5nYW1lU29ja2V0Lm9uKFwiZ2V0SGJSZXN1bHRcIiwgKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nYW1lTWFpbi5nZXRIb25nQmFvKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOacrOWxgOmHkeW4gee7k+eul+WbnuiwgyzovpPkuobkuLrotJ/mlbBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNvY2tldC5vbihcIm9wZW5cIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nYW1lTWFpbi5iaWxsaW5nX0Z1bmN0aW9uKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOW5v+aSrea2iOaBr1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5nYW1lU29ja2V0Lm9uKFwiaGJUaXBcIiwgZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nYW1lTWFpbi5ob3JzZUxhbXAocmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6YeR5biB5LiN6LazLOi4ouWHuuaIv+mXtFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5nYW1lU29ja2V0Lm9uKFwibm90RW5vdWh0U2NvcmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nYW1lTWFpbi5ub01vbmV5T3V0X0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmVv+i/nuaOpeaWreW8gOebkeWQrFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5nYW1lU29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuZ2FtZU1haW4uZ2FtZUV4aXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVNYWluLmRpc2Nvbm5lY3ROZXRXb3JrX0Z1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdhbWVTb2NrZXQub24oXCJub0V4aXRcIiwgcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldCA9IHNlbGYuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhcmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2NvbV9pbmdhbWVfdGlwcycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZU1haW4uZ2FtZUV4aXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FtZU1haW4uZXhpdEdhbWVfRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdhbWVTb2NrZXQub24oXCJDYW5FeGl0XCIsIHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzZWxmLmNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24ocmV0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5FeGl0JywgcmV0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmdhbWVNYWluLmNvbV9CdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJidF9FeGl0XCIpLmFjdGl2ZSA9IHJldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5maW5kKCdDYW52YXMvY29tX2V4aXRfdGlwcycpLmFjdGl2ZSA9IHJldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Lyg6YCSdGhpc+S9nOeUqOWfn1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHNjZW5lIOadpeiHqkxvYmJ5TWFpbi5qc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5zZXRMb2JieU1haW5PYmpfRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9iYnlNYWluID0gc2NlbmU7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Lyg6YCSdGhpc+S9nOeUqOWfn1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHNjZW5lIOadpeiHqmhvbmdiYW9NYWluLmpzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLnNldGhvbmdiYW9PYmpfRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NlbmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1haW4gPSBzY2VuZTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDop6PmnpBKU09O5pWw5o2uXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gcmV0IFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uID0gZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5zdGFudDogbmV3IGdldEluc3RhbnQoKVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIb25nQmFvTmV0V29yazsiXX0=
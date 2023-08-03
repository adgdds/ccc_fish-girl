
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_Shuiguoxiaomali/js/SGXMLNetwork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6229ND29tHZ7AhwT4VB5VL', 'SGXMLNetwork');
// Texture/Slot_Shuiguoxiaomali/js/SGXMLNetwork.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.mainObj = this.node.getComponent('SGXMLMain');
    this.playerInfo = require("PlayerInfo").getInstant;
    this.audio = this.node.getComponent('SGXMLAudio');
  },
  start: function start() {
    this.url = Lhjconfig.Server_IP + ':15060';
    this.socket = io.connect(this.url);
    this.addEvent();
  },
  addEvent: function addEvent() {
    var _this = this;

    this.socket.on('connected', function () {
      _this.socket.emit('LoginGame', JSON.stringify({
        userid: _this.playerInfo.playerId,
        gametype: null,
        sign: _this.playerInfo.gameSign
      }));
    });
    this.socket.on('loginGameResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginGameResult:', data);
      window.SGXML_LOBBYNET.disconnect();

      _this.socket.emit('LoginfreeCount');
    });
    this.socket.on('lotteryResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('lotteryResult:', data);

      if (!!data.ResultCode && data.ResultCode == 1) {
        _this.mainObj.lotteryRes = JSON.parse(JSON.stringify(data.ResultData));

        _this.mainObj.roll(data.ResultData.viewarray.nHandCards);
      } else {
        _this.mainObj.status = 0;
      }
    });
    this.socket.on('LoginRoomResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginRoomResult', data); // self.canvas.onFreeTime(data.ResultData.freeCount);                    //调用刷新免费次数的方法 
    });
    this.socket.on('LoginfreeCountResult', function (data) {
      data = _this.changeResultJSON_Function(data);
      console.log('LoginfreeCountResult:', data);

      if (data.ResultCode == 1 && data.freeCount > 0) {
        _this.mainObj.freeTimes = data.freeCount - 1;

        _this.mainObj.closeShine();

        _this.mainObj.startFreeGame();
      }
    });
  },
  changeResultJSON_Function: function changeResultJSON_Function(ret) {
    if (cc.sys.isNative) {
      return JSON.parse(ret);
    }

    return ret;
  },
  onDestroy: function onDestroy() {
    this.socket.emit('cleanLineOut');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9TaHVpZ3VveGlhb21hbGlcXGpzXFxTR1hNTE5ldHdvcmsuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJtYWluT2JqIiwibm9kZSIsImdldENvbXBvbmVudCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsImF1ZGlvIiwic3RhcnQiLCJ1cmwiLCJMaGpjb25maWciLCJTZXJ2ZXJfSVAiLCJzb2NrZXQiLCJpbyIsImNvbm5lY3QiLCJhZGRFdmVudCIsIm9uIiwiZW1pdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyaWQiLCJwbGF5ZXJJZCIsImdhbWV0eXBlIiwic2lnbiIsImdhbWVTaWduIiwiZGF0YSIsImNoYW5nZVJlc3VsdEpTT05fRnVuY3Rpb24iLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiU0dYTUxfTE9CQllORVQiLCJkaXNjb25uZWN0IiwiUmVzdWx0Q29kZSIsImxvdHRlcnlSZXMiLCJwYXJzZSIsIlJlc3VsdERhdGEiLCJyb2xsIiwidmlld2FycmF5IiwibkhhbmRDYXJkcyIsInN0YXR1cyIsImZyZWVDb3VudCIsImZyZWVUaW1lcyIsImNsb3NlU2hpbmUiLCJzdGFydEZyZWVHYW1lIiwicmV0Iiwic3lzIiwiaXNOYXRpdmUiLCJvbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0xDLEVBQUFBLE1BUEssb0JBT0k7QUFDTCxTQUFLQyxPQUFMLEdBQWUsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCLFdBQXZCLENBQWY7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxVQUF4QztBQUNBLFNBQUtDLEtB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S0FBSSxDQUFDdkMsT0FBTCxDQUFhd0MsU0FBYixHQUF5QmhCLElBQUksQ0FBQ2UsU0FBTCxHQUFpQixDQUExQzs7QUFDQSxRQUFBLEtBQUksQ0FBQ3ZDLE9BQUwsQ0FBYXlDLFVBQWI7O0FBQ0EsUUFBQSxLQUFJLENBQUN6QyxPQUFMLENBQWEwQyxhQUFiO0FBQ0g7QUFDSixLQVJEO0FBU0gsR0E3REk7QUErRExqQixFQUFBQSx5QkEvREsscUNBK0RxQmtCLEdBL0RyQixFQStEMEI7QUFDM0IsUUFBSWhELEVBQUUsQ0FBQ2lELEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQixhQUFPNUIsSUFBSSxDQUFDZ0IsS0FBTCxDQUFXVSxHQUFYLENBQVA7QUFDSDs7QUFDRCxXQUFPQSxHQUFQO0FBQ0gsR0FwRUk7QUFzRUxHLEVBQUFBLFNBdEVLLHVCQXNFTztBQUNSLFNBQUtuQyxNQUFMLENBQVlLLElBQVosQ0FBaUIsY0FBakI7QUFDSDtBQXhFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubWFpbk9iaiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1NHWE1MTWFpbicpO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mbyA9IHJlcXVpcmUoXCJQbGF5ZXJJbmZvXCIpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ1NHWE1MQXVkaW8nKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gTGhqY29uZmlnLlNlcnZlcl9JUCArICc6MTUwNjAnO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdCh0aGlzLnVybCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5HYW1lJywgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcmlkOiB0aGlzLnBsYXllckluZm8ucGxheWVySWQsXHJcbiAgICAgICAgICAgICAgICBnYW1ldHlwZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHNpZ246IHRoaXMucGxheWVySW5mby5nYW1lU2lnblxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdsb2dpbkdhbWVSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luR2FtZVJlc3VsdDonLCBkYXRhKTtcclxuICAgICAgICAgICAgd2luZG93LlNHWE1MX0xPQkJZTkVULmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnTG9naW5mcmVlQ291bnQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2xvdHRlcnlSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvdHRlcnlSZXN1bHQ6JywgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghIWRhdGEuUmVzdWx0Q29kZSAmJiBkYXRhLlJlc3VsdENvZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmxvdHRlcnlSZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuUmVzdWx0RGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLnJvbGwoZGF0YS5SZXN1bHREYXRhLnZpZXdhcnJheS5uSGFuZENhcmRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ0xvZ2luUm9vbVJlc3VsdCcsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2VSZXN1bHRKU09OX0Z1bmN0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5Sb29tUmVzdWx0JywgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYuY2FudmFzLm9uRnJlZVRpbWUoZGF0YS5SZXN1bHREYXRhLmZyZWVDb3VudCk7ICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWIt+aWsOWFjei0ueasoeaVsOeahOaWueazlSBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignTG9naW5mcmVlQ291bnRSZXN1bHQnLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luZnJlZUNvdW50UmVzdWx0OicsIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5SZXN1bHRDb2RlID09IDEgJiYgZGF0YS5mcmVlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5PYmouZnJlZVRpbWVzID0gZGF0YS5mcmVlQ291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluT2JqLmNsb3NlU2hpbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbk9iai5zdGFydEZyZWVHYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUmVzdWx0SlNPTl9GdW5jdGlvbihyZXQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdjbGVhbkxpbmVPdXQnKTtcclxuICAgIH1cclxufSk7Il19
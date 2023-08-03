
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/Slot_caishendao_houying/js/CSDHYAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3dd7sDblRJ1LlcfRCsKVoi', 'CSDHYAudio');
// Texture/Slot_caishendao_houying/js/CSDHYAudio.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    bgmAudio: {
      type: cc.AudioClip,
      "default": []
    },
    stopWheel: {
      type: cc.AudioClip,
      "default": null
    },
    bigWinEf: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.pInfo = require("PlayerInfo").getInstant;
  },
  start: function start() {
    cc.audioEngine.stopAll();
    this.playBgm(0);
  },
  stopAudio: function stopAudio() {
    cc.audioEngine.stopAll();
  },
  playBgm: function playBgm(id) {
    if (this.pInfo.musicControl == 0) {
      return;
    }

    cc.audioEngine.stopMusic();
    cc.audioEngine.playMusic(this.bgmAudio[id], true);
  },
  playStopWheel: function playStopWheel() {
    this.playEf(this.stopWheel);
  },
  playBW: function playBW() {
    this.playEf(this.bigWinEf);
  },
  playEf: function playEf(clip) {
    if (this.pInfo.soundEffectControl == 0) {
      return;
    }

    cc.audioEngine.playEffect(clip);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcU2xvdF9jYWlzaGVuZGFvX2hvdXlpbmdcXGpzXFxDU0RIWUF1ZGlvLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmdtQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwic3RvcFdoZWVsIiwiYmlnV2luRWYiLCJvbkxvYWQiLCJwSW5mbyIsInJlcXVpcmUiLCJnZXRJbnN0YW50Iiwic3RhcnQiLCJhdWRpb0VuZ2luZSIsInN0b3BBbGwiLCJwbGF5QmdtIiwic3RvcEF1ZGlvIiwiaWQiLCJtdXNpY0NvbnRyb2wiLCJzdG9wTXVzaWMiLCJwbGF5TXVzaWMiLCJwbGF5U3RvcFdoZWVsIiwicGxheUVmIiwicGxheUJXIiwiY2xpcCIsInNvdW5kRWZmZWN0Q29udHJvbCIsInBsYXlFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFNBREg7QUFFTixpQkFBUztBQUZILEtBREY7QUFNUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURGO0FBRVAsaUJBQVM7QUFGRixLQU5IO0FBV1JFLElBQUFBLFFBQVEsRUFBRTtBQUNOSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sU0FESDtBQUVOLGlCQUFTO0FBRkg7QUFYRixHQUhQO0FBb0JMRyxFQUFBQSxNQXBCSyxvQkFvQkk7QUFDTCxTQUFLQyxLQUFMLEdBQWFDLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLFVBQW5DO0FBQ0gsR0F0Qkk7QUF3QkxDLEVBQUFBLEtBeEJLLG1CQXdCRztBQUNKYixJQUFBQSxFQUFFLENBQUNjLFdBQUgsQ0FBZUMsT0FBZjtBQUNBLFNBQUtDLE9BQUwsQ0FBYSxDQUFiO0FBQ0gsR0EzQkk7QUE2QkxDLEVBQUFBLFNBN0JLLHVCQTZCTztBQUNSakIsSUFBQUEsRUFBRSxDQUFDYyxXQUFILENBQWVDLE9BQWY7QUFDSCxHQS9CSTtBQWlDTEMsRUFBQUEsT0FqQ0ssbUJBaUNHRSxFQWpDSCxFQWlDTztBQUNSLFFBQUksS0FBS1IsS0FBTCxDQUFXUyxZQUFYLElBQTJCLENBQS9CLEVBQWtDO0FBQzlCO0FBQ0g7O0FBQ0RuQixJQUFBQSxFQUFFLENBQUNjLFdBQUgsQ0FBZU0sU0FBZjtBQUNBcEIsSUFBQUEsRUFBRSxDQUFDYyxXQUFILENBQWVPLFNBQWYsQ0FBeUIsS0FBS2pCLFFBQUwsQ0FBY2MsRUFBZCxDQUF6QixFQUE0QyxJQUE1QztBQUNILEdBdkNJO0FBeUNMSSxFQUFBQSxhQXpDSywyQkF5Q1c7QUFDWixTQUFLQyxNQUFMLENBQVksS0FBS2hCLFNBQWpCO0FBQ0gsR0EzQ0k7QUE2Q0xpQixFQUFBQSxNQTdDSyxvQkE2Q0k7QUFDTCxTQUFLRCxNQUFMLENBQVksS0FBS2YsUUFBakI7QUFDSCxHQS9DSTtBQWlETGUsRUFBQUEsTUFqREssa0JBaURFRSxJQWpERixFQWlEUTtBQUNULFFBQUksS0FBS2YsS0FBTCxDQUFXZ0Isa0JBQVgsSUFBaUMsQ0FBckMsRUFBd0M7QUFDcEM7QUFDSDs7QUFDRDFCLElBQUFBLEVBQUUsQ0FBQ2MsV0FBSCxDQUFlYSxVQUFmLENBQTBCRixJQUExQjtBQUNIO0FBdERJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmdtQXVkaW86IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wV2hlZWw6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpZ1dpbkVmOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBJbmZvID0gcmVxdWlyZShcIlBsYXllckluZm9cIikuZ2V0SW5zdGFudDtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgIHRoaXMucGxheUJnbSgwKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcEF1ZGlvKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUJnbShpZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBJbmZvLm11c2ljQ29udHJvbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMuYmdtQXVkaW9baWRdLCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheVN0b3BXaGVlbCgpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLnN0b3BXaGVlbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlCVygpIHtcclxuICAgICAgICB0aGlzLnBsYXlFZih0aGlzLmJpZ1dpbkVmKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGxheUVmKGNsaXApIHtcclxuICAgICAgICBpZiAodGhpcy5wSW5mby5zb3VuZEVmZmVjdENvbnRyb2wgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCk7XHJcbiAgICB9LFxyXG59KSJdfQ==
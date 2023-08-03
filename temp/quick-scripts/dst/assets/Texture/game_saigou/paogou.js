
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Texture/game_saigou/paogou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f6597J1dJpKHaWxgKYbVDjO', 'paogou');
// Texture/game_saigou/paogou.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    NodeArray_mingci: {
      "default": [],
      type: [cc.Node],
      tooltip: "名次节点数组"
    },
    SpriteArray_jieguo: {
      "default": [],
      type: [cc.Sprite],
      tooltip: "结果图标数组"
    },
    SpriteFrameArray_haoma: {
      "default": [],
      type: [cc.SpriteFrame],
      tooltip: "号码图标资源数组"
    },
    AnimationArray_horse: {
      "default": [],
      type: [cc.Animation],
      tooltip: "赛马的动画组件数组"
    },
    AnimationClipArray_horseMove: {
      "default": [],
      type: [cc.AnimationClip],
      tooltip: "赛马移动的动画资源数组"
    },
    NodeArray_dibumingci: {
      "default": [],
      type: [cc.Node],
      tooltip: "底部名次节点数组"
    },
    Speed_dibumingci: {
      "default": 500,
      tooltip: "底部名次的移动速度"
    },
    Label_winCoins: {
      "default": null,
      type: cc.Label,
      tooltip: "赢金币文字"
    },
    AudioSource_launch: {
      "default": null,
      type: cc.AudioSource,
      tooltip: "比赛开始的音效"
    },
    AudioSource_guoxian: {
      "default": null,
      type: cc.AudioSource,
      tooltip: "赛马过终点线音效"
    },
    PhotoTime: {
      "default": 3,
      tooltip: "拍照时间"
    },
    Animation_daojishi: {
      "default": null,
      type: cc.Animation,
      tooltip: "倒计时动画"
    },
    Animation_changjing: {
      "default": null,
      type: cc.Animation,
      tooltip: "场景动画"
    },
    Node_GongXi: {
      "default": null,
      type: cc.Node,
      tooltip: "中奖节点"
    },
    Node_YiHan: {
      "default": null,
      type: cc.Node,
      tooltip: "未中奖节点"
    },
    _infinity: 999999
  },
  SetData: function SetData(arrayMingCi, winCoins) {
    this._arrayMingCi = arrayMingCi;
    this._winCoins = winCoins;
    var anim = this.Animation_daojishi.play();
    anim.on('finished', this.Launch, this);
  },
  Launch: function Launch() {
    this.Animation_daojishi.node.active = false;
    this.Animation_changjing.play();
    this.AudioSource_launch.play();
    this.Label_winCoins.string = this._winCoins;

    if (this._winCoins > 0) {
      this.Node_GongXi.active = true;
      this.Node_YiHan.active = false;
    } else {
      this.Node_GongXi.active = false;
      this.Node_YiHan.active = true;
    }

    this._arrayLength = this.NodeArray_mingci.length;
    this._posArrayMingCi = new Array(this._arrayLength);

    for (var i = 0; i < this._arrayLength; i++) {
      this._posArrayMingCi[i] = this.NodeArray_mingci[i].getPosition();
    }

    for (var i = 0; i < this._arrayLength; i++) {
      this.NodeArray_mingci[i].setPosition(this._posArrayMingCi[this._arrayMingCi[i]]);
      this.NodeArray_mingci[i].active = false;
    }

    for (var i = 0; i < this.SpriteArray_jieguo.length; i++) {
      var index = 0;

      for (var j = 0; j < this._arrayLength; j++) {
        if (this._arrayMingCi[j] === i) {
          index = j;
        }
      }

      this.SpriteArray_jieguo[i].spriteFrame = this.SpriteFrameArray_haoma[index];
    }

    var guoxian = 0;
    var self = this;

    for (var i = 0; i < this._arrayLength; i++) {
      this.AnimationArray_horse[i].play();
      this.AnimationArray_horse[i].addClip(this.AnimationClipArray_horseMove[this._arrayMingCi[i]], "mingci");
      this.AnimationArray_horse[i].playAdditive("mingci");

      this.AnimationArray_horse[i].onAnimEvent_ZhongDian = function () {
        var index;

        for (var i = 0; i < self._arrayLength; i++) {
          if (self._arrayMingCi[i] === guoxian) {
            index = i;
            break;
          }
        }

        self.NodeArray_mingci[index].active = true;

        if (guoxian < 3) {
          //前三名拍照
          self.TakePhoto();
        }

        guoxian++;
      };
    }

    this._rankPosArray = new Array(this._arrayLength); //底部排名的坐标

    for (var i = 0; i < this._arrayLength; i++) {
      this._rankPosArray[i] = this.NodeArray_dibumingci[i].x;
    }

    this._targetPosArray = new Array(this._arrayLength); //目标坐标

    for (var i = 0; i < this._arrayLength; i++) {
      this._targetPosArray[i] = this._rankPosArray[this._arrayMingCi[i]];
    }

    this._currentPosArray = new Array(this._arrayLength); //当前坐标

    for (var i = 0; i < this._arrayLength; i++) {
      this._currentPosArray[i] = this.NodeArray_dibumingci[i].x;
    }

    this._nodeArrayHorse = new Array(this._arrayLength); //赛马节点数组

    for (var i = 0; i < this._arrayLength; i++) {
      this._nodeArrayHorse[i] = this.AnimationArray_horse[i].node;
    }

    this._arrayRanking = new Array(this._arrayLength); //名次数组

    this._arrayHorsePos = new Array(this._arrayLength); //赛马位置数组
  },
  onBtnClick_back: function onBtnClick_back() {
    this.node.dispatchEvent(new cc.Event.EventCustom('Event_PaoGouConfirm', true));
    this.node.destroy();
  },
  update: function update(dt) {
    for (var i = 0; i < this._arrayLength; i++) {
      this._arrayHorsePos[i] = this._nodeArrayHorse[i].x;
    }

    this.Rank();

    for (var i = 0; i < this._arrayLength; i++) {
      this._targetPosArray[i] = this._rankPosArray[this._arrayRanking[i]];
    }

    var distance = this.Speed_dibumingci * dt; //这一帧移动的距离

    for (var i = 0; i < this._arrayLength; i++) {
      var sub = this._targetPosArray[i] - this._currentPosArray[i];
      var absSub = Math.abs(sub);

      if (absSub > 0.01) {
        //没到目标点
        var move = 0;

        if (absSub > distance) {
          //相差的距离大于这一帧移动的距离
          if (sub > 0) {
            move = distance;
          } else {
            move = -distance;
          }
        } else {
          move = sub;
        }

        this._currentPosArray[i] += move;
        this.NodeArray_dibumingci[i].x = this._currentPosArray[i];
      }
    }
  },
  Rank: function Rank() {
    var index; //最小值的索引

    var min_X; //最小值

    for (var ranking = this._arrayLength - 1; ranking > -1; ranking--) {
      min_X = this._infinity;

      for (var i = 0; i < this._arrayLength; i++) {
        if (this._arrayHorsePos[i] < min_X) {
          min_X = this._arrayHorsePos[i];
          index = i;
        }
      }

      this._arrayRanking[index] = ranking;
      this._arrayHorsePos[index] = this._infinity;
    }
  },
  TakePhoto: function TakePhoto() {
    this.AudioSource_guoxian.play();

    for (var i = 0; i < this._arrayLength; i++) {
      this.AnimationArray_horse[i].pause();
    }

    this.scheduleOnce(function () {
      for (var i = 0; i < this._arrayLength; i++) {
        this.AnimationArray_horse[i].resume();
      }
    }, this.PhotoTime);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcVGV4dHVyZVxcZ2FtZV9zYWlnb3VcXHBhb2dvdS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIk5vZGVBcnJheV9taW5nY2kiLCJ0eXBlIiwiTm9kZSIsInRvb2x0aXAiLCJTcHJpdGVBcnJheV9qaWVndW8iLCJTcHJpdGUiLCJTcHJpdGVGcmFtZUFycmF5X2hhb21hIiwiU3ByaXRlRnJhbWUiLCJBbmltYXRpb25BcnJheV9ob3JzZSIsIkFuaW1hdGlvbiIsIkFuaW1hdGlvbkNsaXBBcnJheV9ob3JzZU1vdmUiLCJBbmltYXRpb25DbGlwIiwiTm9kZUFycmF5X2RpYnVtaW5nY2kiLCJTcGVlZF9kaWJ1bWluZ2NpIiwiTGFiZWxfd2luQ29pbnMiLCJMYWJlbCIsIkF1ZGlvU291cmNlX2xhdW5jaCIsIkF1ZGlvU291cmNlIiwiQXVkaW9Tb3VyY2VfZ3VveGlhbiIsIlBob3RvVGltZSIsIkFuaW1hdGlvbl9kYW9qaXNoaSIsIkFuaW1hdGlvbl9jaGFuZ2ppbmciLCJOb2RlX0dvbmdYaSIsIk5vZGVfWWlIYW4iLCJfaW5maW5pdHkiLCJTZXREYXRhIiwiYXJyYXlNaW5nQ2kiLCJ3aW5Db2lucyIsIl9hcnJheU1pbmdDaSIsIl93aW5Db2lucyIsImFuaW0iLCJwbGF5Iiwib24iLCJMYXVuY2giLCJub2RlIiwiYWN0aXZlIiwic3RyaW5nIiwiX2FycmF5TGVuZ3RoIiwibGVuZ3RoIiwiX3Bvc0FycmF5TWluZ0NpIiwiQXJyYXkiLCJpIiwiZ2V0UG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsImluZGV4IiwiaiIsInNwcml0ZUZyYW1lIiwiZ3VveGlhbiIsInNlbGYiLCJhZGRDbGlwIiwicGxheUFkZGl0aXZlIiwib25BbmltRXZlbnRfWmhvbmdEaWFuIiwiVGFrZVBob3RvIiwiX3JhbmtQb3NBcnJheSIsIngiLCJfdGFyZ2V0UG9zQXJyYXkiLCJfY3VycmVudFBvc0FycmF5IiwiX25vZGVBcnJheUhvcnNlIiwiX2FycmF5UmFua2luZyIsIl9hcnJheUhvcnNlUG9zIiwib25CdG5DbGlja19iYWNrIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiRXZlbnRDdXN0b20iLCJkZXN0cm95IiwidXBkYXRlIiwiZHQiLCJSYW5rIiwiZGlzdGFuY2UiLCJzdWIiLCJhYnNTdWIiLCJNYXRoIiwiYWJzIiwibW92ZSIsIm1pbl9YIiwicmFua2luZyIsInBhdXNlIiwic2NoZWR1bGVPbmNlIiwicmVzdW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDZCxpQkFBUyxFQURLO0FBRWRDLE1BQUFBLElBQUksRUFBRSxDQUFDTCxFQUFFLENBQUNNLElBQUosQ0FGUTtBQUdkQyxNQUFBQSxPQUFPLEVBQUU7QUFISyxLQURWO0FBTVJDLElBQUFBLGtCQUFrQixFQUFFO0FBQ2hCLGlCQUFTLEVBRE87QUFFaEJILE1BQUFBLElBQUksRUFBRSxDQUFDTCxFQUFFLENBQUNTLE1BQUosQ0FGVTtBQUdoQkYsTUFBQUEsT0FBTyxFQUFFO0FBSE8sS0FOWjtBQVdSRyxJQUFBQSxzQkFBc0IsRUFBRTtBQUNwQixpQkFBUyxFQURXO0FBRXBCTCxNQUFBQSxJQUFJLEVBQUUsQ0FBQ0wsRUFBRSxDQUFDVyxXQUFKLENBRmM7QUFHcEJKLE1BQUFBLE9BQU8sRUFBRTtBQUhXLEtBWGhCO0FBZ0JSSyxJQUFBQSxvQkFBb0IsRUFBRTtBQUNsQixpQkFBUyxFQURTO0FBRWxCUCxNQUFBQSxJQUFJLEVBQUUsQ0FBQ0wsRUFBRSxDQUFDYSxTQUFKLENBRlk7QUFHbEJOLE1BQUFBLE9BQU8sRUFBRTtBQUhTLEtBaEJkO0FBcUJSTyxJQUFBQSw0QkFBNEIsRUFBRTtBQUMxQixpQkFBUyxFQURpQjtBQUUxQlQsTUFBQUEsSUFBSSxFQUFFLENBQUNMLEVBQUUsQ0FB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QW9CbEIsQ0FBcEIsSUFBeUJpQyxLQUE3QixFQUFvQztBQUNoQ0EsVUFBQUEsS0FBSyxHQUFHLEtBQUtmLGNBQUwsQ0FBb0JsQixDQUFwQixDQUFSO0FBQ0FHLFVBQUFBLEtBQUssR0FBR0gsQ0FBUjtBQUNIO0FBQ0o7O0FBQ0QsV0FBS2lCLGFBQUwsQ0FBbUJkLEtBQW5CLElBQTRCK0IsT0FBNUI7QUFDQSxXQUFLaEIsY0FBTCxDQUFvQmYsS0FBcEIsSUFBNkIsS0FBS3BCLFNBQWxDO0FBQ0g7QUFDSixHQWxOSTtBQW9OTDRCLEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixTQUFLbEMsbUJBQUwsQ0FBeUJhLElBQXpCOztBQUNBLFNBQUssSUFBSVUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLSixZQUF6QixFQUF1Q0ksQ0FBQyxFQUF4QyxFQUE0QztBQUN4QyxXQUFLakMsb0JBQUwsQ0FBMEJpQyxDQUExQixFQUE2Qm1DLEtBQTdCO0FBQ0g7O0FBQ0QsU0FBS0MsWUFBTCxDQUFrQixZQUFZO0FBQzFCLFdBQUssSUFBSXBDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0osWUFBekIsRUFBdUNJLENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsYUFBS2pDLG9CQUFMLENBQTBCaUMsQ0FBMUIsRUFBNkJxQyxNQUE3QjtBQUNIO0FBQ0osS0FKRCxFQUlHLEtBQUszRCxTQUpSO0FBS0g7QUE5TkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBOb2RlQXJyYXlfbWluZ2NpOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5ZCN5qyh6IqC54K55pWw57uEXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTcHJpdGVBcnJheV9qaWVndW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5TcHJpdGVdLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIue7k+aenOWbvuagh+aVsOe7hFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3ByaXRlRnJhbWVBcnJheV9oYW9tYToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLlj7fnoIHlm77moIfotYTmupDmlbDnu4RcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFuaW1hdGlvbkFycmF5X2hvcnNlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuQW5pbWF0aW9uXSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLotZvpqaznmoTliqjnlLvnu4Tku7bmlbDnu4RcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFuaW1hdGlvbkNsaXBBcnJheV9ob3JzZU1vdmU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5BbmltYXRpb25DbGlwXSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLotZvpqaznp7vliqjnmoTliqjnlLvotYTmupDmlbDnu4RcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIE5vZGVBcnJheV9kaWJ1bWluZ2NpOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5bqV6YOo5ZCN5qyh6IqC54K55pWw57uEXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTcGVlZF9kaWJ1bWluZ2NpOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDUwMCxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLlupXpg6jlkI3mrKHnmoTnp7vliqjpgJ/luqZcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIExhYmVsX3dpbkNvaW5zOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIui1oumHkeW4geaWh+Wtl1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQXVkaW9Tb3VyY2VfbGF1bmNoOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvU291cmNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuavlOi1m+W8gOWni+eahOmfs+aViFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQXVkaW9Tb3VyY2VfZ3VveGlhbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb1NvdXJjZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLotZvpqazov4fnu4jngrnnur/pn7PmlYhcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBob3RvVGltZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAzLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuaLjeeFp+aXtumXtFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQW5pbWF0aW9uX2Rhb2ppc2hpOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbixcclxuICAgICAgICAgICAgdG9vbHRpcDogXCLlgJLorqHml7bliqjnlLtcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFuaW1hdGlvbl9jaGFuZ2ppbmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuWcuuaZr+WKqOeUu1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTm9kZV9Hb25nWGk6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIuS4reWlluiKgueCuVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTm9kZV9ZaUhhbjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5pyq5Lit5aWW6IqC54K5XCIsXHJcbiAgICAgICAgfSwgICAgICAgIFxyXG4gICAgICAgIF9pbmZpbml0eTogOTk5OTk5LFxyXG4gICAgfSxcclxuXHJcbiAgICBTZXREYXRhOiBmdW5jdGlvbiAoYXJyYXlNaW5nQ2ksIHdpbkNvaW5zKSB7XHJcbiAgICAgICAgdGhpcy5fYXJyYXlNaW5nQ2kgPSBhcnJheU1pbmdDaTtcclxuICAgICAgICB0aGlzLl93aW5Db2lucyA9IHdpbkNvaW5zO1xyXG4gICAgICAgIHZhciBhbmltID0gdGhpcy5BbmltYXRpb25fZGFvamlzaGkucGxheSgpO1xyXG4gICAgICAgIGFuaW0ub24oJ2ZpbmlzaGVkJywgdGhpcy5MYXVuY2gsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBMYXVuY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLkFuaW1hdGlvbl9kYW9qaXNoaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQW5pbWF0aW9uX2NoYW5namluZy5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5BdWRpb1NvdXJjZV9sYXVuY2gucGxheSgpO1xyXG4gICAgICAgIHRoaXMuTGFiZWxfd2luQ29pbnMuc3RyaW5nID0gdGhpcy5fd2luQ29pbnM7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dpbkNvaW5zID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLk5vZGVfR29uZ1hpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuTm9kZV9ZaUhhbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuTm9kZV9Hb25nWGkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTm9kZV9ZaUhhbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hcnJheUxlbmd0aCA9IHRoaXMuTm9kZUFycmF5X21pbmdjaS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fcG9zQXJyYXlNaW5nQ2kgPSBuZXcgQXJyYXkodGhpcy5fYXJyYXlMZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9wb3NBcnJheU1pbmdDaVtpXSA9IHRoaXMuTm9kZUFycmF5X21pbmdjaVtpXS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2FycmF5TGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5Ob2RlQXJyYXlfbWluZ2NpW2ldLnNldFBvc2l0aW9uKHRoaXMuX3Bvc0FycmF5TWluZ0NpW3RoaXMuX2FycmF5TWluZ0NpW2ldXSk7XHJcbiAgICAgICAgICAgIHRoaXMuTm9kZUFycmF5X21pbmdjaVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLlNwcml0ZUFycmF5X2ppZWd1by5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2FycmF5TGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hcnJheU1pbmdDaVtqXSA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gajtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlNwcml0ZUFycmF5X2ppZWd1b1tpXS5zcHJpdGVGcmFtZSA9IHRoaXMuU3ByaXRlRnJhbWVBcnJheV9oYW9tYVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBndW94aWFuID0gMDtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hcnJheUxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQW5pbWF0aW9uQXJyYXlfaG9yc2VbaV0ucGxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLkFuaW1hdGlvbkFycmF5X2hvcnNlW2ldLmFkZENsaXAodGhpcy5BbmltYXRpb25DbGlwQXJyYXlfaG9yc2VNb3ZlW3RoaXMuX2FycmF5TWluZ0NpW2ldXSwgXCJtaW5nY2lcIik7XHJcbiAgICAgICAgICAgIHRoaXMuQW5pbWF0aW9uQXJyYXlfaG9yc2VbaV0ucGxheUFkZGl0aXZlKFwibWluZ2NpXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkFuaW1hdGlvbkFycmF5X2hvcnNlW2ldLm9uQW5pbUV2ZW50X1pob25nRGlhbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5fYXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9hcnJheU1pbmdDaVtpXSA9PT0gZ3VveGlhbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuTm9kZUFycmF5X21pbmdjaVtpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChndW94aWFuIDwgMykgey8v5YmN5LiJ5ZCN5ouN54WnXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5UYWtlUGhvdG8oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGd1b3hpYW4rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yYW5rUG9zQXJyYXkgPSBuZXcgQXJyYXkodGhpcy5fYXJyYXlMZW5ndGgpOy8v5bqV6YOo5o6S5ZCN55qE5Z2Q5qCHXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hcnJheUxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhbmtQb3NBcnJheVtpXSA9IHRoaXMuTm9kZUFycmF5X2RpYnVtaW5nY2lbaV0ueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0UG9zQXJyYXkgPSBuZXcgQXJyYXkodGhpcy5fYXJyYXlMZW5ndGgpOy8v55uu5qCH5Z2Q5qCHXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hcnJheUxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldFBvc0FycmF5W2ldID0gdGhpcy5fcmFua1Bvc0FycmF5W3RoaXMuX2FycmF5TWluZ0NpW2ldXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFBvc0FycmF5ID0gbmV3IEFycmF5KHRoaXMuX2FycmF5TGVuZ3RoKTsvL+W9k+WJjeWdkOagh1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UG9zQXJyYXlbaV0gPSB0aGlzLk5vZGVBcnJheV9kaWJ1bWluZ2NpW2ldLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX25vZGVBcnJheUhvcnNlID0gbmV3IEFycmF5KHRoaXMuX2FycmF5TGVuZ3RoKTsvL+i1m+mprOiKgueCueaVsOe7hFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9ub2RlQXJyYXlIb3JzZVtpXSA9IHRoaXMuQW5pbWF0aW9uQXJyYXlfaG9yc2VbaV0ubm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYXJyYXlSYW5raW5nID0gbmV3IEFycmF5KHRoaXMuX2FycmF5TGVuZ3RoKTsvL+WQjeasoeaVsOe7hFxyXG4gICAgICAgIHRoaXMuX2FycmF5SG9yc2VQb3MgPSBuZXcgQXJyYXkodGhpcy5fYXJyYXlMZW5ndGgpOy8v6LWb6ams5L2N572u5pWw57uEXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQnRuQ2xpY2tfYmFjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbSgnRXZlbnRfUGFvR291Q29uZmlybScsIHRydWUpKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJheUhvcnNlUG9zW2ldID0gdGhpcy5fbm9kZUFycmF5SG9yc2VbaV0ueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5SYW5rKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hcnJheUxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldFBvc0FycmF5W2ldID0gdGhpcy5fcmFua1Bvc0FycmF5W3RoaXMuX2FycmF5UmFua2luZ1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLlNwZWVkX2RpYnVtaW5nY2kgKiBkdDsvL+i/meS4gOW4p+enu+WKqOeahOi3neemu1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3ViID0gdGhpcy5fdGFyZ2V0UG9zQXJyYXlbaV0gLSB0aGlzLl9jdXJyZW50UG9zQXJyYXlbaV07XHJcbiAgICAgICAgICAgIHZhciBhYnNTdWIgPSBNYXRoLmFicyhzdWIpO1xyXG4gICAgICAgICAgICBpZiAoYWJzU3ViID4gMC4wMSkgey8v5rKh5Yiw55uu5qCH54K5XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWJzU3ViID4gZGlzdGFuY2UpIHsvL+ebuOW3rueahOi3neemu+Wkp+S6jui/meS4gOW4p+enu+WKqOeahOi3neemu1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWIgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUgPSBkaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUgPSAtZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZSA9IHN1YjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQb3NBcnJheVtpXSArPSBtb3ZlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ob2RlQXJyYXlfZGlidW1pbmdjaVtpXS54ID0gdGhpcy5fY3VycmVudFBvc0FycmF5W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBSYW5rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGluZGV4Oy8v5pyA5bCP5YC855qE57Si5byVXHJcbiAgICAgICAgdmFyIG1pbl9YOy8v5pyA5bCP5YC8XHJcbiAgICAgICAgZm9yICh2YXIgcmFua2luZyA9IHRoaXMuX2FycmF5TGVuZ3RoIC0gMTsgcmFua2luZyA+IC0xOyByYW5raW5nLS0pIHtcclxuICAgICAgICAgICAgbWluX1ggPSB0aGlzLl9pbmZpbml0eTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hcnJheUxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXJyYXlIb3JzZVBvc1tpXSA8IG1pbl9YKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluX1ggPSB0aGlzLl9hcnJheUhvcnNlUG9zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9hcnJheVJhbmtpbmdbaW5kZXhdID0gcmFua2luZztcclxuICAgICAgICAgICAgdGhpcy5fYXJyYXlIb3JzZVBvc1tpbmRleF0gPSB0aGlzLl9pbmZpbml0eTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFRha2VQaG90bzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuQXVkaW9Tb3VyY2VfZ3VveGlhbi5wbGF5KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hcnJheUxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQW5pbWF0aW9uQXJyYXlfaG9yc2VbaV0ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2FycmF5TGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQW5pbWF0aW9uQXJyYXlfaG9yc2VbaV0ucmVzdW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLlBob3RvVGltZSk7XHJcbiAgICB9LFxyXG59KTsiXX0=
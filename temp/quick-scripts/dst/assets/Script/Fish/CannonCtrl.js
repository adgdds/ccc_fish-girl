
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Fish/CannonCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a2dcT3rV1OLrqBf8UKWWk5', 'CannonCtrl');
// Script/Fish/CannonCtrl.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    seatID: 0,
    //座位号
    goldLbl: cc.Label,
    //金币显示
    diamondLbl: cc.Label,
    //金币显示
    nameLbl: cc.Label,
    //名字显示
    betLbl: cc.Label,
    //当前倍数显示
    cannonAnim: cc.Animation //大炮动画

  },
  onLoad: function onLoad() {
    this.cannonPos = this.node.convertToWorldSpaceAR(this.cannonAnim.node.position);
    this.fishMain = cc.find('Canvas').getComponent('FishMain');
    this.fishMain.cannonList[this.seatID] = this;
    this.playerInfo = require('PlayerInfo').getInstant; //this.autoTime = 0;
  },
  onEnable: function onEnable() {
    this.dataInfo = this.fishMain.playerList[this.seatID];
    this.nameLbl.string = this.dataInfo.name;
    window.setHeadTexture(this.node.getChildByName('userML').getChildByName('face').getChildByName('s1'), this.dataInfo.head); //this.goldLbl.string = this.dataInfo.score;
    //this.betLbl.string = this.fishMain.roomBet;

    this.betLbl.string = Helper.fixNum(this.fishMain.roomBet);
  },
  update: function update(dt) {
    this.goldLbl.string = Helper.fixNum(this.dataInfo.score);
    this.diamondLbl.string = this.dataInfo.diamond;

    if (this.dataInfo.uid == this.playerInfo.playerId) {
      this.betLbl.string = Helper.fixNum(this.fishMain.roomBet * this.fishMain.bulletPower);

      if (this.fishMain.isLockFish) {
        this.node.getChildByName('suoding_effect').active = true;
      } else {
        this.node.getChildByName('suoding_effect').active = false;
      }
    } // if (this.autoTime>0){
    //     this.autoTime--;
    // };
    // if (this.autoTime>0)

  },
  bang: function bang(pos, bet, bid) {
    //需要区分上下  方向是反的
    var angle = 180 / (Math.PI / Math.atan((this.cannonPos.x - pos.x) / (this.cannonPos.y - pos.y)));
    this.cannonAnim.node.angle = this.seatID > 1 ? angle : -angle;
    this.cannonAnim.play(); //处理子弹发射

    var bullet = this.fishMain.getBullet();
    var bulletPos = this.fishMain.bulletBg.convertToNodeSpaceAR(this.cannonPos);
    bulletPos.x += 100 * Math.sin(-2 * Math.PI / 360 * this.cannonAnim.node.angle);
    bulletPos.y += 100 * Math.cos(-2 * Math.PI / 360 * this.cannonAnim.node.angle);
    bullet.getComponent('BulletCtrl').init(this.fishMain, this.seatID, bulletPos, this.seatID > 1 ? angle - 180 : angle, this.fishMain.bulletPower);
    bullet.getComponent('BulletCtrl').userID = this.dataInfo.uid;
    bullet.parent = this.fishMain.bulletBg;
    this.dataInfo.score -= this.fishMain.roomBet * bet;
    bullet.getComponent('BulletCtrl').bulletId = bid; //console.log("onshoot: "+bid);
    //this.bulletPower = bet;

    this.betLbl.string = Helper.fixNum(this.fishMain.roomBet * bet);
    var bigfishid = this.fishMain.getBigFishId();

    if (this.fishMain.isLockFish) {
      bullet.getComponent('BulletCtrl').autoId = bigfishid;
    }
  },
  addscore: function addscore(score) {
    this.dataInfo.score += score;
  },
  addDiamond: function addDiamond(d) {
    this.dataInfo.diamond += d;
  },
  check_pan: function check_pan(fishType, score) {
    var labelBaseNode = this.node.getChildByName("zhuanpan").getChildByName("zp_di3");
    var labelNode = labelBaseNode.getChildByName("tray_fish_type_" + fishType);
    if (labelNode == null) return;
    this.node.getChildByName("zhuanpan").active = true;
    this.node.getChildByName("zhuanpan").stopAllActions();
    this.node.getChildByName("zhuanpan").runAction(cc.sequence(cc.show(), cc.delayTime(3), cc.hide()));

    for (var i in labelBaseNode.children) {
      var node = labelBaseNode.children[i];
      if (node == labelNode) node.active = true;else node.active = false;
    }

    this.node.getChildByName("zhuanpan").getChildByName("jiangjin").getComponent(cc.Label).string = Helper.fixNum(score);
  },
  onSkill: function onSkill(sid, score, time) {
    this.dataInfo.score -= score;

    if (sid == 1) {} else if (sid == 2) {
      this.skillTime[1] = time;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXNoXFxDYW5ub25DdHJsLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic2VhdElEIiwiZ29sZExibCIsIkxhYmVsIiwiZGlhbW9uZExibCIsIm5hbWVMYmwiLCJiZXRMYmwiLCJjYW5ub25BbmltIiwiQW5pbWF0aW9uIiwib25Mb2FkIiwiY2Fubm9uUG9zIiwibm9kZSIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInBvc2l0aW9uIiwiZmlzaE1haW4iLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiY2Fubm9uTGlzdCIsInBsYXllckluZm8iLCJyZXF1aXJlIiwiZ2V0SW5zdGFudCIsIm9uRW5hYmxlIiwiZGF0YUluZm8iLCJwbGF5ZXJMaXN0Iiwic3RyaW5nIiwibmFtZSIsIndpbmRvdyIsInNldEhlYWRUZXh0dXJlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJoZWFkIiwiSGVscGVyIiwiZml4TnVtIiwicm9vbUJldCIsInVwZGF0ZSIsImR0Iiwic2NvcmUiLCJkaWFtb25kIiwidWlkIiwicGxheWVySWQiLCJidWxsZXRQb3dlciIsImlzTG9ja0Zpc2giLCJhY3RpdmUiLCJiYW5nIiwicG9zIiwiYmV0IiwiYmlkIiwiYW5nbGUiLCJNYXRoIiwiUEkiLCJhdGFuIiwieCIsInkiLCJwbGF5IiwiYnVsbGV0IiwiZ2V0QnVsbGV0IiwiYnVsbGV0UG9zIiwiYnVsbGV0QmciLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInNpbiIsImNvcyIsImluaXQiLCJ1c2VySUQiLCJwYXJlbnQiLCJidWxsZXRJZCIsImJpZ2Zpc2hpZCIsImdldEJpZ0Zpc2hJZCIsImF1dG9JZCIsImFkZHNjb3JlIiwiYWRkRGlhbW9uZCIsImQiLCJjaGVja19wYW4iLCJmaXNoVHlwZSIsImxhYmVsQmFzZU5vZGUiLCJsYWJlbE5vZGUiLCJzdG9wQWxsQWN0aW9ucyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwic2hvdyIsImRl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Q0FBQ00sS0FBaEYsRUFBdUZxQixNQUF2RixHQUFnR00sTUFBTSxDQUFDQyxNQUFQLENBQWNJLEtBQWQsQ0FBaEc7QUFDSCxHQXJHSTtBQXVHTCtDLEVBQUFBLE9BdkdLLG1CQXVHR0MsR0F2R0gsRUF1R1FoRCxLQXZHUixFQXVHZWlELElBdkdmLEVBdUdxQjtBQUN0QixTQUFLOUQsUUFBTCxDQUFjYSxLQUFkLElBQXVCQSxLQUF2Qjs7QUFDQSxRQUFJZ0QsR0FBRyxJQUFJLENBQVgsRUFBYyxDQUNiLENBREQsTUFDTyxJQUFJQSxHQUFHLElBQUksQ0FBWCxFQUFjO0FBQ2pCLFdBQUtFLFNBQUwsQ0FBZSxDQUFmLElBQW9CRCxJQUFwQjtBQUNIO0FBQ0o7QUE3R0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzZWF0SUQ6IDAsIC8v5bqn5L2N5Y+3XHJcbiAgICAgICAgZ29sZExibDogY2MuTGFiZWwsIC8v6YeR5biB5pi+56S6XHJcbiAgICAgICAgZGlhbW9uZExibDogY2MuTGFiZWwsIC8v6YeR5biB5pi+56S6XHJcbiAgICAgICAgbmFtZUxibDogY2MuTGFiZWwsIC8v5ZCN5a2X5pi+56S6XHJcbiAgICAgICAgYmV0TGJsOiBjYy5MYWJlbCwgLy/lvZPliY3lgI3mlbDmmL7npLpcclxuICAgICAgICBjYW5ub25BbmltOiBjYy5BbmltYXRpb24sIC8v5aSn54Ku5Yqo55S7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmNhbm5vblBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5jYW5ub25BbmltLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuZmlzaE1haW4gPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0Zpc2hNYWluJyk7XHJcbiAgICAgICAgdGhpcy5maXNoTWFpbi5jYW5ub25MaXN0W3RoaXMuc2VhdElEXSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJJbmZvID0gcmVxdWlyZSgnUGxheWVySW5mbycpLmdldEluc3RhbnQ7XHJcbiAgICAgICAgLy90aGlzLmF1dG9UaW1lID0gMDtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YUluZm8gPSB0aGlzLmZpc2hNYWluLnBsYXllckxpc3RbdGhpcy5zZWF0SURdO1xyXG4gICAgICAgIHRoaXMubmFtZUxibC5zdHJpbmcgPSB0aGlzLmRhdGFJbmZvLm5hbWU7XHJcbiAgICAgICAgd2luZG93LnNldEhlYWRUZXh0dXJlKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlck1MJykuZ2V0Q2hpbGRCeU5hbWUoJ2ZhY2UnKS5nZXRDaGlsZEJ5TmFtZSgnczEnKSwgdGhpcy5kYXRhSW5mby5oZWFkKTtcclxuICAgICAgICAvL3RoaXMuZ29sZExibC5zdHJpbmcgPSB0aGlzLmRhdGFJbmZvLnNjb3JlO1xyXG4gICAgICAgIC8vdGhpcy5iZXRMYmwuc3RyaW5nID0gdGhpcy5maXNoTWFpbi5yb29tQmV0O1xyXG4gICAgICAgIHRoaXMuYmV0TGJsLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5maXNoTWFpbi5yb29tQmV0KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy5nb2xkTGJsLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5kYXRhSW5mby5zY29yZSk7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kTGJsLnN0cmluZyA9IHRoaXMuZGF0YUluZm8uZGlhbW9uZDtcclxuICAgICAgICBpZiAodGhpcy5kYXRhSW5mby51aWQgPT0gdGhpcy5wbGF5ZXJJbmZvLnBsYXllcklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0TGJsLnN0cmluZyA9IEhlbHBlci5maXhOdW0odGhpcy5maXNoTWFpbi5yb29tQmV0ICogdGhpcy5maXNoTWFpbi5idWxsZXRQb3dlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5maXNoTWFpbi5pc0xvY2tGaXNoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3N1b2RpbmdfZWZmZWN0JykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3VvZGluZ19lZmZlY3QnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYXV0b1RpbWU+MCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYXV0b1RpbWUtLTtcclxuICAgICAgICAvLyB9O1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmF1dG9UaW1lPjApXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBiYW5nKHBvcywgYmV0LCBiaWQpIHtcclxuICAgICAgICAvL+mcgOimgeWMuuWIhuS4iuS4iyAg5pa55ZCR5piv5Y+N55qEXHJcbiAgICAgICAgbGV0IGFuZ2xlID0gMTgwIC8gKE1hdGguUEkgLyBNYXRoLmF0YW4oKHRoaXMuY2Fubm9uUG9zLnggLSBwb3MueCkgLyAodGhpcy5jYW5ub25Qb3MueSAtIHBvcy55KSkpO1xyXG4gICAgICAgIHRoaXMuY2Fubm9uQW5pbS5ub2RlLmFuZ2xlID0gdGhpcy5zZWF0SUQgPiAxID8gYW5nbGUgOiAtYW5nbGU7XHJcbiAgICAgICAgdGhpcy5jYW5ub25BbmltLnBsYXkoKTtcclxuXHJcbiAgICAgICAgLy/lpITnkIblrZDlvLnlj5HlsIRcclxuICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5maXNoTWFpbi5nZXRCdWxsZXQoKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1bGxldFBvcyA9IHRoaXMuZmlzaE1haW4uYnVsbGV0QmcuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5jYW5ub25Qb3MpO1xyXG5cclxuICAgICAgICBidWxsZXRQb3MueCArPSAxMDAgKiBNYXRoLnNpbigtMiAqIE1hdGguUEkgLyAzNjAgKiB0aGlzLmNhbm5vbkFuaW0ubm9kZS5hbmdsZSk7XHJcbiAgICAgICAgYnVsbGV0UG9zLnkgKz0gMTAwICogTWF0aC5jb3MoLTIgKiBNYXRoLlBJIC8gMzYwICogdGhpcy5jYW5ub25BbmltLm5vZGUuYW5nbGUpO1xyXG5cclxuICAgICAgICBidWxsZXQuZ2V0Q29tcG9uZW50KCdCdWxsZXRDdHJsJykuaW5pdCh0aGlzLmZpc2hNYWluLCB0aGlzLnNlYXRJRCwgYnVsbGV0UG9zLCB0aGlzLnNlYXRJRCA+IDEgPyBhbmdsZSAtIDE4MCA6IGFuZ2xlLCB0aGlzLmZpc2hNYWluLmJ1bGxldFBvd2VyKTtcclxuICAgICAgICBidWxsZXQuZ2V0Q29tcG9uZW50KCdCdWxsZXRDdHJsJykudXNlcklEID0gdGhpcy5kYXRhSW5mby51aWQ7XHJcbiAgICAgICAgYnVsbGV0LnBhcmVudCA9IHRoaXMuZmlzaE1haW4uYnVsbGV0Qmc7XHJcbiAgICAgICAgdGhpcy5kYXRhSW5mby5zY29yZSAtPSB0aGlzLmZpc2hNYWluLnJvb21CZXQgKiBiZXQ7XHJcbiAgICAgICAgYnVsbGV0LmdldENvbXBvbmVudCgnQnVsbGV0Q3RybCcpLmJ1bGxldElkID0gYmlkO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJvbnNob290OiBcIitiaWQpO1xyXG4gICAgICAgIC8vdGhpcy5idWxsZXRQb3dlciA9IGJldDtcclxuICAgICAgICB0aGlzLmJldExibC5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKHRoaXMuZmlzaE1haW4ucm9vbUJldCAqIGJldCk7XHJcblxyXG4gICAgICAgIGxldCBiaWdmaXNoaWQgPSB0aGlzLmZpc2hNYWluLmdldEJpZ0Zpc2hJZCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5maXNoTWFpbi5pc0xvY2tGaXNoKSB7XHJcbiAgICAgICAgICAgIGJ1bGxldC5nZXRDb21wb25lbnQoJ0J1bGxldEN0cmwnKS5hdXRvSWQgPSBiaWdmaXNoaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZHNjb3JlKHNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhSW5mby5zY29yZSArPSBzY29yZTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkRGlhbW9uZChkKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhSW5mby5kaWFtb25kICs9IGQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrX3BhbihmaXNoVHlwZSwgc2NvcmUpIHtcclxuICAgICAgICB2YXIgbGFiZWxCYXNlTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInpodWFucGFuXCIpLmdldENoaWxkQnlOYW1lKFwienBfZGkzXCIpO1xyXG4gICAgICAgIHZhciBsYWJlbE5vZGUgPSBsYWJlbEJhc2VOb2RlLmdldENoaWxkQnlOYW1lKFwidHJheV9maXNoX3R5cGVfXCIgKyBmaXNoVHlwZSk7XHJcbiAgICAgICAgaWYgKGxhYmVsTm9kZSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiemh1YW5wYW5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHVhbnBhblwiKS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInpodWFucGFuXCIpLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zaG93KCksIGNjLmRlbGF5VGltZSgzKSwgY2MuaGlkZSgpKSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgaW4gbGFiZWxCYXNlTm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGxhYmVsQmFzZU5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChub2RlID09IGxhYmVsTm9kZSkgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInpodWFucGFuXCIpLmdldENoaWxkQnlOYW1lKFwiamlhbmdqaW5cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBIZWxwZXIuZml4TnVtKHNjb3JlKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Ta2lsbChzaWQsIHNjb3JlLCB0aW1lKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhSW5mby5zY29yZSAtPSBzY29yZTtcclxuICAgICAgICBpZiAoc2lkID09IDEpIHtcclxuICAgICAgICB9IGVsc2UgaWYgKHNpZCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxUaW1lWzFdID0gdGltZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTsiXX0=
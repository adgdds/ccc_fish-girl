"use strict";
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
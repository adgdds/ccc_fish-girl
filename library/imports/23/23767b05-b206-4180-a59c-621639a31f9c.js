"use strict";
cc._RF.push(module, '23767sFsgZBgKWcYhY5ox+c', 'LandlordsButtonClick');
// Script/Land/LandlordsButtonClick.js

"use strict";

/**
 * 斗地主点击事件
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    btn_down: {
      "default": null,
      type: cc.Node
    },
    btn_up: {
      "default": null,
      type: cc.Node
    },
    setBar: {
      "default": null,
      type: cc.Node
    },
    btn_RobLandload: {
      "default": null,
      type: cc.Node
    },
    btn_Again: {
      "default": null,
      type: cc.Node
    },
    btn_match_again: {
      "default": null,
      type: cc.Node
    },
    btn_SendCard: {
      "default": null,
      type: cc.Node
    },
    btn_Start: {
      "default": null,
      type: cc.Node
    },
    btn_CallLandload: {
      "default": null,
      type: cc.Node
    },
    btn_NoSendCard: {
      "default": null,
      type: cc.Node
    },
    btn_outCards: {
      "default": null,
      type: cc.Node
    },
    btn_CancelTuoGuan: {
      "default": null,
      type: cc.Node
    }
  },
  onLoad: function onLoad() {},
  cliceDown: function cliceDown() {
    this.btn_down.active = false;
    this.btn_up.active = true;
    this.setBar.getComponent("cc.Animation").play("down");
  },
  cliceUp: function cliceUp() {
    this.btn_up.active = false;
    this.btn_down.active = true;
    this.setBar.getComponent("cc.Animation").play("up");
  },

  /**
   * 开始游戏
   */
  startGame: function startGame() {
    this.btn_Start.active = false;
    this.node.getComponent("LandlordsMain").netWork.startGameFunction();
    this.node.getComponent("LandlordsMain").gameInit();
    this.node.getComponent("LandlordsMain").allTips[1].getChildByName("dengdai").active = true;
    cc.log('点击开始游戏');
  },

  /**
   * 叫地主
   */
  Rob: function Rob() {
    this.btn_RobLandload.active = false;

    try {
      this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("qiang", {
        tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
        seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
        playerId: this.node.getComponent("LandlordsMain").netWork.playerId,
        qiang: 1 //抢地主

      });
    } catch (error) {}

    ;
  },

  /**
   * 不叫
   */
  NoRob: function NoRob() {
    this.btn_RobLandload.active = false;

    try {
      this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("qiang", {
        tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
        seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
        playerId: this.node.getComponent("LandlordsMain").netWork.playerId,
        qiang: 0 //不抢

      });
    } catch (error) {}

    ;
  },

  /**
   * 不出
   */
  outCard: function outCard() {
    this.node.getComponent("LandlordsMain").outCard();
  },

  /***
   * 出牌
   */
  sendCard: function sendCard() {
    this.btn_SendCard.active = false;
  },

  /**
   * 要不起
   */
  noOut: function noOut() {
    this.btn_outCards.active = false;

    try {
      this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("sendCardsArr", {
        array: [],
        userId: this.node.getComponent("LandlordsMain").pInfo.playerId,
        tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
        seatId: this.node.getComponent("LandlordsMain").netWork.seatId
      });
    } catch (error) {}

    ;
  },

  /**
   * 抢地主
   */
  callLandloads: function callLandloads() {
    this.btn_CallLandload.active = false;
    this.node.getComponent("LandlordsMain").pb_Timer[1].active = false;

    try {
      this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("qiang", {
        tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
        seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
        playerId: this.node.getComponent("LandlordsMain").netWork.playerId,
        qiang: 1
      });
    } catch (error) {}

    ;
  },

  /**
   * 不抢
   */
  noCallLandloads: function noCallLandloads() {
    this.btn_CallLandload.active = false;
    this.node.getComponent("LandlordsMain").pb_Timer[1].active = false;

    try {
      this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("qiang", {
        tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
        seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
        playerId: this.node.getComponent("LandlordsMain").netWork.playerId,
        qiang: 0
      });
    } catch (error) {}

    ;
  },

  /**
   * 离开游戏
   */
  exitGame: function exitGame() {
    if (this.node.getComponent("LandlordsMain").gameFinish) {
      if (this.node.getComponent("LandlordsMain").netWork !== null) {
        this.node.getComponent("LandlordsMain").netWork.gameExit = true;

        try {
          this.node.getComponent("LandlordsMain").netWork.lobbyMainSocket.disconnect();
        } catch (error) {}

        ;

        try {
          this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.disconnect();
        } catch (error) {}

        ;
      }

      ;
      cc.audioEngine.stopAll();
      this.checkMatch();
    } else {
      this.node.getComponent("LandlordsMain").exitReady.active = true;
    }

    this.node.getComponent("LandlordsMain").node.getChildByName("blackFace").active = true;
  },

  /**
   * 
   */
  readyExitGame: function readyExitGame() {
    if (this.node.getComponent("LandlordsMain").netWork !== null) {
      this.node.getComponent("LandlordsMain").netWork.gameExit = true;

      try {
        this.node.getComponent("LandlordsMain").netWork.lobbyMainSocket.disconnect();
      } catch (error) {}

      ;

      try {
        this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.disconnect();
      } catch (error) {}

      ;
    }

    cc.audioEngine.stopAll();
    this.checkMatch();
  },

  /**
   * 
   */
  cancelActive: function cancelActive() {
    this.node.getComponent("LandlordsMain").exitReady.active = false;
    this.node.getComponent("LandlordsMain").node.getChildByName("blackFace").active = false;
  },

  /**
   * 继续游戏
   */
  gameAgain: function gameAgain() {
    try {
      //游戏结束
      this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("loadedFinish", {
        ready: 0,
        tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
        seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
        playerId: this.node.getComponent("LandlordsMain").netWork.playerId
      });
      cc.log("继续游戏");
      this.btn_Again.active = false;
      this.btn_match_again.active = false;
      this.node.getChildByName("Bill").active = false;
      this.node.getChildByName("blackFace").active = false;
      this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = false;
      this.node.getComponent("LandlordsMain").allTips[1].getChildByName("dengdai").active = true;
    } catch (error) {}

    ;
  },

  /**
   * 比赛场继续游戏
   */
  gameMatchAgain: function gameMatchAgain() {// try {
    //     //游戏结束
    //     this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("loadedFinish_2", {
    //         ready: 0,
    //         tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
    //         seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
    //         playerId: this.node.getComponent("LandlordsMain").netWork.playerId
    //     });
    //     cc.log("继续游戏");
    //     this.btn_Again.active = false;
    //     this.btn_match_again.active = false;
    //     this.node.getChildByName("Bill").active = false;
    //     this.node.getChildByName("blackFace").active = false;
    //     this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = false;
    //     this.node.getComponent("LandlordsMain").allTips[1].getChildByName("dengdai").active = true;
    // } catch (error) {};
  },

  /**
   * 
   */
  closeBlackFace: function closeBlackFace() {
    this.node.getChildByName("Bill").active = false;
    this.node.getChildByName("blackFace").active = false;
    this.node.getChildByName("blackFace").getChildByName("btn_Signout").active = false;
  },

  /**
   * 显示提示信息
   */
  tipsFunction: function tipsFunction() {
    this.node.getComponent("LandlordsMain").tipsClick();
  },

  /**
   * 点击托管
   */
  tuoGuan: function tuoGuan() {
    if (!this.node.getComponent("LandlordsMain").gameFinish) {
      //tuoGuan=true 托管
      this.node.getComponent("LandlordsMain").tuoGuan = true;
      this.btn_CancelTuoGuan.active = true;
      this.node.getComponent("LandlordsMain").tuoGuanFunction(null);
      this.node.getComponent("LandlordsMain").turnOffTouch();

      try {
        //托管接口, isTuoGuan=true 托管
        this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("tuoGuan", {
          isTuoGuan: true,
          tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
          seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
          playerId: this.node.getComponent("LandlordsMain").netWork.playerId
        });
      } catch (error) {
        console.log(error);
      }

      ;
    }
  },

  /**
   * 点击取消托管
   */
  cancelTuoGaun: function cancelTuoGaun() {
    this.btn_CancelTuoGuan.active = false; //tuoGuan=false 不托管

    this.node.getComponent("LandlordsMain").tuoGuan = false;
    this.node.getComponent("LandlordsMain").addEventListener();

    try {
      //托管接口, isTuoGuan=false 不托管
      this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("tuoGuan", {
        isTuoGuan: false,
        tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
        seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
        playerId: this.node.getComponent("LandlordsMain").netWork.playerId
      });
    } catch (error) {
      console.log(error);
    }

    ;
  },

  /**
   * 重新连接游戏
   */
  reconnectGame: function reconnectGame() {
    this.node.getComponent("LandlordsMain").netWork;
    this.node.getComponent("LandlordsMain").com_MessageBox.active = false;
    cc.audioEngine.stopAll();
    this.checkMatch();
  },

  /**
   * 点击换桌
   */
  huanZuo: function huanZuo() {
    if (this.node.getComponent("LandlordsMain").gameFinish) {
      try {
        //换桌接口
        this.node.getComponent("LandlordsMain").netWork.LandlordsSocket.emit("huanZuo", {
          tableId: this.node.getComponent("LandlordsMain").netWork.tableId,
          seatId: this.node.getComponent("LandlordsMain").netWork.seatId,
          playerId: this.node.getComponent("LandlordsMain").netWork.playerId
        });
      } catch (error) {}

      ;
    }
  },
  checkMatch: function checkMatch() {
    var netWork = this.node.getComponent("LandlordsMain").netWork;
    var showMatch = netWork.prot == 13706;
    cc.director.loadScene("LobbyMain", function () {
      var scene = cc.find('Canvas').getComponent('LobbyMain');

      if (showMatch) {
        try {
          setTimeout(function () {
            scene.showMatchUI();
          }, 1000);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
});

cc._RF.pop();
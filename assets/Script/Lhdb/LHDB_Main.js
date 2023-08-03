const GEMOFFSET = 90;

cc.Class({
    extends: cc.Component,
    //传100-100000  本地 10-200
    properties: {
        musicNode: cc.Node,
        levelTitle: [cc.Node],
        lblGoldPool: cc.Label,
        levelList: [cc.Node],
        lblChipList: [cc.Label],
        chipSpList: [cc.Node],
        lblCoin: cc.Label,
        lblAllCoin: cc.Label,
        lblLines: cc.Label,
        lblLinescore: cc.Label,
        slider: cc.Slider,
        tuoguanList: [cc.Node],
        helpNode: cc.Node,
        helpPageView: cc.PageView,
        exitBd: cc.Node,
        lblSmallBox: [cc.Label],
        //池
        areaList: [cc.Node],
        //大奖掉落球
        dropBallBd: cc.Node,
        dropBall: cc.Node,
        dropBallList0: [cc.Node],
        dropBallList1: [cc.Node],
        dropBallList2: [cc.Node],
        dropBallList3: [cc.Node],
        dropBallList4: [cc.Node],
        dropBd: cc.Node,
        lbldropBdCoin: cc.Label,
        tip: cc.Node,
        prefabs: [cc.Prefab],
        startBtn: cc.Button,
        btnMask: cc.Node,
    },

    onLoad() {
        this.network = this.getComponent('LHDB_Network');
        this.audio = this.musicNode.getComponent('LHDB_Audio');
        this.lines = 0; //线数
        this.bet = 0; //单线下注金额
        this.tuoguan = false; //托管标志
        this.tmOffset = true; //开始按钮时间间隔
        this.gemList = []; //存储宝石节点用于boo
        this.gemPidList = []; //存储宝石pid
    },

    start() {
        this.audio.stopAll();
        this.audio.playBgm();
        this.gameInit();
        this.setLevel(1);

        // this.setBox([1, 2, 3, 4, 5], [0, 1, 0, 1], 19999);
    },

    gameInit() {
        this.setLevel(0);
        for (let i in this.levelList) {
            let list = this.levelList[i].children;
            for (let j in list) {
                list[j].active = true;
            }
        }
        this.lblCoin.string = '0.00';
        this.lblAllCoin.string = '0.00';
        for (let i in this.lblChipList) {
            this.lblChipList[i].string = '0';
        }
        this.lblLines.string = '0';
        this.lblLinescore.string = '0';
        for (let i in this.lblChipList) {
            this.lblChipList[i].node.active = false;
            this.chipSpList[i].active = true;
        }
    },

    /**
     * 切换关卡
     * @param {管卡等级1-3} lv 
     */
    setLevel(lv) {
        lv = parseInt(lv);
        this.level = lv;
        for (let i in this.levelTitle) {
            this.levelTitle[i].active = parseInt(lv) - 1 == i;
        }
        if (lv === 0) {
            for (let i in this.areaList) {
                this.areaList[i].removeAllChildren();
            }
        } else if (lv === 1) {
            this.areaList[1].removeAllChildren();
            this.areaList[2].removeAllChildren();
        } else if (lv === 2) {
            this.areaList[0].removeAllChildren();
            this.areaList[2].removeAllChildren();
            let list = this.levelList[0].children;
            for (let j in list) {
                list[j].active = false;
            }
        } else if (lv === 3) {
            this.areaList[0].removeAllChildren();
            this.areaList[1].removeAllChildren();
            for (let i in this.levelList) {
                if (i == '2') {
                    return;
                }
                let list = this.levelList[i].children;
                for (let j in list) {
                    list[j].active = false;
                }
            }
        }
    },

    exitGame() {
        this.network.socket.disconnect();
        cc.director.loadScene("LobbyMain");
    },

    onSlider(ev, args) {
        this.bet = parseInt(this.slider.progress * 20) * 10;
        this.setLinesInfo(this.lines, this.bet);
    },

    onClick(ev, args) {
        this.audio.playBtn();
        switch (args) {
            case 'exit':
                this.exitBd.active = true;
                break;
            case 'closeExit':
                this.exitBd.active = false;
                break;
            case 'exitSave':
                this.exitGame();
                break;
            case 'exitOK':
                this.network.socket.emit('clearGameDict');
                break;
            case 'help':
                this.helpNode.active = true;
                break;
            case 'help_close':
                this.helpNode.active = false;
                break;
            case 'upPage':
                let curIndex1 = this.helpPageView.getCurrentPageIndex();
                if (--curIndex1 >= 0) {
                    this.helpPageView.setCurrentPageIndex(curIndex1);
                }
                break;
            case 'downPage':
                let curIndex = this.helpPageView.getCurrentPageIndex();
                if (++curIndex < 5) {
                    this.helpPageView.setCurrentPageIndex(curIndex);
                }
                break;
            case 'setting':
                break;
            case 'auto':
                if (this.tmOffset && !this.tuoguan) {
                    this.startBtn.interactable = false;
                    this.startGame();
                }
                this.tuoguan = !this.tuoguan;
                this.tuoguanList[0].active = !this.tuoguan;
                this.tuoguanList[1].active = this.tuoguan;
                break;
            case 'start':
                this.startGame();
                break;
            case 'restart':
                this.btnMask.active = false;
                this.dropBallBd.active = false;
                this.dropBd.active = false;
                for (let i in this.levelList) {
                    let list = this.levelList[i].children;
                    for (let j in list) {
                        list[j].active = true;
                    }
                }
                break;
            case 'addLines':
                this.lines++;
                this.lines = this.lines <= 5 ? this.lines : 5;
                this.setLinesInfo(this.lines, this.bet);
                break;
            case 'decLines':
                this.lines--;
                this.lines = this.lines >= 0 ? this.lines : 0;
                this.setLinesInfo(this.lines, this.bet);
                break;
            case 'addScore':
                this.bet += 10;
                this.bet = this.bet >= 200 ? 200 : this.bet;
                this.slider.progress = this.bet / 200;
                this.setLinesInfo(this.lines, this.bet);
                break;
            case 'decScore':
                this.bet -= 10;
                this.bet = this.bet >= 0 ? this.bet : 0;
                this.slider.progress = this.bet / 200;
                this.setLinesInfo(this.lines, this.bet);
                break;
            default:
                break;
        }
    },

    startGame() {
        if (this.tmOffset) {
            let bet = this.lines * this.bet;
            if (bet == 0) {
                this.showTip('下注金额不符合规则');
                return;
            }
            cc.log(`sendBet:${bet}`);
            this.network.socket.emit('lottery', JSON.stringify({
                bet: bet * 100
            }))
            this.tmOffset = false;
            this.startBtn.interactable = false;
        }
    },

    setLinesInfo(lines, bet) {
        this.lblLines.string = lines;
        this.lblLinescore.string = bet;
        for (let i in this.lblChipList) {
            let showBool = parseInt(i) < lines;
            this.lblChipList[i].node.active = showBool;
            this.lblChipList[i].string = bet;
            this.chipSpList[i].active = !showBool;
        }
    },

    //下落形成完整宝石矩阵
    levelDown(level, id, pid) {
        this.gemPidList[id] = pid;
        pid = pid == 99 ? 16 : (level - 1) * 5 + (pid + 1);
        let targetPos = cc.v2(GEMOFFSET * parseInt(id % (level + 3)), -GEMOFFSET * parseInt(id / (level + 3)));
        let curPos = cc.v2(targetPos.x, targetPos.y + 1000);
        let pb = cc.instantiate(this.prefabs[pid]);
        pb.position = curPos;
        pb.runAction(cc.moveTo(0.7, targetPos));
        this.areaList[level - 1].addChild(pb);
        this.gemList[id] = pb;
    },

    //爆炸指定宝石id
    gemBoo(id) {
        let boo = cc.instantiate(this.prefabs[0]);
        boo.position = this.gemList[id].position;
        boo.parent = this.gemList[id].parent;
        this.gemList[id].removeFromParent();
        //如果有钻头消箱子
        if (this.gemPidList[id] == 99) {
            this.desBox();
        }
        this.gemList[id] = null;
        this.gemPidList[id] = null;
        this.scheduleOnce(() => {
            boo.removeFromParent();
        }, 0.5);
    },

    //消除宝箱
    desBox() {
        let boxList = this.levelList[this.level - 1].children;
        for (let i in boxList) {
            if (!!boxList[i].active) {
                boxList[i].active = false;
                return;
            }
        }
        this.audio.playDecBox();
    },

    //清理爆炸后的矩阵 为第二次下落准备
    cleanBoo(level) {
        for (let w = 0; w < level + 3; w++) { //横
            for (let h = level + 2; h >= 0; h--) { //纵
                if (this.gemList[w + h * (level + 3)] == null) {
                    for (let i = h; i >= 0; i--) {
                        if (this.gemList[w + i * (level + 3)] != null) {
                            this.gemList[w + h * (level + 3)] = this.gemList[w + i * (level + 3)];
                            this.gemPidList[w + h * (level + 3)] = this.gemPidList[w + i * (level + 3)];
                            this.gemList[w + h * (level + 3)].runAction(cc.sequence(cc.moveTo(0.2, cc.v2(this.gemList[w + h * (level + 3)].x, -GEMOFFSET * h)), cc.callFunc(() => {
                                this.audio.playLandAudio();
                            })));
                            this.gemList[w + i * (level + 3)] = null;
                            this.gemPidList[w + i * (level + 3)] = null;
                            break;
                        }
                    }
                }
            }
        }
    },

    /**
     * 大奖游戏
     * @param {宝箱金币} numList 
     * @param {掉落左右选择0，1} lrList 
     * @param {获得总金额} score 
     */
    setBox(numList, lrList, score) {
        this.btnMask.active = true;
        this.dropBallBd.active = true;
        for (let i in this.lblSmallBox) {
            this.lblSmallBox[i].string = numList[i];
        }
        const ballPos = cc.v2(0, 257);
        this.dropBall.position = ballPos;
        this.dropBall.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(() => {
                this.audio.playAward();
            }),
            cc.moveTo(0.25, this.dropBallList0[0].position),
            cc.moveTo(0.25, this.dropBallList1[0 + lrList[0]].position),
            cc.moveTo(0.25, this.dropBallList2[0 + lrList[0] + lrList[1]].position),
            cc.moveTo(0.25, this.dropBallList3[0 + lrList[0] + lrList[1] + lrList[2]].position),
            cc.moveTo(0.25, this.dropBallList4[0 + lrList[0] + lrList[1] + lrList[2] + lrList[3]].position),
            cc.callFunc(() => {
                this.dropBd.active = true;
                this.lbldropBdCoin.string = score;
            })
        ));
    },

    showTip(title) {
        this.tip.stopAllActions();
        this.tip.y = -184;
        this.tip.opacity = 0;
        this.tip.getChildByName('tipLbl').getComponent(cc.Label).string = title;
        this.tip.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.5), cc.moveTo(0.5, cc.v2(0, -100))), cc.delayTime(1), cc.fadeOut(0.5)));
    }
})
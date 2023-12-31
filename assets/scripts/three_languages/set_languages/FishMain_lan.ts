const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
}

interface GlobalData_5 {
    labelArr: cc.Label[],
    spriteArr: cc.Sprite[],
    spriteFrameArr_zh: cc.SpriteFrame[],
    spriteFrameArr_en: cc.SpriteFrame[],
    spriteFrameArr_vn: cc.SpriteFrame[]
}

@ccclass
export default class FishMain_lan extends cc.Component {

    @property({ type: [cc.Label], tooltip: '替换的Label' })
    labelArr: cc.Label[] = [];

    zhLanguage: { [key: number]: string } = {
        0: '累积 JackPot',
        1: '～随时归您～',
        2: '锁定',
        3: '自动',
        4: '确认',
        5: '取消',
        6: '确认退出游戏？',
        7: '提示',
        8: '音乐开关',
        9: '音效开关',
        10: '设置',
        11: '正在返回大厅...',
        12: '一网打尽',
        13: '大三元',
        14: '赔率X3',
        15: '大四喜',
        16: '赔率X4',
        17: '小刺鱼',
        18: '小草鱼',
        19: '小黄鱼',
        20: '泡泡鱼',
        21: '小紫鱼',
        22: '尼莫',
        23: '河豚',
        24: '蓝鱼',
        25: '灯笼鱼',
        26: '神仙鱼',
        27: '乌龟',
        28: '蝴蝶鱼',
        29: '孔雀鱼',
        30: '剑鱼',
        31: '蝙蝠鱼',
        32: '大白鲨',
        33: '大金鲨',
        34: '蜻蜓鱼',
        35: '龙虾',
        36: '海豚',
        37: '金龙',
        38: '金蟾',
        39: '黄金鲨',
        40: '钻石',
        41: '钻石',
        42: '钻石',
        43: '钻石',
        44: '钻石',
        45: '局部炸弹',
        46: '全屏炸弹',
        47: '鱼种'
    };

    enLanguage: { [key: number]: string } = {
        0: 'Cumulative JackPot',
        1: '~ At your disposal ~ ',
        2: 'Lock ',
        3: 'Automatic ',
        4: 'Confirm ',
        5: 'Cancel ',
        6: 'Are you sure to quit the game? ',
        7: 'Prompt ',
        8: 'Music switch ',
        9: 'Sound switch ',
        10: 'Settings ',
        11: 'Is returning to the hall... ',
        12: 'A net sweep ',
        13: 'Big three ',
        14: 'odds X3',
        15: 'Fourth Year happiness ',
        16: 'Odds X4',
        17: 'Little Stickleback ',
        18: 'Little grass carp ',
        19: 'Little Yellow croaker ',
        20: 'Bubble fish ',
        21: 'Little Purple Fish ',
        22: 'Nemo ',
        23: 'Puffer fish ',
        24: 'Blue fish ',
        25: 'Lantern Fish ',
        26: 'Angelfish ',
        27: 'Turtle ',
        28: 'Butterfly fish ',
        29: 'Guppy ',
        30: 'Swordfish ',
        31: 'Batfish ',
        32: 'Jaws ',
        33: 'The Great Golden Shark ',
        34: 'Dragonfly ',
        35: 'Lobster ',
        36: 'Dolphin ',
        37: 'Golden Dragon ',
        38: 'Golden Toad ',
        39: 'Golden Shark ',
        40: 'Diamond ',
        41: 'Diamond ',
        42: 'Diamond ',
        43: 'Diamond ',
        44: 'Diamond ',
        45: 'Local bombs ',
        46: 'Full Screen bomb ',
        47: 'Species of fish'
    };

    inLanguage: { [key: number]: string } = {
        0: 'menumpuk JackPot ',
        1: 'yang akan menjadi milikmu',
        2: 'Kunci',
        3: "otomatis",
        4: 'dikonfirmasi ',
        5: 'Pembatalan',
        6: 'konfirmasi meninggalkan permainan? ',
        7: 'petunjuk',
        8: 'tombol musik',
        9: 'Sub by',
        10: "setting",
        11: 'kembali menuju lobi',
        12: 'finished',
        13: 'Ta san yuan',
        14: "odds X3",
        15: 'selamat tahun senior ',
        16: "odds ds X4",
        17: 'menyengat kecil',
        18: "ikan kecil",
        19: 'ikan kuning kecil',
        20: "泡泡鱼",
        21: 'ikan kecubung',
        22: "nemo",
        23: "ikan buntal",
        24: "bluefish",
        25: 'lentera ikan',
        26: "ikan peri",
        27: "tortoids",
        28: 'ikan kupu-kupu',
        29: 'Ikan guppy',
        30: "swordfish",
        31: "batfish",
        32: "jaws",
        33: 'great gold shark ',
        34: "ikan capung",
        35: "lobster",
        36: 'dolphin',
        37: 'Kingdragon',
        38: "katak emas",
        39: ' Hiu emas',
        40: 'diamond',
        41: 'diamond',
        42: 'Berlian',
        43: 'diamond',
        44: 'Berlian',
        45: "bom lokal",
        46: 'bom layar penuh',
        47: "penanaman ikan"
    };

    @property({ type: [cc.Sprite], tooltip: '替换的Sprite' })
    spriteArr: cc.Sprite[] = [];

    @property({ type: [cc.SpriteFrame], tooltip: '替换的中文图片' })
    spriteFrameArr_zh: cc.SpriteFrame[] = [];

    @property({ type: [cc.SpriteFrame], tooltip: '替换的英文图片' })
    spriteFrameArr_en: cc.SpriteFrame[] = [];

    @property({ type: [cc.SpriteFrame], tooltip: '替换的印尼图片' })
    spriteFrameArr_vn: cc.SpriteFrame[] = [];


    protected start(): void {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_5) {
            window.globalData_5 = {} as GlobalData_5;
        }
        window.globalData_5.labelArr = this.labelArr;
        window.globalData_5.spriteArr = this.spriteArr;
        window.globalData_5.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_5.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_5.spriteFrameArr_vn = this.spriteFrameArr_vn;

        this.setLanguage();
    }

    private setLanguage(): void {
        const persistNode = cc.director.getScene().getChildByName('init_language');
        const yourScriptComponent = persistNode.getComponent('FishMain_lan');

        const globalLabelArr = window.globalData_5.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;

        const globalSpriteArr = window.globalData_5.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;

        const globalSpriteFrameArr_zh = window.globalData_5.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;

        const globalSpriteFrameArr_en = window.globalData_5.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;

        const globalSpriteFrameArr_vn = window.globalData_5.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;

        let language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;

        let languageObj: { [key: number]: string } = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                for (let i = 0; i < this.spriteFrameArr_zh.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_zh[i];
                }
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                for (let i = 0; i < this.spriteFrameArr_vn.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_vn[i];
                }
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                for (let i = 0; i < this.spriteFrameArr_en.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_en[i];
                }
                break;
        }

        this.labelArr.forEach((label, index) => {
            label.string = languageObj[index] || '';
        });
    }
}

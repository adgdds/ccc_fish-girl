const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
}
interface GlobalData_7 {
    labelArr: cc.Label[],
    spriteArr: cc.Sprite[],
    spriteFrameArr_zh: cc.SpriteFrame[],
    spriteFrameArr_en: cc.SpriteFrame[],
    spriteFrameArr_vn: cc.SpriteFrame[]
}
@ccclass
export default class saigou_lan extends cc.Component {

    @property({ type: [cc.Label], tooltip: '替换的Label' })
    labelArr: cc.Label[] = [];

    zhLanguage: { [key: number]: string } = {
        0: '限注:1-10000',
        1: '当前下注',
        2: '金币',
        3: '规则',
        4: '音乐',
        5: '音效',
        6: '开奖记录',
        7: '游戏玩法',
        8: '请下住',
        9: '钱不够了',
        10: '显示号码',
        11: '显示大小',
        12: '显示单双',
    };

    enLanguage: { [key: number]: string } = {
        0: 'Limited note :1-10000',
        1: 'Current bet ',
        2: 'Gold coin ',
        3: 'Rules ',
        4: 'Music ',
        5: 'Sound effects ',
        6: 'Lottery record ',
        7: 'Game play ',
        8: 'Please stay down ',
        9: 'Not enough money ',
        10: 'Show number ',
        11: 'Display size ',
        12: 'Show single and double ',
    };

    inLanguage: { [key: number]: string } = {
        0: 'catatan terbatas: 1-10.000 ',
        1: 'taruhan saat ini ',
        2: 'koin emas ',
        3: 'aturan ',
        4: 'musik ',
        5: 'pengaruh suara ',
        6: 'rekor lotre ',
        7: 'permainan ',
        8: 'tetaplah berbaring ',
        9: 'tidak cukup uang ',
        10: 'nomor pertunjukan ',
        11: 'ukuran Display ',
        12: 'tampilkan tunggal dan ganda ',
    };

    protected start(): void {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_7) {
            window.globalData_7 = {} as GlobalData_7;
        }
        window.globalData_7.labelArr = this.labelArr;
        window.globalData_7.spriteArr = this.spriteArr;
        window.globalData_7.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_7.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_7.spriteFrameArr_vn = this.spriteFrameArr_vn;

        this.setLanguage();
    }

    private setLanguage(): void {
        const persistNode = cc.director.getScene().getChildByName('init_language');
        const yourScriptComponent = persistNode.getComponent('saigou_lan');

        const globalLabelArr = window.globalData_7.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;

        const globalSpriteArr = window.globalData_7.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;

        const globalSpriteFrameArr_zh = window.globalData_7.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;

        const globalSpriteFrameArr_en = window.globalData_7.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;

        const globalSpriteFrameArr_vn = window.globalData_7.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;

        let language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;

        let languageObj: { [key: number]: string } = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                break;
        }

        this.labelArr.forEach((label, index) => {
            label.string = languageObj[index] || '';
        });
    }
}

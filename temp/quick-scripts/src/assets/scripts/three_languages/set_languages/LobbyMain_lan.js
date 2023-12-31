"use strict";
cc._RF.push(module, '92de6Ac7AVGArQl2jPLMK6H', 'LobbyMain_lan');
// scripts/three_languages/set_languages/LobbyMain_lan.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Language;
(function (Language) {
    Language["ZH"] = "txt.zh";
    Language["VN"] = "txt.vn";
    Language["EN"] = "txt.en";
})(Language || (Language = {}));
var LobbyMain_lan = /** @class */ (function (_super) {
    __extends(LobbyMain_lan, _super);
    function LobbyMain_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '手机号注册',
            1: '手机号',
            2: '验证码',
            3: '确认密码',
            4: '输入手机号',
            5: '输入验证码',
            6: '输入密码',
            7: '注册',
            8: '发送验证码',
            9: '手机号',
            10: '请输入手机号',
            11: '密码',
            12: '请输入密码',
            13: '注册',
            14: '游客登录',
            15: '登录',
            16: '手机号',
            17: '验证码',
            18: '确认密码',
            19: '活动',
            20: '发送验证码',
            21: '手机号',
            22: '游戏密码',
            23: '请输入手机号',
            24: '请输入游戏密码',
            25: '注册新游客',
            26: '确定',
            27: '温馨提示: \n\n 1.如果您的账号没转正，切换后游客账号将永久消失。\n\n 2.切换账号失败需要重装登录游戏。',
            28: '游戏旧密码:',
            29: '游戏新密码:',
            30: '确定新密码',
            31: '温馨提示：\n\n1.旧密码不能与新密码相同\n\n2.请尽量使用英文+数字组合，可区分大小写',
            32: '支付宝账号',
            33: '确定账号',
            34: '实名制名字',
            35: '存入',
            36: '取款',
            37: '赠送',
            38: '记录',
            39: '密码',
            40: '查询',
            41: '金币:',
            42: '存款:',
            43: '存入金额:',
            44: '请输入存入金币数',
            45: '重置',
            46: '全部',
            47: '存入',
            48: '银行',
            49: '金币:',
            50: '存款:',
            51: '取出金额:',
            52: '请输入取出金币数',
            53: '重置',
            54: '密码:',
            55: '请输入银行密码',
            56: '全部',
            57: '取出',
            58: '金币:',
            59: '存款：',
            60: '请输入赠送金币数',
            61: '请输入对方的玩家id',
            62: '重置',
            63: '玩家ID:',
            64: '赠送金额:',
            65: '银行密码：',
            66: '请输入银行密码',
            67: '赠送',
            68: '转入记录',
            69: '转出记录',
            70: '流水号',
            71: '游戏id',
            72: '转入数量',
            73: '转入日期',
            74: '流水号',
            75: '游戏id',
            76: '转出数量',
            77: '转出日期',
            78: '请输入原密码',
            79: '请输入新密码',
            80: '找回',
            81: '原银行密码:',
            82: '新密码:',
            83: '确认密码:',
            84: '请再次输入',
            85: '确定',
            86: '输入ID',
            87: '查询',
            88: '用户id',
            89: '金币数量',
            90: '用户ID:'
        };
        _this.enLanguage = {
            0: 'Mobile number registration ',
            1: 'Mobile number ',
            2: 'Verification code ',
            3: 'Confirm password ',
            4: 'Enter the phone number ',
            5: 'Enter the verification code ',
            6: 'Enter password ',
            7: 'Register ',
            8: 'Send verification code ',
            9: 'Mobile number ',
            10: 'Please enter mobile number ',
            11: 'Password ',
            12: 'Please enter password ',
            13: 'Register ',
            14: 'Visitor login ',
            15: 'Login ',
            16: 'Mobile number ',
            17: 'Verification code ',
            18: 'Confirm password ',
            19: 'Activity ',
            20: 'Send verification code ',
            21: 'Mobile number ',
            22: 'Game password ',
            23: 'Please enter mobile phone number ',
            24: 'Please enter game password ',
            25: 'Register New visitors ',
            26: 'OK ',
            27: 'Warm tips: \n\n 1. If your account is not converted, the tourist account will disappear permanently after switching. 2. Failure to switch accounts requires reinstallation to log in to the game. ',
            28: 'Game Old password :',
            29: 'Game New password :',
            30: 'Confirm new password ',
            31: 'Warm reminder: \n\n1. The old password cannot be the same as the new password \n\n2. Please try to use English + number combination, case sensitive ',
            32: 'Alipay Account ',
            33: 'Confirm account number ',
            34: 'Real name ',
            35: 'Deposit ',
            36: 'Withdrawal ',
            37: 'gifting ',
            38: 'Record ',
            39: 'Password ',
            40: 'Query ',
            41: 'Gold coins :',
            42: 'Deposit :',
            43: 'Deposit amount :',
            44: 'Please enter the number of coins deposited ',
            45: 'Reset ',
            46: 'All ',
            47: 'Deposit ',
            48: 'Bank ',
            49: 'Gold coins :',
            50: 'Deposit :',
            51: 'Withdrawal amount :',
            52: 'Please enter the number of gold coins withdrawn ',
            53: 'Reset ',
            54: 'Password :',
            55: 'Please enter your bank password ',
            56: 'All ',
            57: 'Take out ',
            58: 'Gold coins :',
            59: 'Deposit: ',
            60: 'Please enter the number of gold coins ',
            61: 'Please enter the other player id',
            62: 'Reset ',
            63: 'Player ID:',
            64: 'Gift amount :',
            65: 'Bank Password: ',
            66: 'Please enter your bank password ',
            67: 'gifting ',
            68: 'Transfer to record ',
            69: 'roll out record ',
            70: 'Serial number ',
            71: 'Game id',
            72: 'transfer quantity ',
            73: 'Transfer date ',
            74: 'Serial number ',
            75: 'Game id',
            76: 'Transfer quantity ',
            77: 'roll-out date ',
            78: 'Please enter old password ',
            79: 'Please enter a new password ',
            80: 'Retrieve ',
            81: 'Original bank password :',
            82: 'New password :',
            83: 'Confirm password :',
            84: 'Please enter again ',
            85: 'OK ',
            86: 'Enter ID',
            87: 'Query ',
            88: 'User id',
            89: 'gold coin quantity ',
            90: 'User ID:'
        };
        _this.inLanguage = {
            0: 'plat nomor mobil ',
            1: 'nomor ponsel ',
            2: 'kode verifikasi ',
            3: 'konfirmasi sandi ',
            4: 'masukkan nomor telepon ',
            5: 'masukkan kode verifikasi ',
            6: 'masukkan sandi ',
            7: 'Register ',
            8: 'kirim kode verifikasi ',
            9: 'nomor ponsel ',
            10: 'silakan masukkan nomor ponsel ',
            11: 'sandi ',
            12: 'masukkan kata sandi ',
            13: 'Register ',
            14: 'log masuk pengunjung ',
            15: 'masuk ',
            16: 'nomor ponsel ',
            17: 'kode verifikasi ',
            18: 'konfirmasi sandi ',
            19: 'kegiatan ',
            20: 'kirim kode verifikasi ',
            21: 'nomor ponsel ',
            22: 'sandi permainan ',
            23: 'silakan masukkan nomor ponsel ',
            24: 'silakan masukkan sandi permainan ',
            25: 'daftarkan tamu baru ',
            26: 'OK ',
            27: 'tips hangat: \n\n 1. Jika rekening anda tidak dikonversi, account wisata akan hilang secara permanen setelah beralih. 2.  Kegagalan untuk mengganti rekening menuntut pengembalian posisi untuk masuk ke permainan. ',
            28: 'sandi permainan lama :',
            29: 'sandi baru permainan :',
            30: 'konfirmasi password baru ',
            31: 'pengingat hangat: \n\n1. Sandi lama tidak bisa sama dengan sandi baru \n\n2. Silakan coba menggunakan bahasa inggris + nomor kombinasi, huruf sensitif ',
            32: 'rekening Alipay ',
            33: 'konfirmasi nomor rekening ',
            34: 'nama asli ',
            35: 'setorkan ',
            36: 'penarikan ',
            37: 'menghadiahkan ',
            38: 'rekor ',
            39: 'sandi ',
            40: 'Query ',
            41: 'koin emas :',
            42: 'setorkan :',
            43: 'jumlah uang muka :',
            44: 'tolong masukkan jumlah uang logam yang diendapkan ',
            45: 'Reset ',
            46: 'semua ',
            47: 'setorkan ',
            48: 'Bank ',
            49: 'koin emas :',
            50: 'setoran :',
            51: 'jumlah penarikan :',
            52: 'tolong masukkan jumlah koin emas yang ditarik ',
            53: 'atur kembali ',
            54: 'sandi :',
            55: 'silakan masukkan sandi bank anda ',
            56: 'semua ',
            57: 'ambil ',
            58: 'koin emas :',
            59: 'setorkan: ',
            60: 'silakan masukkan jumlah koin emas ',
            61: 'silakan masukkan identitas pemain lainnya ',
            62: 'Reset ',
            63: 'pemain ID:',
            64: 'jumlah hadiah :',
            65: 'sandi Bank: ',
            66: 'silakan masukkan sandi bank anda ',
            67: 'menghadiahi ',
            68: 'Transfer ke catatan ',
            69: 'roll out record ',
            70: 'nomor seri ',
            71: 'Game id',
            72: 'jumlah transfer ',
            73: 'Transfer date ',
            74: 'nomor seri ',
            75: 'permainan id',
            76: 'mentransfer kuantitas ',
            77: 'roll-out date ',
            78: 'silakan masukkan sandi lama ',
            79: 'tolong masukkan password baru ',
            80: 'ambil ',
            81: 'sandi asli bank :',
            82: 'sandi baru :',
            83: 'konfirmasi sandi :',
            84: 'tolong masukkan lagi ',
            85: 'OK ',
            86: 'masukkan ID',
            87: 'pertanyaan ',
            88: 'pengguna id',
            89: 'koin emas kuantitas ',
            90: 'pengguna ID:'
        };
        return _this;
    }
    LobbyMain_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData) {
            window.globalData = {};
        }
        window.globalData.labelArr = this.labelArr;
        window.globalData.spriteArr = this.spriteArr;
        window.globalData.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    LobbyMain_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('LobbyMain_lan');
        var globalLabelArr = window.globalData.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
        var language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;
        var languageObj = {};
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
        this.labelArr.forEach(function (label, index) {
            label.string = languageObj[index] || '';
        });
    };
    LobbyMain_lan.Instance = null;
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], LobbyMain_lan.prototype, "labelArr", void 0);
    LobbyMain_lan = __decorate([
        ccclass
    ], LobbyMain_lan);
    return LobbyMain_lan;
}(cc.Component));
exports.default = LobbyMain_lan;

cc._RF.pop();
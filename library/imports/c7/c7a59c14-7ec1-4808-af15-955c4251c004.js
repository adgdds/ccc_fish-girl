"use strict";
cc._RF.push(module, 'c7a59wUfsFICK8VlVxCUcAE', 'baijiale_game_lan');
// scripts/three_languages/set_languages/baijiale_game_lan.ts

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
var BaijialeGameLan = /** @class */ (function (_super) {
    __extends(BaijialeGameLan, _super);
    function BaijialeGameLan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '点',
            1: '点',
            2: '富豪',
            3: '神算子',
            4: '规则'
        };
        _this.enLanguage = {
            0: 'POINT',
            1: 'POINT',
            2: 'RICH',
            3: 'GodOperator',
            4: 'RULE'
        };
        _this.inLanguage = {
            0: 'titik',
            1: 'pluviosity',
            2: 'pembuat firman',
            3: 'aturan'
        };
        return _this;
    }
    BaijialeGameLan.prototype.start = function () {
        this.setLanguage();
    };
    BaijialeGameLan.prototype.setLanguage = function () {
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
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], BaijialeGameLan.prototype, "labelArr", void 0);
    BaijialeGameLan = __decorate([
        ccclass
    ], BaijialeGameLan);
    return BaijialeGameLan;
}(cc.Component));
exports.default = BaijialeGameLan;

cc._RF.pop();
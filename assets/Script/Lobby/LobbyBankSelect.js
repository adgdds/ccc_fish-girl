/**
 * 选择银行
 */
cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad: function() {
        /**
         * 银行编码列表
         */
        this.bankNumber = [
            [376968, 376969, 400360, 403391, 403392, 376966, 404158, 404159, 404171, 404172, 404173, 404174, 404157, 433667, 433668, 433669, 514906, 403393, 520108, 433666, 558916, 622678, 622679, 622680, 622688, 622689, 628206, 556617, 628209, 518212, 628208, 356390, 356391, 356392, 622916, 622918, 622919, 628370, 628371, 628372], 
            [621660, 621661, 621662, 621663, 621665, 621666, 621667, 621668, 621669, 625908, 625910, 625909, 356833, 356835, 409665, 409666, 409668, 409669, 409670, 409671, 409672, 456351, 512315, 512316, 512411, 512412, 514957, 409667, 518378, 518379, 518474, 518475, 518476, 438088, 524865, 525745, 525746, 547766, 552742, 553131, 558868, 514958, 622752, 622753, 622755, 524864, 622757, 622758, 622759, 622760, 622761, 622762, 622763, 601382, 622756, 628388, 621256, 621212, 620514, 622754, 622764, 518377, 622765, 622788, 621283, 620061, 621725, 620040, 558869, 621330, 621331, 621332, 621333, 621297, 377677, 621568, 621569, 625905, 625906, 625907, 628313, 625333, 628312, 623208, 621620, 621756, 621757, 621758, 621759, 621785, 621786, 621787, 621788, 621789, 621790, 621672, 625337, 625338, 625568, 620025, 620026, 621293, 621294, 621342, 621343, 621364, 621394, 621648, 621248, 621215, 621249, 622750, 622751, 622771, 622772, 622770, 625145, 620531, 620210, 620211, 622479, 622480, 622273, 622274, 620019, 620035, 621231, 622789, 621638, 621334, 625140, 621395], 
            [625826, 625827, 548478, 544243, 622820, 622830, 622838, 625336, 628269], 
            []
        ],
        /**
         * 银行名称列表
         */
        this.bankName = [
            "中信银行", 
            "中国银行", 
            "中国农业银行", 
            "中国建设银行", 
            "招商银行", 
            "兴业银行", 
            "交通银行", 
            "华夏银行", 
            "广东发展银行", 
            "光大银行", 
            "浙商银行", 
            "浙江稠州商业银行", 
            "民生银行", 
            "邮政储蓄", 
            "顺德农村信用合作社", 
            "深圳发展银行", 
            "上海银行", 
            "上海农村商业银行", 
            "浦东发展银行", 
            "平安银行", 
            "南京银行", 
            "杭州银行"
        ];
    },
    /**
     * 检测银行名
     * @param {*} event 
     */
    checkBankName_Function: function(event) {}
});

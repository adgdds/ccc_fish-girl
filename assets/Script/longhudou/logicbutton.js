cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {}
    onClick(event,customEventData)
    {
        let instance = window.longhudou_ins;
        if (customEventData.indexOf('bet') == 0)
        {
            //
        }else if (customEventData.indexOf('tobet_') == 0)
        {
            //
        }else{
            playEffect('Click');
        }

        if (customEventData == "close")
        {
            //var lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;
            var ins = require("longhudouNetWork").getInstant;
            ins.LandlordsSocket.disconnect();
            cc.director.loadScene("LobbyMain");
        }else if (customEventData == "sound")
        {

        }else if (customEventData == "help")
        {
            instance.helpNode.active = true;
        }else if (customEventData == "online")
        {
            instance.onlineNode.active = true;
        }else if (customEventData == "record")
        {
            instance.recordNode.active = true;
        }
        else if (customEventData == "bet1")
        {
            instance.selbet(1*100);
        }else if (customEventData == "bet10")
        {
            instance.selbet(10*100);
        }else if (customEventData == "bet50")
        {
            instance.selbet(50*100);
        }else if (customEventData == "bet100")
        {
            instance.selbet(100*100);
        }else if (customEventData == "bet500")
        {
            instance.selbet(500*100);
        }else if (customEventData == "tobet_0")
        {
            instance.bet(0,event.touch._point);
        }else if (customEventData == "tobet_1")
        {
            instance.bet(1,event.touch._point);
        }else if (customEventData == "tobet_2")
        {
            instance.bet(2,event.touch._point);
        }
    }
});

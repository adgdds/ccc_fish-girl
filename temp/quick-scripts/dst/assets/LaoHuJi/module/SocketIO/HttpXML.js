
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/SocketIO/HttpXML.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f23309ZwE1BwrFNSdoSRRqr', 'HttpXML');
// LaoHuJi/module/SocketIO/HttpXML.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    url: cc.String,
    YKID: cc.String
  },
  onLoad: function onLoad() {
    this.url = "http://192.168.1.114:13000";
    ;
  },
  OnRapidEnrollment: function OnRapidEnrollment() {
    this.getAccount_Function(this.url);
  },
  getAccount_Function: function getAccount_Function(t) {
    cc.log("1234455");
    var n = "123456",
        a = "42dfcb34fb02d8cd",
        s = "getGuessA";
    var c = parseInt(Date.parse(new Date()) / 1e3),
        r = s + n + c + a,
        l = t + "/weixinLogin?act=" + s + "&time=" + c + "&daili=" + n + "&sign=" + r,
        h = new XMLHttpRequest();
    h.onreadystatechange = function () {
      if (4 === h.readyState && 200 === h.status) {
        var e = h.response;

        if (null !== h.response) {
          try {
            e = JSON.parse(e);
            this.YKID = e.data.id;
            cc.log(this.YKID);
          } catch (t) {
            console.log("JSON wrong");
          }
        }
      }
    }, h.open("get", l), h.send();
  },
  OnRegister: function OnRegister(t) {
    cc.log("123455");
    var n = "14725835",
        f = "14725835",
        a = "42dfcb34fb02d8cd",
        s = "register";
    var c = parseInt(Date.parse(new Date()) / 1e3),
        r = s + n + c + a,
        l = t + "/weixinLogin?act=" + s + "&time=" + c + "&username=" + n + "&pwd=" + f + "&sign=" + r,
        h = new XMLHttpRequest();
    h.onreadystatechange = function () {
      if (4 === h.readyState && 200 === h.status) {
        var e = h.response;

        if (null !== h.response) {
          try {
            e = JSON.parse(e);
            cc.log(e);
          } catch (t) {
            console.log("JSON wrong");
          }
        }
      }
    }, cc.log(l);
    h.open("get", l), h.send();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxTb2NrZXRJT1xcSHR0cFhNTC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInVybCIsIlN0cmluZyIsIllLSUQiLCJvbkxvYWQiLCJPblJhcGlkRW5yb2xsbWVudCIsImdldEFjY291bnRfRnVuY3Rpb24iLCJ0IiwibG9nIiwibiIsImEiLCJzIiwiYyIsInBhcnNlSW50IiwiRGF0ZSIsInBhcnNlIiwiciIsImwiLCJoIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiZSIsInJlc3BvbnNlIiwiSlNPTiIsImRhdGEiLCJpZCIsImNvbnNvbGUiLCJvcGVuIiwic2VuZCIsIk9uUmVnaXN0ZXIiLCJmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsR0FBRyxFQUFFSixFQUFFLENBQUNLLE1BREE7QUFFUkMsSUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNLO0FBRkEsR0FIUDtBQU9MRSxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0gsR0FBTCxHQUFXLDRCQUFYO0FBQXdDO0FBQzNDLEdBVEk7QUFVTEksRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVk7QUFDM0IsU0FBS0MsbUJBQUwsQ0FBeUIsS0FBS0wsR0FBOUI7QUFDSCxHQVpJO0FBYUxLLEVBQUFBLG1CQUFtQixFQUFFLDZCQUFVQyxDQUFWLEVBQWE7QUFDOUJWLElBQUFBLEVBQUUsQ0FBQ1csR0FBSCxDQUFPLFNBQVA7QUFDQSxRQUFJQyxDQUFDLEdBQUcsUUFBUjtBQUFBLFFBQ0lDLENBQUMsR0FBRyxrQkFEUjtBQUFBLFFBRUlDLENBQUMsR0FBRyxXQUZSO0FBR0EsUUFBSUMsQ0FBQyxH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QyxDQUFDVyxJQUFGLENBQU8sS0FBUCxFQUFjWixDQUFkLEdBQ0lDLENBQUMsQ0FBQ1ksSUFBRixFQURKO0FBRUgsR0FwRUksQ0FxRUw7O0FBckVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdXJsOiBjYy5TdHJpbmcsXHJcbiAgICAgICAgWUtJRDpjYy5TdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gXCJodHRwOi8vMTkyLjE2OC4xLjExNDoxMzAwMFwiOztcclxuICAgIH0sXHJcbiAgICBPblJhcGlkRW5yb2xsbWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0QWNjb3VudF9GdW5jdGlvbih0aGlzLnVybCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0QWNjb3VudF9GdW5jdGlvbjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICBjYy5sb2coXCIxMjM0NDU1XCIpO1xyXG4gICAgICAgIHZhciBuID0gXCIxMjM0NTZcIixcclxuICAgICAgICAgICAgYSA9IFwiNDJkZmNiMzRmYjAyZDhjZFwiLFxyXG4gICAgICAgICAgICBzID0gXCJnZXRHdWVzc0FcIjtcclxuICAgICAgICB2YXIgYyA9IHBhcnNlSW50KERhdGUucGFyc2UobmV3IERhdGUpIC8gMWUzKSxcclxuICAgICAgICAgICAgciA9IHMgKyBuICsgYyArIGEsXHJcbiAgICAgICAgICAgIGwgPSB0ICsgXCIvd2VpeGluTG9naW4/YWN0PVwiICsgcyArIFwiJnRpbWU9XCIgKyBjICsgXCImZGFpbGk9XCIgKyBuICsgXCImc2lnbj1cIiArIHIsXHJcbiAgICAgICAgICAgIGggPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XHJcbiAgICAgICAgaC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICg0ID09PSBoLnJlYWR5U3RhdGUgJiYgMjAwID09PSBoLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSBoLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IGgucmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gSlNPTi5wYXJzZShlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLllLSUQ9ZS5kYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2codGhpcy5ZS0lEKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSlNPTiB3cm9uZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoLm9wZW4oXCJnZXRcIiwgbCksXHJcbiAgICAgICAgICAgIGguc2VuZCgpXHJcbiAgICB9LFxyXG4gICAgT25SZWdpc3RlcjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICBjYy5sb2coXCIxMjM0NTVcIik7XHJcbiAgICAgICAgdmFyIG4gPSBcIjE0NzI1ODM1XCIsXHJcbiAgICAgICAgICAgIGYgPSBcIjE0NzI1ODM1XCIsXHJcbiAgICAgICAgICAgIGEgPSBcIjQyZGZjYjM0ZmIwMmQ4Y2RcIixcclxuICAgICAgICAgICAgcyA9IFwicmVnaXN0ZXJcIjtcclxuICAgICAgICB2YXIgYyA9IHBhcnNlSW50KERhdGUucGFyc2UobmV3IERhdGUpIC8gMWUzKSxcclxuICAgICAgICAgICAgciA9IHMgKyBuICsgYyArIGEsXHJcbiAgICAgICAgICAgIGwgPSB0ICsgXCIvd2VpeGluTG9naW4/YWN0PVwiICsgcyArIFwiJnRpbWU9XCIgKyBjICsgXCImdXNlcm5hbWU9XCIgKyBuICsgXCImcHdkPVwiICsgZiArIFwiJnNpZ249XCIgKyByLFxyXG4gICAgICAgICAgICBoID0gbmV3IFhNTEh0dHBSZXF1ZXN0O1xyXG4gICAgICAgIGgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoNCA9PT0gaC5yZWFkeVN0YXRlICYmIDIwMCA9PT0gaC5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gaC5yZXNwb25zZTtcclxuICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBoLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZSA9IEpTT04ucGFyc2UoZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJKU09OIHdyb25nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNjLmxvZyhsKTtcclxuICAgICAgICBoLm9wZW4oXCJnZXRcIiwgbCksXHJcbiAgICAgICAgICAgIGguc2VuZCgpXHJcbiAgICB9LFxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
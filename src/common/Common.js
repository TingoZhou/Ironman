/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 14-11-20
 * Time: 下午11:14
 * To change this template use File | Settings | File Templates.
 */

var uuid = function() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var uuid = new Array(36), rnd = 0, r;
    for(var i = 0; i < 36; i++) {
        if(i == 8 || i == 13 || i == 18 || i == 23) {
            uuid[i] = "-";
        } else if(i == 14) {
            uuid[i] = "4";
        } else {
            if(rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    return uuid.join("");
};

// 十进制转为16进制
var dechex = function(number) {
    if(!_.isNumber(number)) return null;
    return parseInt(number.toString(), 10).toString(16);
};

// 十进制转为二进制
var decbin = function(number) {
    if(!_.isNumber(number)) return null;
    return parseInt(number.toString(), 10).toString(2);
};

// 二进制转为十进制
var bindec = function(string) {
    if(!_.isString(string)) return null;
    return parseInt(string, 2);
};

var hexdec = function(string) {
    return parseInt(string, 16);
};

// 返回ascii 指定字符
var chr = function(number) {
    return String.fromCharCode(number);
};

var ord = function(string) {
    return string.charCodeAt();
}

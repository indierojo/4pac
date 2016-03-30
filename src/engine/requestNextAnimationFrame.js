var _this = this;
window.requestNextAnimationFrame = (function () {
    var originalWebkitMethod;
    var wrapper;
    var geckoVersion;
    var userAgent = navigator.userAgent;
    var index;
    var self = _this;
    // Chrome 10 fix:
    if (window.webkitRequestAnimationFrame) {
        wrapper = function (time) {
            if (time === undefined) {
                time = +new Date();
            }
            self.callback(time);
        };
        originalWebkitMethod = window.webkitRequestAnimationFrame;
        window.webkitRequestAnimationFrame = function (cb, element) {
            self.callback = cb;
            originalWebkitMethod(wrapper, element);
        };
    }
    // Firefox 4 fix:
    if (window.mozRequestAnimationFrame) {
        index = userAgent.indexOf('rv:');
        if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);
            if (geckoVersion === '2.0') {
                window.mozRequestAnimationFrame = undefined;
            }
        }
    }
    // Shim for browsers with none of the above:
    var missingAnimationFrameShim = function (cb) {
        var start, finish;
        window.setTimeout(function () {
            start = +new Date();
            cb(start);
            finish = +new Date();
            self.timeout = 1000 / 60 - (finish - start);
        }, self.timeout);
    };
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        missingAnimationFrameShim;
})();
//# sourceMappingURL=requestNextAnimationFrame.js.map
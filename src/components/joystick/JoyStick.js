var JoyStick = function (touchArea) {
    var touchArea = touchArea;
    var targetV = 1;
    var stickV = 1;
    var basePos = null;

    var isInTouchArea = function (pos) {
        var xVerify = touchArea.x < pos.x && pos.x < touchArea.x + touchArea.width;
        var yVerify = touchArea.y < pos.y && pos.y < touchArea.y + touchArea.height;
        return xVerify && yVerify;
    }

    this.setBasePos = function (touchPos) {
        if (isInTouchArea(touchPos)) {
            basePos = {x: touchPos.x, y: touchPos.y}
        }
        return basePos;
    }

    this.getBasePos = function () {
        return basePos;
    }

    this.getDpos = function (pos) {
        var res = null;
        if (!basePos) return
        var dx = pos.x - basePos.x;
        var dy = pos.y - basePos.y;
        var dl = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        angle < 0 ? angle += 360 : "";

        if (dl > 0) {
            res = {
                stick: {
                    vX: stickV * dx / dl,
                    vY: stickV * dy / dl
                },
                target: {
                    vX: targetV * dx / dl,
                    vY: targetV * dy / dl
                },
                angle: angle
            }
        }
        return res;
    }

    this.resetPos = function () {
        basePos = null;
    }

    this.setTargetV = function (v) {
        targetV = v;
    }

    this.setStickV = function (v) {
        stickV = v;
    }
}


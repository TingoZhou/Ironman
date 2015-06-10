var ButtonNoEdg = cc.Sprite.extend({
    ctor: function(normal, press) {

        this._super("#" + normal);
        /*
        var bg = new cc.Sprite("#skills_bg.png");
        bg.setAnchorPoint(cc.p(0,0)) ;
        bg.x =-10;
        bg.y =-10;
        this.addChild(bg,-1);
        */
        this._normal = normal;
        this._press = press;

        this.onTouchBegan = null;
        this.onTouchEnded = null;

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBeganEvent.bind(this),
            onTouchEnded: this.onTouchEndedEvent.bind(this)
        });
        cc.eventManager.addListener(touchListener, this);
    },

    onTouchBeganEvent: function(touch, type) {
        var hit = false;
        if (this.isVisible()){
            var touchPoint = touch.getLocation();
            var touchBeganPosition = {};
            touchBeganPosition.x = touchPoint.x;
            touchBeganPosition.y = touchPoint.y;
            if (this.hitTest(touchBeganPosition))
                hit = true;
        }
        if (hit) {
            if (this._press) {
                this.setSpriteFrame(this._press);
            } else {
                this.setScale(.9);
            }
            this.onTouchBegan && this.onTouchBegan(touch, type);
            return true;
        }
        return false;
    },

    onTouchEndedEvent: function(touch, type) {
        if (this._press) {
            this.setSpriteFrame(this._normal);
        } else {
            this.setScale(1);
        }
        this.onTouchEnded && this.onTouchEnded(touch, type);
    },

    hitTest: function (pt) {
        var bb = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        return cc.rectContainsPoint(bb, this.convertToNodeSpace(pt));
    }
})
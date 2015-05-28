var JoyStickPannel = cc.Sprite.extend({
    stick: null,
    buttomStick: null,
    radius: null,
    speed: 3,
    xVelocity: 0,
    yVelocity: 0,

    ctor: function (buttonImg, topImg) {
        this._super();

        this.buttomStick = new cc.Sprite(buttonImg);
        this.addChild(this.buttomStick);

        this.stick = new cc.Sprite(topImg);
        this.addChild(this.stick);
        this._initScale();

    },

    _initScale: function () {
        this.buttomStick.scale = 0.4;
        this.stick.scale = 0.5;
        this.stick.setOpacity(100);
        this.buttomStick.setOpacity(100);
        this.radius =( this.buttomStick.width * 0.6  - this.stick.width * 0.5) / 2;
    },

    /**
     * 控干被点击或按住时
     */
    isTouchesBegan: function () {
        this.buttomStick.scale = 0.5;
        this.stick.scale = 0.6;
        this.stick.setOpacity(255);
        this.buttomStick.setOpacity(255);
    },

    /**
     * 控干释放时
     */
    isTouchesEnded: function () {
        this._initScale();
    },

    setStickPos: function (pos) {
        this.stick.x = pos.x - this.x;
        this.stick.y = pos.y - this.y;
    },

    move: function (pos) {
        var dl = Math.sqrt(Math.pow(this.stick.getPositionX(), 2) + Math.pow(this.stick.getPositionY(), 2));
        if (dl > this.radius) {
            this.stick.x = this.stick.x * this.radius / dl;
            this.stick.y = this.stick.y * this.radius / dl;
        }
    },

    update: function () {
        this.move();
    }
});
var ControllLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this._moveJoyStickPannel = null;
        this._moveJoyStick = null;

        this.init();
    },

    init: function () {
        this.initJoyStick();
        this.bindJoyStickEvent();
        this.initRifleShootBtn();
        this.initRocketShootBtn();
        this.initElectricShootBtn();
        this.initSkillBtn_1();
        this.initSkillBtn_2();
        this.initSkillBtn_3();
        this.addListeners();
    },


    initJoyStick: function () {
        var moveJoyStickPannel = new JoyStickPannel("#controlLayerUI_crossStick_bg.png", "#controlLayerUI_crossStickBt.png");
        moveJoyStickPannel.attr({
            x: cc.winSize.width / 10,
            y: cc.winSize.height / 8 + 30,
            scaleX: 2.0,
            scaleY: 2.0
        });
        //moveJoyStickPannel.setPosition(100, 100);
        this.addChild(moveJoyStickPannel);
        this._moveJoyStickPannel = moveJoyStickPannel;

        var moveJoyStick = new JoyStick(cc.rect(
            moveJoyStickPannel.x - moveJoyStickPannel.buttomStick.width / 2,
            moveJoyStickPannel.y - moveJoyStickPannel.buttomStick.height / 2,
            moveJoyStickPannel.buttomStick.width,
            moveJoyStickPannel.buttomStick.height
        ));
        this._moveJoyStick = moveJoyStick;
    },

    bindJoyStickEvent: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,
            onTouchesBegan: _.bind(this.onTouchesBegan, this),
            onTouchesMoved: _.bind(this.onTouchesMoved, this),
            onTouchesEnded: _.bind(this.onTouchesEnded, this)

        }, this);
    },

    initRifleShootBtn: function () {
        var button = new ButtonNoEdg("controLayerUI_bulletBt_3.png");
        button.setPosition(cc.p(cc.winSize.width * 7 / 8, 80));
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                weaponName: SH.Weapon.Characters.Rifle
            });
        };

        button.onTouchEnded = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },
    initRocketShootBtn: function () {
        var button = new ButtonNoEdg("controLayerUI_bulletBt_2.png");
        button.setPosition(cc.p(cc.winSize.width * 6 / 8, 80));
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                weaponName: SH.Weapon.Characters.Rocket
            });
        };

        button.onTouchEnded = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },

    initElectricShootBtn: function () {
        var button = new ButtonNoEdg("controLayerUI_bulletBt_1.png");
        button.setPosition(cc.p(cc.winSize.width * 5 / 8, 80));
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                weaponName: SH.Weapon.Characters.Electric
            });
        }

        button.onTouchEnded = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }

    },

    initSkillBtn_1: function () {
        var button = new ButtonNoEdg("controLayerUI_skillBt_1.png");
        button.attr({
            x: cc.winSize.width * 0.93,
            y: cc.winSize.height * 0.70
        });
        this.addChild(button);

        var playInfo = ULS.get(USK.PlayInfo);
        if (playInfo.bombNum <= 0) {
            button.setOpacity(85);
            button.ableTouch = false;
            playInfo.bombNum = 0;
            ULS.set(USK.PlayInfo, playInfo);
        }


        button.onTouchBegan = function (touch, type) {
            button.ableTouch = false;
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_BOMB);
            //
            var playInfo = ULS.get(USK.PlayInfo);
            playInfo.bombNum--;
            ULS.set(USK.PlayInfo, playInfo);
            this._bombNumPannle.setString(playInfo.bombNum, true);
            //
            this._bombCDMask.runAction(
                cc.sequence(
                    cc.progressFromTo(Math.round(6000 / 1000), 100, 0),
                    cc.callFunc(function () {

                        if (playInfo.bombNum <= 0) {
                            button.setOpacity(85);
                            button.ableTouch = false;
                        } else {
                            button.setOpacity(255);
                            button.ableTouch = true;
                        }


                    }.bind(this), this)
                )
            );

        }.bind(this)


        var str = ULS.get(USK.PlayInfo).bombNum;
        var bomb = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
        bomb.setScale(.7);
        bomb.setPosition(cc.p(button.x + 20, button.y + 20));
        this.addChild(bomb);
        this._bombNumPannle = bomb;

        //CD
        var view = new cc.Sprite("#controLayerUI_skillBt_1.png");
        view.setColor(cc.color(0, 0, 0, 255));
        view.setOpacity(130);
        var mask = new cc.ProgressTimer(view);
        mask.setReverseDirection(true);
        mask.type = cc.ProgressTimer.TYPE_RADIAL;
        mask.setPosition(cc.p(bomb.x - 20, bomb.y - 20));
        this.addChild(mask);
        this._bombCDMask = mask;

    },

    //冰冻
    initSkillBtn_2: function () {
        var button = new ButtonNoEdg("controLayerUI_skillBt_2.png");
        button.attr({
            x: cc.winSize.width * 0.93,
            y: cc.winSize.height * 0.54
        });
        this.addChild(button);


        var playInfo = ULS.get(USK.PlayInfo);
        if (playInfo.freezeNum <= 0) {
            button.setOpacity(85);
            button.ableTouch = false;
            playInfo.freezeNum = 0;
            ULS.set(USK.PlayInfo, playInfo);
        }

        button.onTouchBegan = function (touch, type) {
            button.ableTouch = false;
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_FREEZE);
            var playInfo = ULS.get(USK.PlayInfo);
            playInfo.freezeNum--;
            ULS.set(USK.PlayInfo, playInfo);
            this._freezeCDMask.runAction(
                cc.sequence(
                    cc.progressFromTo(Math.round(7000 / 1000), 100, 0),
                    cc.callFunc(function () {
                        if (playInfo.freezeNum <= 0) {
                            button.setOpacity(85);
                            button.ableTouch = false;
                        } else {
                            button.setOpacity(255);
                            button.ableTouch = true;
                        }
                    }.bind(this), this)
                )
            );
            this._freezeNumPannle.setString(playInfo.freezeNum, true);
        }.bind(this)
        var str = ULS.get(USK.PlayInfo).freezeNum;
        var freeze = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
        freeze.setScale(.7);
        freeze.setPosition(cc.p(button.x + 20, button.y + 20));
        this.addChild(freeze);
        this._freezeNumPannle = freeze;
        //CD
        var view = new cc.Sprite("#controLayerUI_skillBt_2.png");
        view.setColor(cc.color(0, 0, 0, 255));
        view.setOpacity(130);
        var mask = new cc.ProgressTimer(view);
        mask.setRotation(90);
        mask.setScaleY(.7);
        mask.setScaleX(-1.5);
        mask.setReverseDirection(true);
        mask.type = cc.ProgressTimer.TYPE_RADIAL;
        mask.setPosition(cc.p(freeze.x - 20, freeze.y - 20));
        this.addChild(mask);
        this._freezeCDMask = mask;

    },

    //护盾
    initSkillBtn_3: function () {
        var button = new ButtonNoEdg("controLayerUI_skillBt_3.png");
        button.attr({
            x: cc.winSize.width * 0.93,
            y: cc.winSize.height * 0.38
        });
        this.addChild(button);
        var playInfo = ULS.get(USK.PlayInfo);
        if (playInfo.shieldNum <= 0) {
            button.setOpacity(85);
            button.ableTouch = false;
            playInfo.shieldNum = 0;
            ULS.set(USK.PlayInfo, playInfo);
        }

        button.onTouchBegan = function (touch, type) {
            button.ableTouch = false;
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SHIEL);
            var playInfo = ULS.get(USK.PlayInfo);
            playInfo.shieldNum--;
            ULS.set(USK.PlayInfo, playInfo);
            this._shieldCDMask.runAction(
                cc.sequence(
                    cc.progressFromTo(Math.round(8000 / 1000), 100, 0),
                    cc.callFunc(function () {
                        if (playInfo.shieldNum <= 0) {
                            button.setOpacity(85);
                            button.ableTouch = false;
                        } else {
                            button.setOpacity(255);
                            button.ableTouch = true;
                        }
                    }.bind(this), this)
                )
            );
            this._shieldNumPannle.setString(playInfo.shieldNum, true);
        }.bind(this)
        var str = ULS.get(USK.PlayInfo).shieldNum;

        var shield = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
        shield.setScale(.7);
        shield.setPosition(cc.p(button.x + 20, button.y + 20));
        this.addChild(shield);
        this._shieldNumPannle = shield;
        //CD
        var view = new cc.Sprite("#controLayerUI_skillBt_3.png");
        view.setColor(cc.color(0, 0, 0, 255));
        view.setOpacity(130);
        var mask = new cc.ProgressTimer(view);
        mask.setReverseDirection(true);
        mask.type = cc.ProgressTimer.TYPE_RADIAL;
        mask.setPosition(cc.p(shield.x - 20, shield.y - 20));
        this.addChild(mask);
        this._shieldCDMask = mask;
    },

    onTouchesBegan: function (touches, event) {
        var target = event.getCurrentTarget();
        for (var i = 0, len = touches.length; i < len; ++i) {
            var touch = touches[i];
            var moveJoyStick = target.getMoveJoyStick();
            var moveJoyStickPannel = target.getMoveJoyStickPannel();
            if (!moveJoyStick.getBasePos() && moveJoyStick.setBasePos(touch.getLocation())) {
                Character.current.setVelocity({vX: 0, vY: 0});
                moveJoyStickPannel.isTouchesBegan();
            }
        }
    },

    onTouchesMoved: function (touches, event) {
        var target = event.getCurrentTarget();
        for (var i = 0, len = touches.length; i < len; ++i) {
            var touch = touches[i];
            var moveJoyStick = target.getMoveJoyStick();
            var moveJoyStickPannel = target.getMoveJoyStickPannel();
            var dPos = moveJoyStick.getDpos(touch.getLocation());
            if (dPos) {
                moveJoyStickPannel.setStickPos(touch.getLocation());
                Character.current.setVelocity(dPos.target);
            }
        }
    },

    onTouchesEnded: function (touches, event) {
        var target = event.getCurrentTarget();
        for (var i = 0, len = touches.length; i < len; ++i) {
            var touch = touches[i];
            var moveJoyStick = target.getMoveJoyStick();
            var moveJoyStickPannel = target.getMoveJoyStickPannel();
            Character.current.setVelocity({vX: 0, vY: 0});
            moveJoyStickPannel.setStickPos(moveJoyStickPannel.getPosition());
            moveJoyStick.resetPos();
            moveJoyStickPannel.isTouchesEnded()
        }
    },

    getMoveJoyStick: function () {
        return this._moveJoyStick;
    },

    getMoveJoyStickPannel: function () {
        return this._moveJoyStickPannel;
    },

    update: function (dt) {
        this._moveJoyStickPannel.update(dt);
    },

    //新增
    addListeners:function(){
      cc.eventManager.addCustomListener(SC.DROPITEM_EX_GET, _.bind(
          function(e){
             this.updateNumPannle(e);
          }
          ,this));
    },
    updateNumPannle:function(e){
        var type = e.getUserData().typeName;
        //var addNum= e.getUserData().addNum;
        var addNum=1;
        var playInfo=ULS.get(USK.PlayInfo);
        switch (type){
            case DropItemConfig.DropType.Bomb.TypeName:
                playInfo.bombNum+=addNum;
                ULS.set(USK.PlayInfo,playInfo);
                this._bombNumPannle.setString(playInfo.bombNum.toString(),true);
                break;
            case DropItemConfig.DropType.Freeze.TypeName:
                playInfo.freezeNum+=addNum;
                ULS.set(USK.PlayInfo,playInfo);
                this._freezeNumPannle.setString(playInfo.freezeNum.toString(),true);
                break;
            case DropItemConfig.DropType.Shield.TypeName:
                playInfo.shieldNum+=addNum;
                ULS.set(USK.PlayInfo,playInfo);
                this._shieldNumPannle.setString(playInfo.shieldNum.toString(),true);
                break;
            default :
                break;
        }
    }
})
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
    },



    initJoyStick: function () {
        var moveJoyStickPannel = new JoyStickPannel("#controlLayerUI_crossStick_bg.png", "#controlLayerUI_crossStickBt.png");
        moveJoyStickPannel.attr({
            x:cc.winSize.width/10,
            y:cc.winSize.height/8+30,
            scaleX:2.0,
            scaleY:2.0
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
            x:cc.winSize.width*0.93,
            y:cc.winSize.height*0.70
        });
        this.addChild(button);

       button.onTouchBegan = function (touch, type) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
           var vo = ULS.get(USK.PlayInfo);
           if(vo.bombNum != 0 ){
               cc.eventManager.dispatchCustomEvent(SC.CHARACTER_BOMB);
               vo.bombNum--;
               this._bombLabel.setString( vo.bombNum,true);
               ULS.set(USK.PlayInfo,vo);
           }

       }.bind(this);

        var vo = ULS.get(USK.PlayInfo);
        var str = vo.bombNum;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        var bomb = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
        bomb.setScale(.7);
        bomb.setPosition(cc.p(button.x + 20, button.y + 20));
        this.addChild(bomb);
        this._bombLabel = bomb;

    },

    //冰冻
    initSkillBtn_2: function () {
        var button = new ButtonNoEdg("controLayerUI_skillBt_2.png");
        button.attr({
            x:cc.winSize.width*0.93,
            y:cc.winSize.height*0.54
        });
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            var vo = ULS.get(USK.PlayInfo);
            if(vo.freezeNum != 0){
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_FREEZE);
                vo.freezeNum --;
                this._freezeLabel.setString(vo.freezeNum,true);
                ULS.set(USK.PlayInfo,vo) ;
            }
        }.bind(this);

        var vo  = ULS.get(USK.PlayInfo);
        var str = vo.freezeNum;

        var freeze = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
        freeze.setScale(.7);
        freeze.setPosition(cc.p(button.x + 20, button.y + 20));
        this.addChild(freeze);

        this._freezeLabel = freeze ;

    },

    //护盾
    initSkillBtn_3: function () {
        var button = new ButtonNoEdg("controLayerUI_skillBt_3.png");
        button.attr({
            x:cc.winSize.width*0.93,
            y:cc.winSize.height*0.38
        });
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {

            var vo = ULS.get(USK.PlayInfo);
            if(vo.shieldNum != 0){
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SHIEL);
                vo.shieldNum--;
                this._shieldLabel.setString(vo.shieldNum,true);
                ULS.set(USK.PlayInfo,vo);
            }
        }.bind(this);

        var vo = ULS.get(USK.PlayInfo);
        var str =vo.shieldNum;

        var shield = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
        shield.setScale(.7);
        shield.setPosition(cc.p(button.x + 20, button.y + 20));
        this.addChild(shield);

        this._shieldLabel = shield;

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
    }
})
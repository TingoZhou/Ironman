//add UILayer;
//********************************************************************
var GameUILayer = cc.Layer.extend(
    {
        rifleNum:null,
        rocketNum:null,
        electricNum:null,
        _hpBarwidth: 120,
        _hpBar: null,
        ctor: function () {
            this._super();
            this.init();
        },

        init: function () {
            this.initImages();
            this.initButtons();
            this.initHpBar();
            this.addEventListener();
            this._initBulletRifle();
            this._initBulletElectric();
            this._initBulletRocket();
            this._initStar();
        },

        addEventListener: function () {
            cc.eventManager.addCustomListener(SC.HP_UPDATE, _.bind(function (e) {
                this.updateHp(e);
            }, this));

            cc.eventManager.addCustomListener(SC.CHARACTER_WEAPON, _.bind(function(e){
                 this.updateBulletNum(e)
            },this));

        },

        //新增
        updateBulletNum:function(e){
            var str=null;
            switch (e.getUserData().weaponName){
                case SH.Weapon.Characters.Rifle:
                    str= e.getUserData().Num;
                    this.rifleNum.setString(str.toString(),true);
                    break;
                case SH.Weapon.Characters.Rocket:
                    str=e.getUserData().Num;
                    this.rocketNum.setString(str.toString(),true);
                    break;
                case SH.Weapon.Characters.Electric:
                    str=e.getUserData().Num;
                    this.electricNum.setString(str.toString(),true);
                    break;
            }
        },
        updateHp: function (e) {
            var data = e.getUserData();
            var hp = data.HP / data.TotalHP;
            this._hpBar.setTextureRect(new cc.rect(0, 0, this._hpBarwidth * hp, 20));
            var str = data.HP + "/" + data.TotalHP;
            this._hpBarLabel.setString(str, true);
        },


        //血槽
        initHpBar: function () {
            var size = cc.winSize;
            var hp = new cc.Sprite("#gameLayerUI_hpBar.png");
            hp.attr({
                x: 0.12 * size.width - 63,
                y: 0.90 * size.height - 8,
                anchorX: 0,
                anchorY: 0
            });

            this._hpBarwidth = hp.width;
            hp.setTextureRect(new cc.rect(0, 0, this._hpBarwidth, 20));
            this._hpBar = hp;
            this.addChild(this._hpBar);

            var str = "100/100";
            this._hpBarLabel = new cc.LabelBMFont(str, MainRes.customFont.customBMFont_3_fnt);
//            this._hpBarLabel.setScale(1);
            this._hpBarLabel.setPosition(cc.p(this._hpBar.x + 70, this._hpBar.y + 15));
            this.addChild(this._hpBarLabel);

        },

        initImages: function () {
            var size = cc.winSize;
            var hp_bg = new cc.Sprite("#gameLayerUI_hpBar_bg.png");
            this.addChild(hp_bg);
            hp_bg.attr({
                x: 0.12 * size.width,
                y: 0.90 * size.height
            });

            var head = new cc.Sprite("#gameLayerUI_head.png");
            this.addChild(head);
            head.attr({
                x: 0.04 * size.width,
                y: 0.92 * size.height
            });

        },


  //<开始++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ by Caesar
        _initBulletRifle: function () {
            var size = cc.winSize;
            var buttle_1 = new cc.Sprite("#gameLayerUI_bullet_1.png");
            this.addChild(buttle_1);
            buttle_1.attr({
                x: 0.04 * size.width,
                y: 0.82 * size.height
            });

            var str = ULS.get(USK.PlayInfo).rifle;
            this.rifleNum = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
            this.rifleNum.setScale(.9);
            this.rifleNum.setPosition(cc.p(buttle_1.x + 50, buttle_1.y - 11));
            this.addChild(this.rifleNum);

        },

        _initBulletElectric: function () {
            var size = cc.winSize;
            var buttle_2 = new cc.Sprite("#gameLayerUI_bullet_3.png");
            this.addChild(buttle_2);
            buttle_2.attr({
                x: 0.04 * size.width,
                y: 0.62 * size.height
            });

            var str = ULS.get(USK.PlayInfo).electric;

            this.electricNum = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
            this.electricNum.setScale(.9);
            this.electricNum.setPosition(cc.p(buttle_2.x + 50, buttle_2.y - 10));
            this.addChild(this.electricNum);

        },

        _initBulletRocket: function () {
            var size = cc.winSize;
            var buttle_3 = new cc.Sprite("#gameLayerUI_bullet_2.png");
            this.addChild(buttle_3);
            buttle_3.attr({
                x: 0.04 * size.width,
                y: 0.72 * size.height
            });

            var str = ULS.get(USK.PlayInfo).rocket;

            this.rocketNum = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_1_fnt);
            this.rocketNum.setScale(.9);
            this.rocketNum.setPosition(cc.p(buttle_3.x + 50, buttle_3.y - 11));
            this.addChild(this.rocketNum);
        },

        _initStar: function () {
            var size = cc.winSize;

            var star = new cc.Sprite("#star.png");
            this.addChild(star);
            star.attr({
                x: 0.40 * size.width,
                y: 0.92 * size.height
            });

            var str = ULS.get(USK.PlayInfo).score;

            var starnumber = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_2_fnt);
            starnumber.setScale(.9);
            starnumber.setPosition(cc.p(star.x + 90, star.y+5));
            this.addChild(starnumber);

        },
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++结束> by Caesar


        initButtons: function () {
            var size = cc.winSize;
            var gameLayerUI_pauseBt = new ButtonNoEdg("gameLayerUI_pauseBt.png");
            this.addChild(gameLayerUI_pauseBt);
            gameLayerUI_pauseBt.attr({
                x: 0.93 * size.width,
                y: 0.90 * size.height
            });
            gameLayerUI_pauseBt.onTouchBegan = function (touch, type) {

                cc.director.pause();
                var pauselayer = new PauseLayer();
                pauselayer.setTag(1);
                pauselayer.setOpacity(255);
                g_gamelayer.addChild(pauselayer);
            };
            var gameLayerUI_addHpBt = new ButtonNoEdg("gameLayerUI_addHpBt.png");
            this.addChild(gameLayerUI_addHpBt);
            gameLayerUI_addHpBt.attr({
                x: 0.20 * size.width,
                y: 0.90 * size.height
            });

            gameLayerUI_addHpBt.onTouchBegan = function () {
                if (g_gamelayer.gameUILayer._hpBarwidth + 5 > 127) {
                    g_gamelayer.gameUILayer._hpBarwidth = 127;
                }
                else {
                    g_gamelayer.gameUILayer._hpBarwidth += 5;
                }
                var percent = g_gamelayer.gameUILayer._hpBarwidth;
                g_gamelayer.gameUILayer._hpBar.setTextureRect(
                    cc.rect(0, 0, percent, 20));

            };

            var gameLayerUI_boxHome = new ButtonNoEdg("gameLayerUI_boxHomeBt.png");
            this.addChild(gameLayerUI_boxHome);
            gameLayerUI_boxHome.attr({
                x: 0.80 * size.width,
                y: 0.90 * size.height
            });

            var scale1 = new cc.ScaleTo(0.5,0.7);
            var scale2 = new cc.scaleTo(0.5,1);
            gameLayerUI_boxHome.runAction(new cc.sequence(scale1,scale2).repeatForever());

            gameLayerUI_boxHome.onTouchEnded = function(){
                var giftboxlayer = new GiftBoxLayer(SHOWSTYLETYPE.ALLITEMS);
                this.getParent().addChild(giftboxlayer);
                giftboxlayer.setTag(1);
            }
            //add boxRedPoint
            var gameLayerUI_boxRedPoint = new cc.Sprite("#gameLayerUI_boxRedPoint.png");
            this.addChild(gameLayerUI_boxRedPoint);
            gameLayerUI_boxRedPoint.attr({
                x: 0.83 * size.width,
                y: 0.93 * size.height
            });
        },

        update: function (dt) {

        }
    });

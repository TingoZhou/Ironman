//add UILayer;
//********************************************************************
var GameUILayer = cc.Layer.extend(
    {
        _hpBarwidth :50,
        _hpBar:null,
        ctor:function(){
            this._super();
            this.init();
            //this.addListeners();
        },

        init:function(){

            this.initImages();
            this.initButtons();
            this.initHpBar();
        },

        initHpBar:function(){
            var size = cc.winSize;
            var hp = new cc.Sprite("#gameLayerUI_hpBar.png");
            hp.attr({
                x:0.12*size.width-63,
                y:0.90*size.height-10,
                anchorX:0,
                anchorY:0
            });

            hp.setTextureRect(new cc.rect(0,0,this._hpBarwidth,20));
            this._hpBar = hp;
            this.addChild(this._hpBar);
        },

        initImages:function(){
            var size = cc.winSize;
            var hp_bg = new cc.Sprite("#gameLayerUI_hpBar_bg.png");
            this.addChild(hp_bg);
            hp_bg.attr({
                x:0.12*size.width,
                y:0.90*size.height
            });

            var head = new cc.Sprite("#gameLayerUI_head.png");
            this.addChild(head);
            head.attr({
                x:0.04*size.width,
                y:0.92*size.height
            });

            var star = new cc.Sprite("#gameLayerUI_star.png");
            this.addChild(star);
            star.attr({
                x:0.45*size.width,
                y:0.92*size.height
            });

            var bullet_1 = new cc.Sprite("#gameLayerUI_bullet_1.png");
            this.addChild(bullet_1);
            bullet_1.attr({
                x:0.04*size.width,
                y:0.82*size.height
            });

            var bullet_2 = new cc.Sprite("#gameLayerUI_bullet_2.png");
            this.addChild(bullet_2);
            bullet_2.attr({
                x:0.04*size.width,
                y:0.72*size.height
            });

            var bullet_3 = new cc.Sprite("#gameLayerUI_bullet_3.png");
            this.addChild(bullet_3);
            bullet_3.attr({
                x:0.04*size.width,
                y:0.62*size.height
            });
        },
        initButtons:function(){
            var size = cc.winSize;
            var gameLayerUI_pauseBt = new ButtonNoEdg("gameLayerUI_pauseBt.png");
            this.addChild(gameLayerUI_pauseBt);
            gameLayerUI_pauseBt.attr({
                x:0.93*size.width,
                y:0.90*size.height
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
                x:0.20*size.width,
                y:0.90*size.height
            });
            gameLayerUI_addHpBt.onTouchBegan = function(){
                if(g_gamelayer.gameUILayer._hpBarwidth +5 > 127){
                    g_gamelayer.gameUILayer._hpBarwidth = 127;
                }
                else {
                    g_gamelayer.gameUILayer._hpBarwidth += 5;
                }
                var percent = g_gamelayer.gameUILayer._hpBarwidth;
                g_gamelayer.gameUILayer._hpBar.setTextureRect(
                    cc.rect(0,0,percent,20));

            };

            var gameLayerUI_boxHome = new ButtonNoEdg("gameLayerUI_boxHomeBt.png");
            this.addChild(gameLayerUI_boxHome);
            gameLayerUI_boxHome.attr({
                x:0.80*size.width,
                y:0.90*size.height
            });
            //add boxRedPoint
            var gameLayerUI_boxRedPoint = new cc.Sprite("#gameLayerUI_boxRedPoint.png");
            this.addChild(gameLayerUI_boxRedPoint);
            gameLayerUI_boxRedPoint.attr({
                x:0.83*size.width,
                y:0.93*size.height
            });
        },

        update: function (dt) {

        }
    });
//****************************************************************************
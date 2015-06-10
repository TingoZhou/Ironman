//add UILayer;
//********************************************************************
var GameUILayer = cc.Layer.extend(
    {
        ctor:function(){
            this._super();
            this.init();
            //this.addListeners();
        },

        init:function(){
         //   cc.spriteFrameCache.addSpriteFrames(GameRes.starGameUILayer.p_starGameUILayer);
            var size = cc.winSize;
            var head_bg = new cc.Sprite("#Ironman_head_bg.png");
            this.addChild(head_bg);
            head_bg.attr({
                x:0.052*size.width,
                y:0.916*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var head = new cc.Sprite("#Ironman_head.png");
            this.addChild(head);
            head.attr({
                x:0.052*size.width,
                y:0.916*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var hp_bg = new cc.Sprite("#hp_bg.png");
            this.addChild(hp_bg);
            hp_bg.attr({
                x:0.198*size.width,
                y:0.880*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.9,
                scaleY:1
            });
            //.这里应当加上血条

            var hp = new cc.Sprite("#hp.png");
            this.addChild(hp);
            hp.attr({
                x:0.198*size.width,
                y:0.880*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.9,
                scaleY:1
            });

            var star = new cc.Sprite("#strat.png");
            this.addChild(star);
            star.attr({
                x:0.448*size.width,
                y:0.907*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var bullet_1 = new cc.Sprite("#rifle_icon.png");
            this.addChild(bullet_1);
            bullet_1.attr({
                x:0.047*size.width,
                y:0.75*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var bullet_2 = new cc.Sprite("#rocket_icon.png");
            this.addChild(bullet_2);
            bullet_2.attr({
                x:0.047*size.width,
                y:0.639*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var bullet_3 = new cc.Sprite("#electric_icon.png");
            this.addChild(bullet_3);
            bullet_3.attr({
                x:0.047*size.width,
                y:0.528*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var skill_bg_1 = new cc.Sprite("#skills_bg.png");
            this.addChild(skill_bg_1);
            skill_bg_1.attr({
                x:0.927*size.width,
                y:0.741*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var skill_bg_2 = new cc.Sprite("#skills_bg.png");
            this.addChild(skill_bg_2);
            skill_bg_2.attr({
                x:0.927*size.width,
                y:0.593*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            var skill_bg_3 = new cc.Sprite("#skills_bg.png");
            this.addChild(skill_bg_3);
            skill_bg_3.attr({
                x:0.927*size.width,
                y:0.444*size.height,
                anchorX:0.5,
                anchorY:0.5,
                scaleX:0.8,
                scaleY:0.8
            });

            //以下为按钮 三个技能按钮 一个返回开始菜单按钮


            var skillNormal_1  = new cc.Sprite("#freeze.png");
            skillNormal_1.attr({
                scaleX:0.8,
                scaleY:0.8
            });
            var skillSelected_1 = new cc.Sprite("#freeze.png");
            skillSelected_1.attr({
                scaleX:0.7,
                scaleY:0.7
            });

            var skill_bt_1 = new cc.MenuItemSprite(skillNormal_1,skillSelected_1,null,this.onMenuCallbackskill_bt_1,this);
            skill_bt_1.attr({
                x:0.935*size.width,
                y:0.755*size.height
            });

            var skillNormal_2  = new cc.Sprite("#bomb.png");
            skillNormal_2.attr({
                scaleX:0.8,
                scaleY:0.8
            });
            var skillSelected_2 = new cc.Sprite("#bomb.png");
            skillSelected_2.attr({
                scaleX:0.7,
                scaleY:0.7
            });

            var skill_bt_2 = new cc.MenuItemSprite(skillNormal_2,skillSelected_2,null,this.onMenuCallbackskill_bt_2,this);
            skill_bt_2.attr({
                x:0.935*size.width,
                y:0.605*size.height
            });

            var skillNormal_3  = new cc.Sprite("#shield.png");
            skillNormal_3.attr({
                scaleX:0.8,
                scaleY:0.8
            });
            var skillSelected_3 = new cc.Sprite("#shield.png");
            skillSelected_3.attr({
                scaleX:0.7,
                scaleY:0.7
            });

            var skill_bt_3 = new cc.MenuItemSprite(skillNormal_3,skillSelected_3,null,this.onMenuCallbackskill_bt_3,this);
            skill_bt_3.attr({
                x:0.935*size.width,
                y:0.460*size.height
            });

            var BackBtNormal   = new cc.Sprite("#back_bg.png");
            BackBtNormal.attr({
                scaleX:0.6,
                scaleY:0.6
            });
            var BackBtSelected = new cc.Sprite("#back_bg.png");
            BackBtSelected.attr({
                scaleX:0.5,
                scaleY:0.5
            });

            var BackBt = new cc.MenuItemSprite(BackBtNormal,BackBtSelected,null,this.onMenuCallbackBackToStarScene,this);
            BackBt.attr({
                x:0.948*size.width,
                y:0.944*size.height
            });
            //********************************************************
            var GameLayerUImenu= new cc.Menu(skill_bt_1,skill_bt_2,skill_bt_3,BackBt);
            GameLayerUImenu.attr({
                x:0,
                y:0,
                anchorX:0,
                anchorY:0
            });
            this.addChild(GameLayerUImenu);
        },

        update: function (dt) {

        },

        onMenuCallbackskill_bt_1:function(){
            cc.log("onMenuCallbackskill_bt_1");
        },
        onMenuCallbackskill_bt_2:function(){
            cc.log("onMenuCallbackskill_bt_2");
        },
        onMenuCallbackskill_bt_3:function(){
            cc.log("onMenuCallbackskill_bt_3");
        },

        onMenuCallbackBackToStarScene:function(){
            cc.director.runScene(new cc.TransitionFade( 0.1,new StarGameScene));
        }
    });
//****************************************************************************
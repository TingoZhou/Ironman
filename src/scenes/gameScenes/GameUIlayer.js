//add UILayer;
//***************************************************************************
var GameUILayer = cc.Layer.extend(
    {
        ctor:function(){
            this._super();
            this.init();
            //this.addListeners();
        },

        init:function(){
            this.widget = ccs.uiReader.widgetFromJsonFile(GameRes.gameLayerUI.j_gameLayerUI);
            this.widget.touchEnabled = false;
            this.addChild(this.widget);

            var backStarGameScene  = ccui.helper.seekWidgetByName(this.widget,"back_bt");
            backStarGameScene.addTouchEventListener(
                function(sender,type){
                    if(type == ccui.Widget.TOUCH_ENDED){
                        //cc.director.popScene();
                        cc.director.runScene(new cc.TransitionFade( 0.1,new StarGameScene));
                    }
                },this
            );

            var HpBar = ccui.helper.seekWidgetByName(this.widget,"hp_bar");
            HpBar.setPercent(80);
            HpBar.setDirection(ccui.LoadingBar.TYPE_LEFT);

        },

        update: function (dt) {

        }
    });
//****************************************************************************
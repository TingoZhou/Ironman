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
            cc.log("GameUILayer 创建");
            this.widget = ccs.uiReader.widgetFromJsonFile(GameRes.gameLayerUI.j_gameLayerUI);
            this.widget.touchEnabled = false;
            this.addChild(this.widget);
            var HpBar = ccui.helper.seekWidgetByName(this.widget,"ProgressBar_9");
            HpBar.setPercent(100);
            HpBar.setDirection(ccui.LoadingBar.TYPE_LEFT);

        },

        update: function (dt) {

        }
    });
//****************************************************************************
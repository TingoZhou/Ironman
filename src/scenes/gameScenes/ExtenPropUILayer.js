/**
 * Created by Caesar  on 2015/6/17.
 * 扩展道具层
 */
var IMAGETYPE = {
    skill_1 : "#skill_1.png",
    skill_2 : "#skill_2.png",
    skill_3 : "#skill_3.png",
    bullet_1: "#bullet_1.png",
    bullet_2: "#bullet_2.png",
    bullet_3: "#bullet_3.png"
}

var ExtenPropUILayer = cc.Layer.extend({

    _extenNum :0,
    ctor:function(type,numb){
        this._super(type,numb);
        this.init(type,numb);
        this.addListener();
    },

    init:function(type,numb){
        this.initImages(type,numb);
        this.initButtons();
    },

    initImages:function(type,numb){
        var size = cc.winSize;
        this._extenNum = numb;
        //颜色背景
        var color  = new cc.Color(0,155,155,105);
        var colorbg = new cc.LayerColor(color,400,300);
        this.addChild(colorbg);
        colorbg.attr({
            x:size.width/4+40,
            y:size.height/5+10,
            anchorX:0.5,
            anchorY:0.5
        });
        //黑色背景框
        var test = new cc.Sprite("#bgContent_2.png");
        this.addChild(test);

        test.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        //扩充对象
        var test1 = new cc.Sprite("#bgContent_3.png");
        this.addChild(test1);
        test1.attr({
            x:size.width/2,
            y:size.height/2
        });

        var  lable = new cc.LabelTTF("扩充",1,50);
        this.addChild(lable);
        lable.attr({
            x:test1.x,
            y:test1.y+120
        });

        var bottomTitle = new cc.LabelTTF("你看不见我，你看不见我（0.0）!",2,5);
        this.addChild(bottomTitle);
        bottomTitle.attr({
            x:test1.x,
            y:test1.y-120
        });
        bottomTitle.setColor(new cc.Color(255,155,15,255));

        var testImage = new cc.Sprite(type);
        this.addChild(testImage);
        testImage.attr({
           x:size.width/2-40,
           y:size.height/2+5
        });

        //var str = ULS.get(USK.PlayInfo).shieldNum;
        var number = new cc.LabelBMFont("+"+this._extenNum.toString(), MainRes.customFont.customBMFont_1_fnt);
        number.setScale(.9);
        number.setPosition(cc.p(testImage.x + 60, testImage.y-12 ));
        this.addChild(number);

    },

    initButtons:function(){
        this.initClosedBt();
        this.initGetItemBt();
    },

    initClosedBt:function(){
        var size = cc.winSize;
        var closeBt = new ButtonNoEdg("close.png");
        this.addChild(closeBt);
        closeBt.attr({
            x:size.width/2+140,
            y:size.height/2+120
        });

        closeBt.onTouchEnded = function(){
            g_userFilesLayer.removeChildByTag(1);
        }
    },

    initGetItemBt:function(){
        var size = cc.winSize;
        var  getItemBt = new ButtonNoEdg("plusBt.png");
        this.addChild(getItemBt);
        getItemBt.attr({
            x:size.width/2-10,
            y:size.height/2-70
        });

        getItemBt.onTouchEnded = function(){
            g_userFilesLayer.removeChildByTag(1);
        }

    },

    addListener:function(){

    },


    //禁止触摸穿透
    onEnter: function () {
        this._super();
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
    },

    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();

    }


});
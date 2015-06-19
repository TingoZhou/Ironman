/**
 * Created by Caesar on 2015/6/18.
 * when click BoxHomeBt comeout
 */
var SHOWSTYLETYPE = {
    FREEZE :"freeze",
    BOMB   :"bomb",
    SHIELD :"shield",
    HEALTH :"health",
    ALLITEMS:"deluxe"
};

var GiftBoxLayer = cc.Layer.extend({//参数分别为显示种类，改变对象，改变数量
    ctor:function(showstyle,number){
        this._super(showstyle,number);
        this.init(showstyle,number);
    },

    init:function(showstyle,number){
        this.initBg();
        this.initStyle(showstyle,number);
        this.initButton();
        this.initLable();
    },

    initBg:function(){
        var bg = new cc.LayerColor(new cc.Color(0,0,0,100));
        this.addChild(bg);

        var bgContent = new cc.Sprite(GameRes.GiftBoxLayerUI.bg_png);
        this.addChild(bgContent);
        bgContent.attr({
            x:cc.winSize.width /2,
            y:cc.winSize.height/2
        });
    },

    initStyle:function(showstyle,number){
        var size = cc.winSize;

        if(showstyle != SHOWSTYLETYPE.ALLITEMS){
            //Title
            var title = new cc.Sprite("#"+showstyle+"BagTitle.png");
            this.addChild(title);
            title.attr({
                x: size.width / 2,
                y: size.height / 4 * 3 + 20
            });


            //PinkTitle
            var pinkTitle = new cc.Sprite("#"+showstyle+"BagPinkTitle.png");
            this.addChild(pinkTitle);
            pinkTitle.attr({
                x: size.width / 2,
                y: size.height / 5 * 3 + 15
            });

            //Icon
            var icon = new cc.Sprite("#"+showstyle+"Icon.png");
            this.addChild(icon);
            icon.attr({
                x:size.width/2-50,
                y:size.height/5*2+10
            });
            var st1 = new cc.ScaleTo(0.8,0.9);
            var st2 = new cc.ScaleTo(0.8,1);
            var sq  = new cc.Sequence(st1,st2);
            icon.runAction(sq.repeatForever());

            //Number
            var number = new cc.LabelBMFont("3",MainRes.customFont.customBMFont_1_fnt);
            this.addChild(number);
            number.attr({
                x:icon.x+100,
                y:icon.y-10,
                scale:1.5
            });
        };

        if(showstyle == SHOWSTYLETYPE.ALLITEMS) {
            //Title
            var title = new cc.Sprite("#DeluxeBagTitle.png");
            this.addChild(title);
            title.attr({
                x: size.width / 2,
                y: size.height / 4 * 3 + 20
            });

            //PinkTitle
            var pinkTitle = new cc.Sprite("#DeluxeBagPinkTitle.png");
            this.addChild(pinkTitle);
            pinkTitle.attr({
                x: size.width / 2,
                y: size.height / 5 * 3 + 15
            });

            //Icon
            var icon = new cc.Sprite("#DeluxeIcon.png");
            this.addChild(icon);
            icon.attr({
                x:size.width/2,
                y:size.height/5*2+10
            });
            var st1 = new cc.ScaleTo(0.8,0.9);
            var st2 = new cc.ScaleTo(0.8,1);
            var sq  = new cc.Sequence(st1,st2);
            icon.runAction(sq.repeatForever());
            //IconL
            var iconL = new cc.Sprite("#DeluxeIconL.png");
            this.addChild(iconL);
            iconL.attr({
                x:size.width/4+20,
                y:size.height/5*2-40
            });

            //直接从数据库里提取
            //var str = ULS.get(USK.PlayInfo).score;
            var bullet1 = new cc.LabelBMFont(/*number.toString()*/ "3", MainRes.customFont.customBMFont_1_fnt);
            this.addChild(bullet1);
            bullet1.attr({
                x:iconL.x+50,
                y:iconL.y+40
            });

            var bullet2 = new cc.LabelBMFont(/*number.toString()*/ "3", MainRes.customFont.customBMFont_1_fnt);
            this.addChild(bullet2);
            bullet2.attr({
                x:iconL.x+50,
                y:iconL.y-8
            });

            var bullet2 = new cc.LabelBMFont(/*number.toString()*/ "3", MainRes.customFont.customBMFont_1_fnt);
            this.addChild(bullet2);
            bullet2.attr({
                x:iconL.x+50,
                y:iconL.y-56
            });
            //IconR
            var iconR = new cc.Sprite("#DeluxeIconR.png");
            this.addChild(iconR);
            iconR.attr({
                x:size.width/4*3-70,
                y:size.height/5*2-40
            });

            var skill1 = new cc.LabelBMFont(/*number.toString()*/ "3", MainRes.customFont.customBMFont_1_fnt);
            this.addChild(skill1);
            skill1.attr({
                x:iconR.x+50,
                y:iconR.y+40
            });

            var skill2 = new cc.LabelBMFont(/*number.toString()*/ "3", MainRes.customFont.customBMFont_1_fnt);
            this.addChild(skill2);
            skill2.attr({
                x:iconR.x+50,
                y:iconR.y-8
            });

            var skill3 = new cc.LabelBMFont(/*number.toString()*/ "3", MainRes.customFont.customBMFont_1_fnt);
            this.addChild(skill3);
            skill3.attr({
                x:iconR.x+50,
                y:iconR.y-56
            });
        }
    },

    //加载按钮
    initButton:function(){
        var pickupbt = new ButtonNoEdg("pickUpBt.png");
        this.addChild(pickupbt);
        pickupbt.attr({
           x: cc.winSize.width/2,
           y: cc.winSize.height/4-15
        });

        var closeBt = new ButtonNoEdg("closeBt.png");
        this.addChild(closeBt);
        closeBt.attr({
            x:cc.winSize.width/5*4-5,
            y:cc.winSize.height/5*4+12
        })

        closeBt.onTouchEnded = function(){
            this.getParent().getParent().removeChildByTag(1);
        }
    },

    initLable:function(){
        var lable = new cc.LabelTTF("你们看不到我，你们快点把钱都交出来！！！！",2,10);
        this.addChild(lable);
        lable.setColor(new cc.Color(255,246,145,155));
        lable.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/6-10
        });
    },

    //屏蔽点击穿透
    onEnter:function(){
        this._super();
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch,event){
                return true;
            }
        });

        cc.eventManager.addListener(listener,this);
        this._listener = listener;
    },

    onExit:function(){
        cc.eventManager.removeListener(this._listener);
        this._super();
    }
});
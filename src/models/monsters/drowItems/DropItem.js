/**
 * 怪物掉落道具
 */
var DropItem = cc.Sprite.extend({
    active:true,
    ctor: function () {
        this._super(GameRes.drowItem.png);
        //g_gamelayer.dropItemLayer.addChild(this);
        //this.x = monster.getPosition().x;
        //this.y = monster.getPosition().y;
        this.setScale(0);
         this._play();
        this.addListeners();
    },
    addListeners:function (){
         cc.eventManager.addCustomListener(SC.DROPITEM_GET, _.bind(function(e){
             this._DropItemCollide();
         },this));
    },
    _play:function (){
        this.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(.3, .8),
                    cc.moveBy(.3, cc.p(10, 40))
                ).easing(cc.easeBackOut(.3)),
                cc.callFunc(
                    function () {
                        var distance = cc.winSize.width- this.x
                        if(distance>cc.winSize.width/2){
                            this.runAction(new cc.jumpBy((distance+50)/40,distance+50,0,5,8));
                        }
                        else{
                            this.runAction(new cc.jumpBy((this.x+50)/40,-this.x-50,0,5,8));
                        }
                    }
                    , this)
            )
        );
    },
    _DropItemCollide:function(){
        if(this.active){
        var character=Character.current;
        var targetBox=character.getCollideBoundingBox();
        var selfBox=this._getSelfBox();
        if(cc.rectIntersectsRect(selfBox, targetBox)){
            //this._getDropItemChild();
            //this._disable();
            this.runAction(cc.sequence(
                cc.scaleTo(0.3,1.05),
                cc.callFunc(
                    function(){
                        this._getDropItemChild();
                        this._disable();
                    },this)));

        }
        }
    },

    _getSelfBox:function(){
        return cc.rect(this.x-this.width/2,this.y-this.height/2,this.width*0.5,this.height*0.5);
    },

   _getDropItemChild:function(){
       var ran= _.random(1,100);
       var playInfo=ULS.get(USK.PlayInfo);
       var character=Character.current;
       var MinNum=null,MaxNum=null;
       if(ran<DropItemConfig.DropRifleWeaponValue){
           MinNum=DropItemConfig.DropType.Rifle.MinNum;
           MaxNum=DropItemConfig.DropType.Rifle.MaxNum;
           playInfo.rifle+= _.random(MinNum,MaxNum);
           ULS.set(USK.PlayInfo,playInfo);
           cc.eventManager.dispatchCustomEvent(SC.CHARACTER_WEAPON,{
               weaponName: DropItemConfig.DropType.Rifle.TypeName,Num:playInfo.rifle});
       }
       else if(DropItemConfig.DropRifleWeaponValue<=ran<DropItemConfig.DropExItemValue) {
           ran= _.random(0,2);
       switch (ran){
           case 0:
               MinNum=DropItemConfig.DropType.Rocket.MinNum;
               MaxNum=DropItemConfig.DropType.Rocket.MaxNum;
               playInfo.rocket+= _.random(MinNum,MaxNum);
               ULS.set(USK.PlayInfo,playInfo);
               cc.eventManager.dispatchCustomEvent(SC.CHARACTER_WEAPON,{
                   weaponName: DropItemConfig.DropType.Rocket.TypeName,Num:playInfo.rocket});
               break;
           case 1:
               MinNum=DropItemConfig.DropType.Rocket.MinNum;
               MaxNum=DropItemConfig.DropType.Rocket.MaxNum;
               playInfo.electric+= _.random(MinNum,MaxNum);
               ULS.set(USK.PlayInfo,playInfo);
               cc.eventManager.dispatchCustomEvent(SC.CHARACTER_WEAPON,{
                   weaponName: DropItemConfig.DropType.Rocket.TypeName,Num:playInfo.electric});
               break;
           case 2:
               MinNum=DropItemConfig.DropType.HP.MinNum;
               MaxNum=DropItemConfig.DropType.HP.MaxNum;
               character._HP+= _.random(MinNum,MaxNum);
               if(character._HP>100)
                   character._HP=100;
               cc.eventManager.dispatchCustomEvent(SC.HP_UPDATE,{
                   HP:character._HP ,TotalHP:character._TotalHP});
               break;
       }
       }
       else{
           ran= _.random(0,2);
           switch (ran){
               case 0:
                   cc.eventManager.dispatchCustomEvent(SC.DROPITEM_EX_GET,{
                       typeName: DropItemConfig.DropType.Bomb.TypeName});
                   break;
               case 1:
                   cc.eventManager.dispatchCustomEvent(SC.DROPITEM_EX_GET,{
                       typeName: DropItemConfig.DropType.Freeze.TypeName});
                   break;
               case 2:
                   cc.eventManager.dispatchCustomEvent(SC.DROPITEM_EX_GET,{
                       typeName: DropItemConfig.DropType.Shield.TypeName});
                   break;
           }
       }
   },


    _move: function () {
        this._viewObj.x += this._velocity.x;
        this._viewObj.y += this._velocity.y;
    },

    update: function () {
        this._checkOverBorder();
    },

    _checkOverBorder: function () {
        var x = this.x;
        var y = this.y;
        if (x < 0 || x > cc.winSize.width || y < 0 || y > cc.winSize.height) {
            //this._destroy();
            this._disable();
        }
    },
    reuse:function(monster){
        this.active=true;
        this.visible=true;
        this.x = monster.getPosition().x;
        this.y = monster.getPosition().y;


    },

    //销毁
    _disable: function () {
        this.stopAllActions();
        this.active=false;
        this.visible=false;
    }
});
DropItem.Items=[];
DropItem.preset=function(layer){
    DropItem.Items=[];
    var drop_layer=layer;
    var item= null;
    for(var i=0;i<DropItemConfig.CacheCounts;i++){
        item=new DropItem();
        item._disable();
        DropItem.Items.push(item);
        drop_layer.addChild(item);
    }
    item=null;
};
DropItem.create=function(monster){
    var dropItemRifle=null;
    for(var j= 0,len=DropItem.Items.length;j<len;j++){
        var dropItem=DropItem.Items[j];
        if(!dropItem.active){
            dropItemRifle=dropItem;
        }
    }
    if(!dropItemRifle){
        dropItemRifle=new DropItem();
        dropItemRifle._disable();
    }
    dropItemRifle.reuse(monster);
    dropItemRifle._play();
    return dropItemRifle;
};

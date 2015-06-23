/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 15-6-17
 * Time: 下午8:02
 * To change this template use File | Settings | File Templates.
 */

var ShowDropItem=cc.Sprite.extend({
    active:true,
    dropType:null,
    ctor:function(showItemImg){
        this._super("#"+showItemImg);
    },
    _play:function(){
       this.runAction(
          cc.sequence(
              cc.spawn(
                  cc.scaleTo(.9, .8),
                  cc.moveBy(.9, cc.p(0, 150)),
                  cc.fadeOut(0.9),
                  cc.scaleTo(0.9,1.5)
              ).easing(cc.easeBackOut(.9)),
              cc.callFunc(function(){
                  this._disable();
              },this)
          )
       );
    },
    _disable:function(){
        this.visible=false;
        this.active=false;
        this.stopAllActions();
    },
    reuse:function(parent){
        this.x=parent.getPosition().x;
        this.y=parent.getPosition().y+10;
        this.attr({
            x:parent.getPosition().x,
            y:parent.getPosition().y+10,
            opacity:255
        });
        this.visible=true;
        this.active=true;
    }
});
ShowDropItem.Items=[];
ShowDropItem.create=function(parent,typeName,showItemImg){
    var showItemUses=null;
    for(var i= 0,len=ShowDropItem.Items.length;i<len;i++){
        var showItem=ShowDropItem.Items[i];
        if(!showItem.active && showItem.dropType==typeName){
            showItemUses=showItem;
            showItemUses.reuse(parent);
            showItemUses._play();
            return showItemUses;

        }
    }
    if(!showItemUses){
        showItemUses=new ShowDropItem(showItemImg);
        showItemUses._disable();
    }
    showItemUses.reuse(parent);
    showItemUses._play();
    return showItemUses;
};
ShowDropItem.preset=function(layer){
    ShowDropItem.Items=[];
    cc.log(".....1.....");
    var drop_layer=layer;
    var item=null;
    for(var i= 0,times=DropItemConfig.ShowDropItemCacheTimes;i<times;i++){
        for(var j= 0,len=DropItemConfig.DropType.length;j<len;j++){
            item=new ShowDropItem(DropItemConfig.DropType[j].ShowImg);
            item.dropType= DropItemConfig.DropType[j].TypeName;
            item._disable();
            drop_layer.addChild(item);
            ShowDropItem.Items.push(item);
        }
    }
    cc.log(".....1....."+ShowDropItem.Items.length);
    drop_layer=null;
    item=null;
}


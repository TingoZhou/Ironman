var BulletElectric = Bullet.extend({
	ctor: function() {
		this._super();
		this._viewObj = cc.Sprite.create("#" + WeaponConfig.Electric.bullets.frames[0]);
	},

	initData: function(parent) {
		this._super(parent);
		this._viewObj.setPosition(Character.current.getPosition());
		var rotation = Character.current.getRotation() + 90;
        this._viewObj.setRotation(rotation);
		var scaleX = Character.current.getScaleX();
		this._parent.addChild(this._viewObj);
	},

	update: function() {
		this._super();
	}
});

BulletElectric.create = function(parent, createOnly) {
	var pool = cc.pool;
    createOnly = !_.isUndefined(createOnly) ? createOnly : false;
    if (!createOnly && pool.hasObject(BulletElectric)) {
        var bullet = pool.getFromPool(BulletElectric, parent);
        return bullet;
    } else if(createOnly) {
        var bullet = new BulletElectric(parent);
        pool.putInPool(bullet);
    } else {
        var bullet = new BulletElectric(parent);
        cc.pool.putInPool(bullet);
        return pool.getFromPool(BulletElectric, parent);
    }
}
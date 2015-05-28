var BulletRifle = Bullet.extend({
	ctor: function() {
		this._super();

		this._viewObj = cc.Sprite.create("#W2.png");
	},

	initData: function(parent) {
		this._super(parent);
		this._parent.addChild(this._viewObj);
	},

	_move: function() {
		this._viewObj.y += 10;
	},

	update: function() {
		this._super();
		this._move();
	}
});

BulletRifle.create = function(parent, createOnly) {
	var pool = cc.pool;
    createOnly = !_.isUndefined(createOnly) ? createOnly : false;
    if (!createOnly && pool.hasObject(BulletRifle)) {
        var bullet = pool.getFromPool(BulletRifle, parent);
        return bullet;
    } else if(createOnly) {
        var bullet = new BulletRifle(parent);
        pool.putInPool(bullet);
    } else {
        var bullet = new BulletRifle(parent);
        cc.pool.putInPool(bullet);
        return pool.getFromPool(BulletRifle, parent);
    }
}
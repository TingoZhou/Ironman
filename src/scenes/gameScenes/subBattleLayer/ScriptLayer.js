/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午8:27
 * To change this template use File | Settings | File Templates.
 */
var ScriptLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.bornBuffer = {width: 0, height: 10};
        this.currentLevel = -1;
        this.scriptConfig = null;
        this.scriptType = -1;
        this.totalAmount4CurLvl = 0;
        this.currentAmount = 0;
        this.monsterLevel4CurLvl = 0;
        this.flushMonsterStep = .5 * SH.FPS;
        this.warningStep = 1 * SH.FPS;
        this.monsters4CurLvl = [];
        this.stop = false;
        this.shouldAddMonster = false;
        this.currentStatus = '';
        this.framesData = {

        };
        this.currentLevelHasBoss = false;

        this.init();
        this.addEventListener();
    },

    init: function () {
    },

    addEventListener: function () {
        cc.eventManager.addCustomListener(SC.CHARACTER_DIE, _.bind(function () {
            this.stop = true;
        }, this));
        cc.eventManager.addCustomListener(SC.CHARACTER_RESURRECTION, _.bind(function () {
            this.stop = false;
        }, this));
    },

    initLevelMonsters: function () {
        this.currentLevelHasBoss = false;
        var targetLevel = this.currentLevel;
        if (targetLevel >= this.scriptConfig.length) {
            targetLevel = this.scriptConfig.length - 1;
        }
        var currentLevelConfig = this.scriptConfig[targetLevel];
        var monstersConfig = currentLevelConfig.monsters;
        var eliteConfig = currentLevelConfig.elite;
        this.monsters4CurLvl = [];
        var monstersToAdd = [];
        var arrangedMonsters = {};
        var totalWeight = 0;
        var amountMax = null;
        for (var i = 0, m = monstersConfig.length; i < m; i++) {
            var id = monstersConfig[i].id;
            var weight = parseInt(monstersConfig[i].weight);
            for (var k in MonsterConfig) {
                if (MonsterConfig[k]['values'][id]) {
                    monstersToAdd.push({
                        key: k,
                        monsterId: id,
                        range: [totalWeight + 1, totalWeight + weight]
                    });
                    totalWeight += weight;
                }
            }
        }
        for (var i = 0; i < this.totalAmount4CurLvl; i++) {
            var random = _.random(1, totalWeight);
            for (var j = 0, m = monstersToAdd.length; j < m; j++) {
                if (random >= monstersToAdd[j].range[0] && random <= monstersToAdd[j].range[1]) {
                    var monsterId = monstersToAdd[j].monsterId;
                    this.monsters4CurLvl.push({
                        key: monstersToAdd[j].key,
                        monsterId: monsterId,
                        isBoss: false
                    });
                    if (!arrangedMonsters[monsterId]) arrangedMonsters[monsterId] = 0;
                    arrangedMonsters[monsterId]++;
                    if (arrangedMonsters[monsterId] > arrangedMonsters[amountMax] || amountMax == null) {
                        amountMax = monsterId;
                    }
                }
            }
        }
        // 检查一下是否还有遗漏的怪物没有加，有的话就铲除一些数量最多的怪物，让个位置出来
        for (var i = 0, m = monstersToAdd.length; i < m; i++) {
            var monsterId = monstersToAdd[i].monsterId;
            if (!arrangedMonsters[monsterId]) {
                this.monsters4CurLvl.push({
                    key: monstersToAdd[i].key,
                    monsterId: monsterId,
                    isBoss: false
                });
                arrangedMonsters[monsterId] = 1;
                arrangedMonsters[amountMax]--;
                for (var j = 0, n = this.monsters4CurLvl.length; j < n; j++) {
                    if (this.monsters4CurLvl[j].monsterId == amountMax) {
                        this.monsters4CurLvl.splice(j, 1);
                        break;
                    }
                }
                for (var k in arrangedMonsters) {
                    if (arrangedMonsters[k] > arrangedMonsters[amountMax]) {
                        amountMax = k;
                    }
                }
            }
        }
        // 精英怪判断
        if (eliteConfig.length > 0) {
            var random = _.random(0, 100);
            var temp = 0;
            var isBoss = false;
            for (var i = 0, m = eliteConfig.length; i < m; i++) {
                var eliteMonster = eliteConfig[i];
                if (random >= temp && random < temp + eliteMonster.proportion) {
                    var eliteMonsterId = eliteMonster.monsterId;
                    for (var key in MonsterConfig) {
                        if (MonsterConfig[key]['values'][eliteMonsterId]) {
                            var eliteMonsterKey = key;
                            // boss 判断
                            if (MonsterConfig[key]['values'][eliteMonsterId].isBoss) {
                                isBoss = true;
                                this.currentLevelHasBoss = true;
                            }
                            break;
                        }
                    }
                    if (isBoss) { //如果当场有boss，则不出其他怪
                        this.monsters4CurLvl = [];
                        this.monsters4CurLvl.push({
                            key: eliteMonsterKey,
                            monsterId: eliteMonsterId,
                            isBoss: true
                        });
                        break;
                    } else {
                        var amount = _.random(eliteMonster.min, eliteMonster.max);
                        for (var j = 0; j < amount; j++) {
                            this.monsters4CurLvl.push({
                                key: eliteMonsterKey,
                                monsterId: eliteMonsterId,
                                isBoss: false
                            });
                        }
                    }
                    break;
                }
                temp += eliteMonster.proportion;
            }
        }
    },

    start: function (scriptId) {
        this.scriptConfig = ScriptsConfig[scriptId];
        this.refreshLevel();
    },

    refreshLevel: function () {
        cc.log("refreshLevel");
        var flushTime = 0;
        if (this.currentLevel == -1) {
            flushTime = 0.5;
            this.schedule(_.bind(function () {
                this.currentLevel++;
                this.refreshLevel();
            }, this), flushTime, 0);
        } else {
            // 如果所有波数用完了，就一直循环最后一波，怪物的等级不断增加
            var targetLevel = this.currentLevel;
            if (targetLevel >= this.scriptConfig.length) {
                targetLevel = this.scriptConfig.length - 1;
            }
            var currentLevelConfig = this.scriptConfig[targetLevel];
            this.totalAmount4CurLvl = _.random(parseInt(currentLevelConfig.amount[0]), parseInt(currentLevelConfig.amount[1]));
            this.monsterLevel4CurLvl = parseInt(currentLevelConfig.level) + (this.currentLevel - targetLevel);
            this.flushMonsterStep = currentLevelConfig.interval / 1000 * SH.FPS;
            this.currentAmount = 0;
            this.tempStep = 0;
            this.warningStep = SH.FPS;
            cc.log("如果所有波数用完了，就一直循环最后一波，怪物的等级不断增加");
            this.currentStatus = 'MonsterBorn';
            this.initLevelMonsters();
            /*cc.eventManager.dispatchCustomEvent(SC.BATTLE_ROUND_UPDATE, {
             'currentLevel': this.currentLevel,
             'monsters4CurrentLevel': this.monsters4CurLvl,
             'hasBoss': this.currentLevelHasBoss
             });*/
        }
    },

    getMonsterCurrentLevel: function () {
        return this.monsterLevel4CurLvl;
    },

    update: function () {
        switch (this.currentStatus) {
            case 'MonsterBorn':
                cc.log('MonsterBorn');
                if (Monsters.monstersOnStage.length >= 10 || this.stop) return;
                if (this.tempStep == this.flushMonsterStep && this.monsters4CurLvl.length > 0) {
                    this.tempStep = 0;
                    var randomX = _.random(-1, 1);
                    var randomY = _.random(-1, 1);
                    if (randomX == 0 && randomY == 0) randomX = -1;
                    var halfWinWidth = cc.winSize.width / 2;
                    var halfWinHeight = cc.winSize.height / 2;
                    var monster4CurLvl = this.monsters4CurLvl.pop();

                    var bornPlace = cc.p(halfWinWidth + randomX * (halfWinWidth + 100), halfWinHeight + randomY * (halfWinHeight + 100));
                    if (bornPlace.x < 0 || bornPlace.x > cc.winSize.width) {
                        bornPlace.y += _.random(-100, 100);
                    } else if (bornPlace.y < 0 || bornPlace.y > cc.winSize.height) {
                        bornPlace.x += _.random(-100, 100);
                    }
                    var monster = Monsters.create(this.parent, {
                        name: monster4CurLvl.key,
                        monsterId: monster4CurLvl.monsterId,
                        bornPlace: bornPlace
                    });
                    monster.start();
                    this.currentAmount++;
                    this.shouldAddMonster = true;
                }
                this.tempStep++;

                // 最后一只怪出完，再计算下一波
                if (this.monsters4CurLvl.length == 0) {
                    this.currentStatus = 'MonsterBornFinished';
                }
                break;
            case 'MonsterBornFinished':
                cc.log('MonsterBornFinished');
                var monstersAmountOnStage = 0;
                if (Monsters.monstersOnStage.length > 5) return;
                else {
                    for (var i = 0; i < Monsters.monstersOnStage.length; i++) {
                        monstersAmountOnStage++;
                    }
                }
                if (this.shouldAddMonster &&
                    this.monsters4CurLvl.length == 0 &&
                    monstersAmountOnStage <= 0 &&
                    this.currentLevel >= 0) {
                    var targetLevel = this.currentLevel;
                    if (targetLevel >= this.scriptConfig.length) {
                        targetLevel = this.scriptConfig.length - 1;
                    }
                    var currentLevelConfig = this.scriptConfig[targetLevel];
                    var flushTime = parseInt(currentLevelConfig.time);
                    this.shouldAddMonster = false;
                    this.schedule(_.bind(function () {
                        this.currentLevel++;
                        this.refreshLevel();
                    }, this), flushTime, 0);
                    this.currentStatus = '';
                }
                break;
        }
    }
});
/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午7:46
 * To change this template use File | Settings | File Templates.
 */
var MonsterConfig = {
    Alpha: {
        resId: 101,
        presetAmount: 3,
        scale: 0.5,
        framesData: {
            Move: ['Alpha_1.png'],
            Attack: [ 'Alpha_2.png', 'Alpha_1.png', 'Alpha_3.png','Alpha_1.png'],
            speed: 2
        },
        values: {}
    },
    Beta: {
        resId: 102,
        presetAmount: 3,
        scale: 0.5,
        framesData: {
            Move: ['Beta_1.png'],
            Attack: [ 'Beta_5.png'],
            speed: 2.5
        },
        values: {}
    },
    Charlie: {
        resId: 103,
        presetAmount: 3,
        scale: 0.5,
        framesData: {
            Move: ['charlie.png'],
            speed: 2.5
        },
        values: {}
    }
};

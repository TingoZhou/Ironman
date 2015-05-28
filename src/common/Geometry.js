/**
 * 几何学
 * User: Tingo
 * Date: 14-12-19
 * Time: 上午10:58
 * To change this template use File | Settings | File Templates.
 */
var Geometry = {
    /**
     * 使用重心法得出一个点（P）在某个（ABC）三角形内，
     * 三角形的三个点在同一个平面上，如果选中其中一个点，
     * 其他两个点不过是相对该点的位移而已，比如选择点A作为起点，
     * 那么点B相当于在AB方向移动一段距离得到，
     * 而点C相当于在AC方向移动一段距离得到。
     * 所以对于平面内任意一点，都可以由如下方程来表示

     * P = A +  u * (C – A) + v * (B - A) // 方程1
     * 如果系数u或v为负值，那么相当于朝相反的方向移动，
     * 即BA或CA方向。那么如果想让P位于三角形ABC内部，u和v必须满足什么条件呢？有如下三个条件
     * u >= 0
     * v >= 0
     * u + v <= 1
     * 几个边界情况，当u = 0且v = 0时，就是点A，当u = 0,v = 1时，就是点B，而当u = 1, v = 0时，就是点C
     * 整理方程1得到P – A = u(C - A) + v(B - A)
     * 令v0 = C – A, v1 = B – A, v2 = P – A，则v2 = u * v0 + v * v1，
     * 现在是一个方程，两个未知数，无法解出u和v，将等式两边分别点乘v0和v1的到两个等式
     * (v2) • v0 = (u * v0 + v * v1) • v0
     * (v2) • v1 = (u * v0 + v * v1) • v1
     * 注意到这里u和v是数，而v0，v1和v2是向量，所以可以将点积展开得到下面的式子。
     * v2 • v0 = u * (v0 • v0) + v * (v1 • v0)  // 式1
     * v2 • v1 = u * (v0 • v1) + v * (v1• v1)   // 式2
     * 解这个方程得到
     * u = ((v1•v1)(v2•v0)-(v1•v0)(v2•v1)) / ((v0•v0)(v1•v1) - (v0•v1)(v1•v0))
     * v = ((v0•v0)(v2•v1)-(v0•v1)(v2•v0)) / ((v0•v0)(v1•v1) - (v0•v1)(v1•v0))
     */
    pointInTriangle: function(pointA, pointB, pointC, pointP) {
        var vectorA = new Vector3(pointA.x, pointA.y, 1);
        var vectorB = new Vector3(pointB.x, pointB.y, 1);
        var vectorC = new Vector3(pointC.x, pointC.y, 1);
        var vectorP = new Vector3(pointP.x, pointP.y, 1);
        var v0 = vectorC.subtract(vectorA);
        var v1 = vectorB.subtract(vectorA);
        var v2 = vectorP.subtract(vectorA);

        var dot00 = v0.dot(v0);
        var dot01 = v0.dot(v1);
        var dot02 = v0.dot(v2);
        var dot11 = v1.dot(v1);
        var dot12 = v1.dot(v2);

        var inverDeno = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * inverDeno;
        if (u < 0 || u > 1) // if u out of range, return directly
        {
            return false;
        }

        var v = (dot00 * dot12 - dot01 * dot02) * inverDeno ;
        if (v < 0 || v > 1) // if v out of range, return directly
        {
            return false;
        }

        return u + v <= 1;
    },

    // 两线是否相交
    isIntersect: function(line1, line2) {
        // 转换成一般式: Ax+By = C
        var a1 = line1.endPoint.y - line1.startPoint.y;
        var b1 = line1.startPoint.x - line1.endPoint.x;
        var c1 = a1 * line1.startPoint.x + b1 * line1.startPoint.y;

        //转换成一般式: Ax+By = C
        var a2 = line2.endPoint.y - line2.startPoint.y;
        var b2 = line2.startPoint.x - line2.endPoint.x;
        var c2 = a2 * line2.startPoint.x + b2 * line2.startPoint.y;

        // 计算交点
        var d = a1 * b2 - a2 * b1;

        // 当d==0时，两线平行
        if (d == 0) {
            return false;
        } else {
            var x = (b2 * c1 - b1 * c2) / d;
            var y = (a1 * c2 - a2 * c1) / d;

            // 检测交点是否在两条线段上
            if ((_isInBetween(line1.startPoint.x, x, line1.endPoint.x) || _isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
                (_isInBetween(line2.startPoint.x, x, line2.endPoint.x) || _isInBetween(line2.startPoint.y, y, line2.endPoint.y))) {
                return true;
            }
        }

        return false;
    },

    // 两点间距离
    distance: function(target1, target2) {
        return Math.sqrt(Math.pow(target1.x - target2.x, 2) + Math.pow(target1.y - target2.y, 2));
    }
};

//如果b在a和c之间，返回true
//当a==b或者b==c时排除结果，返回false
function _isInBetween(a, b, c) {
    // 如果b几乎等于a或c，返回false.为了避免浮点运行时两值几乎相等，但存在相差0.00000...0001的这种情况出现使用下面方式进行避免
    if (Math.abs(a - b) < 0.000001 || Math.abs(b - c) < 0.000001) {
        return false;
    }

    return (a < b && b < c) || (c < b && b < a);
}
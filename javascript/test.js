Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") { // 与 ECMAScript 5 最接近的 // 内部 IsCallable 函数
        throw new TypeError("Function.prototype.bind - what is trying " + "to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call( arguments, 1 ),
        fToBind = this,
        fNOP = function(){},
        fBound = function(){
            console.log(this, oThis, this instanceof fNOP);
            return fToBind.apply(
                (
                    this instanceof fNOP &&
                    oThis ? this : oThis
                ),
                aArgs.concat(Array.prototype.slice.call( arguments ))
            )
    };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
};

function foo() {
    console.log(this.name);
}
const obj = {
    name: '123'
}
const bar = foo.bind(obj);
console.log(bar.name);

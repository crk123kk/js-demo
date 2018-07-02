/**
 * @author:Anthony
 * @description:继承
 * 继承是OO语言中的一个最为人津津乐道的概念。
 * 许多OO语言都支持两种继承方式：接口继承和实现继承。
 * 接口继承只继承方法签名，而实现继承则继承实际的方法。
 * 如前所述，由于函数没有签名，在ECMAScript中无法实现接口继承。
 * ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的。
 */


/**
 * @description:原型链继承
 * 原型链是实现继承的主要方法
 * 利用原型链实现继承的基本思路是：
 * 利用原型让一个引用类型继承另一个引用类型的属性和方法。
 */

function SuperType0(name){
    this.name = name;
}
SuperType0.prototype.sayName = function(){
    return this.name;
};
function SubType0(age){
    this.age = age;
}
//继承了SuperType//SuperType(父类)的实例被赋予子类的原型对象//或者说子类的原型对象是父类的实例
SubType0.prototype = new SuperType0('kk');

SubType0.prototype.sayAge = function(){
    return this.age;
};
var instance0 = new SubType0(12);
console.log(instance0);



/**
 * @description:借用构造函数实现继承
 * 借用构造函数实现继承的实现思路:在子类型构造函数的内部调用超类构造函数。
 */

function SuperType1(name){
    this.name = name;
    this.sayName = function() {
        return this.name;
    }
}
function SubType1(name,age){
    this.age = age;
    this.sayAge = function() {
        return this.age;
    }
    SuperType1.call(this,name);
}
var instance1 = new SubType1('kk',12);
console.log(instance1);



/**
 * @description:组合继承，也叫作伪经典继承，指的是将原型链和借用构造函数的技术组合到一块。
 * 思路：使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承
 */
function SuperType2(name){
    this.name = name;
}
SuperType2.prototype.sayName = function(){
    console.log(this.name);
};
function SubType2(name,age){
    //继承属性
    SuperType2.call(this,name);
    this.age = age;
}
//继承方法
SubType2.prototype = new SuperType2('gg');
SubType2.prototype.sayAge = function(){
    console.log(this.age);
}
var instance2 = new SubType2("kk",13);
console.log(instance2);


/**
 * @description:原型式继承
 * 原型式继承：该方法没有使用严格意义上的构造函数，
 * 他的想法是借助原型可以基于已有的对象创建新的对象，
 * 同时还不必因此创建自定义类型。
 */
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
var person = {
    name : "kk",
    age : 12
};
var extendPerson = object(person);
console.log(extendPerson);


/**
 * @description:寄生式继承
 * 寄生式继承的思路:创建一个仅用于封装继承过程的函数，
 * 该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象。
 */

function object1(o){
    function F(){}
    F.prototype = o;
    return new F();
}
function createAnother(original){
    var clone = object1(original);//通过调用函数创建一个新对象
    clone.sayHi = function(){//以某种方式来增强这个对象
        console.log("hi");
    };
    return clone;//返回这个对象
}
var person1 = {
    name : "kk",
    age : 13
};
var anotherPerson = createAnother(person1);
console.log(anotherPerson);


/**
 * @description:寄生组合式继承
 * 所谓寄生组合式继承:
 * 即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
 * 其背后的基本思路是：
 * 不必为了指定子类型的原型而调用超类型的构造函数，
 * 我们所需要的无非就是超类型原型的一个副本而已。
 * 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型
 */
function object2(o){
    function F(){}
    F.prototype = o;
    return new F();
}
function inheritPrototype(subType,superType){
    var prototype = object2(superType.prototype);//创建对象
    prototype.constructor = subType;//增强对象
    subType.prototype = prototype;//指定对象
}
function SuperType5(name){
    this.name = name;
}
SuperType5.prototype.sayName = function(){
    console.log(this.name);
};
function SubType5(name,age){
    //继承属性
    SuperType5.call(this,name);
    this.age = age;
} 
inheritPrototype(SubType5,SuperType5);
SubType5.prototype.sayAge = function(){
    console.log(this.age);
};

var instance5 = new SubType5('kk',15);
console.log(instance5);








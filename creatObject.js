/**
 * @author:Anthony.Chen
 * @description:关于对象的创建
 */

/**
 * @description:简单方式创建对象
 * 利用对象的字面量的方式创建
 */
let person1 = {
    name: 'kk',
    age: 12,
    job: 'IT',
    say: function () {
        console.log('hello' + this.name);
    }
}
console.log(person1);


/**
 * @description:简单方式创建对象
 * 利用new Object()的方式创建对象
 */
let person2 = new Object();
person2.name = 'kk';
person2.age = 12,
    person2.job = 'IT',
    person2.say = function () {
        console.log('hello' + this.name);
    }
console.log(person2);


/**
 * @description:工厂模式创建对象
 * 弥补简单创建方式的不足（当创建多个对象的时候不会产生太多冗余代码）
 */
function createPerson(name, age, job) {
    let obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.job = job;
    obj.say = function () {
        console.log('hello' + this.name);
    }
    return obj;
}

let person3 = createPerson('kk', 12, 'IT');
console.log(person3);

/**
 * @description:构造函数创建对象
 * 在工厂模式的基础上提升，利用构造函数创建的对象的instanceof和
 * constructor指向将会是指定的类型而不总是Object
 */
function Person4(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.say = function () {
        console.log('hello' + this.name);
    }
}
let person4 = new Person4('kk', 12, 'IT');
console.log(person4);

/**
 * @description:构造函数创建对象，通过原型添加对象属性和方法
 * 我们将所有的属性和方法直接添加到了Person的prototype属性中，
 * 构造函数变成了空函数。即使如此，也仍然可以通过调用构造函数来创建新对象，
 * 而且新对象还会具有相同的属性和方法。但与构造函数模式不同的是，
 * 新对象的这些属性和方法是由所有实例共享的。
 */
function Person5() {

}
Person5.prototype.name = "kk";
Person5.prototype.age = 12;
Person5.prototype.job = "IT";
Person5.prototype.sayName = function () {
    console.log(this.name);
};

let person5 = new Person5();
console.log(person5);

/**
 * @description:组合使用构造函数模式和原型模式创建对象
 * 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。
 * 结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，
 * 最大限度的节省了内存。另外，这种混成模式还支持向构造函数传递参数：可谓是集两种模式之长。
 */
function Person6(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
}
Person6.prototype.sayName = function () {
    console.log(this.name);
}
let person6 = new Person6('kk', 12, 'IT');
console.log(person6);

/**
 * @description:动态原型模式创建对象
 * 动态原型模式把所有信息都封装在了构造函数中，
 * 而通过在构造函数中初始化原型（仅在必要的情况下），
 * 又保持了同时使用构造函数和原型的优点。换句话说，
 * 可以通过检测某个应该存在的方法是否有效，来决定是否需要初始化原型。
 */
function Person7(name,age,job){
    //属性
    this.name = name;
    this.age = age;
    this.job = job;
    //方法
    if(typeof this.sayName != "function"){
        Person7.prototype.sayName = function(){
            console.log(this.name);
        }
    }
}
let person7 = new Person7("kk" , 12, "IT");
console.log(person7);


/**
 * @description:寄生（parasitic）构造函数模式。
 * 这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，
 * 然后再返回新创建的对象；但从表面上看，这个函数又很像是典型的构造函数。
 * @description:关于寄生构造函数模式，有一点需要说明：
 * 首先，返回的对象与构造函数或者与构造函数的原型属性之间没有关系；
 * 也就是说，构造函数返回的对象与构造函数外部创建的对象没有什么不同。
 * 为此，不能依赖instanceof操作符来确定对象类型。由于存在上述问题，
 * 我们建议在可以适用其他模式的情况下，不要使用这种模式。
 */
function Person8(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
var person8 = new Person8('kk',12,'IT');
console.log(person8);


/**
 * @description:稳妥构造函数模式
 * 所谓稳妥对象，指的是没有公共属性，而且其方法也不可引用this的对象。
 * 稳妥对象最适合在一些安全的环境中(这些环境中会禁止使用this和new)，
 * 或者在防止数据被其他应用程序(如Mashup程序)改动时使用。
 * 稳妥构造函数遵循与寄生构造函数类似的模式，
 * 但有两点不同：一是新创新对象的实例方法不引用this；二是不使用new操作符调用构造函数。
 */
function Person9(name,age,job){
    //创建要返回的对象
    var o = new Object();
    //可以在这里定义私有变量和函数
    //添加属性
    //没有公共属性，所以不应定义公共属性
    // o.name = name;
    //添加方法
    //只能通过方法来访问私有变量，并且方法中不使用this
    o.sayName = function(){
        return name;
    };
    //返回对象
    return o;
}

var person9 = new Person9('kk',12,'IT');
console.log(person9);
console.log(person9.name);
console.log(person9.sayName());














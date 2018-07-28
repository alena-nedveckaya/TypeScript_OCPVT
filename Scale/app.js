var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scale = /** @class */ (function () {
    function Scale() {
        this.products = [];
    }
    Scale.prototype.add = function (_product) {
        this.products.push(_product);
    };
    Scale.prototype.getSumScale = function () {
        var totalWeight = 0;
        this.products.forEach(function (v, i) {
            totalWeight += v.weight;
        });
        console.log(totalWeight);
        return totalWeight;
    };
    Scale.prototype.getNameList = function () {
        var names = this.products.map(function (v, i) {
            return v.name;
        });
        console.log(names);
        return names;
    };
    return Scale;
}());
var Product = /** @class */ (function () {
    function Product(_name, _weight) {
        this.name = _name;
        this.weight = _weight;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getScale = function () {
        return this.weight;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(name, weight, _taste) {
        var _this = _super.call(this, name, weight) || this;
        _this.taste = _taste;
        return _this;
    }
    Apple.prototype.getTaste = function () {
        console.log(this.taste);
    };
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(name, weight) {
        return _super.call(this, name, weight) || this;
    }
    return Tomato;
}(Product));
var redApple = new Apple('красное яблоко', 200, 'сладкое');
var greenApple = new Apple('зеленое яблоко', 450, 'кислое');
var tomatCherry = new Tomato('томат черри', 300);
var scale = new Scale();
// redApple.getName();
redApple.getTaste();
greenApple.getTaste();
// tomatCherry.getScale();
scale.add(redApple);
scale.add(greenApple);
scale.add(tomatCherry);
scale.getSumScale();
scale.getNameList();
//# sourceMappingURL=app.js.map
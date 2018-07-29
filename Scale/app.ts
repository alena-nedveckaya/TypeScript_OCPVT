class Scale {

    products: Array<Product>


    constructor() {
        this.products = [];
    }

    add(_product: Product): void {
        this.products.push(_product);
    }

    getSumScale(): number {
        let totalWeight: number = 0;
        this.products.forEach((v, i) => {
                totalWeight += v.weight;
            }
        );
        console.log(totalWeight);
        return totalWeight
    }

    getNameList(): Array<string> {
        let names: Array<string> = this.products.map((v, i) => {
                return v.name;
            }
        );
        console.log(names);
        return names
    }
}

class Product {

    name: string;
    weight: number;

    constructor(_name: string, _weight: number) {
        this.name = _name;
        this.weight = _weight;
    }

    getName(): string {
        return this.name
    }

    getScale(): number {
        return this.weight
    }
}

class Apple extends Product {

    taste: string;

    constructor(name, weight, _taste) {
        super(name, weight);
        this.taste = _taste
    }

    getTaste(): void {
        console.log(this.taste)
    }
}

class Tomato extends Product {

    constructor(name, weight) {
        super(name, weight)
    }
}

let redApple: Apple = new Apple('красное яблоко', 200, 'сладкое');
let greenApple: Apple = new Apple('зеленое яблоко', 450, 'кислое');
let tomatCherry: Tomato = new Tomato('томат черри', 300)
let scale: Scale = new Scale();
// redApple.getName();
redApple.getTaste();
greenApple.getTaste();
// tomatCherry.getScale();
scale.add(redApple);
scale.add(greenApple);
scale.add(tomatCherry);
scale.getSumScale();
scale.getNameList();
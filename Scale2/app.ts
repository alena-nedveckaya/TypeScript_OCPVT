interface IScalable {
    getName(): string;
    getScale(): number
}

class Scale {

    products: Array<IScalable>
    constructor() {
        this.products = [];
    }

    add(_product: Apple|Tomato): void {
        this.products.push(_product);
    }

    getSumScale(): number {
        let totalWeight: number = 0;
        this.products.forEach((v, i) => {
                totalWeight += v.getScale();
            }
        );
        console.log(totalWeight);
        return totalWeight
    }

    getNameList(): Array<string> {
        let names: Array<string> = this.products.map((v, i) => {
                return v.getName();
            }
        );
        console.log(names);
        return names
    }
}

class Apple implements IScalable {

    taste: string;
    name:'string';
    weight:number;

    constructor(_name, _weight, _taste) {
        this.taste = _taste;
        this.name = _name;
        this.weight = _weight;
    }

    getTaste(): void {
        console.log(this.taste)
    }
    getName(): string {
        return this.name
    }

    getScale(): number {
        return this.weight
    }
}

class Tomato implements IScalable {
    name:'string';
    weight:number;

    constructor(_name, _weight) {

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

let redApple: Apple = new Apple('красное яблоко', 200, 'сладкое');
let greenApple: Apple = new Apple('зеленое яблоко', 450, 'кислое');
let tomatCherry: Tomato = new Tomato('томат черри', 300);

let nameProd:string = redApple.getName();
let weightApple:number = greenApple.getScale();
let tomatoName:string = tomatCherry.getName();
console.log('nameProd',nameProd, 'weightApple', weightApple, 'tomatoName', tomatoName);

let scale = new Scale();
scale.add(redApple);
scale.add(greenApple);
scale.add(tomatCherry);
let sumWeight= scale.getSumScale();
let names = scale.getNameList();
console.log('scale', sumWeight, names);

interface IScalable {
    getName(): string;

    getScale(): number
}

interface IStorageEngine {
    addItem(Product): void;

    getItem(number): Product;

    getCount(): number;
}

class ScalesStorageEngineArray implements IStorageEngine {
    storage: Array<Product>;

    constructor() {
        this.storage = []
    }

    addItem(product: Product): Array<Product> {
        this.storage.push(product);
        return this.storage;
    }

    getItem(_num: number): Product {
        let productH = this.storage[_num];
        let product: Product = new Product(productH.name, productH.weight);
        return product
    }

    getCount(): number {
        return this.storage.length;
    }
}

class ScalesStorageEngineLocalStorage implements IStorageEngine {

    addItem(_product: Product): void {
        let local = JSON.parse(localStorage.getItem('products'))
        local.push(_product);
        localStorage.setItem('products', JSON.stringify(local));
        return

    }

    getItem(_num: number): Product {
        console.log('local getItem', JSON.parse(localStorage.getItem('products'))[_num]);
        let productH = JSON.parse(localStorage.getItem('products'))[_num];
        let product: Product = new Product(productH.name, productH.weight);
        return product
    }

    getCount(): number {
        let local: Array<Product> = JSON.parse(localStorage.getItem('products'));
        return local.length;
    }

}


class Scale<StorageEngine extends IStorageEngine> {

    storage: StorageEngine;

    constructor(_storage:StorageEngine) {
        this.storage = _storage;
    }

    addItem(_product: Product): void {
        this.storage.addItem(_product);
    }

    getSumScale(): number {
        let count = this.storage.getCount();
        let total: number = 0;
        for (let i = 0; i < count; i++) {
            let product: Product = this.storage.getItem(i);
            total += product.getScale();

        }
        return total
    }

    getNameList(): Array<string> {
        let names: Array<string> = [];
        let count = this.storage.getCount();

        for (let i = 0; i < count; i++) {
            let product: Product = this.storage.getItem(i);
            names.push(product.getName())
        }
        return names
    }
}

class Product implements IScalable {

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

function clearLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify([]))
};
clearLocalStorage();


let storageLocalStorage = new ScalesStorageEngineLocalStorage();
let scaleLocalStorage = new Scale<ScalesStorageEngineLocalStorage>(storageLocalStorage);
let apple: Product = new Product('apple', 200);
let nameR = apple.getScale()
console.log('apple', nameR)
let tomato: Product = new Product('tomato', 250);
let cherry: Product = new Product('cherry', 300);
let pineapple: Product = new Product('pineapple', 700);

scaleLocalStorage.addItem(tomato);
scaleLocalStorage.addItem(apple);
let ind = storageLocalStorage.getItem(1);
let total = scaleLocalStorage.getSumScale();
let names = scaleLocalStorage.getNameList();
console.log('LocalStorage',
    'total', total,
    'names', names, 'getItem', ind);


let scalesStorageEngineArray = new ScalesStorageEngineArray();
let scaleArray = new Scale<ScalesStorageEngineArray>(scalesStorageEngineArray);
scaleArray.addItem(apple);
scaleArray.addItem(cherry);
scaleArray.addItem(pineapple);

let namesArr = scaleArray.getNameList()
let indArr = scalesStorageEngineArray.getItem(2)

let totalArray = scaleArray.getSumScale();
console.log('storageArr',
    'totalArray', totalArray,
    'names', namesArr, 'getItem', indArr)


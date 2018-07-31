interface IScalable {
    getName(): string;
    getScale(): number
}

interface IStorageEngine {
    addItem(Product): void;
    getItem(number):Product;
    getCount():Array<Product>;
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
    getItem(_num:number):Product {
        return this.storage[_num]
    }
    getCount():Array<Product>{
        return this.storage;
    }
}

class ScalesStorageEngineLocalStorage implements IStorageEngine{

    addItem(_product:Product):void {
        let local =  JSON.parse(localStorage.getItem('products'))
        local.push(_product);
        localStorage.setItem('products', JSON.stringify(local));
        return

    }

    getItem(_num:number): Product{
        return  JSON.parse(localStorage.getItem('products'))[_num]
    }

    getCount():Array<Product>{
        return JSON.parse(localStorage.getItem('products'));
    }

}


class Scale<StorageEngine extends IStorageEngine> {

    storage: StorageEngine;

    constructor(_storage) {
        this.storage = _storage;
    }

    addItem(_product: Product): void {
        this.storage.addItem(_product);
    }

    getSumScale(): number {
        let storage = this.storage.getCount();
        let total = 0;
        storage.forEach(v => total += v.weight)
        return total
    }

    getNameList():Array<string>{
        let names :Array<string> =[];
        let storage = this.storage.getCount();
        storage.forEach(v => names.push(v.name));
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
function clearLocalStorage():void{
    localStorage.setItem('products', JSON.stringify([]))
};
clearLocalStorage();


let storageLocalStorage = new ScalesStorageEngineLocalStorage();
let scaleLocalStorage = new Scale<ScalesStorageEngineLocalStorage>(storageLocalStorage);
let apple: Product = new Product('apple', 200);
let tomato: Product = new Product('tomato', 250);
let cherry:Product = new Product('cherry', 300);
let pineapple:Product = new Product('pineapple',700);

scaleLocalStorage.addItem(tomato);
scaleLocalStorage.addItem(apple);
let ind = storageLocalStorage.getItem(1);
let total = scaleLocalStorage.getSumScale();
let names = scaleLocalStorage.getNameList();
console.log('LocalStorage','total',total,'names', names, 'getItem',ind );


let scalesStorageEngineArray = new ScalesStorageEngineArray();
let scaleArray = new Scale<ScalesStorageEngineArray>(scalesStorageEngineArray);
scaleArray.addItem(apple);
scaleArray.addItem(cherry);
scaleArray.addItem(pineapple);

let namesArr = scaleLocalStorage.getNameList()
let indArr = scalesStorageEngineArray.getItem(2)

let totalArray = scaleArray.getSumScale();
console.log('storageArr', 'total',totalArray,'names', namesArr, 'getItem',indArr )


interface IScalable {
    getName(): string;
    getScale(): number
}

interface IStorageEngine {
    addItem(Product): void;

    getItem(number):Object;
    getCount():number;
    getNames():Array<string>

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
    getItem(_num:number):Object {
        return this.storage[_num]
    }
    getCount():number{
        let count:number= 0;
        this.storage.forEach(v => count += v.weight);
        return count;
    }
    getNames():Array<string>{
        let names :Array<string> = [];
        this.storage.forEach(v => names.push(v.name))
        return names
    }

}

class ScalesStorageEngineLocalStorage implements IStorageEngine{
    storage: Array<Product>;
    localStorage:Array<Product>;

    constructor(){
        this.storage = [];
        this.localStorage =  JSON.parse(localStorage.getItem('products'));
    }

    addItem(_product:Product):Array<Object> {
        this.storage.push(_product);
        localStorage.setItem('products', JSON.stringify(this.storage));
        return this.storage

    }

    getItem(_num:number): Object{
        return this.localStorage[_num]
    }

    getCount():number{

        let count:number = 0
        this.localStorage.forEach((v) => count+=v.weight);
        return count
    }
    getNames():Array<string>{
        let names :Array<string> =[];
        this.storage.forEach(v => names.push(v.name))
        return names
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
        return this.storage.getCount()
    }

    getNameList(): Array<string> {
        return this.storage.getNames()
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



let storageLocalStorage = new ScalesStorageEngineLocalStorage()
let scaleLocalStorage = new Scale<ScalesStorageEngineLocalStorage>(storageLocalStorage);
let apple: Product = new Product('apple', 200);
let tomato: Product = new Product('tomato', 250);
let cherry:Product = new Product('cherry', 300);
let pineapple:Product = new Product('pineapple',700)

scaleLocalStorage.addItem(tomato);
scaleLocalStorage.addItem(apple);
let ind = storageLocalStorage.getItem(1)
let total = scaleLocalStorage.getSumScale();
let names = scaleLocalStorage.getNameList();
console.log('LocalStorage','total',total,'names', names, 'getItem',ind )


let scalesStorageEngineArray = new ScalesStorageEngineArray();
let scaleArray = new Scale<ScalesStorageEngineArray>(scalesStorageEngineArray);
scaleArray.addItem(apple);
scaleArray.addItem(cherry);
scaleArray.addItem(pineapple);

let namesArr = scaleArray.getNameList();
let indArr = scalesStorageEngineArray.getItem(2)

let totalArray = scaleArray.getSumScale();
console.log('storageArr', 'total',totalArray,'names', namesArr, 'getItem',indArr )

// console.log('totalArray',totalArray)
// scale.getNameList();
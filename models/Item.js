class Item {
    constructor(name, id, price, url=null) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.url = url;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPrice() {
        return this.price;
    }

    setPrice(id) {
        this.id = price;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getPageUrl() {
        return this.url || `https://znwr.ru/product/${this.id}/coat-mentor/`;
    }
}

module.exports = Item;
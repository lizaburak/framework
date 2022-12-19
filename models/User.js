class User {
    constructor(fullName, phone, email, city, street, house, flat) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.street = street;
        this.house = house;
        this.flat =  flat;
    }

    getFullName() {
        return this.fullName;
    }

    setFullName(value) {
        this.fullName = value;
    }

    getPhone() {
        return this.phone;
    }

    setPhone(value) {
        this.phone = value;
    }

    getEmail() {
        return this.email;
    }

    setEmail(value) {
        this.email = value;
    }

    getCity() {
        return this.city;
    }

    setCity(value) {
        this.city = value;
    }

    getStreet() {
        return this.street;
    }

    setStreet(value) {
        this.street = value;
    }

    getHouse() {
        return this.house;
    }

    setHouse(value) {
        this.house = value;
    }

    getFlat() {
        return this.flat;
    }

    setFlat(value) {
        this.flat = value;
    }
}

module.exports = User;
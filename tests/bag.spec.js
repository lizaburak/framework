const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../services/DataReader");
const Driver = require("../driver/Driver");

const ItemPage = require("../pages/ItemPage");

const Item = require("../models/Item");
const User = require("../models/User");

const { TEST_TIMEOUT } = require("../config/constants");

describe('Bag action test.', () => {
  before(async function () {
    const itemProps = await DataReader.getTestData("item.properties");
    for (const key in itemProps) {
        this[key] = itemProps[key];
    }

    const bagProps = await DataReader.getTestData("bag.properties");
    for (const key in bagProps) {
        this[key] = bagProps[key];
    }

    const userProps = await DataReader.getTestData("user.properties");
    for (const key in userProps) {
        this[key] = userProps[key];
    }
  })

  beforeEach(async function() {
    this.driver = await Driver.getInstance();
  })

  it('Should add item to the bag.', async function () {
        const itemPage = new ItemPage(
               this.driver, new Item(this.itemName, this.itemId, this.itemPrice));
        await itemPage.openPage();
        await itemPage.selectCountry();
    
        await itemPage.clickAddToBagButton();
    
        const popupText = await itemPage.getPopupText();
    
        await itemPage.clickClosePopupButton();
    
        const bagPage = await itemPage.clickBagButton();

        const item = await itemPage.getModel();

        const itemInBag = new Item(await bagPage.getProductName(), await bagPage.getProductId(), await bagPage.getProductPrice())
    
        expect(popupText).to.contains(this.addPopupText);
        expect(item.getName()).to.contain(itemInBag.getName());
        expect(item.getPrice()).to.contain(itemInBag.getPrice());
        expect(item.getId()).to.contain(itemInBag.getId());
      
  }).timeout(TEST_TIMEOUT);

  it('Should fill in all fields of the order from.', async function () {
    const itemPage = new ItemPage(
           this.driver, new Item(this.itemName, this.itemId, this.itemPrice));
    await itemPage.openPage();
    await itemPage.selectCountry();
    await itemPage.clickAddToBagButton();
    await itemPage.clickClosePopupButton();

    const bagPage = await itemPage.clickBagButton();
    const user = new User(this.name, this.phone, this.email, this.city, this.street, this.house, this.flat)
    await bagPage.inputCity(user.getCity());
    await bagPage.inputStreet(user.getStreet());
    await bagPage.inputHouse(user.getHouse());
    await bagPage.inputFlat(user.getFlat());
    await bagPage.inputName(user.getFullName());
    await bagPage.inputPhone(user.getPhone());
    await bagPage.inputEmail(user.getEmail());

    const checkoutButton = await bagPage.getCheckoutButton();
    const checkoutButtonText = await bagPage.getItemText(checkoutButton);

    expect(checkoutButtonText).to.equal(this.checkoutButtonText)
    
  }).timeout(TEST_TIMEOUT);

  it('Should delete item from the bag.', async function () {
    const itemPage = new ItemPage(
           this.driver, new Item(this.itemName, this.itemId, this.itemPrice));
    await itemPage.openPage();
    await itemPage.selectCountry();

    await itemPage.clickAddToBagButton();

    await itemPage.clickClosePopupButton();

    const bagPage = await itemPage.clickBagButton();

    await bagPage.clickRemoveButton();

    const emptyBagText = await bagPage.getEmptyBagText();

    expect(emptyBagText).to.equal(this.emptyBagText);
  }).timeout(TEST_TIMEOUT);

  it('Should check total sum in the bag.', async function () {
    const itemPage = new ItemPage(this.driver, new Item(this.itemName, this.itemId, this.itemPrice));
    await itemPage.openPage();
    await itemPage.selectCountry();
    await itemPage.clickAddToBagButton();
    await itemPage.clickClosePopupButton();
    await itemPage.clickAddToBagButton();
    await itemPage.clickClosePopupButton();

    const bagPage = await itemPage.clickBagButton();
    const totalPriceInBag =await bagPage.getTotalPrice();
    const amount = await bagPage.getAmountItems();

    const item = await itemPage.getModel();
    const totalPrice =item.getPrice()*amount;

    expect(totalPriceInBag).to.contain(totalPrice);
}).timeout(TEST_TIMEOUT);
    
  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/bagFail.png',
          image,
          'base64',
          (err) => {});
    }
    await Driver.killDriver();
  })
});
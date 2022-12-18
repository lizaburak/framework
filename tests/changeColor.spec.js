const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../services/DataReader");
const Driver = require("../driver/Driver");

const ItemPage = require("../pages/ItemPage");

const Item = require("../models/Item");

const { TEST_TIMEOUT } = require("../config/constants");

describe('Change color test.', () => {
  before(async function () {
    const itemProps = await DataReader.getTestData("item.properties");
    for (const key in itemProps) {
        this[key] = itemProps[key];
    }
  })

  beforeEach(async function() {
    this.driver = await Driver.getInstance();
  })

  it('Should change the color of an element.', async function () {
    const itemPage = new ItemPage(this.driver, new Item(this.itemName, this.itemId, this.itemPrice));
    await itemPage.openPage();
    await itemPage.selectCountry();

    await itemPage.selectColor(this.itemColor);
    const checkSelectColor = await itemPage.checkSelectColor(this.itemColor);

    expect(checkSelectColor).to.be.true;
  }).timeout(TEST_TIMEOUT);
    
  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/searchFail.png',
          image,
          'base64',
          (err) => {});
    }
    await Driver.killDriver();
  })
});
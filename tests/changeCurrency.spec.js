const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../services/DataReader");
const Driver = require("../driver/Driver");

const HomePage = require("../pages/HomePage");
const WomanPage = require("../pages/WomanPage");

const { TEST_TIMEOUT } = require("../config/constants");

describe('Change currency test.', () => {
  before(async function () {
    const props = await DataReader.getTestData("currency.properties");
    for (const key in props) {
        this[key] = props[key];
    }
  })

  beforeEach(async function() {
    this.driver = await Driver.getInstance();
  })

  it('Should change currency.', async function () {
        const homePage = new HomePage(this.driver);
        await homePage.loadProperties();
        await homePage.openPage();
        await homePage.selectCountry();

        await homePage.clickCurrencyChangeButton();
        await homePage.changeCurrency(this.currency);

        const womanPage = new WomanPage(this.driver);
        await womanPage.loadProperties();
        await womanPage.openPage();

        const checkResultsChangeCurrency = await womanPage.checkChangeCurrency(this.currencyIcon);

        expect(checkResultsChangeCurrency).to.be.true;
  }).timeout(TEST_TIMEOUT);
    
  afterEach(async function () {
    if (this.currentTest.state !== "passed") {
      const image = await this.driver.takeScreenshot();
      await require('fs').writeFile(
          './screenshots/changeCurrencyFail.png',
          image,
          'base64',
          (err) => {});
    }
    await Driver.killDriver();
  })
});
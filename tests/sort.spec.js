const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../services/DataReader");
const Driver = require("../driver/Driver");

const WomanPage = require("../pages/WomanPage");

const { TEST_TIMEOUT } = require("../config/constants");

describe('Sort elements test.', () => {
  before(async function () {
    const props = await DataReader.getTestData("sort.properties");
    for (const key in props) {
        this[key] = props[key];
    }
  })

  beforeEach(async function() {
    this.driver = await Driver.getInstance();
  })

  it('Should sort elements bu data.', async function () {
        const womanPage = new WomanPage(this.driver);
        await womanPage.loadProperties();
        await womanPage.openPage();
        await womanPage.selectCountry();

        await womanPage.clickSortButton();
        await womanPage.clickSortValueButton(this.sortValue);
        const itemsList = await womanPage.getItemsPriceList();
        const sortItemsList = await womanPage.sortItemsPriceList(itemsList);

        expect(itemsList).to.equal(sortItemsList);
    
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
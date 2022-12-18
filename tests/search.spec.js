const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../services/DataReader");
const Driver = require("../driver/Driver");

const WomanPage = require("../pages/WomanPage");

const SearchResult = require("../models/SearchResult");

const { TEST_TIMEOUT } = require("../config/constants");

describe('Search product test.', () => {
    before(async function () {
      const props = await DataReader.getTestData("search.properties");
      for (const key in props) {
          this[key] = props[key];
      }
    })
  
    beforeEach(async function() {
      this.driver = await Driver.getInstance();
    })
  
    it('Should find the elements or display message given the correct data.', async function () {
        const womanPage = new WomanPage(this.driver);
        await womanPage.loadProperties();
        await womanPage.openPage();
        await womanPage.selectCountry();
    
        await womanPage.clickSearchInputButton();
        await womanPage.clickSearchInputField();

        const searchResultsPage = await womanPage.searchProduct(this.searchedProduct);
        const resultElements = await searchResultsPage.getSearchResultsList(this.searchedProduct);
        const resultElementsLength = resultElements.length;
    
        const selectText = await searchResultsPage.getSelectText();
        
        expect(selectText).to.contains(`${resultElementsLength}`);
    }).timeout(TEST_TIMEOUT);

    it('Should find the elements or display message given the incorrect data.', async function () {
      const womanPage = new WomanPage(this.driver);
      await womanPage.loadProperties();
      await womanPage.openPage();
      await womanPage.selectCountry();
  
      await womanPage.clickSearchInputButton();
      await womanPage.clickSearchInputField();

      const searchResultsPage = await womanPage.searchProduct(this.invalidSearch);
      
      const emptySearchMessage = await searchResultsPage.getMessageOfEmptyListElements();

      expect(emptySearchMessage).to.equal(this.emptyListMessage);
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
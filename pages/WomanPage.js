const BasePage = require("./BasePage");
const SearchResultsPage = require("./SearchResultsPage");
const logger = require("../logger");

const SearchResult = require("../models/SearchResult");

const { Key } = require("selenium-webdriver");

class WomanPage extends BasePage {
  static searchInputButtonId = 'header__search-btn';
  static searchInputFieldLocator = `//div[@class='catalog__search']//input[@placeholder='Поиск товаров']`;
  static priceListLocator = `//div[@class='catalog__card-list']//div[@class='card__content']/div[@class='card__price']/span`;
  static sortButtonId = 'catalog__options-sort-btn';
  static sortItemsListLocator = `//div[@class='catalog__card-list']//div[@class='card__price']/span[@class='card__price-final']`;
  static resourcesFileName = "womanPage.properties";

  async loadProperties() {
    return super.loadProperties(WomanPage.resourcesFileName);
  }
  
  openPage = async () => super.openPage(this.PAGE_URL);

  async clickSearchInputButton() {
    logger.info("Clicking the search input button.");
    const searchButton = await this.findById(WomanPage.searchInputButtonId);
    await searchButton.click();

    return this;
  }

  async clickSearchInputField() {
    logger.info("Clicking the search input field.");
    const searchButton = await this.findByXpath(WomanPage.searchInputFieldLocator);
    await searchButton.click();

    return this;
  }

  async searchProduct(productName){
    const element = await this.findByXpath(WomanPage.searchInputFieldLocator);
    await element.sendKeys(productName, Key.ENTER);

    return new SearchResultsPage(this.driver,new SearchResult(productName));
  }

  async checkChangeCurrency(iconCurrency) {
    const priceList = await this.findAllByXpath(WomanPage.priceListLocator);

    return priceList.every(async elem => await this.getItemText(elem).includes(`${iconCurrency}`));
  }

  async clickSortButton(){
    logger.info("Clicking the sort field.");
    const button = await this.findById(WomanPage.sortButtonId);
    await button.click();

    return this;
  }

  async clickSortValueButton(sortValue){
    logger.info("Select sort value.");
    const button = await this.findByXpath(`//div[@class='catalog__options-sort-modal']//div[@class='catalog__options-sort-content-item']/a[text()='${sortValue}']`);
    await button.click();

    return this;
  }

  async getItemsPriceList() {
    return await this.findAllByXpath(WomanPage.sortItemsListLocator);
  }

  async sortItemsPriceList(array){
     return array.sort((a, b) => a - b);
  }
}

module.exports = WomanPage;
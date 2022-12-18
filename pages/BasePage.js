const { By, until } = require("selenium-webdriver");
const logger = require("../logger");
const DataReader = require("../services/DataReader");

const { LOADING_TIME } = require("../config/constants");

class BasePage {
  static selectCountryLocator = `//*[@data-country-code='BY']`;

  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    logger.info(`Opening ${url} page.`);
    await this.driver.get(url);

    return this;
  }

  async getPageURL() {
    logger.info("Getting url of the current page.");

    const url = await this.driver.getCurrentUrl();

    return url;
  }

  async getPageUrl() {
    return this.driver.getCurrentUrl();
  }

  async findByXpath(xpath) {
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), LOADING_TIME)
  }

  async findAllByXpath(xpath) {
    return this.driver.wait(until.elementsLocated(By.xpath(xpath)), LOADING_TIME);
  }

  async findById(id) {
    return this.driver.wait(until.elementLocated(By.id(id)), LOADING_TIME)
  }

  async selectCountry() {
    logger.info("Select Country cookies.");
    const element = await this.findByXpath(BasePage.selectCountryLocator);
    await element.click();

    await this.driver.sleep(2000);

    return this;
  }

  async getItemText(item){
    logger.info("Getting the item text.");
    return await item.getText();
  }

  async loadProperties(fileName) {
    const props = await DataReader.getTestData(`${fileName}`);

    for (const key in props) {
        this[key] = props[key];
    }

    return this;
  }
}

module.exports = BasePage;
const BasePage = require("./BasePage");
const logger = require("../logger");

class HomePage extends BasePage {
  static resourcesFileName = "homePage.properties";
  static currencyChangeButtonId = 'footer__options-currency-dropdown-btn';

  async loadProperties() {
    return super.loadProperties(HomePage.resourcesFileName);
  }

  openPage = async () => await super.openPage(this.PAGE_URL);

  async clickCurrencyChangeButton() {
    logger.info("Clicking the currency change button.");
    const button = await this.findById(HomePage.currencyChangeButtonId);
    await button.click();

    return this;
  }

  async changeCurrency(currency){
    logger.info("Changing currency.");
    const button = await this.findByXpath(`//div[@class='footer__options-dropdown-currency']//button[@data-currency='${currency}']`);
    const actions = this.driver.actions({ async: true });
    await actions.move({ origin: button }).click().perform();

    await this.driver.sleep(2000);

    return this;
  }

}

module.exports = HomePage;
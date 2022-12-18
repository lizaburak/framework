const BasePage = require("./BasePage");
const BagPage = require("./BagPage");
const logger = require("../logger");

class ItemPage extends BasePage {
  static addBagButtonId = 'product__add-cart-btn';
  static itemNameLocator = `//h1[@class='product__title']`;
  static itemPriceLocator = `//div[@class='product__price-new']`;
  static addTextPopupLocator = `//*[@class='product__modal-cart-text-1']`;
  static popupButtonCloseId = 'product__modal-cart-close';
  static bagButtonLocator = `//a[@class='header__cart-btn']`;
  static resourcesFileName = "item.properties";

  constructor(driver, item) {
    super(driver);

    this.item = item;
  }

  async openPage() {
    return super.openPage(this.item.getPageUrl());
  }

  async clickAddToBagButton() {
    logger.info("Clicking the add to bag button.");
    const button = await this.findById(ItemPage.addBagButtonId);
    await button.click();

    return this;
  }

 async getPopupText(){
  logger.info("Getting the popup text.");
    const element = await this.findByXpath(ItemPage.addTextPopupLocator);
    const elementText = await this.getItemText(element);

    return elementText;
 }

 async clickClosePopupButton() {
    logger.info("Clicking the close popup button.");
    const button = await this.findById(ItemPage.popupButtonCloseId);
    await button.click();

    return this;
  }

  async clickBagButton() {
    logger.info("Clicking the bag button.");
    const button = await this.findByXpath(ItemPage.bagButtonLocator);
    await button.click();

    return new BagPage(this.driver);
  }

  async getModel() {
    return this.item;
  }

  async selectColor(nameColor){
    logger.info("Select color.");
    const color = await this.findByXpath(`//div[@class='product__select-color-list clearfix']/a[@title='${nameColor}']`);
    await color.click();

    return this;
  }

  async checkSelectColor(nameColor){
   const selectColor = await this.findByXpath(`//div[@class='product__select-color-list clearfix']/a[@title='${nameColor}']/div[contains(@class,'is-selected')]`);
   
    return selectColor == undefined ? false : true;
  }
}

module.exports = ItemPage;
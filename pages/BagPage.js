const BasePage = require("./BasePage");
const logger = require("../logger");

class BagPage extends BasePage {
  static itemNameLocator = `//div[@class='checkout__cart-item-name']/a[@href='/product/719-31-184/coat-mentor/']`;
  static itemPriceLocator = `//div[@class='checkout__cart-item-final-price']/span`;
  static itemIdLocator = `//div[@class='checkout__cart-item-name']/a`;
  static totalPriceLocator = `//div[@class='checkout__cart-total-text-right']`;
  static amountItemsLocator = `//div[@class='checkout__cart-item-price-wrapper']//span`;
  static removeButtonLocator = `//div[@class='checkout__cart-item-remove']/button`;
  static emptyBagMessageLocator = `//div[@class='checkout__block']/div[@class='checkout__cart-empty-cart']`;
  static resourcesFileName = "bagPage.properties";
  static inputCountryId = 'checkout__address-csosusnstsrsys-input';
  static inputCityId = 'checkout__address-csistsys-input';
  static inputStreetLocator = `//label[@class='checkout__address-street']//input`;
  static inputHouseLocator = `//label[@class='checkout__address-house']//input`;
  static inputFlatLocator = `//label[@class='checkout__address-flat']//input`;
  static inputNameLocator = `//label[@class='checkout__detail-input-label']//input`;
  static inputPhoneLocator = `//label[@class='checkout__detail-input-label']//input[@type='tel']`;
  static inputEmailLocator = `//label[@class='checkout__detail-input-label']//input[@type='email']`;
  static checkoutButtonLocator = `//div[@class='checkout__bottom-btn-wrapper']/button`;

    async loadProperties() {
       return super.loadProperties(BagPage.resourcesFileName);
    }
  
    openPage = async () => super.openPage(this.PAGE_URL);

    async getProductName(){
     logger.info("Getting the product name in bag.");
     const element = await this.findByXpath(BagPage.itemNameLocator);
     const elementText = await this.getItemText(element);

     return elementText;
    }

   async getProductPrice(){
    logger.info("Getting the product price in bag.");
     const element = await this.findByXpath(BagPage.itemPriceLocator);
     const elementText = await this.getItemText(element);


     return elementText.replace(elementText.substr(-8),'');
    }

   async getProductId(){
     logger.info("Getting the product id in bag.");
     const element = await this.findByXpath(BagPage.itemIdLocator);
     const elementText = await element.getAttribute('href');
     const id = elementText.split('/')[4];

     return id;
    }
   
    async getTotalPrice(){
      logger.info("Getting the total price in bag.");
      const element = await this.findByXpath(BagPage.totalPriceLocator);
      const price = await this.getItemText(element);

      return price;
    }

    async getAmountItems(){
      logger.info("Getting amount of items in bag.");
      const element = await this.findByXpath(BagPage.amountItemsLocator);
      const elementText = await this.getItemText(element);
      const amount = elementText.split(' ')[3];
      return amount;
    }

    async clickRemoveButton() {
      logger.info("Clicking the remove button in the bag.");
      const button = await this.findByXpath(BagPage.removeButtonLocator);
      await button.click();
  
      return this;
    }

    async getEmptyBagText(){
      logger.info("Getting the empty bag text.");
        const element = await this.findByXpath(BagPage.emptyBagMessageLocator);
        const elementText = await this.getItemText(element);
    
        return elementText;
    }

    async inputCity(city){
      logger.info("Input city.");
      const element = await this.findById(BagPage.inputCityId);
      await element.sendKeys(city);
      const cityElement = await this.findByXpath(`//ul[@class='checkout__autocomplete-dropdown-ul']/li[contains(text(),'${city}')]`);
      cityElement.click();

      return this;
    }

    async inputStreet(street){
      logger.info("Input street.");
      const element = await this.findByXpath(BagPage.inputStreetLocator);
      await element.sendKeys(street);
  
      return this;
    }

    async inputHouse(house){
      logger.info("Input house.");
      const element = await this.findByXpath(BagPage.inputHouseLocator);
      await element.sendKeys(house);
  
      return this;
    }

    async inputFlat(flat){
      logger.info("Input flat.");
      const element = await this.findByXpath(BagPage.inputFlatLocator);
      await element.sendKeys(flat);
  
      return this;
    }

    async inputName(name){
      logger.info("Input name.");
      const element = await this.findByXpath(BagPage.inputNameLocator);
      await element.sendKeys(name);
  
      return this;
    }

    async inputPhone(phone){
      logger.info("Input phone.");
      const element = await this.findByXpath(BagPage.inputPhoneLocator);
      await element.sendKeys(phone);
  
      return this;
    }

    async inputEmail(email){
      logger.info("Input email.");
      const element = await this.findByXpath(BagPage.inputEmailLocator);
      await element.sendKeys(email);
  
      return this;
    }

    async getCheckoutButton() {
      logger.info("Getting the checkout button in the bag.");
      const button = await this.findByXpath(BagPage.checkoutButtonLocator);
      const actions = this.driver.actions({ async: true });
      await actions.move({ origin: button }).perform();
  
      return button;
    }

}

module.exports = BagPage;
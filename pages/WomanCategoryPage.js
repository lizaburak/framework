const BasePage = require("./BasePage");

class WomanCategoryPage extends BasePage {
  constructor(driver,firstNameCategory, secondNameCategory) {
    super(driver);

    this.firstNameCategory = firstNameCategory;
    this.secondNameCategory = secondNameCategory;
    this.firstCategoryCheckLocator = `//div[@class='catalog__card-list']/div[@class='card']//div[@class='card__product-name']/a[contains(text(),'${this.firstNameCategory}')]`;
    this.secondCategoryCheckLocator = `//div[@class='catalog__card-list']/div[@class='card']//div[@class='card__product-name']/a[contains(text(),'${this.secondNameCategory}')]`;
  }

  async checkCategoryResults() {
    return await this.findAllByXpath(this.firstCategoryCheckLocator) || await this.findAllByXpath( this.secondCategoryCheckLocator);
  }
  
}

module.exports = WomanCategoryPage;
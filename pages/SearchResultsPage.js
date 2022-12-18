const BasePage = require("./BasePage");

class SearchResultsPage extends BasePage {
    static selectTextLocator = `//h1[@class='catalog__h1']/span[@class='catalog__h1-span']`; 
    static emptySearchMessageLocator = `//div[@class='catalog__search-no-found']`;
    
    constructor(driver,  searchResult) {
        super(driver);
        this.searchResult = searchResult;
    }

    async getSearchResultsList(searchValue) {
        return await this.findAllByXpath(`//div[@class='card__content']/div[@class='card__product-name']/a[contains(text(),'${searchValue}')]`);
    }

    async getSelectText(){
        const element = await this.findByXpath(SearchResultsPage.selectTextLocator);
        const elementText = await this.getItemText(element);
    
        return elementText;
    }

    async getMessageOfEmptyListElements() {
        const element = await this.findByXpath(SearchResultsPage.emptySearchMessageLocator);
        const elementText = await this.getItemText(element);
    
        return elementText;
    }
}

module.exports = SearchResultsPage;
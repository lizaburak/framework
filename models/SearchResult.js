class SearchResult {
    constructor(searchValue) {
        this.searchValue = searchValue;
    }

    getSearchValue() {
        return this.searchValue;
    }

    setSearchValue(query) {
        this.searchValue = query;
    }
}

module.exports = SearchResult;
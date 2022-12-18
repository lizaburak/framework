const fs = require('fs/promises');

const { mode } = require("../config/env");

class DataReaderService {
    static getFullFileName(fileName) {
        return `${mode}.${fileName}`;
      }
    
      static async getTestData(fileName) {
        return (await fs.readFile(`./resources/${this.getFullFileName(fileName)}`, "utf-8"))
          .toString()
          .replace(/\r\n/g, "\n")
          .split("\n")
          .reduce((queryInfo, resourceString) => {
            if (resourceString.length > 0) {
              const [fieldName, ...fieldValues] = resourceString.split("=");
              queryInfo[fieldName] = fieldValues.join("=");
            }
    
            return queryInfo;
          }, {});
      }
}

module.exports = DataReaderService;
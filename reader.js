const fs  = require('fs');
const u   = require('./util');

u.l('\nInitializing Reader Module...');

var readCollectionFromFile = (dataFile) => {
    try {
        u.l(`Reading file ${dataFile}`);

        var collectionAsString = fs.readFileSync(dataFile);

        u.l('File readed successfully');

        return JSON.parse(collectionAsString);
    } catch (e) {
        console.log(`Error on execute readCollectionFromFile(): ${e}`);
        throw e;
    }
}

module.exports = {
    readCollectionFromFile
};

u.l('Reader Module initialized successful.');
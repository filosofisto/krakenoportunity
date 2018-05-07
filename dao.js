const u   = require('./util');

u.l('\nInitializing DAO Module...');

const mongo = require('mongodb');
const dbname = "kraken";
const url = "mongodb://localhost:27017";
const collname = "transactions";

/**
 * Insert documents to collection transactions.
 * 
 * @param {*} collection
 * @param {*} data 
 * @param {*} callback 
 */
const insertDocuments = (collection, data, callback) => {
    u.l('insertDocuments - start');

    // Import all data to collection
    collection.insertMany(data, (err, result) => {
        if (err) throw err;

        u.l(`Inserted ${result.result.n} documents`);
        u.l('Calling callback...');
        u.l('insertDocuments - end\n');
        callback(result);
    });
}

/**
 * clear collection
 * 
 * @param {*} collname 
 * @param {*} callback 
 */
const clearCollection = (collection, callback) => {
    u.l('clearCollection - start');

    collection.remove({}, (err, result) => {
        if (err) throw err;

        u.l(`Removed ${result.result.n} documents`);
        u.l('Calling callback...');
        u.l('clearCollection - end\n');

        callback(result);
    });
}

module.exports = {
    clearCollection,
    insertDocuments
};

u.l('DAO Module initialized successful.');

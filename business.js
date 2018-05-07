const u   = require('./util');

u.l('\nInitializing Business Module...');

var mapAddressToName = new Map();

const initMap = () => {
    mapAddressToName.set('mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ', 'Wesley Crusher');
    mapAddressToName.set('mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp', 'Leonard McCoy');
    mapAddressToName.set('mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n', 'Jonathan Archer');
    mapAddressToName.set('2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo', 'Jadzia Dax');
    mapAddressToName.set('mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8', 'Montgomery Scott');
    mapAddressToName.set('miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM', 'James T. Kirk');
    mapAddressToName.set('mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV', 'Spock');
}

const getName = (address) => {
    if (mapAddressToName.size === 0) {
        initMap();
    }

    return mapAddressToName.get(address);
}

const filterDeposits = (collection, callback) => {
    u.l('filterDeposits - start'); 

    var cursor = 
        collection.aggregate([
            {'$match': {'confirmations': {$gte: 6}}},
            {'$group': {'_id': '$address', 'count': {'$sum': 1}, 'sum': {'$sum': '$amount'}, 'min': {'$min': '$amount'}, 'max': {'$max': '$amount'}}}
        ], (err, items) => {
            if (err) throw err;

            u.l('filterDeposits - end');
            u.l('Calling callback');
            callback(items);
        });
}

const printDocuments = (items, callback) => {
    items.toArray(function(err, docs) {
        if (err) throw err;

        for (let doc of docs) {
            printDocument(doc);
        }

        printSmallestAndLargestAmounts(docs);

        callback(items);
    });
}

const printDocument = (doc) => {
    var person = getName(doc._id); // address = _id (see $group in filterDeposits)
    if (person) {
        u.i(`Deposited for ${person}: count=${doc.count} sum=${doc.sum}`);
    }
}

const printSmallestAndLargestAmounts = (docs) => {
    let smallest = Number.MAX_SAFE_INTEGER;
    let largest = Number.MIN_SAFE_INTEGER;

    for (let doc of docs) {
        if (doc.min < smallest) {
            smallest = doc.min;
        }
        if (doc.max > largest) {
            largest = doc.max;
        }
    }

    u.i(`Smallest valid deposit: ${smallest}`);
    u.i(`Largest valid deposit: ${largest}`);
}

module.exports = {
    filterDeposits,
    printDocuments,
    printSmallestAndLargestAmounts
};

u.l('Business Module initialized successful.');
const fs    = require('fs');
const _     = require('lodash');
const yargs = require('yargs');
const u     = require('./util');

//-----------------------------------------------------------------
// Functions Definitions
//-----------------------------------------------------------------
var headerApp = () => {
    u.l('------------------------------------------------------');
    u.l('Kraken Crypt/Payments Hiring Test');
    u.l('by Eduardo Ribeiro da Silva - filosofisto@gmail.com');
    u.l('------------------------------------------------------');
    u.l('Starting App');
    u.l('------------------------------------------------------');
}

var exec = (datafile, debug) => {
    u.l('\nExecuting import command');
    // read data from file
    var json = imp.readCollectionFromFile(datafile);

    const mongo = require('mongodb');
    const dbname = "kraken";
    const url = "mongodb://localhost:27017";
    const collname = "transactions";

    try {
        u.setDebug(debug);
        u.l('\nSaving data to database...');

        var mongoClient = mongo.MongoClient;

        // Connect or create database
        mongoClient.connect(url, (err, client) => {
            if (err) throw err;
    
            u.l('Database connection successful');
            const db = client.db(dbname);

            const collection = db.collection(collname);

            // Clear collection
            dao.clearCollection(collection, (removeResult) => {
                u.l('Collection cleared successfuly');

                // Import all data to collection
                dao.insertDocuments(collection, json.transactions, (resultInserts) => {
                    u.l('Documents inserted successfuly');

                    // Filter, sum and count
                    bus.filterDeposits(collection, (items) => {
                        u.l('Filter, count and sum calculated successfuly');

                        // Print result
                        bus.printDocuments(items, (docs) => {
                            client.close();
                            u.l('Database connection closed');
                        });
                    });
                });
            });
        });
    } catch (e) {
        console.log(`Error on execute saveToDatabase(): ${e}`);
        throw e;
    }
}

//-----------------------------------------------------------------

//-----------------------------------------------------------------
// main code
//-----------------------------------------------------------------
headerApp();

const dao   = require('./dao');
const imp   = require('./reader');
const bus   = require('./business');

const argv = yargs
    .command('exec', 'Import file, Apply Business Rules', {
        file: {
            describe: 'File',
            demand: true,
            alias: 'f'
        },
        debug: {
            describe: 'Debug (y/n)',
            demand: true,
            alias: 'd'
        }
    })
    .help()
    .argv;

var command = argv._[0];

if (command === 'exec') {
    exec(`${argv.file}`, `${argv.debug}`);
} else {
    u.l(`Unknown command: ${command}`)
}

//-----------------------------------------------------------------
let debugLevel = 'n';

const l = (text) => {
    if (debugLevel === 'y') {
        console.log(text); 
    }
}
const i = (text) => {
    console.log(text); 
}

const setDebug = (value) => {
    debugLevel = value;
}

module.exports = {
    l, i, setDebug
};
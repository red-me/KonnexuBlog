const ENABLE_DELAY = process.env.ENABLE_DELAY || false;
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, ENABLE_DELAY ? time : 0));
}


module.exports = { delay }

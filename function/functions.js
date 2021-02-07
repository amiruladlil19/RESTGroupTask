
function isUserExist(db, id, username) {
    intId = parseInt(id, 10)
    const result = db.some(user => user.id === id || user.username == username)
    return (result ? true : false)
}

function isCorrect(db, id, username, password) {
    intId = parseInt(id, 10)
    const result = db.some(user => user.id === intId && user.username == username && user.password == password)
    return result
}

function isFrienIdExist(db, userId) {
    const result = db.find(({ id }) => id == userId)
    return result;
}

function isTransactionIdExist(db, id) {
    const result = db.some(transaction => transaction.id == id)
    return (result ? true : false)
}

function isItemIdExist(db, itemId) {
    const result = db.find(({ id }) => id == itemId)
    return result
}

function isNumber(index) {
    return (isNaN(index) ? false : true)
}

function isOutOfRange(db, index) {
    return (((db.length - 1) < index ? true : false) || index < 0 ? true : false)
}

function isDataComplete(newData) {
    if ('nominal' in newData
        && 'itemId' in newData
        && 'id' in newData
        && 'userId' in newData
        && 'friendId' in newData) return true;

    else return false;
}

function isIdExist(db, id) {
    if (db.some(db => db.id == id)) return true;
    else return false;
}

function isItemDataComplete(itemdb){
    if('id' in itemdb
        && 'userId' in itemdb
        && 'name' in itemdb
    ) return true;
    else return false;
}



module.exports = {
    isUserExist,
    isCorrect,
    isFrienIdExist,
    isTransactionIdExist,
    isItemIdExist,
    isNumber,
    isOutOfRange,
    isIdExist,
    isItemDataComplete,
    isDataComplete
}
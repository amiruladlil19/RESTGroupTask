
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

function isPasswordCorrect(db, id, username, password) {
    intId = parseInt(id, 10)
    const result = db.some(user => user.id === intId && user.username == username && user.password != password)
    return result
}

function findIndexFromId(db, inputedId) {
    const index = db.findIndex(({ id }) => id == inputedId)
    return index
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

function isNegativeNumber(id) {
    return (id < 0 ? true : false)
}

function isContainSpecialChars(username) {
    const regex = /^[A-Za-z0-9 ]+$/
    const result = regex.test(username)
    return !result
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

function isItemDataComplete(itemdb) {
    if ('id' in itemdb
        && 'userId' in itemdb
        && 'name' in itemdb
    ) return true;
    else return false;
}



module.exports = {
    isUserExist,
    isCorrect,
    findIndexFromId,
    isFrienIdExist,
    isTransactionIdExist,
    isItemIdExist,
    isNegativeNumber,
    isContainSpecialChars,
    isDataComplete,
    isPasswordCorrect,
    isIdExist,
    isItemDataComplete
}
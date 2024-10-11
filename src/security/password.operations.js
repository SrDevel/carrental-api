const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    return await bcrypt.hash(password, 10);
}

const decrypt = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    encrypt,
    decrypt
}
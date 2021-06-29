var cryptoJS = require('crypto-js');

const key="iuwfhgiufebwiuj2hg32u9873296yr7g";

function crypto(){
    function getEncrypt(input){
        var enc=cryptoJS.AES.encrypt(input,key);
        return enc.toString();
    }

    function getDecrypt(input){
        var dec=cryptoJS.AES.decrypt(input,key);
        return dec.toString(cryptoJS.enc.Utf8);
    }

    return {
        getEncrypt,
        getDecrypt
    }
}
module.exports=crypto();
var EnCrypto=require('../utils/token');

var split= "!";
var ttl=60*1000*10;


function userToken(isnew,token,user,_ids){
    if(isnew){
        this.expirationTime=Date.now()+ttl;
        this.token=EnCrypto.getEncrypt( 
            user.ID+split+
            user.fullName+split+
            user.role+split+
            user.roleNumber+split+
            this.expirationTime+split+
            _ids+split+
            user._id);
    }else{
        this.token=token;
        var userData=EnCrypto.getDecrypt(token).split(split);
        this.ID=userData[0];
        this.fullName=userData[1];
        this.role=userData[2];
        this.roleNumber=userData[3];
        this.expirationTime=userData[4];
        this._ids=userData[5];
        this._id=userData[6];
    }

    this.isNotExpired =function() {
        if(this.expirationTime && parseInt(this.expirationTime) > Date.now()){
            return true;
        }else{
            return false;
        }
}
}

module.exports=userToken;


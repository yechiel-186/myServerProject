var EnCrypto=require('../utils/token');

var split= "!";
var ttl=60*1000*2;


function userToken(isnew,token,user){
    if(isnew){
        this.ID=user.ID;
        this.fullName=user.fullName;
        this.roleNumber=user.roleNumber;
        this.role=user.role;
        this.expirationTime=user.Date.now()+ttl;
        this.token=EnCrypto.getEncrypt(
            ID+split+
            email+split+
            fullName+split+
            role+split+
            roleNumber+split+
            this.expirationTime);
    }else{
        
        this.token=token;
        var userData=EnCrypto.getDecrypt(token).split(split);
        this.ID=userData[0];
        this.fullName=userData[1];
        this.role=userData[2];
        this.roleNumber=userData[3];
        this.expirationTime=userData[4];
    }

    var isNotExpired =function() {
        if(this.expirationTime && parseInt(this.expirationTime) > Date.now()){
            return true;
        }else{
            return false;
        }
}
}

module.exports=userToken;


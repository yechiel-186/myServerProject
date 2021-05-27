var EnCrypto=require('../utils/token');

var split= "!";
var ttl=60*1000*2;


function userToken(isnew,token, fullName, ID_number, role, roleNumber, email){
    if(isnew){
        this.ID_number=ID_number;
        this.email=email;
        this.fullName=fullName;
        this.roleNumber=roleNumber;
        this.role=role;
        this.expirationTime=Date.now()+ttl;
        this.token=EnCrypto.getEncrypt(
            ID_number+split+
            email+split+
            fullName+split+
            role+split+
            roleNumber+split+
            this.expirationTime);
    }else{
        
        this.token=token;
        var strData=EnCrypto.getDecrypt(token).split(split);
        this.ID_number=strData[0];
        this.email=strData[1];
        this.fullName=strData[2];
        this.role=strData[3];
        this.roleNumber=strData[4];
        this.expirationTime=strData[5];
    }

    var isNotExpired =function() {
        if(this.expirationTime && parseInt(this.expirationTime) > Date.now()){
            return true;
        }else{
            return false;
        }
}

return {token,
        isNotExpired}

}

module.exports=userToken;

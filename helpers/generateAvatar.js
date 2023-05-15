const gravatar = require('gravatar');

const generateAvatar=(email)=>{
   return gravatar.url(email, {protocol: 'https', s: '100'}); 
}
module.exports=generateAvatar;
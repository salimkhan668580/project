const jwt = require('jsonwebtoken');

async function genToken(data){
  const token=jwt.sign({
        data: data
      }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      return token
}
module.exports=genToken;
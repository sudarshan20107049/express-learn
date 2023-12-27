import json from 'jsonwebtoken'
const auth = async (req, res, next) => {
    try {
        const token = req.headers.Authorization || req.headers.authorization
        if (token) {
            const decode = await json.verify(token, process.env.TOKEN_SECRET)
            if (decode) {
             req.userRole = decode._doc.role
             return next()
            }
            else {
                return res.status(403).json({meassage:"Invalid token to verify access"})
            }
        }
       else {
      return res.status(401).json({
        message: "you are not allowed to access this. login first",
      });
    }
        
    } catch (error) {
        return  res.status(500).json({meassage:error.meassage||"something Went Wrong"})
    }
    
}

export default auth
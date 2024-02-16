import jwt  from "jsonwebtoken";
export const auth= ()=>{
    return (req,res,next)=>{
       // console.log(req.headers.token)
        jwt.verify(req.headers.token,"OpenSource44",(error,decoded)=>{
            if(error) return res.json({message:"invalid token"});
            req.userId=decoded.id;
            next()
        })
    }
}
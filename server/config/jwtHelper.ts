import * as jwt from 'jsonwebtoken';
export default class JwtHelper {

    verifyJwtToken = (req:any, res:any, next:any) => {
        var token;
        if ('authorization' in req.headers)
            token = req.headers['authorization'].split(' ')[1];
        if (!token)
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(token, "SECRETforSECRETEASE2020",
                (err:any, decoded:any) => {
                    if (err)
                        return res.status(500).send({ auth: false, message: 'Token authentication failed.'+err });
                    else {
                        next();
                    }
                }
            )
        }
    }
}

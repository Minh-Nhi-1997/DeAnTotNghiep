require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const white_lists = ["/login"];

    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        next()
    } else {
        if (req?.headers?.authorization?.split(' ')[1]) {
            const token = req.headers.authorization.split(' ')[1];

            //verify
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    role: decoded.role,
                    createdBy: "minhnhi"
                }
                console.log(">>> check token", decoded)
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "token bị hết hạn//Hoặc token không hợp lệ"
                })
            }

        } else {
            //return exception
            return res.status(401).json({
                message: "Bạn chưa truyền Access Token ở header/Hoặc token bị hết hạn"
            })
        }
    }

}

module.exports = auth;
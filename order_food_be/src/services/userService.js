require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({ email })
        if (user) {
            console.log(`>>> user exist, chọn 1 email khác: ${email}`);
            return null;
        }


        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds)
        //save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: '1'
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const loginService = async (email1, password, role1) => {
    try {
        if (role1 === 'admin') {
            //fetch user by email
            const admin = await User.findOne({ email: email1});
            
            if (admin) {
                //compare password
                const isMatchPassword = await bcrypt.compare(password, admin.password);
                
                if (!isMatchPassword) {
                    return {
                        EC: 2,
                        EM: "Email/Password không hợp lệ"
                    }
                }  
                if ("MINHNHI" !== admin.role) {
                    return {
                        EC: 3,
                        EM: "Tài khoản của bạn không có quyên truy cập",
                        admin: admin.role
                    }
                } 
                //create an access token
                const payload = {
                    email: admin.email,
                    name: admin.name,
                    role:  admin.role
                }

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: admin.email,
                        name: admin.name,
                        role:  admin.role
                    }
                };
                


                
            } else {
                return {
                    EC: 1,
                    EM: "Email/Password không hợp lệ",
                }
            }
        } else {
            //fetch user by email
            const user = await User.findOne({ email: email1 });
            if (user) {
                //compare password
                const isMatchPassword = await bcrypt.compare(password, user.password);
                if (!isMatchPassword) {
                    return {
                        EC: 2,
                        EM: "Email/Password không hợp lệ"
                    }
                } else {
                    //create an access token
                    const payload = {
                        email: user.email,
                        name: user.name
                    }

                    const access_token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: process.env.JWT_EXPIRE
                        }
                    )
                    return {
                        EC: 0,
                        access_token,
                        user: {
                            email: user.email,
                            name: user.name
                        }
                    };
                }
            } else {
                return {
                    EC: 1,
                    EM: "Email/Password không hợp lệ"
                }
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}



module.exports = {
    createUserService, loginService, getUserService
}
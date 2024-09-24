import { raw } from "body-parser";
import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes:{
                    exclude: ['password']
                },
                // raw: true
            })

            resolve({
                errCode: 0,
                data: users
            })
            
        } catch (e) {
            reject(e);
        }
    })
}

module.exports ={ 
    getTopDoctorHome: getTopDoctorHome
}
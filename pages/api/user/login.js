import db from "@/controllers/dbConnection";
import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {

        const checkUser = await User.findOne({ email: req.body.email });
        if (!checkUser) { res.json({ success: false, message: "Check Your Details" }) }
        else {
            if (checkUser.password === req.body.password) {
                res.json({ success: true, message: "Login successful" })
            }
            else {
                res.json({ success: false, message: "Incorrect password" })
            }
        }
    }

}

export default db(handler);
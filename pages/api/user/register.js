import db from "@/controllers/dbConnection";
import User from "@/models/User";
import crypto from "crypto";


const handler = async (req, res) => {
    if (req.method === "POST") {
        console.log(req.body)

        const isExistingUser = await User.findOne({ email: req.body.email });
        if (!isExistingUser) {
            const newUser = await User.create({
                name: req.body.firstName + " " + req.body.lastName,
                email: req.body.email,
                telephone: req.body.telephone,
                username: req.body.username,
                country: req.body.country,
                wallet: 0,
                topupWallet: 0,
                deposits: 0,
                withdrawals: 0,
                password: req.body.password,
                referralId: crypto.randomBytes(5).toString("hex"),
                username: req.body.username,
                plans: {},
            });
            newUser.save();
            res.status(200).json({ success: true, message: "User created successfully" });
        }
        else {
            res.status(400).json({ success: false, message: "User already exists" });
        }
    };
};


export default db(handler);
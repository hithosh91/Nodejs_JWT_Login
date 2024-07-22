const userd = require("../model/UserModel");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Registration = async (req, res) => {
  const { username, password } = req.body;

  try {
    const vemail = await userd.findOne({ username });
    if (vemail) {
      return res.status(400).json("Email is already taken");
    }

    const hashpassword = await bycrpt.hash(password, 10);

    const newVendor = new userd({ username: username, password: hashpassword });
    await newVendor.save();
    res.status(201).json({ message: "vendor register sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userd.findOne({ username });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log("error");
  }
};

const Proteceduser = async (req, res) => {
  res.send("login with jwt");
};

module.exports = { Registration, Login, Proteceduser };

//const mysql=require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dbConnection = require("../dbConfig/index");

const registerUser = async (req, res) => {
  const { fullName, emailId, password } = req.body;

  //console.log(username,email,password);
  try {
    if (!fullName || !emailId || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const existUserQuery =
      'select * from users where emailId="' + emailId + '"';
    const existUserExecute = await dbConnection.executeQuery(existUserQuery);
    if (existUserExecute.length > 0) {
      res.status(400);
      throw new Error("User already registered!");
    }
    const registerUserQuery =
      'insert into users(fullName,emailId,password) \
            values("' +
      req.body.fullName +
      '","' +
      req.body.emailId +
      '","' +
      req.body.password +
      '")';
    const registerUserExecute = await dbConnection.executeQuery(
      registerUserQuery
    );
    return res.status(200).json({
      message: "User Created",
    });
  } catch (err) {
    console.error(err);
    return {
      errorCode: 4001,
      message: "Error while creating user",
    };
  }
};

const loginUser = async (req, res) => {
  const { emailId, password } = req.body;
  console.log(emailId, password);
  try {
    if (!emailId && !password) {
      return res.status(403).send({ message: "Email or Password is missing" });
    } else {
      const userQuery = 'select * from users where emailId="' + emailId + '"';
      const user = await dbConnection.executeQuery(userQuery);
      //&& (await bcrypt.compare(password, user[0].password))
      if (user[0]) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user[0].fullName,
              email: user[0].emailId,
              id: user[0].userId,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        console.log("token", accessToken);
        res.status(200).json({
          userId: user[0].userId,
          fullName: user[0].fullName,
          token: accessToken,
        });
      } else {
        res.status(401);
        throw new Error("Username & Password are incorrect");
      }
    }
  } catch (err) {
    return {
      errorCode: 4002,
      message: "Error while searching for user",
    };
  }
};

const currentUser = async (req, res) => {
  res.send(req.user);
};

const getAllUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getAllUser,
};

import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';

async function sendOTPtoEmail(email, otp) {
  // create a nodemailer transporter using your SMTP credentials
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'solokill2001@gmail.com', // your email address
      pass: 'kwounewjdeubkbeo', // your email password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'solokill2001@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'OTP Verification Code', // subject line
    text: `Your OTP verification code is ${otp}.`, // plain text body
    html: `Your OTP verification code is <b>${otp}</b>.`, // html body
  });

  console.log('Message sent: %s', info.messageId);
}
export async function register(req, res) {
  try {
    const { name, password, email, address, phone } = req.body;
    console.log(email);
    const existEmail = new Promise(async function (resolve, reject) {
      const emailexist = await UserModel.findOne({ email });

      if (emailexist) reject('Email already exists');

      resolve();
    });

    const existPhone = new Promise(async function (resolve, reject) {
      const phoneexist = await UserModel.findOne({ phone });

      if (phoneexist) reject('Phone already exists');

      resolve();
    });

    // check for existing email

    Promise.all([existEmail, existPhone])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                name,
                password: hashedPassword,
                address,
                phone,
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: 'User Register Successfully' })
                )
                .catch((error) => res.status(500).send('Error when register'));
            })
            .catch((error) => {
              return res.status(500).send({
                error: 'Enable to hashed password',
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    console.log(error);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    UserModel.findOne({ email })
      .then(function (user) {
        bcrypt
          .compare(password, user.password)
          .then(function (passwordCheck) {
            if (!passwordCheck) return res.status(400).send('wrong!');

            //create JWT TOKEN
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              ENV.JWT_SECRET,

              { expiresIn: '24h' }
            );
            return res.status(200).send({
              msg: 'Login Successfully',
              _id: user._id,
              token,
            });
          })
          .catch(function (error) {
            return res.status(400).send('Password is not correct');
          });
      })
      .catch(function (error) {
        return res.status(404).send('email not found');
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

//middleware verify user

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;

    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: 'can not find user' });
    next();
  } catch (error) {
    return res.status(500).send({ error: 'Authentication failed' });
  }
}

export async function getUser(req, res) {
  const { email } = req.params; //get parameter
  const OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  try {
    if (!email) return res.status(501).send({ error: 'invalid email' });

    UserModel.findOne({ email })
      .then(async function (user) {
        if (!user)
          return res.status(501).send({ error: 'could not find the user' });

        user.otp = OTP;

        await user.save();
        sendOTPtoEmail(email, OTP);
        const { password, ...rest } = user.toJSON();
        return res.status(201).send(rest);
      })
      .catch(function (error) {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(409).send({ error: 'can not find user data' });
  }
}
export async function getUserbyId(req, res) {
  const { _id } = req.params; //get parameter
  try {
    if (!_id) return res.status(501).send({ error: 'invalid id' });

    UserModel.findOne({ _id })
      .then(function (user) {
        if (!user)
          return res.status(501).send({ error: 'could not find the user' });

        const { password, ...rest } = user.toJSON();
        return res.status(201).send(rest);
      })
      .catch(function (error) {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(409).send({ error: 'can not find user data' });
  }
}

export async function updateUser(req, res) {
  try {
    const { _id } = req.body;
    const user = req.body.user;
    const { email, phone } = user;
    const existEmail = new Promise(async function (resolve, reject) {
      const emailexist = await UserModel.findOne({ email });

      if (emailexist) reject('Email already exists');

      resolve();
    });

    const existPhone = new Promise(async function (resolve, reject) {
      const phoneexist = await UserModel.findOne({ phone });

      if (phoneexist) reject('Phone already exists');

      resolve();
    });
    Promise.all([existEmail, existPhone])
      .then(() => {
        if (_id) {
          const body = req.body.user;
          UserModel.findOne({ _id }).then(function (data) {
            if (!data) return res.status(404).send('User not found');
            UserModel.updateOne({ _id: _id }, body)
              .then(function (data) {
                return res.status(201).send('User Updated');
              })
              .catch(function (error) {
                return res.status(501).send({ error });
              });
          });
        } else return res.status(502).send('invalid user');
      })
      .catch(function (error) {
        return res.status(409).send({ error });
      });
  } catch (error) {
    return res.status(503).send({ error });
  }
}
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}
export async function verifyOTP(req, res) {
  const { _id } = req.query; //get parameter
  const { code } = req.query;
  if (!_id) return res.status(504).send({ error: 'invalid email' });

  UserModel.findOne({ _id }).then(async function (user) {
    if (!user)
      return res.status(505).send({ error: 'could not find the user' });

    if (user.otp === code) {
      req.app.locals.resetSession = true;
      user.otp = null;
      await user.save();

      return res.status(201).send({ msg: 'Verify Successfully' });
    } else {
      return res.status(500).send({ msg: 'Invalid OTP' });
    }
  });
}
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: 'access granted' });
  } else {
    return res.status(440).send({ msg: 'session expired' });
  }
}

export async function resetPassword(req, res) {
  if (!req.app.locals.resetSession)
    return res.status(440).send({ msg: 'session expired' });

  const { _id, password } = req.body;
  try {
    UserModel.findOne({ _id }).then(function (user) {
      if (!user) return res.status(404).send({ error: 'username not found' });
      bcrypt.hash(password, 10).then(function (hashedPassword) {
        UserModel.updateOne({ password: hashedPassword })
          .then(function () {
            req.app.locals.resetSession = false;
            return res.status(201).send({ msg: 'password reseted' });
          })
          .catch(function (error) {
            return res.status(500).send({ error: 'can not reset password' });
          })
          .catch(function (error) {
            return res.status(500).send({ error: 'can not hash password' });
          });
      });
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
export async function changepassword(req, res) {
  const { _id, newPassword, currentPassword } = req.body;
  console.log(currentPassword);
  try {
    UserModel.findOne({ _id }).then(function (user) {
      if (!user) return res.status(404).send({ error: 'username not found' });
      bcrypt
        .compare(currentPassword, user.password)
        .then(function (passwordCheck) {
          if (!passwordCheck)
            return res.status(502).send({ error: 'Password not correct' });
          else {
            bcrypt.hash(newPassword, 10).then(function (hashedPassword) {
              UserModel.updateOne({ password: hashedPassword })
                .then(function () {
                  req.app.locals.resetSession = false;
                  return res.status(201).send({ msg: 'password reseted' });
                })
                .catch(function (error) {
                  return res
                    .status(500)
                    .send({ error: 'can not reset password' });
                })
                .catch(function (error) {
                  return res
                    .status(500)
                    .send({ error: 'can not hash password' });
                });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

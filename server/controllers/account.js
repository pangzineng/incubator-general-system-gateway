const bcrypt = require('bcrypt');
var Account = require('../models/account');

const BCRYPT_SALT_ROUNDS = 12;

exports.ping = (req, res) => {
  res.send('Hello World!');
};

exports.account_register = (req, res) => {
  const {username, password} = req.body
  if (username && password) {
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(
      (hashedPassword) => {
        var account = new Account({username, password: hashedPassword});
        account.save(err => {
          if (err) {
            res.status(400).send('Account not created, username already exists')
          } else {
            res.status(200).send('Account created successfully')
          }
        })
      }
    ).catch(error => {
      console.log(error)
      res.status(500).send('Account not created')
    });
  } else {
    res.status(400).send('missing fields in request body')
  }
};

exports.account_login = (req, res) => {
  const {username, password} = req.body
  if (username && password) {
    Account.findOne({username}, (err, account) => {
      if (err || !account) {
        res.status(400).send('Username or password is incorrect')
      } else {
        bcrypt.compare(password, account.password).then((matched) => {
          if (matched) {
            res.status(200).json({...account._doc, password: undefined})
          } else {
            res.status(400).send('Username or password is incorrect')
          }
        })
      }
    })
  } else {
    res.status(400).send('missing fields in request body')
  }
};

exports.account_update = (req, res) => {
  const {username, password, newPassword} = req.body
  if ( username && password && newPassword ) {
    Account.findOne({username}, (err, account) => {
      if (err || !account) {
        res.status(400).send('Username or password is incorrect')
      } else {
        bcrypt.compare(password, account.password).then((matched) => {
          if (!err && matched) {
            bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS).then(
              (hashedPassword) => {
                Account.findByIdAndUpdate(account._id, {$set: {password: hashedPassword}}, (err) => {
                  if (!err) {
                    res.status(200).send('Account successfully updated')
                  } else {
                    res.status(400).send('Account not updated, username or password is incorrect')
                  }
                })
              }
            );
          } else {
            res.status(400).send('Account not updated, username or password is incorrect')
          }
        })
      }
    })
  } else {
    res.status(400).send('missing fields in request body')
  }
};

exports.account_delete = (req, res) => {
  const {username, password} = req.body
  if (username && password) {
    Account.findOne({username}, (err, account) => {
      if (err || !account) {
        res.status(400).send('Username or password is incorrect')
      } else {
        bcrypt.compare(password, account.password).then((matched) => {
          if (!err && matched) {
            Account.findByIdAndDelete(account._id, (err) => {
              if (!err) {
                res.status(200).send('Account successfully deleted')
              } else {
                res.status(400).send('Account not deleted, username or password is incorrect')
              }
            })
          } else {
            res.status(400).send('Account not deleted, username or password is incorrect')
          }
        })
      }
    })
  } else {
    res.status(400).send('missing fields in request body')
  }
};

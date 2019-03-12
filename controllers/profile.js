var Profile = require('../models/profile');

exports.ping = (req, res) => {
  res.send('Hello Profile!');
};

exports.profile_list = (req, res) => {
  Profile.find({}, {name:1,description:1}, (err, profiles) => {
    if(err || !profiles){
      res.status(404).send('Profiles not found')
    } else {
      res.status(200).json(profiles)
    }
  })
}

exports.profile_get = (req, res) => {
  Profile.findOne(req.body, (err, profile) => {
    if(err || !profile){
      res.status(404).send('Profile not found')
    } else {
      res.status(200).json(profile)
    }
  })
}

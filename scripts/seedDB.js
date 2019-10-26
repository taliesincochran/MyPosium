const mongoose = require("mongoose");
const db = require("../models");
const categories = require('../models/categories');
const moment = require('moment');
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

// This file empties the events collection and inserts the events below
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/myposium", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
    console.log('CONNECTED ==================================================================================')
  });


let newUser1 = {
  username: "TheEJMorgan",
  password: bcrypt.hashSync("tallymanbanana", bcrypt.genSaltSync(8), null),
  zipcode: 27713,
  age: 34,
  interests: ["Real Estate", "Self Improvement", "Computers", "Movies", "Medicine", "Coding", "Sports", "Remodelling", "Music"],
  img: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAA1jAAAAJGM3MWQ2OTdjLTkwNWMtNDU3ZS04ZmY5LTAyMTA5ODBlNDEzNw.jpg",
  aboutMe: "Hi my name is EJ and I like to party."
};

let newUser2 = {
  username: "VytasForYou",
  password: bcrypt.hashSync("tallymanbanana", bcrypt.genSaltSync(8), null),
  zipcode: 27713,
  age: 34,
  interests: ["Cooking", "Philosophy", "Social", "Travel", "Medicine", "Coding", "Sports", "Remodelling", "Music"],
  img: "https://4.bp.blogspot.com/-g4J8lGxRAAU/Wk74n8hybpI/AAAAAAAAC9k/w4gWkp4j6zUHkz6W14Iw1hgrRA33_4KSQCLcBGAs/s1600/REILY%2BJura.jpg",
  aboutMe: "Hi my name is Vytas and I like to party."
};

let newUser3 = {
  username: "MarcoPrincip",
  password: bcrypt.hashSync("tallymanbanana", bcrypt.genSaltSync(8), null),
  zipcode: 27713,
  age: 39,
  interests: ["Video Games", "Movies", "Real Estate", "Recreation", "Medicine", "Coding", "Sports", "Remodelling", "Music"],
  img: "https://media.licdn.com/media/AAMAAQDGAAwAAQAAAAAAAA74AAAAJDk2MjFkYzRlLTg3ZjUtNDZkYy1hZGJkLTgyYjMzOGMyNTIzYg.jpg",
  aboutMe: "Hi my name is Marco and I like to party."
};

let newUser4 = {
  username: "TallyManBanana",
  password: bcrypt.hashSync("tallymanbanana", bcrypt.genSaltSync(8), null),
  zipcode: 27713,
  age: 38,
  interests: ["Animals", "Science", "Movies", "Computers", "Medicine", "Coding", "Sports", "Remodelling", "Music"],
  img: "https://media.licdn.com/media/AAMAAQDGAAwAAQAAAAAAAAuzAAAAJDlhZDU2YWY3LTlhZGMtNDhhMy04NmJiLTA5M2QyYTIxMzcwNg.jpg",
  aboutMe: "Hi my name is Tally and I like to party."
};

let newUser5 = {
  username: "Demo",
  password: bcrypt.hashSync("password", bcrypt.genSaltSync(8), null),
  zipcode: 27713,
  age: 30,
  interests: ["Animals", "Science", "Movies", "Computers", "Medicine", "Coding", "Sports", "Remodelling", "Music"],
  img: "https://www.fillmurray.com/200/200",
  aboutMe: "Hi my name is Tally and I like to party."
};
let newUser6 = {
  username: "asdf",
  password: bcrypt.hashSync("asdf", bcrypt.genSaltSync(8), null),
  zipcode: 27713,
  age: 30,
  interests: ["Animals", "Science", "Movies", "Computers", "Medicine", "Coding", "Sports", "Remodelling", "Music"],
  img: "https://media.licdn.com/media/AAMAAQDGAAwAAQAAAAAAAAuzAAAAJDlhZDU2YWY3LTlhZGMtNDhhMy04NmJiLTA5M2QyYTIxMzcwNg.jpg",
  aboutMe: "Hi my name is Tally and I like to party."
};

//Events
let newEvent1 = {
  title: "Woodworking for Beginners",
  zipcode: 27713,
  username: "MarcoPrincip",
  date: moment().add(6, 'months').add(5, 'days').format("M-D-YYYY"),
  time: '7:00 pm',
  isRemote: 0,
  cost: '$10',
  category: 'Remodelling',
  imgURL: 'http://www.woodworkingtalk.com/members/cricket-48570/albums/featured-topics/40050-4-tips-choosing-woodworking-hand-tools.jpg',
  description: "Join me on a journey into the fabulous world of woodworking! We'll have oodles of fun exploring joinery, types of saws, sustainable building, etc... Bring your saw and a smile!",
  minAttending: 10,
  maxAttending: 30,
  attendees: []
};

let newEvent2 = {
  title: "An Intro to Plant-Based Medicines",
  zipcode: 27713,
  username: "TallyManBanana",
  date: moment().add(6, 'months').add(13, 'days').format("M-D-YYYY"),
  time: '9:30 pm',
  isRemote: 1,
  cost: '$15',
  category: "Medicine",
  imgURL: "http://images.indianexpress.com/2016/07/herbs-759.jpg",
  description: "We'll be taking long hikes through the woods while I point out different plants and their medicinal uses. Bring water, a sweater, and a positive attitude.",
  minAttending: 5,
  maxAttending: 12,
  attendees: []
};

let newEvent3 = {
  title: "Tennis Trick Shots",
  zipcode: 27713,
  username: "VytasForYou",
  date: moment().add(6, 'months').add(24, 'days').format("M-D-YYYY"),
  time: '1:00 pm',
  isRemote: 0,
  cost: '$8',
  category: "Sports",
  imgURL: "https://i.ytimg.com/vi/zOlnL31GWsM/maxresdefault.jpg",
  description: "FOR ADVANCED PLAYERS ONLY. We'll warm up with some light stretching and volleys and progress into behind the back and between the legs shots. It's important not to get discouraged!",
  minAttending: 10,
  maxAttending: 20,
  attendees: []
};

let newEvent4 = {
  title: "School of Rock",
  zipcode: 27713,
  username: "TheEJMorgan",
  date: moment().add(6, 'months').add(46, 'days').format("M-D-YYYY"),
  time: '8:30 pm',
  isRemote: ~~(Math.random()*2),
  cost: '$10',
  category: "Music",
  imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chuck_Berry_1957.jpg/215px-Chuck_Berry_1957.jpg",
  description: "Are you ready to rock? Learn how to play an instrument of your choosing. No previous experience necessary",
  minAttending: 150,
  maxAttending: 1000,
  attendees: []
};

let newEvent5 = {
  title: "Coding Class",
  zipcode: 27713,
  username: "TallyManBanana",
  date: moment().add(6, 'months').add(14, 'days').format("M-D-YYYY"),
  time: '6:30 pm',
  isRemote: ~~(Math.random()*2),
  cost: '$18',
  category: "Coding",
  imgURL: "http://www.allabttech.com/wp-content/uploads/2017/03/Computer-Programming-Certifications.jpg",
  description: "Learn to code with TallyManBanana!",
  minAttending: 12,
  maxAttending: 25,
  attendees: []
};

function generateEvent() {
  let eventArr = [];
  for (let i = 0; i < 50; i++){
    let ranNum = ~~(Math.random()*categories.length);
    let event = {
      title: categories[ranNum] + "Class",
      zipcode: 27713,
      username:  categories[ranNum] +  "Dude",
      date: moment().add(6, 'months').add(14, 'days').format("M-D-YYYY"),
      time: '6:30 pm',
      isRemote: ~~(Math.random()*2),
      cost: '$18',
      category: "Coding",
      imgURL: "http://www.allabttech.com/wp-content/uploads/2017/03/Computer-Programming-Certifications.jpg",
      description: categories[ranNum] +  " lesson!",
      minAttending: 1,
      maxAttending: 25,
      attendees: []
    };
    eventArr.push(event);
  }
  return eventArr;
}
let procedurallyGeneratedEvents = generateEvent();

let eventSeed = [newEvent1, newEvent2, newEvent3, newEvent4, newEvent5];
eventSeed = [...eventSeed, ...procedurallyGeneratedEvents];
const userSeed = [newUser1, newUser2, newUser3, newUser4, newUser5, newUser6];
db.User
  .remove({})
  .then(() => {
    db.User.create(userSeed)
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
db.Event
  .remove({})
  .then(() => {
    db.Event.create(eventSeed)
      .catch(err => console.error(err));
      // process.exit(0);
  })
  .catch(err => console.error(err));

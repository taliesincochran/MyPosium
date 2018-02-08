const mongoose = require("mongoose");
const db = require("../models");
const categories = require('../models/categories')
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/myposium",
  {
    useMongoClient: true
  }
);
console.log(categories);


const words = ['whittling', 'ocelot', 'bloviate', 'fistula', 'teratoma', 'diarrhea', 'erudite', 'egregious', 'amiable', 'tertiary', 'frenetic', 'amorphous', 'serendipitous', 'elucidate', 'mostaccioli', 'feral', 'loquatious', 'filibuster', 'zamphir', ]


const Seed = [];

for (let i = 0; i<50; i++){
  ~~(Math.random() * words.length);
  let newEvent = {
    title: words[~~(Math.random() * words.length)] + " " + words[~~(Math.random() * words.length)],
    zipcode: 27713,
    username: words[~~(Math.random() * words.length)] + " " + 'jones',
    date: '2-17-2018',
    time: '9:30 pm',
    isRemote: ~~(Math.random()*2),
    cost: '$10',
    category: categories[~~(Math.random()* categories.length)],
    imgUrl: 'https://www.fillmurray.com/300/300',
    description: "Lorem ipsum dolor amet lomo fingerstache chambray single-origin coffee etsy. Vegan tbh tattooed, blue bottle dreamcatcher pork belly kombucha vaporware man braid you probably haven't heard of them narwhal shabby chic. Flexitarian street art blog leggings vice, stumptown etsy pour-over deep v. Twee gastropub pinterest, umami banh mi beard freegan mlkshk letterpress hell of activated charcoal occupy. Actually hashtag cornhole migas flexitarian.",
    minAttending: 1,
    maxAttending: ~~(Math.random()*50),
    attendees: []
  }
  Seed.push(newEvent);
}

db.Event
  .remove({})
  .then(() => db.Event.collection.insertMany(Seed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "60b502aeb9b5ba09e43459ae",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/docgz2ctu/image/upload/v1622882221/YelpCamp/necoutmdmetq8y1afdio.jpg',
                    filename: 'YelpCamp/necoutmdmetq8y1afdio'
                },
                {
                    url: 'https://res.cloudinary.com/docgz2ctu/image/upload/v1622882225/YelpCamp/qipedljndy6jd2tb4kgh.jpg',
                    filename: 'YelpCamp/qipedljndy6jd2tb4kgh'
                },
                {
                    url: 'https://res.cloudinary.com/docgz2ctu/image/upload/v1622882228/YelpCamp/co29ugg3djt4bqkvscg5.jpg',
                    filename: 'YelpCamp/co29ugg3djt4bqkvscg5'
                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
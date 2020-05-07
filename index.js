const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Margharita pizza',
      level: 'Easy Peasy',
      ingredients: ['Pizza bread', 'tomato sauce', 'cheese'],
      cuisine: 'italian',
      dishType:'main_course',
      duration: '15',
      creator: 'Ana'
    })
  })
  .then((recipe) => {
    console.log('added recipe :', recipe);

    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    let recipeTitles = [];
    for (let i = 0; i < recipes.length; i++) {
      recipeTitles.push(recipes[i].title)
    }
    console.log(recipeTitles);

    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then(() => {
    console.log('the update was successful');

    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  .then(() => {
    console.log('The recipe was deleted successfully');

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

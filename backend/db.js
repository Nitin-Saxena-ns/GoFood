// getting-started.js
const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/gofood";
mongoose.set("strictQuery", true);
const mongoDB = async () => {
  await mongoose.connect(mongoURI, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data.find({}).toArray(async (err, data) => {
        const food_category = await mongoose.connection.db.collection(
          "foodCategory"
        );
        food_category.find({}).toArray((err, catData) => {
            if (err) {
                console.log(err);
              } else {
                global.food_items = data;
                global.foodCategory = catData;
              }
        });

       
      });
    }
  });
};
module.exports = mongoDB;

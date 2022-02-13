import mongoose from "mongoose";

var clientPromise;

async function dbConnect(caller) {
  // if (global._mongoClientPromise) {
  //   console.log(caller + " => using existing database connection");
  //   return Promise.resolve();
  // }
  // console.log(caller + " => using new database connection");

  // const db = await mongoose.connect(process.env.MONGO_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  // isConnected = db.connections[0].readyState;

  if (!global._mongoooseClientPromise) {
    global._mongoooseClientPromise = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(caller + " => using new database connection");
  }

  clientPromise = global._mongoooseClientPromise;
}

export default dbConnect;

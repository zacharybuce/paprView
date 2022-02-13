import mongoose from "mongoose";

var isConnected = null;

async function dbConnect() {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }
  console.log("=> using new database connection");
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = db.connections[0].readyState;
}

export default dbConnect;

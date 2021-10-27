import dbConnect from "../../../utils/dbConnect";
import Article from "../../../models/Article";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    default:
      res.status(400).json({ success: false });
      break;
  }
};

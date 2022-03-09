import dbConnect from "../../../utils/dbConnect";
import Article from "../../../models/Article";
const mongoose = require("mongoose");
dbConnect("search[id]");

export const getDocs = async (id) => {
  const articles = await Article.aggregate([
    {
      $search: {
        index: "DocumentSearch",
        text: {
          query: id,
          path: "title",
          fuzzy: {},
        },
      },
    },
  ]);

  return articles;
};

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        if (!id.startsWith("[")) res.status(200).json(getDocs(id));
        else {
          let newQuery = mongoose.Types.ObjectId(id.replace(/[\[\]]+/g, ""));
          const articles = await Article.find({ tags: newQuery });
          res.status(200).json({ success: true, data: articles.reverse() });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

import dbConnect from "../../../utils/dbConnect";
import Article from "../../../models/Article";

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
        res.status(200).json(getDocs(id));
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

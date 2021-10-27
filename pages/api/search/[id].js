import dbConnect from "../../../utils/dbConnect";
import Article from "../../../models/Article";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
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

        res.status(200).json({ success: true, data: articles });
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

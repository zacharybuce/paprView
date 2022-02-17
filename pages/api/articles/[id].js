import dbConnect from "../../../utils/dbConnect";
import Article from "../../../models/Article";

dbConnect("article[id]");

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const article = await Article.findById(id);

        if (!article) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        var article;
        if (req.body.bounty) {
          article = await Article.findByIdAndUpdate(
            id,
            { $set: { bounty: req.body.bounty } },
            {
              new: true,
              runValidators: true,
            }
          );
        } else if (req.body.id) {
          article = await Article.findByIdAndUpdate(
            id,
            { $push: { summaries: req.body.id } },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        if (!article) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedArticle = await Article.deletedOne({ _id: id });

        if (!deletedArticle) {
          res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

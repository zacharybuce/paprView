import dbConnect from "../../../utils/dbConnect";
import Summary from "../../../models/Summary";
import User from "../../../models/User";
import Article from "../../../models/Article";
const mongoose = require("mongoose");

const rankCred = (upvote, downvote) => {
  const incAmount = 10;

  if (upvote == 1 && downvote == 0) {
    return incAmount;
  } else if (upvote == 0 && downvote == 1) {
    return incAmount * -1;
  } else if (upvote == -1 && downvote == 0) {
    return incAmount * -1;
  } else if (upvote == 0 && downvote == -1) {
    return incAmount;
  } else if (upvote == 1 && downvote == -1) {
    return incAmount * 2;
  } else if (upvote == -1 && downvote == 1) {
    return incAmount * -2;
  }
};

dbConnect("summaries[id]");

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const summary = await Summary.findById(id);

        if (!summary) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: summary });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      if (req.body.bounty) {
        try {
          const summary = await Summary.findByIdAndUpdate(
            id,
            {
              $set: { bounty: { value: req.body.points } },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          const incAmount = req.body.points;

          var bulkOps = [];
          for (const tag of req.body.tags) {
            console.log(tag);
            let doc = {
              updateOne: {
                filter: {
                  _id: req.body.userId,
                  "ranks.tag": tag,
                },
                update: { $inc: { "ranks.$.value": incAmount / 10 } },
              },
            };
            console.log(doc);
            bulkOps.push(doc);
          }

          bulkOps.push({
            updateOne: {
              filter: {
                _id: req.body.userId,
              },
              update: { $inc: { points: incAmount } },
            },
          });

          const user = await User.bulkWrite(bulkOps);
          console.log(user);
          if (!user) {
            return res.status(400).json({ success: false });
          }

          res.status(200).json({ success: true, data: user });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false, error: error });
        }
      } else {
        try {
          const summary = await Summary.findByIdAndUpdate(
            id,
            {
              $inc: { upvotes: req.body.upvote, downvotes: req.body.downvote },
            },
            {
              new: true,
              runValidators: true,
            }
          );
          const incAmount = rankCred(req.body.upvote, req.body.downvote);

          var bulkOps = [];
          console.log(summary.user.toString());
          for (const tag of req.body.tags) {
            console.log(tag);
            let doc = {
              updateOne: {
                filter: {
                  _id: summary.user.toString(),
                  "ranks.tag": tag,
                },
                update: { $inc: { "ranks.$.value": incAmount / 10 } },
              },
            };
            console.log(doc);
            bulkOps.push(doc);
          }

          bulkOps.push({
            updateOne: {
              filter: {
                _id: summary.user.toString(),
              },
              update: { $inc: { points: incAmount } },
            },
          });

          const user = await User.bulkWrite(bulkOps);
          console.log(user);
          if (!summary) {
            return res.status(400).json({ success: false });
          }

          res.status(200).json({ success: true, data: summary });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false, error: error });
        }
      }
      break;

    case "POST":
      try {
        const userId = mongoose.Types.ObjectId(id);
        const users = await Summary.aggregate([
          { $match: { user: userId } },
          {
            $project: {
              total: { $subtract: ["$upvotes", "$downvotes"] },
              articletitle: "$articletitle",
              bounty: "$bounty",
              date: "$lastedit",
              articleId: "$article",
            },
          },
          { $sort: { total: -1 } },
          { $limit: 5 },
        ]);
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.log(error);
      }
      break;

    case "DELETE":
      try {
        const doc = await Summary.findOneAndDelete({ _id: id });
        const userRes = await User.updateOne(
          { _id: doc.user },
          { $pull: { summaries: id } }
        );
        const artRes = await Article.updateOne(
          { _id: doc.article },
          { $pull: { summaries: id } }
        );
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

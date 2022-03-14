import React from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ForumIcon from "@mui/icons-material/ForumOutlined";
import FeedIcon from "@mui/icons-material/FeedOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserCard from "./UserCard";
import ArticleTagChip from "./ArticleTagChip";
import ComputerIcon from "@mui/icons-material/Computer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BountyChip from "./BountyChip";
import BiotechIcon from "@mui/icons-material/Biotech";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";

const user = {
  _id: "622652a1e38271a36b534c34",
  name: "Zachary Buce",
  email: "zachary.buce2000@gmail.com",
  image:
    "https://lh3.googleusercontent.com/a-/AOh14GgInUnDXLZEUk5qHRI28br_zIc-bPluf9S3TMeP6Q=s96-c",
  emailVerified: null,
  votes: [],
  joinDate: { $date: { $numberLong: "1646678690000" } },
  points: 1140,
  summaries: [],
  ranks: [
    {
      tag: "62264654e38271a36b534b99",
      value: 0,
      _id: "622654f3c8e9d97899b85aba",
    },
    {
      tag: "622722e8a015c9e554e3a90f",
      value: 10,
      _id: "6227269afc527d986d78ec68",
    },
    {
      tag: "6227231aa015c9e554e3a912",
      value: 10,
      _id: "6227269afc527d986d78ec69",
    },
    {
      tag: "62272338a015c9e554e3a915",
      value: 10,
      _id: "6227269afc527d986d78ec6a",
    },
    {
      tag: "62272358a015c9e554e3a918",
      value: 10,
      _id: "6227269afc527d986d78ec6b",
    },
  ],
};

const HelpContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  [theme.breakpoints.down("sm")]: {
    marginRight: "2vw",
    marginLeft: "2vw",
  },
  [theme.breakpoints.up("md")]: {
    marginRight: "20vw",
    marginLeft: "20vw",
  },
  [theme.breakpoints.up("lg")]: {
    marginRight: "20vw",
    marginLeft: "20vw",
  },
  [theme.breakpoints.up("xl")]: {
    marginRight: "20vw",
    marginLeft: "20vw",
  },
}));

const HelpPageContent = () => {
  return (
    <HelpContainer>
      <Divider />

      <Typography variant="h3" sx={{ mt: "1vh", textAlign: "center" }}>
        Look for papers and get concise summaries
      </Typography>
      <Grid container alignItems="center" sx={{ mt: "5vh" }}>
        <Grid item xs={12} lg={7}>
          <Typography variant="h5">
            The whole purpose of this site is to{" "}
            <b>find summaries of academic papers</b>. There are only two main
            functions:
          </Typography>

          <Grid
            container
            alignItems="center"
            textAlign="center"
            sx={{ mt: "3vh" }}
          >
            <Grid item xs={12}>
              <FeedIcon color="primary" sx={{ fontSize: "7rem" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Adding papers...</Typography>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            textAlign="center"
            sx={{ mt: "3vh" }}
          >
            <Grid item xs={12}>
              <ForumIcon color="primary" sx={{ fontSize: "7rem" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">...and getting summaries</Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: "3vh" }}>
            <Grid item xs={2} sm={1}>
              <KeyboardArrowUpIcon color="primary" sx={{ fontSize: "3rem" }} />
            </Grid>
            <Grid item xs={10} sm={11}>
              <Typography variant="h5">
                {" "}
                Good Summaries are upvoted and <b>rise to the top</b>.
              </Typography>
              <Typography sx={{ mt: "1vh" }}>
                <i>The best summary appears first so it's easy to find.</i>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} sx={{ display: { xs: "none", lg: "flex" } }}>
          <Box sx={{ boxShadow: 2 }}>
            <img src="/HelpPic1.jpg"></img>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mt: "8vh", mb: "3vh" }} />

      <Typography variant="h3" sx={{ mt: "1vh", textAlign: "center" }}>
        Add to your user score when people vote on your posts
      </Typography>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "8vh" }}
      >
        <Grid item xs={12} lg={4}>
          <Typography variant="h5">
            When people upvote your summary, two scores will be increased:{" "}
            <b>credibility</b> and <b>points</b>
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          lg={2}
          textAlign="center"
          sx={{ mt: ["2vh", null, null, "0vh"] }}
        >
          <Typography variant="h4">+10</Typography>
          <Typography variant="h5">POINTS</Typography>
          <Typography sx={{ mt: "1vh" }}>
            <i>summary is upvoted</i>
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          lg={2}
          textAlign="center"
          sx={{ mt: ["2vh", null, null, "0vh"] }}
        >
          <Typography variant="h4">+1</Typography>
          <Typography variant="h5">CREDIBILITY</Typography>
          <Typography sx={{ mt: "1vh" }}>
            <i>summary is upvoted</i>
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          md={3}
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          <Box sx={{ boxShadow: 2, borderRadius: 1 }}>
            <Box sx={{ mt: 1 }}>
              <UserCard user={user} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "7vh" }}
      >
        <Grid item xs={12} lg={6}>
          <Typography variant="h5">
            Credibility tells other users how much you know about a subject. It
            is earned in <b>each tag</b> associated with the paper you summarize
          </Typography>
        </Grid>
        <Grid
          item
          container
          md={6}
          sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            display: { xs: "none", lg: "flex" },
          }}
          spacing={1}
        >
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <ArticleTagChip tagId={user.ranks[1].tag} />
            <Typography variant="h5" sx={{ mt: "1vh" }}>
              +1
            </Typography>
            <Typography>CREDIBILITY</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <ArticleTagChip tagId={user.ranks[2].tag} />
            <Typography variant="h5" sx={{ mt: "1vh" }}>
              +1
            </Typography>
            <Typography>CREDIBILITY</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <ArticleTagChip tagId={user.ranks[3].tag} />
            <Typography variant="h5" sx={{ mt: "1vh" }}>
              +1
            </Typography>
            <Typography>CREDIBILITY</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "7vh" }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5">
            As you earn <b>credibility</b>, you'll increase your <b>rank</b> and
            get special flares next to your name that tell other users how much
            you know about an area of research.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: ["2vh", 0] }}>
          <Box sx={{ ml: "2vw", mr: "2vw", boxShadow: 1, borderRadius: 1 }}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Rank</TableCell>
                    <TableCell align="left">Req. Cred</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <ComputerIcon sx={{ mr: "1vw", color: "#b9f2ff" }} />
                      Expert
                    </TableCell>
                    <TableCell align="left">100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <ComputerIcon sx={{ mr: "1vw", color: "#ffd700" }} />
                      Proficient
                    </TableCell>
                    <TableCell align="left">50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <ComputerIcon sx={{ mr: "1vw", color: "#94908e" }} />
                      Knowledgeable
                    </TableCell>
                    <TableCell align="left">25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <ComputerIcon sx={{ mr: "1vw", color: "#d1a684" }} />
                      Informed
                    </TableCell>
                    <TableCell align="left">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mt: "8vh", mb: "3vh" }} />
      <Typography variant="h3" sx={{ mt: "1vh", textAlign: "center" }}>
        Spend your points to start a bounty
      </Typography>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "8vh" }}
      >
        <Grid item xs={12} lg={6} sx={{ pr: [null, null, null, "5vw"] }}>
          <Typography variant="h5">
            If you want to draw more attention to a paper, use your{" "}
            <b>points</b> to start a <b>bounty</b>.
          </Typography>
          <Typography sx={{ mt: "2vh" }}>
            <i>A minimum of 40 points is required to start a bounty.</i>
          </Typography>
          <Typography variant="h5" sx={{ mt: "4vh" }}>
            After selecting the number of points to spend on the bounty, other
            users will be able to see it attached to the paper
          </Typography>
        </Grid>
        <Grid
          item
          container
          md={6}
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          <Box sx={{ boxShadow: 1 }}>
            <img src="HelpPic2.jpg"></img>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "8vh" }}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          <Typography color="primary" sx={{ mr: "1vw" }}>
            <EmojiEventsIcon color="primary" />
            +100
          </Typography>
          <Typography>
            <i>
              will appear next to the article you have bountied and a banner
              will appear above the summaries:
            </i>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: "1vh", ml: "5vw", mr: "5vw" }}>
          <BountyChip bountyAmount={100} />
        </Grid>
      </Grid>

      <Grid container alignItems="center" sx={{ mt: "8vh" }}>
        <Grid item md={7} sx={{ pr: "5vw" }}>
          <Typography variant="h5">
            Once other users begin to summarize the paper, you can choose a user
            to award the bounty to by clicking the{" "}
            <IconButton>
              <EmojiEventsIcon />
            </IconButton>{" "}
            next to their summary
          </Typography>
          <Typography variant="h5" sx={{ mt: "5vh" }}>
            The user you select will get points from the bounty{" "}
            <b>as well as</b> one-tenth the amount of credibility in each of the
            tags on that paper
          </Typography>
          <Typography sx={{ mt: "2vh" }}>
            <i>
              A trophy will appear next to the winning awarded summary for other
              users to see
            </i>
          </Typography>
        </Grid>
        <Grid
          item
          container
          md={5}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Box sx={{ boxShadow: 2 }}>
            <img src="HelpPic3.jpg"></img>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mt: "8vh", mb: "3vh" }} />
      <Typography variant="h3" sx={{ mt: "1vh", textAlign: "center" }}>
        Find reliable information from all areas of research, fast.
      </Typography>

      <Grid container alignItems="center" sx={{ mt: "8vh" }}>
        <Grid item xs={12} lg={7} sx={{ pr: "5vw" }}>
          <Typography variant="h5">
            Each paper will have a number of <b>tags</b>, which describe what
            the paper is written about. Every tag will belong to one of the{" "}
            <b>four disciplines</b> on paprView
          </Typography>
          <Typography sx={{ mt: "2vh" }}>
            <i>
              Papers are not limited to one discipline; they can have different
              tags from different disciplines.
            </i>
          </Typography>
          <Typography variant="h5" sx={{ mt: "4vh" }}>
            Every paper will have at least one tag and at most five tags.
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          lg={5}
          sx={{ boxShadow: 2, p: 2, mt: ["2vh", null, null, "0vh"] }}
        >
          <Grid item textAlign="center" xs={6}>
            <PermDataSettingIcon sx={{ fontSize: "4rem" }} />
            <Typography variant="h5">Physical and Formal Sciences</Typography>
          </Grid>
          <Grid item textAlign="center" xs={6}>
            <BiotechIcon sx={{ fontSize: "4rem" }} />
            <Typography variant="h5">Biomedical and Life Sciences</Typography>
          </Grid>
          <Grid item textAlign="center" xs={6}>
            <ComputerIcon sx={{ fontSize: "4rem" }} />
            <Typography variant="h5">Engineering and Technology</Typography>
          </Grid>
          <Grid item textAlign="center" xs={6}>
            <PsychologyIcon sx={{ fontSize: "4rem" }} />
            <Typography variant="h5">Humanities and Social Sciences</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container alignItems="center" sx={{ mt: "8vh" }}>
        <Grid item md={7} sx={{ pr: "5vw" }}>
          <Typography variant="h5">
            Tags can be added to a paper by selecting them from the dropdown
            menu upon paper creation:
          </Typography>
          <Typography sx={{ mt: "2vh" }}>
            <i>
              Click on the link below the dropdown menu to learn more about how
              to use tags.
            </i>
          </Typography>
        </Grid>
        <Grid
          container
          item
          md={5}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Box sx={{ borderRadius: 1, boxShadow: 1 }}>
            <img src="HelpPic4.jpg"></img>
          </Box>
        </Grid>
      </Grid>

      <Grid container alignItems="center" sx={{ mt: "8vh" }}>
        <Grid item xs={12} lg={7} sx={{ pr: "5vw" }}>
          <Typography variant="h5">
            If you don't see the tag you're looking for, click the{" "}
            <Button variant="contained" color="secondary">
              Add a Tag
            </Button>{" "}
            button
          </Typography>
          <Typography variant="h5" sx={{ mt: "5vh" }}>
            Then, provide the <b>tag name</b> and select the <b>discipline</b>{" "}
            that best describes it. The new tag is then added to the dropdown
            menu for you to use.
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          lg={5}
          sx={{
            mt: ["2vh", null, null, "0vh"],
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Box sx={{ borderRadius: 1, boxShadow: 1 }}>
            <img src="HelpPic5.jpg"></img>
          </Box>
        </Grid>
      </Grid>
    </HelpContainer>
  );
};

export default HelpPageContent;

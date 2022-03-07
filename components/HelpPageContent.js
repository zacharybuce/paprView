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
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HelpContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  [theme.breakpoints.up("xl")]: {
    marginRight: "20vw",
    marginLeft: "20vw",
  },
}));

const HelpPageContent = () => {
  return (
    <HelpContainer>
      <Typography variant="h2" sx={{ textAlign: "center", mb: "2vh" }}>
        About paprView
      </Typography>
      <Divider sx={{ mb: "2vh", backgroundColor: "#808080" }} />
      <Typography variant="h4" sx={{ mb: ".5vh" }}>
        Credibility
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Credibility (Cred) represents how much the community trusts you on a
        certain topic. The main way Credibility is earned is by summarizing
        academic papers and getting upvotes on them. Community members with the
        highest Credibility scores on paprView are displayed under the top users
        tab when you search for a paper.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        When you’re given Credibility for a summary, will earn them in every tag
        associated with the paper you summarized.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Right now, we are working are working on cool stuff for you to do
        (moderation abilities, voting, flares, etc.) with the Credibility
        system. If you have an idea for something you’d like to see implemented,
        join the Community Discussion or Contact Us!
      </Typography>

      <Typography sx={{ fontWeight: "bold" }}>
        How your Credibility is increased:
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        <ul>
          <li>+ 1 Credibility if your summary is upvoted.</li>
          <li>+ (Bounty amount)/10 Credibility for being awarded a Bounty.</li>
        </ul>
      </Typography>

      <Typography>
        <b>How your Credibility is lowered:</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        <ul>
          <li>- 1 Credibility if your summary is downvoted.</li>
          <li>
            - (Bounty amount) Credibility for attaching a Bounty to a paper.
          </li>
        </ul>
      </Typography>

      <Typography variant="h5" sx={{ mb: ".5vh" }}>
        Points
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        You earn points along with Credibility, either from Bounties or getting
        upvotes on your post. The general rule of thumb is that when you earn
        Credibility, you get 10x as many Points.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Points show the community how active you are on the site, and they are a
        rough measure of the information you have contributed to paprView. Your
        Points are displayed next to your name when you leave a summary and on
        the user page under your profile picture. Currently, they can only be
        spent on Bounties.
      </Typography>
      <Typography variant="h5" sx={{ mb: ".5vh" }}>
        Bounties
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Say there’s a paper that you want summarized but it isn’t getting much
        activity. A Bounty can be placed on that paper to draw more attention to
        it.
      </Typography>
      <Typography sx={{ mb: ".5h" }}>
        <b>Starting a Bounty</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        A Bounty can be attached to a paper by clicking CREATE A BOUNTY. Then,
        you can select how many of your hard-earned Points to spend on the
        Bounty. Please note that this is non-refundable and once you submit the
        Bounty, the amount you select will be gone from you account. After
        submission, you can click on any of the summaries posted to the paper
        and select the user that posted it as the winner.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Any paper can have a Bounty placed on it and you can use as many Points
        as you want on a single Bounty (please let us know what you think about
        this).
      </Typography>
      <Typography sx={{ mb: ".5h" }}>
        <b>Claiming a Bounty</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Bounties are a particularly good way to increase your credibility and
        gain extra points. Look for posts with a blue trophy icon or use the
        filter to only show results for papers with a Bounty attached.
      </Typography>
      <Typography>
        If you see a paper on a familiar topic with a Bounty attached, submit a
        summary of the paper and wait to be chosen by the user that posted the
        Bounty. There is no time limit on Bounties. If your summary is picked by
        the Bounty poster, you will be awarded:
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        <ul>
          <li>+ (reward amount) Points</li>
          <li>
            + (reward amount/10) Credibility in all tags associated with that
            paper
          </li>
        </ul>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        <b>Example: </b>Suppose Alice adds a Bounty of 50 Credibility to a paper
        with 2 tags, Encryption and Elliptic Curve, which she wants to have
        summarized. Bob, knowing about posts his summary of the paper and Alice
        chooses Bob’s summary to receive the Bounty. This awards him +50 Points
        and +5 Credibility in each of the tags: Encryption and Elliptic Curve.
      </Typography>

      <Divider sx={{ mb: "3vh" }} />

      <Typography variant="h4" sx={{ mb: "2vh" }}>
        Disciplines and Tags
      </Typography>
      <Typography variant="h5" sx={{ mb: ".5vh" }}>
        Disciplines
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        paprView has four Disciplines that act as over-arching areas of study
        and encompass all fields research: “Physical Science and Mathematics”,
        “Biomedical and Life Sciences”, “Engineering and Technology”, and
        “Humanities Social Sciences”. Every tag will fall into one of these four
        categories, and they are treated as their sub-communities within the
        website.
      </Typography>
      <Typography sx={{ mb: ".5h" }}>
        <b>Physical and Formal Sciences</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Physical Science studies the inorganic world and has four main branches:
        Physics, Chemistry, Astronomy, and Earth Science.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Formal Science includes theoretical concepts that are described by a set
        of rules or theorems such as Mathematics, Information Theory, or
        Statistics. These concepts form the base for how the physical world is
        described, which is why both areas of study are covered by this
        Discipline here.
      </Typography>
      <Typography sx={{ mb: ".5h" }}>
        <b>Physical and Formal Sciences</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Life Sciences study the organic world and Biomedical Sciences study the
        health of living things and their relationship to their environment and
        disease.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Note: Any form of bioengineering (such as Genetic Engineering,
        Biomaterials, or Pharmacology) will also fall under this category.
      </Typography>
      <Typography sx={{ mb: ".5h" }}>
        <b>Engineering and Technology</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        To avoid confusion about which tags fall under which category, we define
        technology as: the study of the ‘unnatural’/man-made world and
        application of scientific principles to engineer something new and
        improve existing systems. (i.e. Robotics, Mechanical Engineering,
        Transistors, etc…).
      </Typography>
      <Typography sx={{ mb: ".5h" }}>
        <b>Humanities and Social Sciences</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Social Science/Humanities is the study of society and human interaction.
        The main branches are: Anthropology, Communications, Economics,
        Education, Geography, History, Law, Linguistics, Psychology, and
        Sociology.
      </Typography>
      <Typography variant="h5" sx={{ mb: ".5vh" }}>
        Tags
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        A tag represents an area of academic research. They are used to describe
        papers and highlight your knowledge about a subject. Each tag will have
        an icon next to it representing the Discipline it belongs to.
      </Typography>

      <Typography sx={{ mb: "2vh" }}>
        Tags connect experts with people that want an accessible explanation of
        a complex topic. They provide an easy way for people to search for
        information about a topic and get the most suitable explanation of what
        they’re looking for. Clicking the BROWSE BY TAG button or the tag icon
        at the top left of the page allow you to search for papers by their
        associated tag.
      </Typography>
      <Typography sx={{ mb: ".5h" }}>
        <b>Adding new Tags</b>
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Tags are added to papers on creation. When selecting which tags, choose
        the most specific ones possible. Using a tag like Biology should be
        reserved for papers about very general topics. Each paper has a minimum
        of 1 tag and a maximum of 5.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        If you don’t see a tag matching the topic you’re looking for, select the
        ‘Add A Tag’ button after typing the tag name. Then, you can put the tag
        name along with the corresponding Discipline and, once added, you will
        be able to attach it to the paper.
      </Typography>
      <Typography>
        <ul>
          <li>
            Capitalize each word, EXCEPT for prepositions and articles (of, the,
            and, etc.).
          </li>
          <li>Use a space to separate multiple words.</li>
          <li>
            Topics can be broad (e.g. Psychology, Electronic Engineering, etc.)
            or niche (e.g. Biotechnology, Reinforcement Learning, Contract Law).
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" sx={{ mb: "1vh" }}>
        Rank
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        As you summarize papers and gain more Credibility, your rank in those
        tags will increase. When you earn Credibility in a tag for the first
        time, a brown icon for the associated Discipline will appear underneath
        your name. Scrolling over the icon will display the tag name, along with
        the amount of Credibility you have earned in that tag.
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Increasing your rank will change the color of the icon, so people can
        see how reputable you are in a topic.
      </Typography>
      <Box sx={{ mr: "10vw", ml: "10vw" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Rank</TableCell>
                <TableCell align="left">Req. Cred</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">Expert</TableCell>
                <TableCell align="left">100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Proficient</TableCell>
                <TableCell align="left">50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Knowledgeable</TableCell>
                <TableCell align="left">25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Informed</TableCell>
                <TableCell align="left">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </HelpContainer>
  );
};

export default HelpPageContent;

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
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HelpContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "20vw",
    marginLeft: "20vw",
  },
}));

const help = () => {
  return (
    <HelpContainer>
      <Typography variant="h2" sx={{ textAlign: "center", mb: "2vh" }}>
        About paprView
      </Typography>
      <Divider sx={{ mb: "2vh", backgroundColor: "#808080" }} />
      <Typography variant="h4" sx={{ mb: ".5vh" }}>
        What is credibility?
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Credibility represents how much the community trusts you in a certain
        subject; it gives you both general and topic-specific moderation
        abilities as well as increases your ‘rank’. People with the highest
        levels of credibility act as moderators and are given access to many of
        the same tools we have. This is done intentionally to ensure the site is
        run entirely by you!
      </Typography>
      <Typography variant="h5" sx={{ mb: ".5vh" }}>
        What do I need credibility for?
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        Well, nothing really.. nothing vital that is. The most important
        activities on paprView: Creating, Summarizing, and Discussing documents
        are all available to anyone with an account. Credibility is simply a way
        to reward people who have gifted free information to the community and
        give them more power on the website.
      </Typography>
      <Typography variant="h5" sx={{ mb: ".5vh" }}>
        How do I get Credibility?
      </Typography>
      <Typography sx={{ mb: "1vh" }}>
        The main way to earn credibility is by writing good summaries and
        getting engaged with the community discussion! As your rank increases,
        however, you will be able to earn more credibility by improving the
        experience for others on paprView.
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>
        How to raise your credibility:
      </Typography>
      <Typography sx={{ mb: "1vh" }}>
        <ul>
          <li>+1 cred for a vote up on your comment.</li>
          <li>+5 cred for a vote up on your summary.</li>
          <li>+5 cred for accepted edit on a post.</li>
          <li>+15 cred for accepted article edit.</li>
          <li>+100 cred for getting summary voted best.</li>
          <li>
            +(Reward amount) cred for best summary on a document with reward
            attached.
          </li>
        </ul>
        Each time you earn credibility it contributes to both a general and a
        topic-specific score. Your general credibility score will give you
        access to site-wide moderation tools while your topic credibility score
        will allow you more distinct moderation tools reserved for people who
        the community thinks are experts in that subject.
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>
        How to your credibility is lowered:
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        <ul>
          <li>-1 cred if your comment is voted down.</li>
          <li>-2 cred for voting down a summary.</li>
          <li>-5 cred if your summary is voted down.</li>
          <li>-100 cred if your post receives 5 code of conduct flags</li>
          <li>-150 cred if your post receives 8 misinformation flags</li>
          <li>-(Reward amount) cred for attaching a reward to a document.</li>
        </ul>
      </Typography>

      <Divider sx={{ mb: "3vh" }} />

      <Typography variant="h4" sx={{ mb: ".5vh" }}>
        What are Disciplines and tags?
      </Typography>
      <Typography sx={{ mb: "2vh" }}>
        A tag is a subject that an academic paper is associated with. When you
        summarize a document, you will earn credibility that contributes to both
        a general and tag-specific score. For example, if you received 50
        credibility from the community for summarizing a paper with the tags
        “technology”, “electronic-engineering”, and “robotics”, you will be
        given 50 credibility in each of those tags, as well as 50 general cred.
        Tags are a medium for experts to share their knowledge by explaining
        complex ideas from abstract papers in the simplest language possible.
        They are also a way for you to find clear information about concepts in
        niche fields that you know nothing about. Clicking on the filter button
        will pull up a menu where you can select the topics you want to apply to
        your search. Each paper has 1 topic minimum and 5 topics maximum, so
        choose the best descriptors for the document. In general, you should
        refrain from modifying the topics associated with an article, and new
        users are not allowed to suggest new tags, or vote in community
        elections for them. New tags are suggested to the community via the
        community page and once it reaches 50 votes in favor of being added, the
        tag will be included for anyone on the website to start earning
        credibility.
      </Typography>
      <Typography variant="h5" sx={{ mb: "1vh" }}>
        How does the tag ranking system work?
      </Typography>
      <Typography>
        All topics have the following ranking system:
        <ul>
          <li>Genius</li>
          <li>Expert</li>
          <li>Professional</li>
          <li>Informed</li>
          <li>Student</li>
          <li>Novice</li>
        </ul>
      </Typography>
      <Typography variant="h5" sx={{ mb: ".5vh" }}>
        Tag and rank
      </Typography>
      <Typography sx={{ mb: "5vh" }}>
        Your rank tells the community how much you know about a subject and
        gives you special controls over content associated with that tag. As you
        earn more credibility in a tag you increase your ‘rank’.{" "}
      </Typography>
      <Box sx={{ mr: "10vw", ml: "10vw" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Rank</TableCell>
                <TableCell align="left">Req. Cred</TableCell>
                <TableCell align="left">Permission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">Genius</TableCell>
                <TableCell align="left">5,000</TableCell>
                <TableCell align="left">
                  Vote on flag (misinformation)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Expert</TableCell>
                <TableCell align="left">2,500</TableCell>
                <TableCell align="left">Vote on tag meta edit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Professional</TableCell>
                <TableCell align="left">1,000</TableCell>
                <TableCell align="left">Vote to approve tag synonym</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Informed</TableCell>
                <TableCell align="left">500</TableCell>
                <TableCell align="left">
                  Vote for best summary/suggest tag synonym
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Student</TableCell>
                <TableCell align="left">50</TableCell>
                <TableCell align="left">
                  Vote to approve tag suggestion (for article)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Novice</TableCell>
                <TableCell align="left">1</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </HelpContainer>
  );
};

export default help;

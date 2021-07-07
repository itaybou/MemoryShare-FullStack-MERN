import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';

import Post from './Post/Post';
import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading)
    return (
      <Paper elevation={6}>
        <Typography variant="h6" align="center">
          No Posts currently.
        </Typography>
      </Paper>
    );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;

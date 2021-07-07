import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ChipInput from 'material-ui-chip-input';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import { getPostsBySearch } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);

  const searchPosts = () => {
    if (searchTerm.trim() || tags.length) {
      dispatch(
        getPostsBySearch({ search: searchTerm.trim(), tags: tags.join(',') }),
      );
      history.push(
        `/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(
          ',',
        )}`,
      );
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    // Enter key pressed
    if (e.keyCode || e.which === 13) {
      searchPosts();
    }
  };

  const handleAddTag = (tag) => setTags([...tags, tag.trim()]);

  const handleDeleteTag = (tagtoDelete) =>
    setTags(tags.filter((tag) => tag !== tagtoDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                newChipKeyCodes={[13, 32]}
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                variant="contained"
                onClick={searchPosts}
                className={classes.searchButton}
                color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

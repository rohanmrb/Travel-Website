import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const [listdata, newlistdata] = useState({ details: posts });
  const classes = useStyles();

  var list = [];

  posts.map((post) => {
    list.push(post);
  }
  );

  const handleSubmit = (e) => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = list;
      newList = currentList.filter(post => {
        const lc = post.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = list;
    }
    newlistdata({ ...listdata, details: newList });
  };

  return (
    (
      <Grid >
        <form autoComplete="off" >
          <TextField className={classes.search} variant="filled" label="Search" fullWidth onChange={handleSubmit} />
        </form>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {listdata.details.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))
          }
        </Grid>
      </Grid>
    )
  );
};

export default Posts;

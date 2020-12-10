import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import mapboxgl from 'mapbox-gl';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '', longitude: '', latitude: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '', longitude: '', latitude: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oYW5tYWxsZXNoIiwiYSI6ImNrZ3AxcWpqNjBoZDYyc284ZHJjbXZpOGoifQ.WuHLJrE9wBSQQpQMhjFxkA';

  const mapContainerRef = useRef(null);

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

      function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: 12.5
        });

        var marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        setPostData({...postData, longitude: lng, latitude: lat});

        return () => map.remove()
      }

      function errorFunction() {
        alert("Geocoder failed");
      }
    }
  }, []);

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Tell us about a new location!'}</Typography>
        <TextField name="author" variant="outlined" label="Author" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="destination" variant="outlined" label="Destination" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <div className={classes.mapcontainer} ref={mapContainerRef} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
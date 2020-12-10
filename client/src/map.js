import { Container } from "@material-ui/core";
import mapboxgl from 'mapbox-gl';
import { useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import useStyles from './mapStyle';

const Map = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const [map, setMap] = useState(null);
    const cla = useStyles();

    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    const mapContainerRef = useRef(null);

    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oYW5tYWxsZXNoIiwiYSI6ImNrZ3AxcWpqNjBoZDYyc284ZHJjbXZpOGoifQ.WuHLJrE9wBSQQpQMhjFxkA';
    
    useEffect(() => {

        if (posts) {

            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [77.576216, 12.962841],
                zoom: 12.5,
            });

            setMap(map);
            return () => map.remove()
        }

    }, []);

    posts.forEach(function (post, i) {
        new mapboxgl.Marker({ offset: [0, -23] })
            .setLngLat([post.longitude, post.latitude])
            .addTo(map);
        new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
        .setLngLat([post.longitude, post.latitude])
        .setHTML('<h3>'+'<b>'+ post.title +'</b>'+'</h3>' +
        '<h4>' + post.message + '</h4>').addTo(map);
    });


    return (
        <Container>
            <div className={cla.mapcontainer} ref={mapContainerRef} />
        </Container>
    );

};

export default Map;
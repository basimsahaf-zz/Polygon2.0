import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Row, Col } from 'react-materialize';
import {Polygon, withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {List} from 'immutable';
import {searchBox} from './searchBox';
import keys from './keys';

import {Image} from 'react-bootstrap';


/* Importing media */
import Logo from './img/logo.png';



class LeftBar extends React.Component {
  constructor() {
    super();
    this.state = {lat: 0, long: 0};
    this.location = navigator.geolocation.getCurrentPosition(function(position)
    {
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    }.bind(this))
  }

  render() {
    return (
      <Col s={1} className='col s12 m4 l3 leftBar'>
        <Image className = "logo" src = {Logo} responsive />
        <p> {this.state.lat} {this.state.long}</p>
        <searchBox/>
      </Col>
    )
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 40.7127753, lng: -74.0059728}}>
  </GoogleMap>
))



class MapSec extends React.Component {
  render() {
    return (
    <Col s={1} className='col s12 m8 l9 map'>
    <MyMapComponent
        isMarkerShown
        googleMapURL= {keys.gMapsAPI}
        loadingElement={<div style={{ height: `100%`, width: `128vh`}} />}
        containerElement={<div style={{ height: `100vh`, width: `128vh` }} />}
        mapElement={<div style={{ height: `100%`, width: `128vh` }} />}
      />
    </Col>
    )
  }
}



class MainPage extends React.Component {
  render() {
    return (
      <Row>
        <LeftBar/>
        <MapSec/>
      </Row>
    )
  }
}

ReactDOM.render(
  <MainPage/>,
  document.getElementById('root')
);

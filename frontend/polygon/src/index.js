import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button,Row, Col, Input} from 'react-materialize';
import {Polygon, withScriptjs, withGoogleMap, GoogleMap, Marker, Geocoder} from "react-google-maps";
import { compose, withProps, lifecycle } from 'recompose';
import {StandaloneSearchBox} from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import FontAwesome from 'react-fontawesome';
import keys from './keys';
import $ from "jquery";


import {Image} from 'react-bootstrap';


/* Importing media */
import Logo from './img/logo.png';

/**
 * Defining the search box
 */

 var temp = "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCU1p7jqHvM6zxyxhrTkNBbDGNoYnsYlOs"


 function getData(url) {
   var address = "";
     $.getJSON(url, function(data) {
        return data.results[0].formatted_address;
     });
  }

const Searchbox = compose(
   withProps({
     googleMapURL: keys.gMapsAPI,
     loadingElement: <div style={{ height: `100%` }} />,
     containerElement: <div style={{ height: `400px` }} />,
   }),
   lifecycle({
     componentWillMount() {
       const refs = {}

       this.setState({
         places: [],
         onSearchBoxMounted: ref => {
           refs.searchBox = ref;
         },
         onPlacesChanged: () => {
           const places = refs.searchBox.getPlaces();

           this.setState({
             places,
           });
         },
       })
     },
   }),
   withScriptjs
 )(props =>
   <div data-standalone-searchbox="">
     <StandaloneSearchBox
       ref={props.onSearchBoxMounted}
       bounds={props.bounds}
       onPlacesChanged={props.onPlacesChanged}
     >
      <Input type="text" s={12} placeholder="Enter a location"/>
     </StandaloneSearchBox>
     <ol>
       {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
         <li key={place_id}>
           {formatted_address}
           {" at "}
           ({location.lat()}, {location.lng()})
         </li>
       )}
     </ol>
   </div>
 );



class SearchForm extends React.Component {
  render() {
    return (
      <div className = "leftForm">
      <Row>
      <Searchbox/>
      <Input s={12} type='select' label="Business Type" defaultValue='1'>
        <option value='1'>Restaurant</option>
        <option value='2'>Coffee Shop</option>
        <option value='3'>Grocery Store</option>
        <option value='4'>Fast Food</option>
        <option value='5'>Other</option>
      </Input>
      <Input s={12} type='select' label="Monthly Rent Budget" defaultValue='1'>
        <option value='1'>0-$1000</option>
        <option value='2'>$1000-$2000</option>
        <option value='3'>$2000-$3000</option>
        <option value='4'>$3000-$4000</option>
        <option value='5'>$4000+</option>
      </Input>
      <Input name='group1' type='checkbox' value='true' label='In Downtown' defaultValue='checked' />
      <Input name='group1' type='checkbox' value='true' label='Show Nearby Locations' defaultValue='checked' />
      </Row>
      <div className="searchBar"><Button waves='light' className="searchBox red" node='a' href='#'> Predict </Button></div>
      </div>
    )
  }
}

class LeftBar extends React.Component {
  constructor() {
    super();
    this.state = {lat: 0, long: 0, apiStr: 'Finding current location'};
    this.location = navigator.geolocation.getCurrentPosition(function(position)
    {
      var address = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
      + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCU1p7jqHvM6zxyxhrTkNBbDGNoYnsYlOs";

      $.getJSON(address, function(data) {
         this.setState({
           apiStr: data.results[0].formatted_address
         })
      }.bind(this));

      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    }.bind(this));
  }

  render() {
    return (
      <Col s={1} className='col s12 m4 l3 leftBar'>
        <Image className = "logo" src = {Logo} responsive />
        <div className="location">
        <FontAwesome
        className='super-crazy-colors'
        name='location-arrow'
        pulse
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#d35400'}}
      /> {this.state.apiStr}
        </div>
        <SearchForm/>
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
        mapElement={<div style={{ height: `100%`, width: `128 vh` }} />}
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

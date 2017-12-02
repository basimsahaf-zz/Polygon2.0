import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button,Row, Col, Input} from 'react-materialize';
import {withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps";
import { compose, withProps, lifecycle } from 'recompose';
import {StandaloneSearchBox} from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import FontAwesome from 'react-fontawesome';
import keys from './keys';
import $ from "jquery";
import {Image} from 'react-bootstrap';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {Particles, Modes} from 'react-particles-js';


/* Importing media */
import Logo from './img/logo.png';

/**
 * Defining the search box
 */


class RenderParticles extends React.Component {
  render() {
    return (
      <Particles className="particles"
              params={{
                particles: {
                  number: {
                    value: 20,
                    density: {
                      enable: false,
                      value_area: 800
                    },
                    color: {
                      value: "#e74c3c"
                    },
                    move: {
                        enable: !0,
                        speed: 3,
                        direction: "none",
                        random: !1,
                        straight: !1,
                        out_mode: "bounce",
                        bounce: !0,
                        attract: {
                            enable: 1,
                            rotateX: 3e3,
                            rotateY: 3e3
                        }
                    }
                  },
                  interactivity: {
                  detect_on: "canvas",
                  events: {
                      onhover: {
                          enable: !0,
                          mode: "grab"
                      },
                      onclick: {
                          enable: !1,
                          mode: "repulse"
                      },
                      resize: !0
                  },
                modes: {
                        grab: {
                            distance: 180,
                            line_linked: {
                                opacity: .35
                            }
                        },
                        bubble: {
                            distance: 200,
                            size: 80,
                            duration: .4
                        },
                        repulse: {
                            distance: 100,
                            duration: 5
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                  },
                  shape: {
                    type: ["circle", "triangle"],
                    stroke: {
                      width: 2,
                      color: "#e74c3c"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                }
              }}}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "15%",
                height: "100%",
                zIndex: 0
              }}
            />
    )
  }
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
      <Input className ="radioButtons" name='group1' type='checkbox' value='true' label='In Downtown' defaultValue='checked' />
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
        <RenderParticles/>
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
        loadingElement={<div style={{ height: `100%`, width: `100%`}} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%`, width: `100%` }} />}
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

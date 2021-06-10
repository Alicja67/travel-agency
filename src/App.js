import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/views/Home/Home';
import Trips from './components/views/Trips/TripsContainer';
// TODO - import other views
import Trip from './components/views/Trip/TripContainer';
import Countries from './components/views/Countries/CountriesContainer';
import Country from './components/views/Country/CountryContainer';
import Regions from './components/views/Regions/RegionsContainer';
import Info from './components/views/Info/Info';
import NotFound from './components/views/NotFound/NotFound';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';
import {spring, AnimatedSwitch} from 'react-router-transition';
import styles from '../src/styles/App.scss';


class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips != this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  mapStyles = (style) => {
    return {
      opacity: style.opacity,
      transform: `translateY(${style.translate}px)`,
    };
  }

  bounce = (val) => {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }

  transition = {
    atEnter: {
      opacity: 0,
      translate: 200,
    },
    atLeave: {
      opacity: this.bounce(0),
      translate: this.bounce(200),
    },
    atActive: {
      opacity: this.bounce(1),
      translate: this.bounce(0),
    },
  }

  render(){
    return (
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch
            atEnter={this.transition.atEnter}
            atLeave={this.transition.atLeave}
            atActive={this.transition.atActive}
            mapStyles={this.mapStyles}
            className={styles.switchWrapper}
          >
            <Route exact path='/' component={Home} />
            <Route exact path='/trips' component={Trips} />
            {/* TODO - add more routes for other views */}
            <Route exact path='/trip/:id' component={Trip} />
            <Route exact path='/countries' component={Countries} />
            <Route exact path='/country/:id' component={Country} />
            <Route exact path='/regions' component={Regions} />

            <Route exact path='/info' component={Info} />
            <Route path='*' component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Fragment } from 'react';
import BackButton from './Components/BackButton/BackButton';
import Event from './Components/Event/Event';
import EventPreview from './Components/EventPreview/EventPreview';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import '../src/Style/Style.css';
import EventList from './Components/EventList/EventList';
import LoadingPage from './Components/LoadingPage/LoadingPage';
import'./App.css'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      popularEvents: '',
      currentDateTimeISO8061: new Date().toISOString(),
      initialDataIsLoading: true,
      eventPreviews: ''
    };
  }

  componentDidMount() {
    this.getData();
    this.timeInterval = setInterval(() => {
      this.setState({ currentDateTimeISO8061: new Date().toISOString() }); 
      // this.getData();
    }
    , 60000);    
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  async fetchAPIHandler(url) {
    const response = await fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
    return response
  }

  getData = async () => {
    const corsURL = 'https://cors-anywhere.herokuapp.com/';
    const smarketURL = 'https://api.smarkets.com/v3/';
    // fetch popular event ids
    const popularEventIDsResponse = await this.fetchAPIHandler(`${corsURL}${smarketURL}popular/event_ids/?limit=20`);
    const popularEventIDs = popularEventIDsResponse["popular_event_ids"];
    
    //fetch popular event info
    const popularEventsResponse = await this.fetchAPIHandler(`${corsURL}${smarketURL}events/${popularEventIDs}`);
    //reduce into a keyed object
    const popularEventsUnfinished = popularEventsResponse["events"].reduce((map, event) => (map[event.id] = event, map), {});    

    //filter popular events for those which are live
    const livePopularEvents = popularEventsResponse["events"].filter(event => event.state === 'live').map(event => event.id);    
    //fetch event states on these live events
    let livePopularEventStates = null;
    if (livePopularEvents.length > 0) {
    const livePopularEventStatesResponse = await this.fetchAPIHandler(`${corsURL}${smarketURL}events/${livePopularEvents}/states`); 
    // reduce into a keyed object      
    const livePopularEventStates = livePopularEvents? livePopularEventStatesResponse["event_states"].reduce((map, event) => (map[event.id] = event, map), {}) : null;
    }

    //map popular events into an array of their parent events - used to find league of child event
    const popularParentIDs = Object.keys(popularEventsUnfinished).map(key => popularEventsUnfinished[key].parent_id);
    //fetch parent event info
    const popularParentEventsResponse = await this.fetchAPIHandler(`${corsURL}${smarketURL}events/${popularParentIDs}`);
    //reduce into keyed object - using parent event id as key - Containing only parent name/league
    const popularParentEventNames = popularParentEventsResponse["events"].reduce((map, parentEvent) => (map[parentEvent.id] = parentEvent.name.replace(/_/, ' '), map), []);

    // reduce the three keyed objects into a singular one - with the popular event id as key
    const popularEvents = Object.keys(popularEventsUnfinished).reduce(function(map, eventKey) {
      map[eventKey] = popularEventsUnfinished[eventKey];
      map[eventKey].league = popularParentEventNames[popularEventsUnfinished[eventKey].parent_id];
      map[eventKey].clock = livePopularEventStates ? livePopularEventStates[eventKey] ? livePopularEventStates[eventKey].clock : null : null;
      map[eventKey].match_period = livePopularEventStates ? livePopularEventStates[eventKey] ? livePopularEventStates[eventKey].match_period : null: null;
      map[eventKey].scores = livePopularEventStates ? livePopularEventStates[eventKey] ? livePopularEventStates[eventKey].scores : null: null;
      return map
    }, {});

    // sort popular events based upon date and map to the array of EventPreview elements
    const eventPreviews = Object.values(popularEvents).sort((a,b) => new Date(a.start_datetime) - new Date(b.start_datetime))
    .map(event => <EventPreview currentDateTimeISO8061={this.state.currentDateTimeISO8061} key={event.id} event={event}/>);

    console.log(eventPreviews);

    this.setState({popularEvents: popularEvents});
    this.setState({eventPreviews: eventPreviews});
    this.deactivateLoadingPage();
  }

  deactivateLoadingPage() {
    this.setState({initialDataIsLoading: false});
  }

  render() {
    return (
      <div className="appContainer">
        {/* Main page switch display */}
        {this.state.initialDataIsLoading ? (<LoadingPage title={'Getting Events'} />
        ) : (
            <Switch>

              {/* Main Page Route Display*/}
              <Route exact path="/">
                <div className="landing-page-event-list">
                  <EventList eventListClassName={"landingPage"} eventPreviews={this.state.eventPreviews} />
                </div>
              </Route>

              {/* Page for events and selected event overview */}
              <Route exact path="/Event">
                <div className="event-page-container">
                  <div className="event-page-event">
                    <Event props={this.props.location.state} />
                  </div>
                  <div className="event-page-event-list">
                    <EventList eventListClassName={"eventPage"} eventPreviews={this.state.eventPreviews} />
                  </div>
                </div>
              </Route>

            </Switch>
          )}
      </div>
    )
  }
};

export default withRouter(App);
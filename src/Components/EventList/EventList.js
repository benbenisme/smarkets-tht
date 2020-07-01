import React from 'react';
import './EventList.css'

export default function EventList(props) {  
    console.log(props);
    return (
        <div className="event-list-container">
            <div className="event-list-title-container">
                <label className="event-list-title">Popular Events</label>
            </div>
            <ul className="event-list-previews-container">
                {props.eventPreviews}
            </ul>
        </div>
    )
}
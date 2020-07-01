import React from 'react';
import { Link } from "react-router-dom";
import { CalculateDateTimeDifferenceInMinutes } from '../../Helpers/DateTimeHelper';
import Icon from '../Icon/Icon';
import {EventDisplayNameSelector, 
    EventDisplayTimeConfigSelector} from '../../Helpers/EventDisplayHelper';
import './EventPreview.css'
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';

export default function EventPreview(props) {
    const timeDifferenceMinutes = CalculateDateTimeDifferenceInMinutes(props.event.start_datetime, props.currentDateTimeISO8061);
    const timeDisplayConfig = EventDisplayTimeConfigSelector(timeDifferenceMinutes, props.event.state, props.event.start_datetime, props.event.clock);
    const timeDisplay = timeDisplayConfig.displayTimeString;
    const timeDisplayIconType = timeDisplayConfig.displayTimeIconType;
    const timeDisplayColour = timeDisplayConfig.displayTimeColour;
    const eventDisplayName = EventDisplayNameSelector(props.event);
    const stateToPersist = {
        event: props.event,
        timeDisplay: timeDisplay,
        eventDisplayName: eventDisplayName,
        timeDisplayColour: timeDisplayColour,
        timeDisplayIconType: timeDisplayIconType
    }; 
    return (
        <li className="event-preview-container">
            <Link
                style={{ textDecoration: 'none' }}
                to={{
                    pathname: "/Event",
                    state: stateToPersist
                }}>
                <div className="event-preview-inner-container">
                    <div className="event-icon-container">
                        <Icon componentIdentifier={'eventPreviewEvent'} type={props.event.type} />
                    </div>
                    <div className="event-preview-text-container">
                        <div className="event-preview-title">
                            <label>{eventDisplayName}</label>
                        </div>
                        <div className="event-preview-time-container">
                            <div className="event-preview-time-icon">
                                <Icon componentIdentifier={'eventPreviewTimer'} type={timeDisplayIconType} colour={timeDisplayColour} />
                            </div>
                            <div className="event-preview-time-container">
                                <label className="event-preview-time" style={{ color: timeDisplayColour }}>{timeDisplay}</label>
                            </div>
                        </div>
                    </div>
                    <div className="score-display-container">
                        <ScoreDisplay className={'preview-score-display'} scores={props.event.scores} orientation={'column'} />
                    </div>
                </div>
            </Link>
        </li>
    )
}
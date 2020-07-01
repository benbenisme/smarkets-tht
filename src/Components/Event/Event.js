import React from 'react';
import Icon from '../Icon/Icon';
import './Event.css'
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';
import { smarketTheme } from '../../Style/Themes';

export default function Event(props) {
    const scores = props.routerState.event.scores
    const matchPeriod = props.routerState.event.match_period ? props.routerState.event.match_period.replace('_',' ') : null;
    const bettable = props.routerState.event.bettable && props.routerState.event.state !== 'ended';
    return (
        <div className="event-container" style={{border: bettable ? `2px solid ${smarketTheme.open}` : `2px solid ${smarketTheme.closed}`}}>           
            <div className="event-header-container">
                <div className="event-event-icon-container">
                    <Icon componentIdentifier={'eventEvent'} type={props.routerState.event.type} />
                </div>
                <div className="event-league-container">
                    <label className="event-league" >{props.routerState.event.league}</label>
                </div>
                <div className="event-time-display-container">
                    <div className="event-time-icon">
                        <Icon componentIdentifier={'eventTimer'} type={props.routerState.timeDisplayIconType} colour={props.routerState.timeDisplayColour} />
                    </div>
                    <div className="event-time-container">
                        <label className="event-time" style={{ color: props.routerState.timeDisplayColour }}>{props.routerState.timeDisplay}</label>
                    </div>
                </div>
            </div>
            <div className="event-body-container">
                <div className="event-bettable-status-container">
                    <label className="event-bettable-status" style={{color: bettable ? smarketTheme.open : smarketTheme.closed}}>{bettable ? 'BETTING OPEN' : 'BETTING CLOSED'}</label>
                </div>
                <div className="event-title-container">
                    <label className="event-title">{props.routerState.eventDisplayName}</label>
                </div>
                <div className="event-score-container">
                    {scores && <ScoreDisplay className={"event-score-display"} scores={scores} orientation={'row'}/>}
                </div>
                <div className="event-status-container">
                    {matchPeriod && <label className="event-status">{matchPeriod}</label>}
                </div>
            </div>

        </div>
    );
}
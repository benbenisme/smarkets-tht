import React from 'react';
import {smarketTheme} from '../../Style/Themes';
import './ScoreDisplay.css'

export default function ScoreDisplay(props) {
    const scores = props.scores ? props.scores.current : null;
    const lead = !scores ? null : scores[0] === scores[1] ? 'tie' : scores[0] > scores[1] ? 'first' : 'second';
    if (props.scores) {
        return (
            <div className={props.className} style={{flexDirection: props.orientation}}>
                <div className="score-display-first" style={{backgroundColor: lead === 'first' ? smarketTheme.leadingScoreColour : smarketTheme.trailingScoreColour}}>
                    <label>{scores[0]}</label>
                </div>
                <div style={{flexBasis: '0.1rem'}}/>
                <div className="score-display-second" style={{backgroundColor: lead === 'second' ? smarketTheme.leadingScoreColour : smarketTheme.trailingScoreColour}}>
                    <label>{scores[1]}</label>
                </div>
            </div>)
    } else return (null)
}
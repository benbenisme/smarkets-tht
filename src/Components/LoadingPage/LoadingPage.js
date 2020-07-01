import React from 'react';
import LoaderAnimation from '../LoaderAnimation/LoaderAnimation';
import { smarketTheme } from '../../Style/Themes';
import './LoadingPage.css';

export default function LoadingPage(props) {
    return (
        <div className="loading-page-container">
            <div className="loading-page-title-container">
                <label className="loading-title" style={{ color: smarketTheme.upcomingEventColour }}>{props.title}.</label>
            </div>
            <div className="loading-page-animation-container">
                <LoaderAnimation style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }} dimensions={{ height: '60vh', width: '100%' }} />
            </div>
        </div>
    )
}
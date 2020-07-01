import {smarketTheme} from '../Style/Themes';

export function EventDisplayNameSelector(event) {
    switch (event.type) {
    case "horse_racing_race":
        return event.short_name;
    default:
        return event.name
    }
}

function determineMatchTime(clock) {
    let clockSplit = clock.split(":");
    return (parseInt(clockSplit[0],10)*60 + parseInt(clockSplit[1],10)).toString().concat("'");    
}

export function EventDisplayTimeConfigSelector(timeDiffMins, eventState, eventStartDate, clock) {
    // Split rounds down with this use, obviously better to be earlier than miss it so this is fine
    let displayTimeConfig = {displayTimeString:'', displayTimeIcon:'default', displayTimeColour:''};
    if (eventState === "live") {
        clock ? !clock.stopped ?  displayTimeConfig.displayTimeString = determineMatchTime(clock.match_time) : 
        displayTimeConfig.displayTimeString = "LIVE NOW" : displayTimeConfig.displayTimeString = "LIVE NOW"; 
        displayTimeConfig.displayTimeIconType = 'live';
        displayTimeConfig.displayTimeColour = smarketTheme.liveEventColour;
    }
    else if (eventState === "ended") {
        displayTimeConfig.displayTimeString = "EVENT ENDED";
        displayTimeConfig.displayTimeColour = smarketTheme.endedEventColour;
    }
    else if (timeDiffMins < 1) {
        displayTimeConfig.displayTimeString = "STARING SOON";
        displayTimeConfig.displayTimeIconType = 'clock';
        displayTimeConfig.displayTimeColour = smarketTheme.upcomingEventColour;
    }
    else if (timeDiffMins < 60) {
        displayTimeConfig.displayTimeString = `IN ${timeDiffMins.toString().split(".")[0]} MINUTE${(Math.floor(timeDiffMins)) === 1 ? '' : 'S'}`;
        displayTimeConfig.displayTimeIconType = 'clock';
        displayTimeConfig.displayTimeColour = smarketTheme.upcomingEventColour;
    }
    else if (timeDiffMins < 1440) { 
        displayTimeConfig.displayTimeString = `IN ${(timeDiffMins/60).toString().split(".")[0]} HOUR${(Math.floor(timeDiffMins/60)) === 1 ? '' : 'S'}`;
        displayTimeConfig.displayTimeIconType = 'clock';
        displayTimeConfig.displayTimeColour = smarketTheme.upcomingEventColour;
    }
    else if (timeDiffMins < 10080) {
        const startDate = new Date(eventStartDate);
        displayTimeConfig.displayTimeString = startDate.toString().split(" ")[0];
        displayTimeConfig.displayTimeIconType = 'calendar';
        displayTimeConfig.displayTimeColour = smarketTheme.upcomingEventColour;
    }
    else if (timeDiffMins > 10080) {        
        const dateTime = new Date(timeDiffMins);
        const splitDate = dateTime.toString().split(" ");
        displayTimeConfig.displayTimeString = `${splitDate[1]} ${splitDate[2]}`;
        displayTimeConfig.displayTimeIconType = 'calendar';
        displayTimeConfig.displayTimeColour = smarketTheme.upcomingEventColour;
    }
    return displayTimeConfig;
}
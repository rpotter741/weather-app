
import { settlement } from "./settlementStats";

let weekLog = {};

function setWeekLog(data) {
    weekLog = data;
}

function setChangeLog(data) {
    changeLog = data
}

let changeLog = {

    survival: 0,
    food: 0,
    foodB: 0,
    supplies: 0,
    suppliesB: 0,
    meds: 0,
    medsB: 0,
    safety: 0,
    di: 0,
    diB: 0,
    intel: 0,
    intelB: 0,
    gar: 0,
    garB: 0,
    economy: 0,
    trade: 0,
    tradeB: 0,
    prod: 0,
    prodB: 0,
    vault: 0,
    health: 0,
    level: 0,
    sp: 0,
    eventStart: [],
    eventEnd: [],
    week: 0,

}

function trackChange() {
    changeLog.week = settlement.weeksPassed;

    let index = 'week' + settlement.weeksPassed;

    let events = changeLog;
    weekLog[index] = events;


    clearChangeLog();

}

function renderWeeks() {
    let bigArea = document.querySelector('#contentArea');
    bigArea.innerHTML = '';

    let wrapper = document.createElement('div'); 
    wrapper.id = 'weekArea'

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.textContent = "Weekly Logs";
    wrapper.appendChild(header);    

    let logArea = document.createElement('div'); 
    logArea.style = 'overflow: auto; display: flex; flex-direction: column-reverse; box-sizing: border-box; max-height: 700px'
    
    if(Object.keys(weekLog).length == 0) {
        logArea.textContent = "You don't have any weekly logs yet.";
        logArea.style = 'display: flex; justify-content: center; align-items: center; font-size: 16px; text-align: center'
    } else {

        for(let i = 1; i < Object.keys(weekLog).length +1 ; i++) {
            let index = 'week' + i;

            let week = weekLog[index];

            let row = document.createElement('div');
            row.style = 'display: flex; justify-content:center; margin: .25rem'

            let title = document.createElement('button');
            title.style = 'width: 75%;'
            title.textContent = `Week ${week.week} Log`
            row.appendChild(title);

            title.addEventListener('click', () => {
                displayWeek(week);
            })

            logArea.appendChild(row);

        }
    }
    wrapper.appendChild(logArea);

    

    bigArea.appendChild(wrapper);

    logArea.scrollTop = -99999;
}

function clearChangeLog() {
    changeLog = {

        survival: 0,
        food: 0,
        foodB: 0,
        supplies: 0,
        suppliesB: 0,
        meds: 0,
        medsB: 0,
        safety: 0,
        di: 0,
        diB: 0,
        intel: 0,
        intelB: 0,
        gar: 0,
        garB: 0,
        economy: 0,
        trade: 0,
        tradeB: 0,
        prod: 0,
        prodB: 0,
        vault: 0,
        health: 0,
        level: 0,
        sp: 0,
        eventStart: [],
        eventEnd: [],
        week: 0,
    
    }
}

function displayWeek(week) {
    let wrapper = document.querySelector('#contentArea')
    wrapper.innerHTML = ''

    let headerBox = document.createElement('div');
    headerBox.classList.add('flexRow','center');
    headerBox.style = 'background: rgba(200,200,230,.5);'

    let backBox = document.createElement('div');
    backBox.classList.add('flexRow','center','gap');
    backBox.style = 'width: 25%';

    let back = document.createElement('button');
    back.style = 'border-radius: 1rem;';
    back.textContent = "Go Back";
    back.addEventListener('click', renderWeeks);
    backBox.appendChild(back);
    headerBox.appendChild(backBox);

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.style = 'width: 50%; background: none'
    header.textContent = `Week ${week.week} Log`;
    headerBox.appendChild(header);

    let spacer = document.createElement('div');
    spacer.style = "width: 25%";
    headerBox.appendChild(spacer);

    wrapper.appendChild(headerBox);

    let content = document.createElement('div');
    content.classList.add('flexRow')

    let logBox = document.createElement('div');
    logBox.classList.add('flexCol','gap');
    logBox.style = 'width: 50%; box-sizing: border-box; align-self: start'

    let changesHeader = document.createElement('div');
    changesHeader.textContent = 'Changes';
    changesHeader.style = 'background: rgba(40,40,40,.2)'
    changesHeader.classList.add('subHeader')
    logBox.appendChild(changesHeader);

    let log = document.createElement('div');
    log.classList.add('flexCol','center','gap');
    log.id = 'log'

    if(week.survival != 0) {
    log.appendChild(addLog(week.survival, 'Survival Bonus'))    
    };

    if(week.food != 0) {
    log.appendChild(addLog(week.food, 'Food'));
    };

    if(week.foodB != 0) {
    log.appendChild(addLog(week.foodB, 'Food Modifier'));
    };

    if(week.supplies != 0) {
    log.appendChild(addLog(week.supplies, 'Supplies'));
    };

    if(week.suppliesB != 0) {
    log.appendChild(addLog(week.suppliesB, "Supplies Modifier"));
    };

    if(week.meds != 0) {
    log.appendChild(addLog(week.meds, "Medical Capacity"));
    };

    if(week.medsB != 0) {
    log.appendChild(addLog(week.medsB, 'Medical Capacity Modifier'));
    };

    if(week.safety != 0) {
    log.appendChild(addLog(week.safety, 'Safety Bonus'));
    };

    if(week.di != 0) {
    log.appendChild(addLog(week.di, 'Defensive Infrastructure'));
    };

    if(week.diB != 0) {
    log.appendChild(addLog(week.diB, 'Defensive Infrastructure Modifier'));
    };

    if(week.intel != 0) {
    log.appendChild(addLog(week.intel, 'Intelligence'));
    };

    if(week.intelB != 0) {
    log.appendChild(addLog(week.intelB, 'Intelligence Modifier'));
        };

    if(week.gar != 0) {
    log.appendChild(addLog(week.gar, 'Garrison'));
    };

    if(week.garB != 0) {
    log.appendChild(addLog(week.garB, 'Garrison Modifier'));
    };

    if(week.economy != 0) {
    log.appendChild(addLog(week.economy, 'Economy Bonus'));
    };

    if(week.trade != 0) {
    log.appendChild(addLog(week.trade, 'Trade'));
    };

    if(week.tradeB != 0) {
    log.appendChild(addLog(week.tradeB, 'Trade Modifier'));
    };

    if(week.prod != 0) {
    log.appendChild(addLog(week.prod, 'Productivity'));
    };

    if(week.prodB != 0) {
    log.appendChild(addLog(week.prodB, 'Productivity Modifier'));
    };

    if(week.vault != 0) {
    log.appendChild(addLog(week.vault, 'Tax Vault'));
    };

    if(week.health != 0) {
    log.appendChild(addLog(week.health, 'Settlement Health'));
    };

    if(week.level != 0) {
    log.appendChild(addLog(week.level, 'Settlement Level'));
    };  

    if(week.sp != 0) {
    log.appendChild(addLog(week.sp, 'Settlement Points'));
    };

    logBox.appendChild(log);
    content.appendChild(logBox);

    let bigBox = document.createElement('div');
    bigBox.style = 'width: 50%; box-sizing: border-box; align-self: start;'

    let eventStartHeader = document.createElement('div');
    eventStartHeader.classList.add('subHeader');
    eventStartHeader.style = 'background: rgba(40,40,40,.2)'
    eventStartHeader.textContent = 'Events';
    bigBox.appendChild(eventStartHeader);

    let eventBox = document.createElement('div');
    eventBox.classList.add('flexCol','gap');
    eventBox.style = 'box-sizing: border-box; align-self: start; height: 705px; overflow-y: scroll; scrollbar-width: 50%; border-left: 1px solid rgba(0,0,0.1);'
    bigBox.appendChild(eventBox);

    if(week.eventStart.length > 0) {

    let started = document.createElement('div');
    started.textContent = 'Events Started This Week';
    started.style = 'font-size: 20px'
    started.classList.add('flexRow','center');
    eventBox.appendChild(started);

    let example = document.createElement('div');
    example.style = 'display: grid; grid-template-columns: 1fr 1fr 1fr; place-items: center;'

    let title = document.createElement('div');
    title.textContent = 'Title';
    example.appendChild(title);

    let duration = document.createElement('div');
    duration.textContent = 'Duration';
    example.appendChild(duration);

    let impacts = document.createElement('div');
    impacts.textContent = 'Impacts'
    example.appendChild(impacts);

    eventBox.appendChild(example);

    let events = document.createElement('div');
    events.classList.add('flexCol','gap');

    let eventStartLog = document.createElement('div');
    eventStartLog.id = 'eventStartLog';
    week.eventStart.forEach((proj) => {
        eventStartLog.appendChild(renderProjSummary(week, proj));
    })

    events.appendChild(eventStartLog);
    eventBox.appendChild(events)
}

    if(week.eventEnd.length > 0) {

    let ended = document.createElement('div');
    ended.textContent = 'Events Ended This Week';
    ended.style = 'font-size: 20px'
    ended.classList.add('flexRow','center');
    eventBox.appendChild(ended);

    let example2 = document.createElement('div');
    example2.style = 'display: grid; grid-template-columns: 1fr 1fr 1fr; place-items: center;'
    
    let title2 = document.createElement('div');
    title2.textContent = 'Title';
    example2.appendChild(title2);

    let duration2 = document.createElement('div');
    duration2.textContent = 'Duration';
    example2.appendChild(duration2);
    
    let impacts2 = document.createElement('div');
    impacts2.textContent = 'Impacts'
    example2.appendChild(impacts2);
    
    eventBox.appendChild(example2);

    let endLog = document.createElement('div');
    endLog.classList.add('flexCol','gap');
    week.eventEnd.forEach((proj) => {
        endLog.appendChild(renderProjSummaryEnd(week,proj));
    })
    eventBox.appendChild(endLog);
}


    content.appendChild(bigBox);
    wrapper.appendChild(content);
}

function renderProjSummary(week, proj) {
    if(proj.end - proj.start == 1) {
        return document.createElement('div');
    }

    let row = document.createElement('div');
    row.classList.add('eventStartRow')

    ///////////////////////////////////
    
    let box1 = document.createElement('div');
    box1.classList.add('flexRow');

    let expand = document.createElement('button');
    expand.style = 'background: none; border: none'
    if(proj.hide == true) {
        expand.innerHTML = '&#8680;';
    } else if(proj.hide == false) {
        expand.innerHTML = '&#8681;';
    }
    expand.addEventListener('click', () => {
        if(proj.hide == true) {
        proj.hide = false;
        displayWeek(week);
        } else {
            proj.hide = true;
            displayWeek(week);
        }
    })
    box1.appendChild(expand);

    let title = document.createElement('div');
    title.textContent = proj.name;
    box1.appendChild(title);

    row.appendChild(box1);

    //////////////////////////////////

    let box2 = document.createElement('div');
    box2.classList.add('flexRow','center','gap');

    let timeLabel = document.createElement('div');
    let timeValue = document.createElement('div');
    if(proj.type == 'Active' || proj.type == 'building' || proj.type == 'Active-Fix') {
            timeLabel.textContent = 'Productivity:'
            timeValue.textContent = proj.totalDuration;
        } else if ( proj.type == 'Passive') {
            timeLabel.textContent = 'Weeks:'
            timeValue.textContent = proj.totalDuration;
        } else if (proj.type == 'Indefinite') {
            timeLabel.textContent = 'Unknown';
            timeValue.textContent = '';
        } else if (proj.type == 'Immediate') {
            timeLabel.textContent = 'Immediate Event'
            timeValue.textContent = '';
        }
    

    box2.appendChild(timeLabel);
    box2.appendChild(timeValue);
    row.appendChild(box2);

    let box3 = document.createElement('div');
    box3.classList.add('flexCol','center','gap');

    for(let i = 0; i < proj.impactItems.length; i++) {
        let iRow = document.createElement('div');
        iRow.classList.add('flexRow','center','gap');

        let iValue = document.createElement('div');
        iValue.textContent = proj.impactVals[i];
        iRow.appendChild(iValue);

        let iTitle = document.createElement('div');
        iTitle.textContent = proj.impactItems[i];
        iRow.appendChild(iTitle);

        box3.appendChild(iRow);

    
}

    row.appendChild(box3);

    if(proj.hide == false) {
        let descBox = document.createElement('div');
        descBox.style = 'grid-area: 2/1/3/4';

        let descHeader = document.createElement('div');
        descHeader.textContent = 'Event Description';
        descHeader.classList.add('flexRow','center')
        descBox.appendChild(descHeader)

        let descArea = document.createElement('div');
        descArea.textContent = proj.details;
        descBox.appendChild(descArea);

        row.appendChild(descBox);
    }

    return row;
}

function renderProjSummaryEnd(week, proj) {
    if(proj.type == 'Immediate') {
        return document.createElement('div');
    }


    let row = document.createElement('div');
    row.classList.add('eventStartRow')

    ///////////////////////////////////
    
    let box1 = document.createElement('div');
    box1.classList.add('flexRow');

    let expand = document.createElement('button');
    expand.style = 'background: none; border : none'
    if(proj.hide == true) {
        expand.innerHTML = '&#8680;';
    } else if(proj.hide == false) {
        expand.innerHTML = '&#8681;';
    }
    expand.addEventListener('click', () => {
        if(proj.hide == true) {
        proj.hide = false;
        displayWeek(week);
        } else {
            proj.hide = true;
            displayWeek(week);
        }
    })
    box1.appendChild(expand);

    let title = document.createElement('div');
    title.textContent = proj.name;
    box1.appendChild(title);

    row.appendChild(box1);

    //////////////////////////////////

    let box2 = document.createElement('div');
    box2.classList.add('flexRow','center','gap');

    let timeLabel = document.createElement('div');
    let timeValue = document.createElement('div');
    timeLabel.textContent = 'Total Weeks:'
    timeValue.textContent = (proj.end - proj.start);
    

    box2.appendChild(timeLabel);
    box2.appendChild(timeValue);
    row.appendChild(box2);

    let box3 = document.createElement('div');
    box3.classList.add('flexCol','center','gap');


    for(let i = 0; i < proj.impactItems.length; i++) {
        let iRow = document.createElement('div');
        iRow.classList.add('flexRow','center','gap');

        let iValue = document.createElement('div');
        iValue.textContent = proj.impactVals[i];
        iRow.appendChild(iValue);

        let iTitle = document.createElement('div');
        iTitle.textContent = proj.impactItems[i];
        iRow.appendChild(iTitle);

        box3.appendChild(iRow);

    
}

    row.appendChild(box3);

    if(proj.hide == false) {
        let descBox = document.createElement('div');
        descBox.style = 'grid-area: 2/1/3/4';

        let descHeader = document.createElement('div');
        descHeader.textContent = 'Event Description';
        descHeader.classList.add('flexRow','center')
        descBox.appendChild(descHeader)

        let descArea = document.createElement('div');
        descArea.textContent = proj.details;
        descBox.appendChild(descArea);

        row.appendChild(descBox);
    }

    return row;


    }


function addLog(value, name) {
         
    let row = document.createElement('div');
    row.style = 'display: flex; justify-content: start; align-items: center; gap: 4px; padding-left: 2rem; box-sizing: border-box; width: 100%'
    
    let label = document.createElement('div');
    label.textContent = name;
    row.appendChild(label);

    let val = document.createElement('div');
    val.textContent = value;
    row.appendChild(val);

    if(value < 0) {
        label.textContent = name + ' decreased by'
    } else {
        if(value > 0) {
            label.textContent = name + ' increased by'
        }
    }

    return row;
    
}

function addItem(name, value) {
    
}

export { changeLog, renderWeeks, trackChange, weekLog, setChangeLog, setWeekLog }
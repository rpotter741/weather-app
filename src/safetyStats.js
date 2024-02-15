import { settlement, settlementPoints, vaultAdd } from "./settlementStats";
import { survival, survivalRating } from "./survivalStats";
import { economy } from "./economyStats";
import { changeLog } from "./weekLog";
import renderActionsArea from "./renderActionsArea";
import { renderAll } from "./pageRenders";

let safety = {
    Base: 0,
    Adjusted: 0,
    Rating: 0,
    Bonus: 0,
    status: '',
    diB: 0,
    diC: 2,
    diM: 0,
    intelB: 0,
    intelC: 2,
    intelM: 0,
    garB: 0,
    garC: 3,
    garM: 0
}

function setSafety(data) {
    safety = data;
}

function safetyRating() {
    let a = 0;
    let b = 0;
    let c = 0;

    if(safety.diC > safety.diM) {
        a = safety.diM;
    } else a = safety.diC;

    if(safety.intelC > safety.intelM) {
        b = safety.intelM;
    } else b = safety.intelC;

    if(safety.garC > safety.garM) {
        c = safety.garM;
    } else c = safety.garC;

    safety.Base = (((a + b + c) / settlement.level) * (settlement.currentHealth / (settlement.maxHealthBase + settlement.maxHealthBonus))).toFixed(1);
    
    switch(survivalRating()) {
        case 'Dying':
            safety.Adjusted = (safety.Base * .1).toFixed(1);
            break;
        case 'Endangered':
            safety.Adjusted = (safety.Base * .8).toFixed(1);
            break;
        case 'Desperate':
            safety.Adjusted = (safety.Base * .9).toFixed(1);
            break;
        case 'Stable':
        case 'Developing':
            safety.Adjusted = (safety.Base * 1).toFixed(1);
            break;
        case 'Blossoming':
            safety.Adjusted = (safety.Base * 1.1).toFixed(1);
            break;
        case 'Flourishing':
            safety.Adjusted = (safety.Base * 1.2).toFixed(1);
            break;
    }

    if(safety.Adjusted <= .5 ) {
        safety.Rating = 'Dangerous';
        safety.status = '(Economy Score -80%; Productivity -50%; Upkeep 0)'
    } else if (safety.Adjusted > .5 && safety.Adjusted < 1) {
        safety.Rating = 'Lawless';
        safety.status = '(Economy Score -50%; Productivity -25%; Upkeep xd4)'
    } else if (safety.Adjusted >= 1 && safety.Adjusted < 2) {
        safety.Rating = 'Unsafe';
        safety.status = '(Economy Score -10%; Upkeep 1.5xd6)'
    } else if (safety.Adjusted >= 2 && safety.Adjusted < 3) {
        safety.Rating = 'Safe';
        safety.status = '(Economy Score +0%; Upkeep 2xd8)'
    } else if (safety.Adjusted >= 3 && safety.Adjusted < 4) {
        safety.Rating = 'Guarded';
        safety.status = '(Economy Score +5%; Upkeep 3xd8)'
    } else if (safety.Adjusted >= 4 && safety.Adjusted < 4.6) {
        safety.Rating = 'Protected';
        safety.status = '(Economy Score +10%; Upkeep 4xd10)'
    } else if (safety.Adjusted >= 4.6) {
        safety.Rating = 'Impregnable';
        safety.status = '(Economy Score +20%; Upkeep 5xd12)'
    }

    return safety.Rating
}

function upkeep() {
    let level = settlement.level;
    let dice = 0;
    let mult = 0;
    switch(safety.Rating) {
        case 'Dangerous':
            break;
        case 'Lawless':
            dice = 4;
            mult = 1;
            break;
        case 'Unsafe':
            dice = 6;
            mult = 1.5;
            break;
        case 'Safe':
            dice = 8;
            mult = 2;
            break;
        case 'Guarded':
            dice = 8;
            mult = 3;
            break;
        case 'Protected':
            dice = 10;
            mult = 4;
            break;
        case 'Impregnable':
            dice = 12;
            mult = 5;
            break;
    }

    let times = level * mult;
    let total = 0;
    for(let i = 0; i < times; i++) {
        total  += Math.floor(Math.random() * dice)
    }

    vaultAdd(-total);
}

function safetyBonus(i) {
    safety.Bonus += parseInt(i);
    changeLog.safety += parseInt(i);
    diCurrent(i);
    intelCurrent(i);
    garCurrent(i);
    diMax();
    intelMax();
    garMax();
}

function diBonus(i) {
    safety.diB += parseInt(i);
    console.log('whoop')
    changeLog.diB += parseInt(i);
    diCurrent(i)
    diMax();
}

function diCurrent(i) {
    safety.diC += parseInt(i);
    changeLog.di += parseInt(i);
}

function diMax() {
    safety.diM = ((settlement.level * 2) + safety.Bonus + safety.diB);

}

function intelBonus(i) {
    safety.intelB += parseInt(i);
    changeLog.intelB += parseInt(i);
    intelCurrent(i)
    intelMax();
}

function intelCurrent(i) {
    safety.intelC += parseInt(i);
    changeLog.intel += parseInt(i);
}

function intelMax() {
    safety.intelM = (settlement.level + safety.Bonus + safety.intelB);
    
}

function garBonus(i) {
    safety.garB += parseInt(i);
    changeLog.garB += parseInt(i);
    garCurrent(i)
    garMax();
}

function garCurrent(i) {
    safety.garC += parseInt(i);
    changeLog.gar += parseInt(i);
}

function garMax() {
    safety.garM = ((settlement.level * 2) + safety.Bonus + safety.garB);
    
};

function garrisonModifier() {
    let i = 0
    switch(survival.Rating) {
        case 'Dying':
            i = -3;
            break;
        case 'Endangered':
            i = -2;
            break;
        case 'Desperate':
            i = -1;
            break;
        case 'Stable':
        case 'Developing':
            i = 0;
            break;
        case 'Blossoming':
            i = 1;
            break;
        case 'Flourishing':
            i = 3;
            break;
    }

    return i;
}

function diBox() {
    let wrapper = document.querySelector('#diBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Defense';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = safety.diC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    diMax();
    max.textContent = '/' + ' ' + safety.diM;
    max.style = 'font-size: 16px; align-self: end;';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type == '' || settlement.type == 'Survivalist') {
            if(settlement.settlementPoints > 1) {
                settlementPoints(-2);
                diCurrent(1);
                renderAll();
                }
        } else if(settlement.type == 'Fortified') {
            if(settlement.settlementPoints > 0) {
                settlementPoints(-1);
                diCurrent(1);
                renderAll();
                }
        } else if(settlement.type == 'Mercantile') {
            if(settlement.settlementPoints > 2) {
                settlementPoints(-3);
                diCurrent(1);
                renderAll();
                }
        }
    })

    let toolTip = document.createElement('span');
    if(settlement.type == '' || settlement.type == 'Survivalist') {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Defensive Infrastructure';
    } else if(settlement.type == 'Fortified') {
        toolTip.textContent = "Spend 1 Settlement Point to gain 1 Defensive Infrastructure";
    } else if(settlement.type == 'Mercantile') {
        toolTip.textContent = 'Spend 3 Settlement Points to gain 1 Defensive Infrastructure';
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(safety.diB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + safety.diB;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);

}

function intelBox() {
    let wrapper = document.querySelector('#intelBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Intel';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = safety.intelC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    intelMax();
    max.textContent = '/' + ' ' + safety.intelM;
    max.style = 'font-size: 16px; align-self: end;';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type != 'Fortified') {
            if(settlement.settlementPoints > 1) {
                settlementPoints(-2);
                intelCurrent(1);
                renderAll();
                }
        } else {
            if(settlement.settlementPoints > 0) {
                settlementPoints(-1);
                intelCurrent(1);
                renderAll();
                }
        }
    })

    let toolTip = document.createElement('span');
    if(settlement.type != 'Fortified') {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Intelligence';
    } else {
        toolTip.textContent = 'Spend 1 Settlement Point to gain 1 Intelligence';
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(safety.intelB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + safety.intelB;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);

}

function garBox() {
    let wrapper = document.querySelector('#garBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Garrison';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = safety.garC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    garMax();
    max.textContent = '/' + ' ' + safety.garM;
    max.style = 'font-size: 16px; align-self: end;';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type != 'Fortified') {
            if(settlement.settlementPoints > 2) {
                settlementPoints(-3);
                garCurrent(1);
                renderAll();
                }
        } else {
            if(settlement.settlementPoints > 1) {
                settlementPoints(-2);
                garCurrent(1);
                renderAll();
                }
        }
    })

    let toolTip = document.createElement('span');
    if(settlement.type != 'Fortified') {
        toolTip.textContent = 'Spend 3 Settlement Points to gain 1 Garrison';
    } else {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Garrison';
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(safety.garB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + safety.garB;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);

}


let safActions = [
    {
        name: 'Build Barricades',
        id: 'buildBarricade',
        type: 'defensive infrastructure',
        description:'A party member can attempt a Crafting or Athletics check to construct barricades in and around the settlement. This costs 5gp +2 per proficiency rank multiplied by the Settlement Level per use. This cannot increase Defensive Infrastructure above its max.',
    },
    {
        name: 'Construct Traps',
        id: 'buildTraps',
        type: 'defensive infrastructure',
        description:'A party member can attempt a Thievery or Crafting Check to create traps to protect from potential attackers. This costs 5gp +2 per proficiency rank multiplied by the Settlement Level per use. This cannot increase Defensive Infrastructure above its max.',
    },
    {
        name: 'Erect Wards',
        id: 'erectWards',
        type: 'defensive infrastructure',
        description:'A party member can attempt an Arcane, Nature, Occult, or Religion check to erect magical alarms and traps to deter attackers or intruders. This cannot increase Defensive Infrastructure above its max.',
    },
    {
        name: 'Scout Area',
        id: 'scoutArea',
        type: 'intelligence',
        description:'A party member can attempt a Nature, Perception, or Survival check to find potential dangers in the surrounding area.',
    },
    {
        name: 'Ear to the Ground',
        id: 'earToGround',
        type: 'intelligence',
        description:'A party member can attempt a Society or Stealth check to pick up on rumors and scuttlebutt in the settlement, possibly learning of any insider threats.',
    },    
    {
        name: 'Train Citizens',
        id: 'trainCitizens',
        type: 'garrison',
        description:'A party member can train forces to be better suited for combat. This can only be done once per character level and requires you to be at least an expert in at least one weapon category. Make a Follow the Expert roll for the settlement, using its level and Safety Score divided by 5 as bonuses, plus 2/3/4 depending on your proficiency rating.',
    },
]

function showSafAction(item) {
    let wrapper = document.querySelector('#setStatus');
    wrapper.innerHTML = ''; 

    let header = document.createElement('div');
    header.style = 'display: flex; justify-content: center; width: 100%; padding: 1rem; background: rgba(200,200,230,.5); box-sizing: border-box; border-radius: .5rem .5rem 0 0;';

    let spacer = document.createElement('div');
    spacer.innerHTML = '&nbsp;'
    spacer.style = 'width: 25%;'
    header.appendChild(spacer);

    let title = document.createElement('div');
    title.textContent = item.name;
    title.style = 'display: flex; justify-content: center; align-items: center; width: 50%';
    header.appendChild(title);

    let backBox = document.createElement('div');
    backBox.style = 'width: 25%; display: flex; justify-content: center; align-items: center;'

    let backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.style = 'border-radius: 1rem;'
    backBtn.addEventListener('click', () => {
        renderActionsArea();
    })
    backBox.appendChild(backBtn);

    header.appendChild(backBox);

    wrapper.appendChild(header);

    let content = document.createElement('div');
    content.style = 'font-size: 16px; padding: 1rem'
    content.textContent = item.description;

    wrapper.appendChild(content);
}

export { diBonus, diBox, diCurrent, diMax, garBonus, garBox, garCurrent, garMax, garrisonModifier, intelBonus, intelBox, intelCurrent, intelMax, safety, safetyBonus, safActions, showSafAction, safetyRating, upkeep, setSafety }
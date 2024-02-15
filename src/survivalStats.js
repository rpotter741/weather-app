import { settlement, settlementPoints } from "./settlementStats";
import { safety } from "./safetyStats";
import { economy } from "./economyStats";
import { changeLog } from "./weekLog";
import renderActionsArea from "./renderActionsArea";
import { renderAll } from "./pageRenders";

let survival = {
    Base: 0,
    Adjusted: 0,
    Rating: 0,
    Bonus: 0,
    foodB: 0,
    foodC: 9,
    foodM: 0,
    supB: 0,
    supC: 5,
    supM: 0,
    medB: 0,
    medC: 3,
    medM: 0
}

function setSurvival(data) {
    survival = data;
}

function survivalRating() {
    let a = 0;
    let b = 0; 
    let c = 0;

    if(survival.foodC > survival.foodM) {
        a = survival.foodM;
    } else a = survival.foodC;

    if(survival.supC > survival.supM) {
        b = survival.supM;
    } else b = survival.supC;

    if(survival.medC > survival.medM) {
        c = survival.medM;
    } else c = survival.medC;


    survival.Base = (((a + b + c) / settlement.level) * (settlement.currentHealth / (settlement.maxHealthBase + settlement.maxHealthBonus))).toFixed(1);
    if(survival.Base <= 1 ) {
        survival.Rating = 'Dying';
    } else if (survival.Base > 1 && survival.Base <= 3.9) {
        survival.Rating = 'Endangered';
    } else if (survival.Base >= 4 && survival.Base <= 4.9) {
        survival.Rating = 'Desperate';
    } else if (survival.Base >= 5 && survival.Base <= 6.9) {
        survival.Rating = 'Stable';
    } else if (survival.Base >= 7 && survival.Base <= 7.9) {
        survival.Rating = 'Developing';
    } else if (survival.Base >= 8 && survival.Base <= 9.4) {
        survival.Rating = 'Blossoming';
    } else if (survival.Base >= 9.5) {
        survival.Rating = 'Flourishing'
    }

    return survival.Rating
}

function surExplain() {
    if(survival.Rating == 'Dying') {
        return '(Safety Score -90%; Shops Closed; Troop Health -33%)'
    } else if (survival.Rating == 'Endangered') {
        return '(Safety Score -20%; Troop Health - 15%)'
    } else if (survival.Rating == 'Desperate') {
        return '(Safety Score -10%; Troop Health -5%)'
    } else if (survival.Rating == 'Stable') {
        return '(Safety Score +0%; Troop Health +0%)'
    } else if (survival.Rating == 'Developing') {
        return '(Safety Score +0%; Troop Health +5%)'
    } else if (survival.Rating == 'Blossoming') {
        return '(Safety Score +10%; Troop Health +10%)'
    } else if (survival.Rating == 'Flourishing') {
        return '(Safety Score +20%; Troop Health +20%)'
    }
}

function survivalBonus(i) {
    survival.Bonus += parseInt(i);
    changeLog.survival += parseInt(i);
    foodCurrent(i);
    supCurrent(i);
    medCurrent(i);
    foodMax();
    supMax();
    medMax();
}

function foodBonus(i) {
    survival.foodB += parseInt(i);
    changeLog.foodB += parseInt(i);
    foodCurrent(i);
    foodMax();
}

function foodCurrent(i) {
    survival.foodC += parseInt(i);
    changeLog.food += parseInt(i);
}

function foodMax() {
    survival.foodM = ((settlement.level * 5) + survival.Bonus + survival.foodB);
    
}

function supBonus(i) {
    survival.supB += parseInt(i);
    changeLog.suppliesB += parseInt(i);
    supCurrent(i);
    supMax();
}

function supCurrent(i) {
    survival.supC += parseInt(i);
    changeLog.supplies += parseInt(i);
}

function supMax() {
    survival.supM = ((settlement.level * 3) + survival.Bonus + survival.supB);
}

function medBonus(i) {
    survival.medB += parseInt(i);
    changeLog.medsB += parseInt(i);
    medCurrent(i);
    medMax();
}

function medCurrent(i) {
    survival.medC += parseInt(i);
    changeLog.meds += parseInt(i);
}

function medMax() {
    survival.medM = ((settlement.level * 2) + survival.Bonus + survival.medB);
}

function suppliesModifier() {
    let i = 0
    switch(economy.Rating) {
        case 'Struggling':
            i = -3;
            break;
        case 'Fragile':
            i = -2;
            break;
        case 'Stagnant':
            i = -1;
            break;
        case 'Growing':
        case 'Prosperous':
            i = 0;
            break;
        case 'Thriving':
            i = 1;
            break;
        case 'Golden Era':
            i = 3;
            break;
    }

    return i;
}

function foodBox() {
    let wrapper = document.querySelector('#foodBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Food';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = survival.foodC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    foodMax();
    max.textContent = '/' + ' ' + survival.foodM;
    max.style = 'font-size: 16px; align-self: end;';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type != 'Fortified') {
            if(settlement.settlementPoints > 0) {
                settlementPoints(-1);
                foodCurrent(1);
                renderAll();
                }
        } else {
            if(settlement.settlementPoints > 1) {
                settlementPoints(-2);
                foodCurrent(1);
                renderAll();
                }
        }               
        })
    

    let toolTip = document.createElement('span');
    if(settlement.type != 'Fortified') {
        toolTip.textContent = 'Spend 1 Settlement Point to gain 1 Food';
    } else {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Food';
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(survival.foodB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + survival.foodB;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);

}

function suppliesBox() {
    let wrapper = document.querySelector('#suppliesBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Supplies';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = survival.supC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    supMax();
    max.textContent = '/' + ' ' + survival.supM;
    max.style = 'font-size: 16px; align-self: end';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type == '' || settlement.type == 'Mercantile') {
            if(settlement.settlementPoints > 1) {
            settlementPoints(-2);
            supCurrent(1);
            renderAll();
            }
        } else if(settlement.type == 'Survivalist') {
            if(settlement.settlementPoints > 0) {
                settlementPoints(-1);
                supCurrent(1);
                renderAll();
                }
        } else if(settlement.type == 'Fortified') {
            if(settlement.settlementPoints > 2) {
                settlementPoints(-3);
                supCurrent(1);
                renderAll();
                }
        }
    })

    let toolTip = document.createElement('span');
    if(settlement.type == '' || settlement.type == 'Mercantile') {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Supply';
    } else if(settlement.type == 'Survivalist') {
        toolTip.textContent = 'Spend 1 Settlement Point to gain 1 Supply';
    } else if(settlement.type == 'Fortified') {
        toolTip.textContent = 'Spend 3 Settlement Points to gain 1 Supply'
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(survival.supB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + survival.supB;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);

}


function medBox() {
    let wrapper = document.querySelector('#medBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Medical';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = survival.medC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    medMax();
    max.textContent = '/' + ' ' + survival.medM;
    max.style = 'font-size: 16px; align-self: end;';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type == '' || settlement.type == 'Mercantile' || settlement.type == 'Fortified') {
            if(settlement.settlementPoints > 2) {
                settlementPoints(-3);
                medCurrent(1);
                renderAll();
                }
        } else if(settlement.type == 'Survivalist') {
            if(settlement.settlementPoints > 1) {
                settlementPoints(-2);
                medCurrent(1);
                renderAll();
                }
        }         
    })

    let toolTip = document.createElement('span');
    if(settlement.type == '' || settlement.type == 'Mercantile' || settlement.type == 'Fortified') {
        toolTip.textContent = 'Spend 3 Settlement Points to gain 1 Medical Capacity';
    } else if(settlement.type == 'Survivalist') {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Medical Capacity';
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(survival.medB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + survival.medB;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);

}



let surActions = [
    {
        name: 'Forage for Food',
        id: 'forageFood',
        type: 'food',
        description:'A party memeber can attempt a Nature or Survival check to forage for fruits and vegetables. DC may be affected by the current season or ongoing events.',
    },
    {
        name: 'Hunt for Food',
        id: 'huntFood',
        type: 'food',
        description:'A party memeber can attempt a Perception or Survival check to hunt animals for food. DC may be affected by the current season or ongoing events.',
    },
    {
        name: 'Discover Water',
        id: 'discoverWater',
        type: 'water',
        description:'A party member can attempt a Nature or Survival check to find a source of water.',
    },
    {
        name: 'Gather Materials',
        id: 'gatherMaterials',
        type: 'supplies',
        description:'A party member can attempt an Athletics, Survival, or Nature check to gather raw materials for use in the settlement.',
    },  
    {
        name: 'Clean the Streets',
        id: 'cleanStreets',
        type: 'medical capacity',
        description:'A party member can attempt an Athletics, Diplomacy, Intimidation, or Society check to clean or encourage others to clean the streets, decreasing the likelihood of disease spreading through the population.',
    },
    {
        name: 'Treat Sick/Injured',
        id: 'treatSick',
        type: 'medical capacity',
        description:'A party member can attempt a Medicine, Nature, Occult, or Religion check to treat the sick and injured in the settlement. This action affects settlement health, but cannot increase it above its maximum (or override other ongoing effects).',
    },

]

function showSurAction(item) {
    let wrapper = document.querySelector('#setStatus');
    wrapper.innerHTML = ''; 

    let header = document.createElement('div');
    header.style = 'display: flex; justify-content: center; width: 100%; background: rgba(200,200,230,.5); padding: 1rem; box-sizing: border-box; border-radius: .5rem .5rem 0 0;';

    let spacer = document.createElement('div');
    spacer.innerHTML = '&nbsp;'
    spacer.style = 'width: 25%;'
    header.appendChild(spacer);

    let title = document.createElement('div');
    title.textContent = item.name;
    title.style = 'display: flex; justify-content: center; align-items: center; width: 50%;';
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

export { foodBonus, foodBox, foodCurrent, foodMax, medBonus, medBox, medCurrent, medMax, showSurAction, supBonus, suppliesBox, supCurrent, supMax, suppliesModifier, survival, surActions, survivalBonus, surExplain, survivalRating, setSurvival }
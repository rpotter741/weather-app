import { baseTaxes, settlement, settlementPoints } from './settlementStats';
import { safety } from './safetyStats';
import { survival } from './survivalStats';
import { changeLog } from './weekLog';
import { distCalcWorkers } from './projectBoxRender';
import renderActionsArea from './renderActionsArea';
import { buildings } from './buildingsStats';
import { renderAll } from './pageRenders';


let economy = {
    Base: 0,
    Adjusted: 0,
    Rating: 0,
    status: '',
    Bonus: 0,
    tradeB: 0,
    tradeC: 6,
    tradeM: 0,
    prodB: 0,
    prodC: 4,
    prodM: 0,
    taxInc: 0,
    taxDec: 0,
}

function setEconomy(data) {
    economy = data;
}

function economyRating() {
    let a = 0;
    let b = 0;

    if(economy.tradeC > economy.tradeM) {
        a = economy.tradeM;
    } else a = economy.tradeC;

    if(economy.prodC > economy.prodM) {
        b = economy.prodM;
    } else b = economy.prodC;

    economy.Base = (((a + b) / settlement.level) * (settlement.currentHealth / (settlement.maxHealthBase + settlement.maxHealthBonus))).toFixed(1);
    
    switch(safety.Rating) {
        case 'Dangerous':
            economy.Adjusted = (economy.Base * .2).toFixed(1);
            break;
        case 'Lawless':
            economy.Adjusted = (economy.Base *.5).toFixed(1);
        case 'Unsafe':
            economy.Adjusted = (economy.Base * .9).toFixed(1);
        case 'Safe':
            economy.Adjusted = (economy.Base * 1).toFixed(1);
        case 'Guarded':
            economy.Adjusted = (economy.Base * 1.05).toFixed(1);
        case 'Protected':
            economy.Adjusted = (economy.Base * 1.1).toFixed(1);;
        case 'Impregnable':
            economy.Adjusted = (economy.Base * 1.2).toFixed(1);
    }

    let tax = 0;

    if(economy.taxInc == 0 && economy.taxDec == 0) {
        tax = economy.Adjusted;
    } 
        else {
            if(economy.taxInc > 0 && economy.taxInc <= 25) {
                tax = (economy.Adjusted - (economy.taxInc / 25)).toFixed(1);
            } else if (economy.taxInc > 25 && economy.taxInc <= 50) {
                tax = (economy.Adjusted - (economy.taxInc / 12.25)).toFixed(1);
            } else if(economy.taxInc > 50) {
                tax = (economy.Adjusted - (economy.taxInc / 6.125)).toFixed(1);
            }

            if(economy.taxDec > 0 && economy.taxDec <= 50) {
                tax = (economy.Adjusted - (-economy.taxDec / 33)).toFixed(1);
            } else if ( economy.taxDec > 50) {
                tax = (economy.Adjusted - (-economy.taxDec / 22)).toFixed(1);
            }
        };
        
    
    economy.Adjusted = tax;

    if(economy.Adjusted <= 1) {
        economy.Rating = 'Struggling';
        economy.status = '(Available Item Level -2; No Tax Revenue)'
    } else if (economy.Adjusted > 1 && economy.Adjusted <= 2) {
        economy.Rating = 'Fragile';
        economy.status = '(Available Item Level -1; Tax Revenue -66%)'
    } else if (economy.Adjusted > 2 && economy.Adjusted <= 3) {
        economy.Rating = 'Stagnant';
        economy.status = '(Available Item Level +0; Tax Revenue -33%)'
    } else if (economy.Adjusted > 3 && economy.Adjusted <= 4) {
        economy.Rating = 'Growing';
        economy.status = '(Available Item Level +0; Tax Revenue +0%)'
    } else if (economy.Adjusted > 4 && economy.Adjusted <= 5) {
        economy.Rating = 'Prosperous';
        economy.status = '(Available Item Level +1; Tax Revenue +5%)'
    } else if (economy.Adjusted > 5 && economy.Adjusted < 6.5) {
        economy.Rating = 'Thriving';
        economy.status = '(Available Item Level +1; Tax Revenue +10%)'
    } else if (economy.Adjusted >= 6.5) {
        economy.Rating = 'Golden Era';
        economy.status = '(Available Item Level +2; Tax Revenue +20%)'
    }

    return economy.Rating;
}

function economyBonus(i) {
    economy.Bonus += parseInt(i);
    changeLog.economy += parseInt(i);
    tradeCurrent(i);
    prodCurrent(i);
    tradeMax();
    prodMax();
}

function tradeBonus(i) {
    economy.tradeB += parseInt(i);
    changeLog.tradeB += parseInt(i);
    tradeCurrent(i);
    tradeMax();
}

function tradeCurrent(i) {
    economy.tradeC += parseInt(i);
    changeLog.trade += parseInt(i);
}

function tradeMax() {
    economy.tradeM = ((settlement.level * 5) + economy.Bonus + economy.tradeB);
}

function prodBonus(i) {
    economy.prodB += parseInt(i);
    changeLog.prodB += parseInt(i);
    prodCurrent(i)
    prodMax();
}

function prodCurrent(i) {
    economy.prodC += parseInt(i);
    changeLog.prod += parseInt(i);
    distCalcWorkers();
}

function prodMax() {
    economy.prodM =  ((settlement.level * 2) + economy.Bonus + economy.prodB)
}

function actualTaxes() {
    let i = baseTaxes();
    if(economy.taxDec > 0) {
        i = (i * (1 - (economy.taxDec / 100))).toFixed(0);
    } else if(economy.taxInc > 0) {
        i = (i * (1 + (economy.taxInc / 100))).toFixed(0);
    } else if (economy.taxDec == 0 && settlement.taxInc == 0) {
        
    };

    switch(economy.Rating) {
        case 'Struggling':
            i = (i * .125).toFixed(0);
            break;
        case 'Fragile':
            i = (i * .334).toFixed(0);
            break;
        case 'Stagnant':
            i = (i * .667).toFixed(0);
            break;
        case 'Growing':
        case 'Prosperous':
            i = (i * 1).toFixed(0);
            break;
        case 'Thriving':
            i = (i * 1.1).toFixed(0);
            break;
        case 'Golden Era':
            i = (i * 1.2).toFixed(0);
            break;
    }

    return i;
}

function commonItem() {
    let lvl = settlement.level; 
    
    switch(buildings[9].level) {
        case 0:
        case .5:
            break;
        case 1:
        case 1.5:
            lvl += 1;
            break;
        case 2:
        case 2.5:
            lvl += 2;
            break;
        case 3: 
            lvl += 4;
            break;
        default: 
            break;
    }

    switch(economy.Rating) {
        case 'Struggling':
            lvl -= 2;
            break;
        case 'Fragile':
            lvl -= 1;
            break;
        case 'Stagnant':
        case 'Growing':
            break;
        case 'Prosperous':
        case 'Thriving':
            lvl += 1;
            break;
        case 'Golden Era':
            lvl += 2;
            break;
    }

    return lvl;
}

function uncommonItem() {
    let lvl =  settlement.level - 2;

    switch(buildings[9].level) {
        case 0:
        case .5:
            break;
        case 1:
        case 1.5:
            lvl += 1;
            break;
        case 2:
        case 2.5:
            lvl += 2;
            break;
        case 3: 
            lvl += 4;
            break;
        default: 
            break;
    }

    switch(economy.Rating) {
        case 'Struggling':
            lvl -= 2;
            break;
        case 'Fragile':
            lvl -= 1;
            break;
        case 'Stagnant':
        case 'Growing':
            break;
        case 'Prosperous':
        case 'Thriving':
            lvl += 1;
            break;
        case 'Golden Era':
            lvl += 2;
            break;
    }

    return lvl;
}

function tradeModifier() {
    let i = 0
    switch(safety.Rating) {
        case 'Dangerous':
            i = -3;
            break;
        case 'Lawless':
            i = -2;
            break;
        case 'Unsafe':
            i = -1;
            break;
        case 'Safe':
        case 'Guarded':
            i = 0;
            break;
        case 'Protected':
            i = 1;
            break;
        case 'Impregnable':
            i = 3;
            break;
    }

    return i;
}

function tradeBox() {
    let wrapper = document.querySelector('#tradeBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Trade';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = economy.tradeC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    tradeMax();
    max.textContent = '/' + ' ' + economy.tradeM;
    max.style = 'font-size: 16px; align-self: end;';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type == '' || settlement.type == 'Fortified') {
            if(settlement.settlementPoints > 1) {
                settlementPoints(-2);
                tradeCurrent(1);
                renderAll();
                }
        } else if(settlement.type == 'Survivalist') {
            if(settlement.settlementPoints > 2) {
                settlementPoints(-3);
                tradeCurrent(1);
                renderAll();
                }
        } else if(settlement.type == 'Mercantile') {
            if(settlement.settlementPoints > 0) {
                settlementPoints(-1);
                tradeCurrent(1);
                renderAll();
                }
        }
    })

    let toolTip = document.createElement('span');
    if(settlement.type == '' || settlement.type == 'Fortified') {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Trade';
    } else if(settlement.type == 'Survivalist') {
        toolTip.textContent = 'Spend 3 Settlement Points to gain 1 Trade';
    } else if(settlement.type == 'Mercantile') {
        toolTip.textContent = 'Spend 1 Settlement Point to gain 1 Trade';
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(economy.tradeB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + economy.tradeB ;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);
}

function prodBox() {
    let wrapper = document.querySelector('#prodBox');
    wrapper.innerHTML = '';

    let label = document.createElement('div');
    label.textContent = 'Productivity';
    label.classList.add('flexRow','center','gap');
    wrapper.appendChild(label);

    let valRow = document.createElement('div');
    valRow.classList.add('flexRow');

    let value = document.createElement('div');
    value.textContent = economy.prodC;
    value.style = 'text-align: center; font-size: 22px'
    valRow.appendChild(value);

    let max = document.createElement('div');
    prodMax();
    max.textContent = '/' + ' ' + economy.prodM;
    max.style = 'font-size: 16px; align-self: end;';
    max.classList.add('text-center');
    valRow.appendChild(max);

    let spBuy = document.createElement('button');
    spBuy.classList.add('tooltip');
    spBuy.textContent = '+';
    spBuy.style = 'border-radius: 50%; font-size: 12px; align-self: end; margin-left: 4px'
    spBuy.addEventListener('click', () => {
        if(settlement.type != 'Survivalist') {
            if(settlement.settlementPoints > 1) {
                settlementPoints(-2);
                prodCurrent(1);
                renderAll();
                }
        } else {
            if(settlement.settlementPoints > 2) {
                settlementPoints(-3);
                prodCurrent(1);
                renderAll();
                }
        }
    })

    let toolTip = document.createElement('span');
    if(settlement.type != 'Survivalist') {
        toolTip.textContent = 'Spend 2 Settlement Points to gain 1 Productivity';
    } else {
        toolTip.textContent = 'Spend 3 Settlement Points to gain 1 Productivity';
    }
    toolTip.classList.add('tooltiptext');
    spBuy.appendChild(toolTip);
    
    valRow.appendChild(spBuy);

    wrapper.appendChild(valRow);

    let bonus = document.createElement('span');
    let i = '';
    if(economy.prodB >= 0) {
        i = '+';
    } else {
        i = '-';
    }
    bonus.textContent = " " + i + economy.prodB ;
    bonus.style = 'font-size: 14px'
    bonus.classList.add('text-center');

    label.appendChild(bonus);
}


let econActions = [
    {
        name: 'Befriend Settlements',
        id: 'befriend',
        type: 'trade',
        description:'A party member can attempt a Diplomacy check with a nearby settlement, encouraging visits from one another and boosting Trade.',
    },
    {
        name: 'Establish Trade Routes',
        id: 'tradeRoute',
        type: 'trade',
        description:'A party member can attempt a Society or Survival check to talk with travelling merchants and nearby settlements to establish trade routes and deals. This can be accomplished for any number of settlements, and is required to temporarily unlock items of higher quality for sale within the settlement.',
    },
    {
        name: 'Entertain the Locals',
        id: 'entertain',
        type: 'productivity',
        description:'A party member can make a Performance check to entertain locals and visitors. This can only be performed once per Settlement Management turn.',
    },
    {
        name: 'Improve Tools',
        id: 'scoutArea',
        type: 'productivity',
        description:'A party member can attempt a Crafting or Survival check to improve the quality of tools the settlement workers use. This costs 5gp +2 for every proficiency rank in the skill used multiplied by the Settlement Level per use.',
    },

]

function showEconAction(item) {
    let wrapper = document.querySelector('#setStatus');
    wrapper.innerHTML = ''; 

    let header = document.createElement('div');
    header.style = 'display: flex; justify-content: center; width: 100%; padding: 1rem; background: rgba(200,200,230,.5); border-radius: .5rem .5rem 0 0; box-sizing: border-box';

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

export {
        actualTaxes,
        commonItem,
        economy, 
        economyBonus, 
        economyRating,
        econActions, 
        showEconAction, 
        prodBonus, 
        prodBox,
        prodCurrent, 
        prodMax,
        setEconomy, 
        tradeBonus, 
        tradeBox,
        tradeCurrent, 
        tradeMax, 
        tradeModifier, 
        uncommonItem
     }
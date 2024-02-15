import { setBuildings } from "./buildingsStats";
import { setCount } from "./compileEvent";
import { economy, economyRating, prodBox, setEconomy, tradeBox, tradeModifier } from "./economyStats";
import pageLoad from "./pageload";
import { projectBoxRender, setProjects } from "./projectBoxRender";
import renderActionsArea from "./renderActionsArea";
import { setDeployed } from "./renderDeployed";
import { setNotes } from "./renderNotes";
import renderTroops from "./renderTroops";
import { renderUpgrades, setNonselectedUpgrades, setSelectedLevels, setSelectedUpgrades } from "./renderUpgrades";

import { diBox, garBox, garrisonModifier, intelBox, safety, safetyRating, setSafety } from "./safetyStats";
import { createNewSettlement, swapButtonRender } from "./settlementManager";
import { healthPercent, levelUp, nextWeek, setSettlement, settlement, vaultAdd } from "./settlementStats";
import { shopWindow } from "./shopWindow";
import { setStorage, settlementList } from "./storage";
import { foodBox, medBox, setSurvival, suppliesBox, suppliesModifier, survival, survivalRating } from "./survivalStats";
import taxRender from "./taxRender";
import { setChangeLog, setWeekLog } from "./weekLog";

function renderNameLevel() {
    let wrapper = document.querySelector('#NameLevel')
    wrapper.innerHTML = '';

    let nameBox = document.createElement('div')
    nameBox.classList.add('flexRow','center');

    let name = document.createElement('input');
    name.type = 'text';
    name.placeholder = 'Settlement Name';
    name.value = settlement.name;
    name.id = 'settlementName';
    name.addEventListener('change', () => {
        settlement.name = name.value;
    })

    nameBox.appendChild(name);
    wrapper.appendChild(nameBox);

    let levelBox = document.createElement('div');
    levelBox.classList.add('flexRow','gap','center');

    let levelText = document.createElement('div');
    levelText.textContent = 'Level';
    levelBox.appendChild(levelText);

    let levelValue = document.createElement('div');
    levelValue.textContent = settlement.level;
    levelBox.appendChild(levelValue);

    if(settlement.type != '') {
    let setType = document.createElement('div');
    setType.textContent = settlement.type;
    levelBox.appendChild(setType);
    }

    let setLabel = document.createElement('div');
    setLabel.textContent = "Settlement";
    levelBox.appendChild(setLabel);

    let lvlUpBtn = document.createElement('button');
    lvlUpBtn.textContent = 'Level Up';
    lvlUpBtn.addEventListener('click', () => {
        let choice = confirm('Upgrading will cost ' + levelCost() + ' gold. Do you want to commit?')

        if(choice ==true) {
            if(settlement.vault >= levelCost()) {
                vaultAdd(-levelCost());
                levelUp(1);
            } else if (settlement.vault < levelCost()) {
                alert('You cannot afford to upgrade the settlement level yet')
                return;
            }
        }
    })
    
    wrapper.appendChild(levelBox);
    wrapper.appendChild(lvlUpBtn);
}

function levelCost() {
    let multiplier = Math.pow(1.392, settlement.level);
    let cost = parseInt((200 * multiplier).toFixed(0));
    return cost;
}

function renderHealth() {
    let wrapper = document.querySelector('#SetHealth');
    wrapper.innerHTML = '';

    let healthBox = document.createElement('div');
    healthBox.classList.add('flexCol','gap')

    let healthLabel = document.createElement('div');
    healthLabel.textContent = 'Settlement Health';
    healthLabel.classList.add('text-center')
    healthBox.appendChild(healthLabel);

    let healthValsBox = document.createElement('div');
    healthValsBox.classList.add('flexRow','center');

    let currentHealth = document.createElement('input');
    currentHealth.type = 'number';
    currentHealth.classList.add('text-center');
    currentHealth.id = 'currentHealth';
    currentHealth.style = 'font-size: 20px;';
    if(healthPercent() >= .8) {
        currentHealth.style.color = 'green';
    } else if(healthPercent() >= .5 && healthPercent() < .8) {
        currentHealth.style.color = 'darkgoldenrod';
    } else if(healthPercent() >= .25 && healthPercent() < .5) {
        currentHealth.style.color = 'orange';
    } else if(healthPercent() < .25) {
        currentHealth.style.color = 'red';
    }
    currentHealth.addEventListener('change', () => {
        settlement.currentHealth = currentHealth.value;
        if(healthPercent() >= .8) {
            currentHealth.style.color = 'green';
        } else if(healthPercent() >= .5 && healthPercent() < .8) {
            currentHealth.style.color = 'darkgoldenrod';
        } else if(healthPercent() >= .25 && healthPercent() < .5) {
            currentHealth.style.color = 'orange';
        } else if(healthPercent() < .25) {
            currentHealth.style.color = 'red';
        }
    })

    currentHealth.value = settlement.currentHealth;
    healthValsBox.appendChild(currentHealth);

    let healthSpacer = document.createElement('div');
    healthSpacer.textContent = '/';
    healthSpacer.classList.add('text-center')
    healthSpacer.style = 'width: 10%;'
    healthValsBox.appendChild(healthSpacer);

    let maxHealth = document.createElement('div');
    maxHealth.textContent = settlement.maxHealthBase + settlement.maxHealthBonus;
    maxHealth.classList.add('text-center')
    maxHealth.style = 'width: 15%; font-size: 20px'
    healthValsBox.appendChild(maxHealth);

    healthBox.appendChild(healthValsBox);

    wrapper.appendChild(healthBox);
}

function renderConditions() {
    let wrapper = document.querySelector('#SetConditions');
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.classList.add('text-center')
    header.textContent = 'Settlement Conditions';
    wrapper.appendChild(header);

    let impactBox = document.createElement('div');
    impactBox.classList.add('flexRow','gap','center');
    wrapper.appendChild(impactBox);

    let addBox = document.createElement('div');
    addBox.style = 'display: flex; justify-content: end;'

    let addBtn = document.createElement('button');
    addBtn.textContent = '+';
    addBox.appendChild(addBtn);
    wrapper.appendChild(addBox);
}

function renderSettlementPointsBox() {
    let wrapper = document.querySelector('#SettlementPointsBox');
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.textContent = 'Settlement Points';
    header.classList.add('text-center');
    wrapper.appendChild(header);

    let spVal = document.createElement('div');
    spVal.textContent = settlement.settlementPoints;
    spVal.classList.add('text-center','valBall');
    wrapper.appendChild(spVal);

}

function renderWeekBox() {
    let wrapper = document.querySelector('#WeekBox');
    wrapper.innerHTML = '';
    wrapper.style = 'justify-content: space-around'

    let valBox = document.createElement('div');
    valBox.classList.add('flexCol','center','gap');

    let weekVal = document.createElement('div');
    weekVal.classList.add('valBall');
    weekVal.textContent = settlement.weeksPassed;
    valBox.appendChild(weekVal);

    let weekLabel = document.createElement('div');
    weekLabel.textContent = 'Weeks Passed';
    weekLabel.classList.add('text-center');
    valBox.appendChild(weekLabel); 

    wrapper.appendChild(valBox);

    let nxtWeek = document.createElement('button');
    nxtWeek.textContent = 'Next Week';
    nxtWeek.addEventListener('click', () => {
        nextWeek();
    })
    nxtWeek.style = 'border-radius: .5rem;'
    wrapper.appendChild(nxtWeek);
}

function renderEventModBox() {
    let wrapper = document.querySelector('#EventModBox');
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.textContent = 'Event Modifiers';
    header.classList.add('text-center');
    wrapper.appendChild(header);

    let modRow = document.createElement('div');
    modRow.classList.add('flexRow','center')

    let supModBox = document.createElement('div');
    supModBox.classList.add('flexCol','gap','center');
    supModBox.style = 'width: 33.333%; border-right: 1px solid black';

    let supModLabel = document.createElement('div');
    supModLabel.textContent = "Supplies";
    supModLabel.style = 'font-size: 16px; text-align: center'
    supModBox.appendChild(supModLabel);
    modRow.appendChild(supModBox);

    let supModVal = document.createElement('div');
    let i = '';
    if(suppliesModifier() >= 0){
        i = '+';
    } 
    supModVal.textContent = i + " " + suppliesModifier();
    supModBox.appendChild(supModVal);   

    let garModBox = document.createElement('div');
    garModBox.classList.add('flexCol','gap','center');
    garModBox.style = 'width: 33.333%; border-right: 1px solid black';

    let garModLabel = document.createElement('div');
    garModLabel.textContent = "Garrison";
    garModLabel.style = 'font-size: 16px; text-align: center'
    garModBox.appendChild(garModLabel);
    modRow.appendChild(garModBox);

    let garModVal = document.createElement('div');
    let n = '';
        if(garrisonModifier() >= 0){
            n = '+';
        } 
    garModVal.textContent = n + " " + garrisonModifier();
    garModBox.appendChild(garModVal);

    let tradeModBox = document.createElement('div');
    tradeModBox.classList.add('flexCol','gap','center');
    tradeModBox.style = 'width: 33.333%;';

    let tradeModLabel = document.createElement('div');
    tradeModLabel.textContent = "Trade";
    tradeModLabel.style = 'font-size: 16px; text-align: center'
    tradeModBox.appendChild(tradeModLabel);
    modRow.appendChild(tradeModBox);

    let tradeModVal = document.createElement('div');
    let o = '';
        if(tradeModifier() >= 0){
            o = '+';
        } 
    tradeModVal.textContent = o + " " + tradeModifier();
    tradeModBox.appendChild(tradeModVal);

    wrapper.appendChild(modRow);
}

function renderCompScoreBox() {
    let wrapper = document.querySelector('#compScoreBox');
    wrapper.innerHTML = '';

    let headers = document.createElement('div');
    headers.style = 'display: grid; grid-template-columns: 3fr 3fr 2fr; padding-right: 2%';

    let surHead = document.createElement('div');
    surHead.textContent = 'Survival';
    surHead.classList.add('text-center');
    surHead.style = 'font-size: 22px;'

    let surBonus = document.createElement('span');
    let sb = '';
    if(survival.Bonus >= 0) {
        sb = '+';
    } 
    surBonus.textContent = " " + sb + survival.Bonus
    surBonus.style = 'font-size: 14px'
    surHead.appendChild(surBonus)
    headers.appendChild(surHead);

    let safHead = document.createElement('div');
    safHead.textContent = 'Safety';
    safHead.classList.add('text-center');
    safHead.style = 'font-size: 22px'

    let safBonus = document.createElement('span');
    let sab = '';
    if(safety.Bonus >= 0) {
        sab = '+';
    } 
    safBonus.textContent = " " + sab + safety.Bonus;
    safBonus.style = 'font-size: 14px'
    safHead.appendChild(safBonus);
    headers.appendChild(safHead);

    let econHead = document.createElement('div');
    econHead.textContent = 'Economy';
    econHead.classList.add('text-center');
    econHead.style = 'font-size: 22px'

    let eBonus = document.createElement('span');
    let eb = '';
    if(economy.Bonus >= 0) {
        eb = '+';
    }
    eBonus.textContent = " " + eb + economy.Bonus;
    eBonus.style = 'font-size: 14px'
    econHead.appendChild(eBonus);
    headers.appendChild(econHead);

    wrapper.appendChild(headers);

    let scoreRow = document.createElement('div');
    scoreRow.classList.add('flexRow',);
    scoreRow.style = 'justify-content: space-around; padding-right: 2%'

    let foodBox = document.createElement('div');
    foodBox.classList.add('flexCol','box4','center');
    foodBox.id = 'foodBox';
    scoreRow.appendChild(foodBox);

    let suppliesBox = document.createElement('div');
    suppliesBox.classList.add('flexCol','box4','center');
    suppliesBox.id = 'suppliesBox';
    scoreRow.appendChild(suppliesBox);

    let medBox = document.createElement('div');
    medBox.classList.add('flexCol','box4','center');
    ////////FOR THE DIVIDER////////
    medBox.style = 'border-right: 2px solid black';
    medBox.id = 'medBox';
    scoreRow.appendChild(medBox);

    let diBox = document.createElement('div');
    diBox.classList.add('flexCol','box4','center');
    diBox.id = 'diBox';
    scoreRow.appendChild(diBox);

    let intelBox = document.createElement('div');
    intelBox.classList.add('flexCol','box4','center');
    intelBox.id = 'intelBox';
    scoreRow.appendChild(intelBox);

    let garBox = document.createElement('div');
    garBox.classList.add('flexCol','box4','center');
    ////////FOR THE DIVIDER////////
    garBox.style = 'border-right: 2px solid black'
    garBox.id = 'garBox';
    scoreRow.appendChild(garBox);

    let tradeBox = document.createElement('div');
    tradeBox.classList.add('flexCol','box4','center');
    tradeBox.id = 'tradeBox';
    scoreRow.appendChild(tradeBox);

    let prodBox = document.createElement('div');
    prodBox.classList.add('flexCol','box4','center');
    prodBox.id = 'prodBox';
    scoreRow.appendChild(prodBox);

    wrapper.appendChild(scoreRow);

}

function renderScoreBonus() {
    let wrapper = document.querySelector('#ScoreBonusBox');
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.textContent = 'Settlement Scores';
    header.classList.add('text-center');
    wrapper.appendChild(header);

    let modRow = document.createElement('div');
    modRow.classList.add('flexRow','center')

    let surModBox = document.createElement('div');
    surModBox.classList.add('flexCol','gap','center');
    surModBox.style = 'width: 33.333%; border-right: 1px solid black';

    let surModLabel = document.createElement('div');
    surModLabel.textContent = "Survival";
    surModLabel.style = 'font-size: 16px; text-align: center'
    surModBox.appendChild(surModLabel);
    modRow.appendChild(surModBox);

    let surRate = document.createElement('div');
    surRate.textContent = survivalRating();
    surRate.style = 'font-size: 14px'

    let surModVal = document.createElement('div');
    surModVal.classList.add('valBall');
    surModVal.textContent = survival.Base;
    surModBox.appendChild(surModVal);
    surModBox.appendChild(surRate);   

    let safModBox = document.createElement('div');
    safModBox.classList.add('flexCol','gap','center');
    safModBox.style = 'width: 33.333%; border-right: 1px solid black';

    let safModLabel = document.createElement('div');
    safModLabel.textContent = "Safety";
    safModLabel.style = 'font-size: 16px; text-align: center'
    safModBox.appendChild(safModLabel);
    modRow.appendChild(safModBox);

    let safRate = document.createElement('div');
    safRate.textContent = safetyRating();
    safRate.style = 'font-size: 14px'

    let safModVal = document.createElement('div');
    safModVal.classList.add('valBall')
    safModVal.textContent = safety.Adjusted;
    safModBox.appendChild(safModVal);
    safModBox.appendChild(safRate);

    let econModBox = document.createElement('div');
    econModBox.classList.add('flexCol','gap','center');
    econModBox.style = 'width: 33.333%;';

    let econModLabel = document.createElement('div');
    econModLabel.textContent = "Economy";
    econModLabel.style = 'font-size: 16px; text-align: center'
    econModBox.appendChild(econModLabel);
    modRow.appendChild(econModBox);

    let eRate = document.createElement('div');
    eRate.textContent = economyRating();
    eRate.style = 'font-size: 14px';

    let econModVal = document.createElement('div');
    econModVal.classList.add('valBall');
    econModVal.textContent = economy.Adjusted;
    econModBox.appendChild(econModVal);
    econModBox.appendChild(eRate);

    wrapper.appendChild(modRow);
}


function refreshPage() {
    pageLoad();
    renderAll();
    taxRender();
    shopWindow();
    projectBoxRender();
    swapButtonRender();
}

function renderAll() {
    renderConditions();
    renderHealth();
    renderNameLevel();
    renderSettlementPointsBox();
    renderWeekBox();

    renderCompScoreBox();
    foodBox();
    suppliesBox();
    medBox();
    diBox();
    intelBox();
    garBox();
    tradeBox();
    prodBox();
    renderScoreBonus();
    taxRender();
    renderActionsArea();
    economyRating();
    survivalRating();
    safetyRating();
    renderEventModBox();
    if(document.querySelector('#projectBox') != undefined) {
        projectBoxRender();
    }

    if(document.querySelector('#a4c1') != undefined) {
        renderUpgrades();
    }

    if(document.querySelector('#troopScreen') != undefined) {
        renderTroops();
    }
    
}

export { levelCost, refreshPage, renderAll, renderCompScoreBox, renderConditions, renderEventModBox, renderHealth, renderNameLevel, renderSettlementPointsBox, renderScoreBonus, renderWeekBox }
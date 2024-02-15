import { count, countUp } from "./compileEvent";
import { renderAll } from "./pageRenders";
import { projectArray } from "./projectBoxRender";
import { renderBuildings } from "./renderBuildings";
import { intelCurrent, safety } from "./safetyStats";
import { settlement, vaultAdd } from "./settlementStats";
import { foodCurrent, medCurrent, supCurrent, survival } from "./survivalStats";
import taxRender from "./taxRender";
import { changeLog } from "./weekLog";

export default function showUpgrade(building, lvl) {
    let wrapper = document.querySelector('#contentArea');
    wrapper.innerHTML = '';
    wrapper.style = 'height: 100%'
    let failCount = 0;

    let upgLevel = 'level' + lvl;

    let source = building[upgLevel];

    let headerBar = document.createElement('div');
    headerBar.classList.add('subHeader');

    let backBtnBox = document.createElement('div');
    backBtnBox.style = 'display: flex; justify-content: start; width: 25%';

    let backBtn = document.createElement('button');
    backBtn.textContent = 'Go Back';
    backBtn.style = 'margin-left: 2rem'
    backBtn.addEventListener('click', renderBuildings);

    backBtnBox.appendChild(backBtn);
    headerBar.appendChild(backBtnBox);

    let title = document.createElement('div');
    title.textContent = source.name;;
    title.style = 'font-size: 20px; display: flex; align-items: center; justify-content: center; width: 50%;'
    headerBar.appendChild(title);

    let spacer = document.createElement('div');
    spacer.innerHTML = '&nbsp;';
    spacer.style = 'width: 25%;';
    headerBar.appendChild(spacer);
    wrapper.appendChild(headerBar);

    let warning = document.createElement('div');

    let mainStats = document.createElement('div');
    mainStats.classList.add('flexRow');
    mainStats.style = 'justify-content: space-around; padding: 1rem;'

    let minLevelBox = document.createElement('div');
    minLevelBox.classList.add('flexRow','gap');
    minLevelBox.classList.add(checkVal('level',source.level));
    if(minLevelBox.classList.contains('fail')) {
        failCount++;
    }

    let levelLabel = document.createElement('div');
    levelLabel.textContent = 'Minimum Settlement Level:';
    levelLabel.style = 'font-size: 18px;'
    minLevelBox.appendChild(levelLabel);

    let levelValue = document.createElement('div');
    levelValue.textContent = source.level;
    levelValue.style = 'font-size: 18px;'
    minLevelBox.appendChild(levelValue);
    mainStats.appendChild(minLevelBox);

    let prodBox = document.createElement('div');
    prodBox.classList.add('flexRow','gap');
    
    let prodLabel = document.createElement('div');
    prodLabel.textContent = 'Productivity Required:';
    prodLabel.style = 'font-size: 18px'
    prodBox.appendChild(prodLabel);

    let prodValue = document.createElement('div');
    prodValue.textContent = source.prod;
    prodValue.style = 'font-size: 18px';
    prodBox.appendChild(prodValue);
    mainStats.appendChild(prodBox);
    wrapper.appendChild(mainStats)

    let descBox = document.createElement('div');
    if(building.level >= lvl) {
        warning.textContent = "You've already built this upgrade."
        failCount++;
        warning.style = 'font-size: 20px; text-align: center; color: green; margin-top: 2rem';
        wrapper.appendChild(warning);
    } else if (building.level == lvl-0.5) {
        warning.textContent = "You're already building this upgrade."
        failCount++;
        warning.style = 'font-size: 20px; text-align: center; color: red; margin-top: 2rem';
        wrapper.appendChild(warning);
    } else if (building.level + 1 < lvl) {
        warning.textContent = "You need to build previous upgrades first."
        failCount++;
        warning.style = 'font-size: 20px; text-align: center; color: red; margin-top: 2rem';
        wrapper.appendChild(warning);
    }
    descBox.textContent += source.desc;
    descBox.style = 'padding: 4rem 12rem; font-size: 18px; text-align: center'

    wrapper.appendChild(descBox);

    let reqHeader = document.createElement('div');
    reqHeader.textContent = 'Requirements';
    reqHeader.classList.add('flexRow','center');
    reqHeader.style = 'font-size: 20px; margin-bottom: 2rem';

    wrapper.appendChild(reqHeader);

    let reqBox = document.createElement('div');
    reqBox.classList.add('flexCol','gap','center');

    let keys = Object.keys(source);
    let vals = Object.values(source);

    for(let i = 6; i < keys.length; i++) {
        let reqRow = document.createElement('div');
        reqRow.classList.add('flexRow','gap','center','reqRow');

        let num = document.createElement('div');
        num.textContent = vals[i];
        num.style = 'font-size: 18px';

        let item = document.createElement('div');
        item.textContent = keys[i];
        item.style = 'font-size: 18px';

        reqRow.appendChild(num);
        reqRow.appendChild(item);
        reqRow.classList.add(checkVal(keys[i],vals[i]));
        if(reqRow.classList.contains('fail')) {
            failCount++
        }
        reqBox.appendChild(reqRow);
    }

    wrapper.appendChild(reqBox);

    let btnBox = document.createElement('div');
    btnBox.classList.add('flexRow');
    btnBox.style = 'justify-content: center; gap: 6rem; margin-top: 6rem';

    if(failCount > 0) {

    } else {
        let confirm = document.createElement('button');
        confirm.textContent = 'Confirm Upgrade';
        confirm.addEventListener('click', () => {
            confirmUpgrade(building, source);
        })
        btnBox.appendChild(confirm);
    }

    wrapper.appendChild(btnBox);

}

function checkVal(key,val) {
    switch(key) {
        case 'gold':
            if(settlement.vault < val) {
                return 'fail';
            };
            break;
        case 'level':
            if(settlement.level < val) {
                return 'fail';
            };
            break;
        case 'supplies':
            if(survival.supC < val) {
                return 'fail';
            };
            break;
        case 'intelligence':
            if(safety.intelC < val) {
                return 'fail';
            };
            break;
        case 'food':
            if(survival.foodC < val) {
                return 'fail';
            };
            break;
        case 'medical capacity':
            if(survival.medC < val) {
                return 'fail';
            };
            break;
        default: 
            return;
        
    }
}

function confirmUpgrade(e, upg) {

    e.level += 0.5;

    renderBuildings();


    let keys = Object.keys(upg);
    let vals = Object.values(upg);

    for(let i = 6; i < keys.length; i++) {
        switch(keys[i]) {
            case 'gold':
                vaultAdd(-vals[i]);
                break;
            case 'supplies':
                supCurrent(-vals[i])
                break;
            case 'intelligence':
                intelCurrent(-vals[i])
                break;
            case 'food':
                foodCurrent(-vals[i])
                break;
            case 'medical capacity':
                medCurrent(-vals[i]);
                break;
        }
    }
    renderAll();
    taxRender();

    let proj = {};

    proj.name = upg.name;

    proj.duration = upg.prod;

    proj.totalDuration = upg.prod;

    proj.start = settlement.weeksPassed;

    proj.end = -1;

   

    proj.type = 'building';

    proj.count = count;

    proj.id = e.id;

    proj.details = upg.desc;

    proj.workers = 0;

    proj.impactItems = [];

    proj.impactVals = [];

    proj.costItems = [],

    proj.costVals = [],

    proj.hide = true;

    countUp();

    projectArray.push(proj);

    changeLog.eventStart.push(proj);
}
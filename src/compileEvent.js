import { economyBonus, prodBonus, prodCurrent, tradeBonus, tradeCurrent } from "./economyStats";
import { projectArray } from "./projectBoxRender";
import { diBonus, diCurrent, garBonus, garCurrent, intelBonus, intelCurrent, safetyBonus } from "./safetyStats";
import { health, levelUp, maxHealth, settlement, settlementPoints, vaultAdd } from "./settlementStats";
import { foodBonus, foodCurrent, medBonus, medCurrent, supBonus, supCurrent, survivalBonus } from "./survivalStats";
import { changeLog } from "./weekLog";


let count = 0;

function setCount(data) {
    count = data
}

function compileEvent(parent) {
    let proj = {};
    let compVals = [];
    let compItems = [];
    let impactVals = [];
    let impactItems = []; 

    let compValElements = document.querySelectorAll('.eventCompVal');
    compValElements.forEach((item) => {
        compVals.push(item.value);
    })

    let compItemElements = document.querySelectorAll('.eventCompItem');
    compItemElements.forEach((item) => {
        compItems.push(item.value);
    })

    let impactValElements = document.querySelectorAll('.eventImpactVal');
    impactValElements.forEach((item) => {
        impactVals.push(item.value);
    })

    let impactItemElements = document.querySelectorAll('.eventImpactItem');
    impactItemElements.forEach((item) => {
        impactItems.push(item.value);
    })

    proj.duration = document.querySelector('#eventTimeVal').value;

    proj.totalDuration = document.querySelector('#eventTimeVal').value;

    proj.name = document.querySelector('#eventName').value;

    proj.type = document.querySelector('#eventType').value;

    if(proj.type == 'Active-Fix') {
        proj.parent = projectArray[parent].count;
        projectArray[parent].hasLink = true;
    }

    proj.details = document.querySelector('#eventDetails').value;

    proj.count = count;

    proj.start = settlement.weeksPassed;

    proj.end = -1;

    proj.workers = 0;

    proj.impactItems = impactItems;

    proj.impactVals = impactVals;

    proj.costItems = compItems; 

    proj.costVals = compVals;

    proj.hide = true;

    for(let i = 0; i < impactItems.length; i++) {
        let item = impactItems[i];
        let num = impactVals[i];
        let namer = 'comp' + i;
        let number = 'cost' +i;
        proj[namer] = item;
        proj[number] = num;
    }

    if(proj.type == 'Indefinite') {
        proj.hasLink = false;
        proj.duration = 99999;
    }

    for(let i = 0; i < proj.impactItems.length; i++) {
        calcPain(proj.impactVals[i], proj.impactItems[i]);
    }

    for(let i = 0; i < proj.costItems.length; i++) {
        calcCost(proj.costVals[i],proj.costItems[i]);
    }

    if(proj.type == 'Active' || proj.type == 'Passive' || proj.type == 'Indefinite') {
        projectArray.push(proj);
    } else if(proj.type == 'Active-Fix') {
        projectArray.splice(parent+1,0,proj)
    }

    countUp();

    changeLog.eventStart.push(proj);

    if(proj.type == 'Immediate') {
        changeLog.eventEnd.push(proj);
    }

}

function countUp() {
    count++
}

function calcCost(i, item) {
    if(i == 0 || item == "none" || item == undefined) {
        return;
    };

    switch(item) {
        case 'food':
            foodCurrent(i);
            break;
        case 'supplies':
            supCurrent(i);
            break;
        case 'medical capacity': 
            medCurrent(i);
            break;
        case 'defensive infrastructure':
            diCurrent(i);
            break;
        case 'intelligence':
            intelCurrent(i);
            break;
        case 'garrison':
            garCurrent(i);
            break;
        case 'trade':
            tradeCurrent(i);
            break;
        case 'productivity':
            prodCurrent(i);
            break;
        case 'gold':
            vaultAdd(i);
            break;
        case 'health':
            health(i);
            break;
        default:
            break;
            
    } 

}

function calcPain(i, item) {
    if(i == 0 || item == 'none' || item == undefined) {
        return;
    }

    switch(item) {
        case 'food bonus':
            foodBonus(i);
            break;
        case 'supplies bonus':
            supBonus(i);
            break;
        case 'medical capacity bonus':
            medBonus(i);
            break;
        case 'defensive infrastructure bonus':
            diBonus(i);
            break;
        case 'intelligence bonus':
            intelBonus(i);
            break;
        case 'garrison bonus':
            garBonus(i);
            break;
        case 'trade bonus':
            tradeBonus(i);
            break;
        case 'productivity bonus':
            prodBonus(i);
            break;
        case 'survival bonus': 
            survivalBonus(i);
            break;
        case 'safety bonus':
            safetyBonus(i);
            break;
        case 'economy bonus':
            economyBonus(i);
            break;
        case 'maximum health':
            maxHealth(i);
            health(i);
            break;
        case "level":
            levelUp(i);
            break;
        case "settlement points":
            settlementPoints(i);
            break;
        default: 
            break;

    }

}

export { calcCost, calcPain, compileEvent, count, countUp, setCount}
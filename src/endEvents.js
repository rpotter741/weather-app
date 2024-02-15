import { buildings } from "./buildingsStats";
import { economyBonus, prodBonus, prodCurrent, tradeBonus, tradeCurrent } from "./economyStats";
import { renderAll } from "./pageRenders";
import { aWMinus, projectArray } from "./projectBoxRender";
import renderProjects from "./renderProjects";
import { diBonus, diCurrent, garBonus, garCurrent, intelBonus, intelCurrent, safety, safetyBonus } from "./safetyStats";
import { health, levelUp, maxHealth, settlement, settlementPoints } from "./settlementStats";
import { foodBonus, foodCurrent, medBonus, medCurrent, supBonus, supCurrent, survivalBonus } from "./survivalStats";
import { changeLog } from "./weekLog";

export default function endEvent(proj) {
    switch(proj.type) {
        case 'Active':
            endActive(proj);
            break;
        case 'Passive':
            endPassive(proj);
            break;
        case 'Indefinite':
            endIndefinite(proj);
            break;
        case 'building':
            endBldg(proj);
            break;
        case 'Active-Fix':
            endActiveFix(proj);
    }

    proj.end = settlement.weeksPassed;

    changeLog.eventEnd.push(proj);

    if(document.querySelector('#projectBox') != undefined) {
        renderProjects();
    }
}

function endActive(proj) {
    let items = proj.impactItems;
    let vals = proj.impactVals;

    for(let i = 0; i < items.length; i++) {
        fixLoss(items[i],vals[i])
        }

        aWMinus(proj.workers);  

    }

function endActiveFix(proj) {
    let items = proj.impactItems;
    let vals = proj.impactVals;    

    for(let i = 0; i < items.length; i++) {
        fixLoss(items[i],vals[i])
        }    
        aWMinus(proj.workers);  
    
    let parent = projectArray.findIndex((p) => p.count == proj.parent);
    projectArray[parent].duration = 0;
        endEvent(projectArray[parent])
    
        }
    

function endPassive(proj) {
    let items = proj.impactItems;
    let vals = proj.impactVals;

    for(let i = 0; i < items.length; i++) {
        fixPassiveLoss(items[i],vals[i])
        }


}

function endIndefinite(proj) {
    let items = proj.impactItems;
    let vals = proj.impactVals;

    for(let i = 0; i < items.length; i++) {
        fixPassiveLoss(items[i],vals[i])
        }


    
}

function endBldg(proj) {
    let bldg = buildings.findIndex((e) => e.id == proj.id)
    buildings[bldg].level += 0.5;

    let funcs = [];
    let vals = [];

    switch(buildings[bldg].level) {
        case 1: 
            funcs = Object.keys(buildings[bldg].level1.rewards)
            vals = Object.values(buildings[bldg].level1.rewards);

            for(let i = 0; i < funcs.length; i++) {
                bldgBonus(funcs[i],vals[i]);
            };

            buildings[bldg].status = buildings[bldg].level1.status;

            break;
        case 2:
            funcs = Object.keys(buildings[bldg].level2.rewards)
            vals = Object.values(buildings[bldg].level2.rewards);

            for(let i = 0; i < funcs.length; i++) {
                bldgBonus(funcs[i],vals[i]);
            };

            buildings[bldg].status = buildings[bldg].level2.status;

            break;
        case 3:
            funcs = Object.keys(buildings[bldg].level3.rewards)
            vals = Object.values(buildings[bldg].level3.rewards);

            for(let i = 0; i < funcs.length; i++) {
                bldgBonus(funcs[i],vals[i]);
            };

            buildings[bldg].status = buildings[bldg].level3.status;

            break;
    }

    aWMinus(proj.workers);    

}


function fixPassiveLoss(item, val) {
    switch(item) {
        case 'survival bonus':
            survivalBonus(-val);
            foodCurrent(val);
            supCurrent(val);
            medCurrent(val);
        break;
        case 'food bonus':
            foodBonus(-val);
            foodCurrent(val);
            break;
        case 'supplies bonus':
            supBonus(-val);
            supCurrent(val);
            break;
        case 'medical capacity bonus':
            medBonus(-val);
            medCurrent(val);
            break;
        case 'safety bonus':
            safetyBonus(-val);
            diCurrent(val);
            intelCurrent(val);
            garCurrent(val);
            break;
        case 'defensive infrastructure bonus':
            diBonus(-val);
            diCurrent(val);
            break;
        case 'intelligence bonus': 
            intelBonus(-val);
            intelCurrent(val);
            break;
        case 'garrison bonus':
            garBonus(-val);
            garCurrent(val);
            break;
        case 'economy bonus':
            economyBonus(-val);
            tradeCurrent(val);
            prodCurrent(val);
            break;
        case 'trade bonus':
            tradeBonus(-val);
            tradeCurrent(val);
            break;
        case 'productivity bonus':
            prodBonus(-val);
            prodCurrent(val);
            break;
        case 'maximum health':
            maxHealth(-val);
            health(-val);
            break;
        case 'level':
            levelUp(-val);
            break;
        case 'settlement points':
            settlementPoints(-val);
            break;

    }
}

function bldgBonus(item, val) {
    switch(item) {
        case 'survival':
            survivalBonus(val);
        break;
        case 'food':
            foodBonus(val);
            break;
        case 'sup':
            supBonus(val);
            break;
        case 'med':
            medBonus(val);
            break;
        case 'safety':
            safetyBonus(val);
            break;
        case 'di':
            diBonus(val);
            break;
        case 'intel': 
            intelBonus(val);
            break;
        case 'gar':
            garBonus(val);
            break;
        case 'economy':
            economyBonus(val);
            break;
        case 'trade':
            tradeBonus(val);
            break;
        case 'prod':
            prodBonus(val);
            break;
        case 'maxHealth':
            maxHealth(val);
            health(val);
            break;

    }
    renderAll();
}

function fixLoss(item, val) {
    switch(item) {
        case 'survival bonus':
            survivalBonus(-val);
        break;
        case 'food bonus':
            foodBonus(-val);
            break;
        case 'supplies bonus':
            supBonus(-val);
            break;
        case 'medical capacity bonus':
            medBonus(-val);
            break;
        case 'safety bonus':
            safetyBonus(-val);
            break;
        case 'defensive infrastructure bonus':
            diBonus(-val);
            break;
        case 'intelligence bonus': 
            intelBonus(-val);
            break;
        case 'garrison bonus':
            garBonus(-val);
            break;
        case 'economy bonus':
            economyBonus(-val);
            break;
        case 'trade bonus':
            tradeBonus(-val);
            break;
        case 'productivity bonus':
            prodBonus(-val);
            break;
        case 'maximum health':
            maxHealth(-val);
            break;
        case 'level':
            levelUp(-val);
            break;
        case 'settlement points':
            settlementPoints(-val);
            break;

    }
}
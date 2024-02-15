import { buildings } from "./buildingsStats";
import { renderAll } from "./pageRenders";
import { calcWorkers, projectArray, projectBoxRender, removeCompleted, weekProjects } from "./projectBoxRender";
import renderProjects from "./renderProjects";
import { intelCurrent, safety, upkeep } from "./safetyStats";
import { clearList, shopInterface } from "./shopInterface";
import { foodCurrent, survival } from "./survivalStats";
import taxRender from "./taxRender";
import { changeLog, renderWeeks, trackChange } from "./weekLog";

let settlement = {
    name: "Cyfehil",
    level: 3,
    currentHealth: 100,
    maxHealthBase: 100,
    maxHealthBonus: 0,
    settlementPoints: 0,
    weeksPassed: 0,
    drought: false,
    type: 0,
    vault: 385,


}



function setSettlement(data) {
    settlement = data;
}

function maxScore(i) {
    return settlement.level * i;
}

function baseTaxes() {
    return (settlement.level * 1.369 * 80).toFixed(0);
}

let h1 = 0;
let h2 =0;
let h3 =0;

function levelUp(i) {

    settlement.level += parseInt(i)
    changeLog.level += parseInt(i);

    if(settlement.level < 5) {
        settlement.maxHealthBase = 100;
    } else if (settlement.level >= 5 && settlement.level < 10) {
        settlement.maxHealthBase = 125;
        if(h1 == 0) {
            health(25);
            h1 = 1;
        }
    } else if (settlement.level >= 10 && settlement.level < 15 ) {
        settlement.maxHealthBase = 150
        if(h2 == 0) {
            health(25);
            h2 = 1;
        }
    } else if (settlement.level >= 15) {
        settlement.maxHealthBase = 200
        if(h3 == 0) {
            health(50);
            h3 = 1;
        }
    }

    renderAll();

}

function health(i) {
    settlement.currentHealth += parseInt(i);
    changeLog.health += parseInt(i);
}

function spend(i) {
    if(i > settlement.settlementPoints) {
        return;
    } else {
        i *= -1;
        settlementPoints(i);
        taxRender();
    }    
}

function settlementPoints(i) {
    settlement.settlementPoints += parseInt(i);
    changeLog.sp += parseInt(i);
}

function nextWeek() {
    if(calcWorkers() < 0) {
        alert("You've assigned more workers than you have available. Make sure Productivity Available is at or above 0.");
        return;
    };
    clearList();
    shopInterface();
    settlementPoints(settlement.level);
    settlement.weeksPassed++;  
    weekProjects();
    removeCompleted();

    if(document.querySelector('#weekArea') != undefined) {
        renderWeeks();
    }

    if(document.querySelector('#projectBox') != undefined) {
            renderProjects();
        }

    switch(buildings[2].level) {
        case 0:
        case 1:
        case 1.5:
            intelCurrent(-1);
            break;
        default: 
            break;
    }
    if(safety.intelC < 0) {
        intelCurrent(-safety.intelC);
    }

    foodCurrent(-(settlement.level / 2).toFixed(0));

    switch(buildings[4].level) {
        case 0:
        case .5:
            break;
        case 1:
        case 1.5:
            foodCurrent(2);
            break;
        case 2:
        case 2.5:
            foodCurrent(4);
            break;
        case 3: 
            foodCurrent(7);
            break;
    }

    if(survival.foodC < 0) {
        let pain = survival.foodC * 5;
        health(pain);
        survival.foodC = 0
    }

        upkeep()
        vaultAdd(baseTaxes());

        if(survival.foodC >0) {
        recoverHealth();
        }
        renderAll();
        taxRender();

    if(document.querySelector('#projectBox') != undefined) {
        projectBoxRender();
    }

    trackChange();  

    if(document.querySelector('#weekArea') != undefined) {
        renderWeeks();
    }

    }


function maxHealth(i) {
    settlement.maxHealthBonus += parseInt(i);
}

function recoverHealth() {
    

    let i = buildings[8].level;
    if(settlement.drought == true) {
        return;
    } else {
        switch(i) {
            case 0:
            case .5:
                health(2);
                break;
            case 1:
            case 1.5:
                health(4);
                break;
            case 2:
            case 2.5: 
                health(6);
                break;
            case 3:
                health(10);
                break;
        };

    };

    if(settlement.currentHealth > parseInt(settlement.maxHealthBase + settlement.maxHealthBonus)) {
        settlement.currentHealth = parseInt(settlement.maxHealthBase + settlement.maxHealthBonus)
    }
    

}

function vaultAdd(i) {
    settlement.vault += parseInt(i);
    changeLog.vault += parseInt(i);
}

function healthPercent() {
    return (settlement.currentHealth / (settlement.maxHealthBase + settlement.maxHealthBonus)).toFixed(2);
}

export { baseTaxes, health, healthPercent, levelUp, maxHealth, maxScore, nextWeek, settlement, settlementPoints, spend, vaultAdd, setSettlement }
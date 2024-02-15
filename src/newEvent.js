import { compileEvent } from "./compileEvent";
import { renderAll } from "./pageRenders";
import { projectBoxRender } from "./projectBoxRender";
import renderProjects from "./renderProjects";
import taxRender from "./taxRender";

let costCount = 0; 
let impactCount = 0;

export default function newEvent() {
    let wrapper = document.querySelector('#contentArea');
    wrapper.innerHTML = "";
    wrapper.style = "box-sizing: border-box; width: 100%; height: 100%;";

    let header = document.createElement('div');
    header.textContent = "New Event";
    header.classList.add('subHeader');
    wrapper.appendChild(header);

    let nBB = document.createElement('div');
    nBB.style = 'height: 12.5%; width: 50%; display: flex; justify-content: center; align-items: center;'

    let nameBox = document.createElement('div');
    nameBox.classList.add('flexRow','gap');
    nameBox.style = 'height: 12.5%; width: 85%; margin-left: 4rem'

    let nameLabel = document.createElement('div');
    nameLabel.style = 'font-size: 20px; width: 11%'
    nameLabel.textContent = 'Name:'
    nameBox.appendChild(nameLabel);

    let nameEntry = document.createElement('input');
    nameEntry.type = 'text';
    nameEntry.placeholder = "Event Name";
    nameEntry.style = "width: 72.5%; margin-left: .5rem; font-size: 20px;"
    nameEntry.id = "eventName";
    nameBox.appendChild(nameEntry);
    nBB.appendChild(nameBox);
    wrapper.appendChild(nBB);

    let secondRow = document.createElement('div');
    secondRow.classList.add('flexRow','gap',);
    secondRow.style = 'height: 12.5%'

    let bigTypeBox = document.createElement('div');
    bigTypeBox.style = 'width: 50%; display: flex; justify-content: center; align-items: center;';

    let typeBox2 = document.createElement('div');
    typeBox2.classList.add('flexRow','gap');
    typeBox2.style = 'width: 85%; margin-left: 4rem'

    let typeHeader = document.createElement('div');
    typeHeader.style = 'font-size: 20px; width: 11%'
    typeHeader.textContent = "Type:";
    typeBox2.appendChild(typeHeader);

    let typeBox = document.createElement('div');
    typeBox.style = "margin-left: .5rem; width: 75%"

    let typeSelect = document.createElement('select');
    typeSelect.style = "font-size: 20px; width: 98.75%"
    typeSelect.id = "eventType";

    let immediate = document.createElement('option');
    immediate.value = "Immediate";
    immediate.textContent = "Immediate"
    typeSelect.appendChild(immediate);

    let active = document.createElement('option');
    active.value = "Active";
    active.textContent = "Active";
    typeSelect.appendChild(active);

    let passive = document.createElement('option');
    passive.value = "Passive";
    passive.textContent = "Passive";
    typeSelect.appendChild(passive);

    let indefinite = document.createElement('option');
    indefinite.value = "Indefinite";
    indefinite.textContent = "Indefinite";
    typeSelect.appendChild(indefinite);
    typeBox.appendChild(typeSelect);
    typeBox2.appendChild(typeBox);
    bigTypeBox.appendChild(typeBox2);
    secondRow.appendChild(bigTypeBox);

    let bigTimeBox = document.createElement('div');
    bigTimeBox.classList.add('flexRow','gap','newEventHalfRow2')
    let timeBox = document.createElement('div');
    timeBox.style = 'display: none';
    let timeValBox = document.createElement('div');
    timeValBox.style = 'display: none'
    let timeVal = document.createElement('input');
    timeVal.type = 'number';   
    timeVal.style = "width: 60%; font-size: 20px; justify-self: start; text-align: center" 
    timeVal.id = "eventTimeVal"
    timeValBox.appendChild(timeVal);
    bigTimeBox.appendChild(timeBox);
    bigTimeBox.appendChild(timeValBox);
    secondRow.appendChild(bigTimeBox);
    wrapper.appendChild(secondRow);

    let contentBox = document.createElement('div');
    contentBox.style.height = ('33.25%');
    contentBox.style.background = "aliceblue";
    contentBox.style.display = "flex";

    let leftBox = document.createElement('div');
    leftBox.style = "width: 50%;"
    leftBox.id = "leftBox";    

    let componentHeader = document.createElement('div');
    componentHeader.textContent = "Event Costs";
    componentHeader.style = "display: flex; justify-content: center; align-items: center; font-size: 22px"
    leftBox.appendChild(componentHeader);

    leftBox.appendChild(createComponent());


    contentBox.appendChild(leftBox);


    let rightBox = document.createElement('div');
    rightBox.style = "width: 50%;"
    rightBox.id = 'rightBox';

    let impactHeader = document.createElement('div');
    impactHeader.textContent = "Event Changes";
    impactHeader.style = "display: flex; justify-content: center; align-items: center; font-size: 22px"
    rightBox.appendChild(impactHeader);

    rightBox.appendChild(createImpact())

    contentBox.appendChild(rightBox);    
    wrapper.appendChild(contentBox);

    let dBox = document.createElement('div');
    dBox.style = "background: aliceblue; padding: .5rem; height: 25.25%;";

    let description = document.createElement('textarea')
    description.style = " font-size: 18px; resize: none; overflow-y: auto;"
    description.placeholder = "Enter a description for the event";
    description.id = "eventDetails";
    dBox.appendChild(description);
    wrapper.appendChild(dBox);

    let buttonRow = document.createElement('div');
    buttonRow.style = "display: flex; justify-content: space-evenly; align-items: center; background: aliceblue; height: 10%;"; 

    let confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm Event';
    confirmBtn.style = "font-size: 16px;"
    buttonRow.appendChild(confirmBtn);
    confirmBtn.addEventListener('click', () => {
        compileEvent();
        projectBoxRender();
        renderAll();
    })

    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel Event';
    cancelBtn.style = 'font-size: 16px;'
    buttonRow.appendChild(cancelBtn);
    cancelBtn.addEventListener('click', () => {
        costCount = 0;
        impactCount = 0;
        projectBoxRender();
    })

    wrapper.appendChild(buttonRow);

    typeSelect.addEventListener('change', () => {
        if(typeSelect.value == 'Immediate' || typeSelect.value == 'Indefinite') {
            timeBox.style = 'display: none';
            timeValBox.style = 'display: none';

        } else if(typeSelect.value == "Active") {
            timeBox.textContent = "Productivity Required:"
            timeBox.style = 'font-size: 20px; display: flex; justify-content: start; width: 50%; margin-left: 2rem'
            timeValBox.style = "font-size: 20px; display: flex; padding: .15rem; box-sizing: border-box; justify-content: start; width: 50%";
            
        } else if(typeSelect.value == "Passive") {
            timeBox.textContent = "Weeks Remaining:"
            timeBox.style = 'font-size: 20px; display: flex; justify-content: start; width: 50%; margin-left: 2rem'
            timeValBox.style = "font-size: 20px; display: flex; padding: .15rem; box-sizing: border-box; justify-content: start; width: 50%";
        } 
    })
}

function createComponent() {
    costCount++;

    let compBox = document.createElement('div');
    compBox.style = "display: flex; flex-direction: column; justify-content: center; align-items: center"

    let compRow = document.createElement('div');
    compRow.style = "display: flex; margin-left: 4rem; width: 85%";

    let num = document.createElement('input');
    num.type = 'number';
    num.style = "width: 11%; font-size: 20px; text-align: center"
    num.classList.add('eventCompVal');
    compRow.appendChild(num); 

    let item = document.createElement('select');
    item.style = "width: 75%; font-size: 20px;"
    item.classList.add('eventCompItem')

    let selectItem = document.createElement('option');
    selectItem.value = 'none';
    selectItem.textContent = "-Select Component-";
    item.appendChild(selectItem);

    let surgroup = document.createElement('optgroup');
    surgroup.label = 'Survival Components';

    let food = document.createElement('option');
    food.value = "food";
    food.textContent = "Food";
    surgroup.appendChild(food);

    let supplies = document.createElement('option');
    supplies.value = "supplies";
    supplies.textContent = "Supplies";
    surgroup.appendChild(supplies);

    let med = document.createElement('option');
    med.value = "medical capacity";
    med.textContent = "Medical Capacity";
    surgroup.appendChild(med);

    item.appendChild(surgroup);

    let safgroup = document.createElement('optgroup');
    safgroup.label = 'Safety Components';

    let di = document.createElement('option');
    di.value = "defensive infrastructure";
    di.textContent = "Defensive Infrastructure";
    safgroup.appendChild(di);

    let intel = document.createElement('option');
    intel.value = "intelligence";  
    intel.textContent = "Intelligence";
    safgroup.appendChild(intel);

    let gar = document.createElement('option');
    gar.value = "garrison";
    gar.textContent = "Garrison";
    safgroup.appendChild(gar);

    item.appendChild(safgroup);

    let egroup = document.createElement('optgroup');
    egroup.label = 'Economy Components';

    let trade = document.createElement('option');
    trade.value = "trade";
    trade.textContent = "Trade";
    egroup.appendChild(trade);

    let prod = document.createElement('option');
    prod.value = "productivity";
    prod.textContent = "Productivity";
    egroup.appendChild(prod);

    item.appendChild(egroup);

    let mgroup = document.createElement('optgroup');
    mgroup.label = 'Settlement Components';

    let gold = document.createElement('option');
    gold.value = "gold";
    gold.textContent = "Gold";
    mgroup.appendChild(gold);

    let health = document.createElement('option');
    health.value = 'health';
    health.textContent = 'Health';
    mgroup.appendChild(health);

    item.appendChild(mgroup);

    compRow.appendChild(item);

    if(costCount > 1) {
    let cancelBtn = document.createElement('button');
    cancelBtn.style = 'height: 28px; border-radius: 1rem; font-size: 16px; border: none; background: none; ;'
    cancelBtn.textContent = "x";
    compRow.appendChild(cancelBtn);

    cancelBtn.addEventListener('click', () => {
        cancelBtn.parentElement.remove();
        costCount--
    })
}

    compBox.appendChild(compRow);
    
    let plus = document.createElement('button');
    plus.textContent = '+';
    plus.style = "background: none; border: none"
    plus.addEventListener('click', () => {
        let wrapper = document.querySelector('#leftBox');
        wrapper.appendChild(createComponent());
        plus.remove();
    })

    compBox.appendChild(plus);

    return compBox;

}

function createImpact() {
    impactCount++;

    let compBox = document.createElement('div');
    compBox.style = "display: flex; flex-direction: column; justify-content: center; align-items: center"

    let compRow = document.createElement('div');
    compRow.style = "display: flex; margin-left: .5rem; width:85%";

    let num = document.createElement('input');
    num.type = 'number';
    num.style = "width: 15%; font-size: 20px; text-align: center"
    num.classList.add('eventImpactVal');
    compRow.appendChild(num); 

    let item = document.createElement('select');
    item.style = "width: 70%; font-size: 20px;"
    item.classList.add('eventImpactItem');

    let selectItem = document.createElement('option');
    selectItem.value = 'none';
    selectItem.textContent = "-Select Component-";
    item.appendChild(selectItem);

    let surgroup = document.createElement('optgroup')
    surgroup.label = 'Survival Components'

    let survival = document.createElement('option');
    survival.value = "survival bonus";
    survival.textContent = "Survival Mod";
    surgroup.appendChild(survival);

    let food = document.createElement('option');
    food.value = "food bonus";
    food.textContent = "Food Mod";
    surgroup.appendChild(food);

    let supplies = document.createElement('option');
    supplies.value = "supplies bonus";
    supplies.textContent = "Supplies Mod";
    surgroup.appendChild(supplies);

    let med = document.createElement('option');
    med.value = "medical capacity bonus";
    med.textContent = "Medical Capacity Mod";
    surgroup.appendChild(med);

    item.appendChild(surgroup);

    let safgroup = document.createElement('optgroup');
    safgroup.label = 'Safety Components';

    let safety = document.createElement('option');
    safety.value = "safety bonus";
    safety.textContent = "Safety Mod";
    safgroup.appendChild(safety);

    let di = document.createElement('option');
    di.value = "defensive infrastructure bonus";
    di.textContent = "Defensive Infrastructure Mod";
    safgroup.appendChild(di);

    let intel = document.createElement('option');
    intel.value = "intelligence bonus";  
    intel.textContent = "Intelligence Mod";
    safgroup.appendChild(intel);

    let gar = document.createElement('option');
    gar.value = "garrison bonus";
    gar.textContent = "Garrison Mod";
    safgroup.appendChild(gar);

    item.appendChild(safgroup);

    let egroup = document.createElement('optgroup');
    egroup.label = 'Economy Components'

    let economy = document.createElement('option');
    economy.value = "economy bonus";
    economy.textContent = "Economy Mod";
    egroup.appendChild(economy);

    let trade = document.createElement('option');
    trade.value = "trade bonus";
    trade.textContent = "Trade Mod";
    egroup.appendChild(trade);

    let prod = document.createElement('option');
    prod.value = "productivity bonus";
    prod.textContent = "Productivity Mod";
    egroup.appendChild(prod);

    item.appendChild(egroup);

    let sgroup = document.createElement('optgroup');
    sgroup.label = 'Settlement Components';

    let maxHealth = document.createElement('option');
    maxHealth.value = "maximum health";
    maxHealth.textContent = "Max Health";
    sgroup.appendChild(maxHealth);

    let level = document.createElement('option');
    level.value = "level";
    level.textContent = "Level";
    sgroup.appendChild(level);

    let sp = document.createElement('option');
    sp.value = "settlement points";
    sp.textContent = "Settlement Points";
    sgroup.appendChild(sp);

    item.appendChild(sgroup);

    compRow.appendChild(item);

    if(impactCount > 1) {
    let cancelBtn = document.createElement('button');
    cancelBtn.style = 'height: 28px; border-radius: 1rem; font-size: 16px; border: none; background: none; ;'
    cancelBtn.textContent = "x";
    compRow.appendChild(cancelBtn);

    cancelBtn.addEventListener('click', () => {
        cancelBtn.parentElement.remove();
        costCount--
    })
}
    compBox.appendChild(compRow);

    let plus = document.createElement('button');
    plus.textContent = '+';
    plus.style = "background: none; border: none"
    plus.addEventListener('click', () => {
        let wrapper = document.querySelector('#rightBox');
        wrapper.appendChild(createImpact());
        plus.remove();
    })

    compBox.appendChild(plus);

    return compBox;

}
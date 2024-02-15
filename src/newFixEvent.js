import { compileEvent } from "./compileEvent";
import { renderAll } from "./pageRenders";
import { projectArray, projectBoxRender } from "./projectBoxRender";

let costCount = 0; 
let impactCount = 0;

export default function newFixEvent(projCount) {
    let parent = projectArray.findIndex((e) => e.count == projCount);
    
    let wrapper = document.querySelector('#contentArea');
    wrapper.innerHTML = "";
    wrapper.style = "box-sizing: border-box; width: 100%; height: 100%;";

    let header = document.createElement('div');
    header.textContent = "New Fix Event";
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

    let active = document.createElement('option');
    active.value = "Active-Fix";
    active.textContent = "Active-Fix";
    typeSelect.appendChild(active);

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
        compileEvent(parent);
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

    timeBox.textContent = "Productivity Required:"
    timeBox.style = 'font-size: 20px; display: flex; justify-content: start; width: 50%; margin-left: 2rem'
    timeValBox.style = "font-size: 20px; display: flex; padding: .15rem; box-sizing: border-box; justify-content: start; width: 50%";

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
    selectItem.textContent = "Select Component";
    item.appendChild(selectItem);

    let food = document.createElement('option');
    food.value = "food";
    food.textContent = "Food";
    item.appendChild(food);

    let supplies = document.createElement('option');
    supplies.value = "supplies";
    supplies.textContent = "Supplies";
    item.appendChild(supplies);

    let med = document.createElement('option');
    med.value = "medical capacity";
    med.textContent = "Medical Capacity";
    item.appendChild(med);

    let di = document.createElement('option');
    di.value = "defensive infrastructure";
    di.textContent = "Defensive Infrastructure";
    item.appendChild(di);

    let intel = document.createElement('option');
    intel.value = "intelligence";  
    intel.textContent = "Intelligence";
    item.appendChild(intel);

    let gar = document.createElement('option');
    gar.value = "garrison";
    gar.textContent = "Garrison";
    item.appendChild(gar);

    let trade = document.createElement('option');
    trade.value = "trade";
    trade.textContent = "Trade";
    item.appendChild(trade);

    let prod = document.createElement('option');
    prod.value = "productivity";
    prod.textContent = "Productivity";
    item.appendChild(prod);

    let gold = document.createElement('option');
    gold.value = "gold";
    gold.textContent = "Gold";
    item.appendChild(gold);

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
    selectItem.textContent = "Select Component";
    item.appendChild(selectItem);

    let survival = document.createElement('option');
    survival.value = "survival bonus";
    survival.textContent = "Survival Mod";
    item.appendChild(survival);

    let food = document.createElement('option');
    food.value = "food bonus";
    food.textContent = "Food Mod";
    item.appendChild(food);

    let supplies = document.createElement('option');
    supplies.value = "supplies bonus";
    supplies.textContent = "Supplies Mod";
    item.appendChild(supplies);

    let med = document.createElement('option');
    med.value = "medical capacity bonus";
    med.textContent = "Medical Capacity Mod";
    item.appendChild(med);

    let safety = document.createElement('option');
    safety.value = "safety bonus";
    safety.textContent = "Safety Mod";
    item.appendChild(safety);

    let di = document.createElement('option');
    di.value = "defensive infrastructure bonus";
    di.textContent = "Defensive Infrastructure Mod";
    item.appendChild(di);

    let intel = document.createElement('option');
    intel.value = "intelligence bonus";  
    intel.textContent = "Intelligence Mod";
    item.appendChild(intel);

    let gar = document.createElement('option');
    gar.value = "garrison bonus";
    gar.textContent = "Garrison Mod";
    item.appendChild(gar);

    let economy = document.createElement('option');
    economy.value = "economy bonus";
    economy.textContent = "Economy Mod";
    item.appendChild(economy);

    let trade = document.createElement('option');
    trade.value = "trade bonus";
    trade.textContent = "Trade Mod";
    item.appendChild(trade);

    let prod = document.createElement('option');
    prod.value = "productivity bonus";
    prod.textContent = "Productivity Mod";
    item.appendChild(prod);

    let maxHealth = document.createElement('option');
    maxHealth.value = "maximum health";
    maxHealth.textContent = "Max Health";
    item.appendChild(maxHealth);

    let level = document.createElement('option');
    level.value = "level";
    level.textContent = "Level";
    item.appendChild(level);

    let sp = document.createElement('option');
    sp.value = "settlement points";
    sp.textContent = "Settlement Points";
    item.appendChild(sp);

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
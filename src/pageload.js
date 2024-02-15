import { projectBoxRender } from "./projectBoxRender";
import { renderBuildings } from "./renderBuildings";
import { renderNotes } from "./renderNotes";
import renderTroops from "./renderTroops";
import { renderUpgrades } from "./renderUpgrades";

import { renderWeeks } from "./weekLog";

export default function pageLoad() {

let body = document.querySelector("body");
body.style = 'background: lightgray'


let wrapper = document.createElement('div');
wrapper.id = "wrapper";
wrapper.style = 'padding: 1rem;'
wrapper.innerHTML = '';

let firstRow = document.createElement('div');
firstRow.style = 'display: grid; grid-template-columns: 1fr 1fr 2fr 1fr 1fr; background: lightgray; height: clamp(100px, 10%; 250px); padding: .5rem;';

let nameLevel = document.createElement('div');
nameLevel.classList.add('flexCol','box1');
nameLevel.id = 'NameLevel';
firstRow.appendChild(nameLevel);

let health = document.createElement('div');
health.classList.add('flexCol','box1');
health.id = 'SetHealth';
firstRow.appendChild(health);

let impacts = document.createElement('div');
impacts.classList.add('flexCol','box1');
impacts.id = 'SetConditions';
firstRow.appendChild(impacts);

let settlementPoints = document.createElement('div');
settlementPoints.classList.add('flexCol','box1','gap','center');
settlementPoints.id = 'SettlementPointsBox';
firstRow.appendChild(settlementPoints);

let weekBox = document.createElement('div');
weekBox.classList.add('flexRow','box1','gap');
weekBox.id = 'WeekBox';
firstRow.appendChild(weekBox);

wrapper.appendChild(firstRow);

let secondRow = document.createElement('div');
secondRow.style = 'display: grid; grid-template-columns: 1fr 1fr 4fr; background: lightgray; height: clamp(100px, 10%; 250px); padding: .5rem;';

let eventModBox = document.createElement('div');
eventModBox.id = 'EventModBox';
eventModBox.classList.add('flexCol','box1a','gap')
secondRow.appendChild(eventModBox);

let scoreBonusBox = document.createElement('div');
scoreBonusBox.id = 'ScoreBonusBox';
scoreBonusBox.classList.add('flexCol','box1a','gap');
secondRow.appendChild(scoreBonusBox);

let compScoreBox = document.createElement('div');
compScoreBox.id = 'compScoreBox';
compScoreBox.classList.add('flexCol','box1a','gap',);
secondRow.appendChild(compScoreBox);

wrapper.appendChild(secondRow);

let thirdRow = document.createElement('div');
thirdRow.style = 'display: grid; grid-template-columns: 1fr 1fr 4fr; grid-template-rows: 1.45fr 1fr; background: lightgray; height: clamp(100px, 10%; 250px); padding: .5rem;'

let taxBox = document.createElement('div');
taxBox.id = 'taxBox';
taxBox.classList.add('flexCol','box2')
thirdRow.appendChild(taxBox);

let buyBox = document.createElement('div');
buyBox.id = 'buyBox';
buyBox.classList.add('flexCol','box2');
thirdRow.appendChild(buyBox);

////////CONTENT BOX AND TABS////////

let contentBox = document.createElement('div');
contentBox.id = 'contentBox';

let tabs = document.createElement('div');
tabs.id = 'tabs';
tabs.style = 'display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;';

let box1 = document.createElement('div');
box1.classList.add('contentBtn1','contentBtn');
box1.id = 'contentBtn1';

let projectManagementBtn = document.createElement('button');
projectManagementBtn.textContent = 'Projects & Events'
projectManagementBtn.style = 'background: none; border: none; border-bottom: 2px solid black';
box1.addEventListener('click',() => {
    projectBoxRender();
    cycleActive(box1.id)
})
box1.style = 'background: rgba(200,200,230,.5);'
box1.appendChild(projectManagementBtn);
tabs.appendChild(box1)

let box2 = document.createElement('div');
box2.classList.add('contentBtn1','contentBtn');
box2.id = 'contentBtn2';

let bldgsBtn = document.createElement('button');
bldgsBtn.textContent = 'Buildings';
bldgsBtn.style = 'background: none; border: none; border-bottom: 2px solid black';
box2.addEventListener('click', () => {
    renderBuildings();
    cycleActive(box2.id)
});
box2.appendChild(bldgsBtn);
tabs.appendChild(box2);

let box3 = document.createElement('div');
box3.classList.add('contentBtn1','contentBtn');
box3.id = 'contentBtn3'

let upgBtn = document.createElement('button');
upgBtn.textContent = 'Upgrades';
upgBtn.style = 'background: none; border: none; border-bottom: 2px solid black';
box3.addEventListener('click', () => {
    renderUpgrades();
    cycleActive(box3.id);
});
box3.appendChild(upgBtn);
tabs.appendChild(box3);

let box4 = document.createElement('div');
box4.classList.add('contentBtn1','contentBtn');
box4.id = 'contentBtn4'

let troopBtn = document.createElement('button');
troopBtn.textContent = 'Troop Info';
troopBtn.style = 'background: none; border: none; border-bottom: 2px solid black';
box4.addEventListener('click', () => {
    renderTroops();
    cycleActive(box4.id);
});
box4.appendChild(troopBtn);
tabs.appendChild(box4);

let box5 = document.createElement('div');
box5.classList.add('contentBtn1','contentBtn');
box5.id = 'contentBtn5';

let weeksBtn = document.createElement('button');
weeksBtn.textContent = 'Weekly Log';
weeksBtn.style = 'background: none; border: none; border-bottom: 2px solid black';
box5.addEventListener('click', () => {
    renderWeeks();
    cycleActive(box5.id);
})
box5.appendChild(weeksBtn);
tabs.appendChild(box5);

let box6 = document.createElement('div');
box6.classList.add('contentBtn2','contentBtn');
box6.id = 'contentBtn6';

let notesBtn = document.createElement('button');
notesBtn.textContent = 'Notes';
notesBtn.style = 'background: none; border: none; border-bottom: 2px solid black';
box6.addEventListener('click', () => {
    renderNotes();
    cycleActive(box6.id);
})
box6.appendChild(notesBtn)
tabs.appendChild(box6);

contentBox.appendChild(tabs);

let contentArea = document.createElement('div');
contentArea.id = 'contentArea';
contentArea.style = 'width: 100%;'

contentBox.appendChild(contentArea);

thirdRow.appendChild(contentBox);

let setStatus = document.createElement('div');
setStatus.id = 'setStatus'
setStatus.classList.add('flexCol','box3');
setStatus.style = 'grid-area: 2/1/3/3; margin-top: 1rem'
thirdRow.appendChild(setStatus);

wrapper.appendChild(thirdRow);

body.appendChild(wrapper);

}

function cycleActive(id) {
    let btns = document.querySelectorAll('.contentBtn');

    btns.forEach((btn) => {
        btn.style = 'background: none;'

    })

    let active = document.querySelector(`#${id}`);
    active.style = 'background: rgba(200,200,230,.5);'
}


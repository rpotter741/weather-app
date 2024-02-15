import { economy } from "./economyStats";
import endEvent from "./endEvents";
import newEvent from "./newEvent";
import renderProjects from "./renderProjects";

function projectBoxRender() {
    let wrapper = document.querySelector('#contentArea');
    wrapper.innerHTML = "";
    wrapper.style = 'width: 100%; height: 100%'

    let header = document.createElement('div');
    header.textContent = "Event Management";
    header.classList.add('subHeader');
    wrapper.appendChild(header);

    let subHeader = document.createElement('div');
    subHeader.style = "display: grid; grid-template: 1fr / 2fr 1fr; place-items: center; height: 7.5%; box-sizing: border-box";

    let prodAvailBox = document.createElement('div');
    prodAvailBox.classList.add('flexRow','gap')

    let prodAvailLabel = document.createElement('div');
    prodAvailLabel.textContent = "Productivity Available:"
    prodAvailLabel.style = 'font-size: 18px;'
    prodAvailBox.appendChild(prodAvailLabel);

    let prodAvailValue = document.createElement('div');
    prodAvailValue.id = 'prodAvailValue';
    prodAvailValue.textContent = calcWorkers();
    prodAvailValue.style = 'font-size: 18px';
    prodAvailBox.appendChild(prodAvailValue);
    subHeader.appendChild(prodAvailBox)

    let newProjBtn = document.createElement('button');
    newProjBtn.textContent = "New Event";
    newProjBtn.id = 'newProjBtn'
    newProjBtn.addEventListener('click', () => {
        newEvent();
    })
    subHeader.appendChild(newProjBtn);

    wrapper.appendChild(subHeader);

    let projectBox = document.createElement('div');
    projectBox.id = 'projectBox'
    wrapper.appendChild(projectBox)

    renderProjects();

}

let activeWorkerCount = 0;

let projectArray = [];

function setProjects(data) {
    projectArray = data;
}

function calcWorkers() {
    
    let num = 0; 

    if(economy.prodC > economy.prodM) {
        num = economy.prodM
    } else {
        num = economy.prodC;
    };

   return (num -= activeWorkerCount);

}

function distCalcWorkers() {
    let num = 0; 
    if(economy.prodC > economy.prodM) {
        num = economy.prodM
    } else {
        num = economy.prodC;
    };

    let home = document.querySelector('#prodAvailValue');
    if(home != undefined) {
    home.textContent = (num -= activeWorkerCount);
    }
}

function aWPlus(x) {
    activeWorkerCount += x;    
}

function aWMinus(x) {
    activeWorkerCount -= x;
}

function weekProjects() {
    projectArray.forEach((proj) => {
        if(proj.type == 'Active' || proj.type == 'building' || proj.type == 'Active-Fix') {
            proj.duration -= proj.workers;
            if(proj.duration <= 0) {
                endEvent(proj);
            }
        } else if(proj.type == 'Passive') {
            proj.duration -= 1;
            if(proj.duration <= 0) {
                endEvent(proj);
            }
        }
    })
    }

    function removeCompleted() {

        let empties = [];

        projectArray.forEach((proj) => {
            if(proj.duration <= 0) {
                let place = projectArray.findIndex((e) => e.count == proj.count)
                empties.push(place);
            }
        })

        let source =  empties.reverse();

        for(let n = 0; n < empties.length; n++) {
            let test = source[n];
            projectArray.splice(test,1);
        }
    }


export { aWMinus, aWPlus, calcWorkers, distCalcWorkers, projectArray, projectBoxRender, removeCompleted, weekProjects, setProjects}
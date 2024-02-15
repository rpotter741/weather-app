import { buildings } from "./buildingsStats";
import renderUpgrades from "./renderUpgrades";
import showUpgrade from "./showBldgUpgrade";



 function renderBuildings() {
    let wrapper = document.querySelector('#contentArea'); 
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.textContent = "Building Management";
    wrapper.appendChild(header);

    if(buildings[2].level >= 3 || buildings[3].level >= 1 || buildings[4].level >= 1 || buildings[5].level >= 3 || buildings[8].level >= 3) {
        let bldgActionHeader = document.createElement('div');
        bldgActionHeader.textContent = 'Building Actions';
        bldgActionHeader.classList.add('text-center');
        wrapper.appendChild(bldgActionHeader);

        let actionBox = document.createElement('div');
        actionBox.classList.add('flexRow','center','gap')

        if(buildings[2].level >= 3) {
            let isrBtn = document.createElement('button');
            isrBtn.style = 'width: 8rem;'
            isrBtn.textContent = 'Active ISR';
            actionBox.appendChild(isrBtn);
        }

        if(buildings[3].level >= 1) {
            let feedBtn = document.createElement('button');
            feedBtn.style = 'width: 8rem';
            feedBtn.textContent = 'Feed Troops';
            actionBox.appendChild(feedBtn);
        }

        if(buildings[4].level >= 1) {
            let harvestBtn = document.createElement('button');
            harvestBtn.style = 'width: 8rem';
            harvestBtn.textContent = 'Harvest';
            actionBox.appendChild(harvestBtn);
        }

        if(buildings[5].level >= 3) {
            let firesaleBtn = document.createElement('button');
            firesaleBtn.style = 'width: 8rem';
            firesaleBtn.textContent = 'Firesale';
            actionBox.appendChild(firesaleBtn);
        }

        if(buildings[8].level >= 3) {
            let triageBtn = document.createElement('button');
            triageBtn.style = 'width: 8rem';
            triageBtn.textContent = 'Triage';
            actionBox.appendChild(triageBtn);
        }

        wrapper.appendChild(actionBox);

    }


    buildings.forEach((bldg) => {
        let row = document.createElement('div');
        row.style = 'display: flex; align-items: center; height: 8.333%; padding: 0 1rem;'

        let title = document.createElement('div');
        title.textContent = bldg.name;
        title.style = 'font-size: 18px; width: 15%; padding-left: .5rem; box-sizing: border-box'
        row.appendChild(title);

        let buttonRow = document.createElement('div');
        buttonRow.style = 'width: 8%; display: flex; justify-content: space-evenly'

        let button0 = document.createElement('button')
        button0.textContent = "0";
        button0.classList.add('bldgBtn');
        button0.id = `${bldg.id}0`;
        buttonRow.appendChild(button0);

        let button1 = document.createElement('button');
        button1.textContent = "1";
        button1.classList.add('bldgBtn');
        button1.id = `${bldg.id}1`;
        buttonRow.appendChild(button1);

        let button2 = document.createElement('button');
        button2.textContent = "2";
        button2.classList.add('bldgBtn');
        button2.id = `${bldg.id}2`;
        buttonRow.appendChild(button2);

        let button3 = document.createElement('button');
        button3.textContent = "3";
        button3.classList.add('bldgBtn');
        button3.id = `${bldg.id}3`;
        buttonRow.appendChild(button3);
        row.appendChild(buttonRow);

        let statusArea = document.createElement('div');
        statusArea.textContent = bldg.status;
        statusArea.style = 'font-size: 15px; margin-left: 2rem;'
        row.appendChild(statusArea);

        switch(bldg.level) {
            case 0: 
                button0.style = 'background: green';
                break;
            case .5:
                button0.style = 'background: gray';
                button1.style = 'background: yellow';
                break;
            case 1:
                button0.style = 'background: gray';
                button1.style = 'background: green';
                break;
            case 1.5: 
                button0.style = 'background: gray';
                button1.style = 'background: gray';
                button2.style = 'background: yellow';
                break;
            case 2: 
                button0.style = 'background: gray';
                button1.style = 'background: gray';
                button2.style = 'background: green';
                break;
            case 2.5: 
                button0.style = 'background: gray';
                button1.style = 'background: gray';
                button2.style = 'background: gray';
                button3.style = 'background: yellow';
                break;
            case 3:
                button0.style = 'background: gray';
                button1.style = 'background: gray';
                button2.style = 'background: gray';
                button3.style = 'background: green';
    }

        wrapper.appendChild(row);

})

    let buttons = document.querySelectorAll('.bldgBtn');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let id = btn.id.slice(0,-1);
            let lvl = btn.id.slice(-1);
            let e = buildings.findIndex((e) => e.id == id);
            showUpgrade(buildings[e],lvl);
        })
    })

}



export { renderBuildings }


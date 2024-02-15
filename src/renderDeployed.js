import { renderAll } from "./pageRenders";
import { garCurrent } from "./safetyStats";

let deployedArray = [];

function setDeployed(data) {
    deployedArray = data;
}

function renderDeployed() {
    let wrapper = document.querySelector('#deployArea')
    wrapper.innerHTML = '';
    wrapper.style = 'background: rgba(211,211,211,.3); height: 37rem; border-radius: .5rem; overflow-y: scroll; scrollbar-width: none'

    deployedArray.forEach((deployment) => {
        let row = document.createElement('div'); 
        row.classList.add('flexRow','center');
        row.style = `background: rgba(${deployment.color.r},${deployment.color.g},${deployment.color.b},.2); padding: .5rem; border-radius: .5rem; margin: .5rem; border: 1px solid rgba(${deployment.color.r},${deployment.color.g},${deployment.color.b},1); flex-wrap: wrap`;

        let expandBtnBox = document.createElement('div');
        expandBtnBox.style = 'width: 5%'

        let expandBtn = document.createElement('button');
        expandBtn.classList.add('expandBtn');
        if(deployment.hide == true) {
            expandBtn.innerHTML = '&#8680;'

        } else {
            expandBtn.innerHTML = '&#8681;'
        }
        
        expandBtn.addEventListener('click', () => {
            if(deployment.hide == true) {
                deployment.hide = false;
                renderDeployed();
            } else {
                deployment.hide = true;
                renderDeployed();
            }
        })
        expandBtnBox.appendChild(expandBtn);
        row.appendChild(expandBtnBox);

        let nameBox = document.createElement('div');
        nameBox.textContent = deployment.troop;
        nameBox.classList.add('text-center');
        nameBox.style = 'width: 18%';
        row.appendChild(nameBox);

        let healthBox = document.createElement('div');
        healthBox.classList.add('flexRow','center');
        healthBox.style = 'width: 18%'
        
        let currentHealth = document.createElement('input');
        currentHealth.value = deployment.hp;
        currentHealth.type = 'number';
        currentHealth.style = 'width: 33%; border: none; background: rgba(250,250,250,.2)';
        currentHealth.addEventListener('change', () => {
            deployment.hp = currentHealth.value;
        })
        healthBox.appendChild(currentHealth);

        let maxHealth = document.createElement('div');
        maxHealth.textContent = '/' + deployment.maxhp;
        healthBox.appendChild(maxHealth);
        row.appendChild(healthBox);

        let ac = document.createElement('div');
        ac.textContent = deployment.ac;
        ac.classList.add('text-center');
        ac.style = 'width: 12%';
        row.appendChild(ac);

        let ref = document.createElement('div');
        ref.textContent = deployment.ref;
        ref.classList.add('text-center');
        ref.style = 'width: 12%';
        row.appendChild(ref);

        let attack = document.createElement('div');
        attack.textContent = deployment.attack;
        attack.classList.add('text-center');
        attack.style = 'width: 12%';
        row.appendChild(attack);

        let iBonus = document.createElement('div');
        iBonus.classList.add('flexRow');
        iBonus.style = 'width: 18%;';

        let oIBonus = document.createElement('div');
        oIBonus.style = `width: 50%; height: 22px; background-position: center;`
        if(deployment.intelOff == 1) {
        oIBonus.classList.add('intelOff','tooltip');

        let tip = document.createElement('span');
        tip.textContent = `Increase attack damage by ${deployment.level}`
        tip.classList.add('tooltiptext');
        oIBonus.appendChild(tip);
        }
        iBonus.appendChild(oIBonus);

        let dIBonus = document.createElement('div');
        dIBonus.style = `width: 50%; height: 22px; background-position: center;`;
        if(deployment.intelDef == 1) {
            dIBonus.classList.add('intelDef','tooltip');          

            let tip2 = document.createElement('span');
            tip2.classList.add('tooltiptext');
            tip2.textContent = `Gain Resistance ${deployment.level} against ${deployment.intelDefValue}`
            dIBonus.appendChild(tip2);
        }
        iBonus.appendChild(dIBonus);

        row.appendChild(iBonus);

        let cxBox = document.createElement('div');
        cxBox.style = 'width: 5%';
        cxBox.classList.add('flexRow','center');

        let cxBtn = document.createElement('button');
        cxBtn.textContent = 'X';
        cxBtn.style = 'border-radius: 1rem; background: aliceblue'
        cxBtn.addEventListener('click', () => {
            let answer = confirm('Are you sure you want to send this troop home? Troops lower than 50% health will NOT restore Garrison.');

            if(answer == true) {
                let index = deployedArray.findIndex((e) => e.count == deployment.count);
                if(deployment.hp >= (deployment.maxhp / 2)) {
                    garCurrent(deployment.garrison);
                }
                deployedArray.splice(index, 1);
                renderDeployed();
                renderAll();
            }
        })
        cxBox.appendChild(cxBtn);
        row.appendChild(cxBox);

        let noteArea = document.createElement('textarea');
        noteArea.value = deployment.notes;
        noteArea.style = 'height: 10rem; resize: none; overflow-y: scroll; scrollbar-width: none; width: 100%';
        noteArea.addEventListener('change', () => {
            deployment.notes = noteArea.value;
        })
        if(deployment.hide == false) {
            row.appendChild(noteArea);
        }

        deployArea.appendChild(row);
      })

      
}

export {
    deployedArray,
    renderDeployed,
    setDeployed
}
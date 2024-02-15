import { econActions, economy, economyRating, showEconAction } from "./economyStats";
import { safActions, safety, safetyRating, showSafAction } from "./safetyStats";
import { showSurAction, surActions, surExplain, survivalRating } from "./survivalStats";

export default function renderActionsArea() {
    let wrapper = document.querySelector('#setStatus');
    wrapper.innerHTML = '';
    wrapper.classList.add('flexCol');


    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.textContent = 'Player Character Actions';
    header.style = 'border-radius: .5rem .5rem 0 0; padding: 1.4rem'
    wrapper.appendChild(header)

    let surHeader = document.createElement('div');
    surHeader.textContent = 'Survival Actions';
    surHeader.classList.add('text-center');
    wrapper.appendChild(surHeader);

    let surArea = document.createElement('div');
    surArea.style = 'display: flex; flex-wrap: wrap; justify-content: space-around'
    surActions.forEach((act) => {
        let btn = document.createElement('button');
        btn.textContent = act.name;
        btn.addEventListener('click', () => {
            showSurAction(act);
        });
        btn.style = 'width: 33%; font-size: 15px'
        surArea.appendChild(btn);
    })

    wrapper.appendChild(surArea);

    let safHeader = document.createElement('div');
    safHeader.textContent = 'Safety Actions';
    safHeader.classList.add('text-center');
    wrapper.appendChild(safHeader);

    let safArea = document.createElement('div');
    safArea.style = 'display: flex; flex-wrap: wrap; justify-content: space-around'
    safActions.forEach((act) => {
        let btn = document.createElement('button');
        btn.textContent = act.name;
        btn.addEventListener('click', () => {
            showSafAction(act);
        });
        btn.style = 'width: 33%; font-size: 15px'
        safArea.appendChild(btn);
    })
    wrapper.appendChild(safArea);

    let eHeader = document.createElement('div');
    eHeader.textContent = 'Economy Actions';
    eHeader.classList.add('text-center');
    wrapper.appendChild(eHeader);

    let eArea = document.createElement('div');
    eArea.style = 'display: flex; flex-wrap: wrap; justify-content: space-around'
    econActions.forEach((act) => {
        let btn = document.createElement('button');
        btn.textContent = act.name;
        btn.addEventListener('click', () => {
            showEconAction(act);
        });
        btn.style = 'width: 33%; font-size: 15px; height:'
        eArea.appendChild(btn);
    });
    wrapper.appendChild(eArea);
    

}
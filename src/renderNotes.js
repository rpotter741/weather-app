import { changeNotes, settlement } from "./settlementStats";
import { saveSettlement, settlementList } from "./storage";
import { renderWeeks } from "./weekLog";


let userNotes = '';

function renderNotes() {

    let wrapper = document.querySelector('#contentArea'); 
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.textContent = "Notes";

    wrapper.appendChild(header);



    let notes = document.createElement('textarea');
    notes.style = ' overflow-y: scroll; font-family: "monospace";'
    notes.placeholder = "Start writing some notes..."
    notes.value = userNotes;
    
    notes.addEventListener('change', () => {

        saveSettlement(settlement.name)
        userNotes = notes.value;

    })

    wrapper.appendChild(notes);

    notes.scrollTop = 9999999;



}


function setNotes(data) {
    userNotes = data;
}

export { renderNotes, setNotes, userNotes}
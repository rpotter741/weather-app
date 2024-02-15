export default function openGlossary(index) {
    if(document.querySelector('#glossary') != undefined) {
        document.querySelector('#glossary').remove();
    }

    let wrapper = document.createElement('div');
    wrapper.id = 'glossary';

    let headerBox = document.createElement('div');
    headerBox.style = 'display: grid; grid-template-columns: 1fr 2fr 1fr; place-items: center; padding: 1rem; background: rgba(200,200,230,.5)';

    let backBox = document.createElement('div');
    backBox.classList.add('flexRow','center');

    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style = 'border-radius: 1rem;'
    closeBtn.addEventListener('click', () => {
        wrapper.remove();
    })
    backBox.appendChild(closeBtn);
    headerBox.appendChild(backBox);    

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.style = 'background: none;'
    header.textContent = 'Glossary';
    headerBox.appendChild(header);
    wrapper.appendChild(headerBox);

    let contentArea = document.createElement('div');
    contentArea.classList.add('troopDisplayBox');
    contentArea.id = index;
    

//////////////bringing it home////////////////
    wrapper.appendChild(contentArea);

    let body = document.querySelector('body');
    body.appendChild(wrapper);
}
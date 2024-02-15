import { buildings } from "./buildingsStats";
import { economyRating } from "./economyStats";
import openGlossary from "./openGlossary";
import { renderAll } from "./pageRenders";
import { deployedArray, renderDeployed } from "./renderDeployed";
import { garBonus, garCurrent, intelCurrent, safety } from "./safetyStats";
import { survivalRating } from "./survivalStats";

let intelDef = 0;
let intelOff = 0;
let selectValue = '';
let colorValue = '';
let troopCount = 0;

export default function renderTroops() {
    let wrapper = document.querySelector('#contentArea');
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.id = 'troopScreen'
    header.textContent = 'Garrison and Troop Information';
    wrapper.appendChild(header);

    let content = document.createElement('div');
    content.style = 'display: flex'
    wrapper.appendChild(content);

    let troopBox = document.createElement('div');
    troopBox.style = 'width: 50%; padding-left: 1rem; overflow-y: scroll; box-sizing: border-box; height: 725px; scrollbar-width: none; padding-right: 1rem'; 

    let barracksHeader = document.createElement('div');
    barracksHeader.textContent = 'Barracks Troops';
    barracksHeader.classList.add('subHeader');
    barracksHeader.style = 'background: none'
    troopBox.appendChild(barracksHeader);

    let example = document.createElement('div');
    example.classList.add('troopRow');

    let eTitle = document.createElement('div');
    eTitle.textContent = 'Name';
    example.appendChild(eTitle);

    let eHP = document.createElement('div');
    eHP.textContent = 'Max Health';
    eHP.classList.add('text-center');
    example.appendChild(eHP);

    let eAC = document.createElement('div');
    eAC.textContent = 'AC';
    example.appendChild(eAC);

    let eRef = document.createElement('div');
    eRef.textContent = 'Reflex';
    example.appendChild(eRef);

    let eAttack = document.createElement('div');
    eAttack.textContent = 'Attack DC';
    example.appendChild(eAttack);

    let eDam = document.createElement('div');
    eDam.textContent = 'Damage';
    example.appendChild(eDam);

    troopBox.appendChild(example);

    let barracks = buildings[3].level;
    switch(barracks) {
        case 0:
        case .5:
            troopBox.appendChild(renderTroopBlock(2,barracksTroopInfo));
            break;
        case 1:
        case 1.5: 
            troopBox.appendChild(renderTroopBlock(4,barracksTroopInfo));
            break;
        case 2:
        case 2.5:
            troopBox.appendChild(renderTroopBlock(8,barracksTroopInfo));
            break;
        case 3:
            troopBox.appendChild(renderTroopBlock(12,barracksTroopInfo));
            break;
        }

    let infirmary = buildings[8].level;


    if(infirmary >= 2) {

        let iHeader = document.createElement('div');
        iHeader.textContent = 'Infirmary Troops';
        iHeader.classList.add('subHeader');
        iHeader.style = 'background: none;'
        troopBox.appendChild(iHeader);

        switch(infirmary) {
            case 2:
            case 2.5:
                troopBox.appendChild(renderTroopBlock(1,infirmaryTroopInfo));
                break;
            case 3:
                troopBox.appendChild(renderTroopBlock(2,infirmaryTroopInfo));
                break;
            default:
                break;   
            
        }
}


    let school = buildings[7].level;

    if(school >= 2) {

        let sHeader = document.createElement('div');
        sHeader.textContent = 'School Troops';
        sHeader.classList.add('subHeader');
        sHeader.style = 'background: none';
        troopBox.appendChild(sHeader);

        switch(school) {
            case 2:
            case 2.5:
                troopBox.appendChild(renderTroopBlock(1,schoolTroopInfo));
                break;
            case 3:
                troopBox.appendChild(renderTroopBlock(2,schoolTroopInfo));
                break;
            default:
                break;
        }

    }

      content.appendChild(troopBox);

      let troopInfoBox = document.createElement('div');
      troopInfoBox.id = 'troopInfoBox'
      troopInfoBox.style = 'width: 50%; padding: 0 1rem; box-sizing: border-box; border-left: 1px solid rgba(0,0,0,.2); margin-right: 1rem; height: 46.5rem'

      let deployHeader = document.createElement('div');
      deployHeader.classList.add('subHeader');
      deployHeader.style = 'background: none';
      deployHeader.textContent = 'Deployed Troops';
      troopInfoBox.appendChild(deployHeader);

      let btnBox = document.createElement('div');
      

      let btn = document.createElement('button');
      btn.textContent = 'Deploy New Troop';
      btn.style = 'width: 100%';
      btn.addEventListener('click', () => {
        renderDeployWindow();
      })

      btnBox.appendChild(btn);
      troopInfoBox.appendChild(btnBox);

      let dRow = document.createElement('div');
      dRow.classList.add('flexRow');
      dRow.style = 'padding: .5rem; margin: .5rem'

      let spacer = document.createElement('div');
      spacer.innerHTML = '&nbsp;'
      spacer.style = 'width: 5%';
      dRow.appendChild(spacer);

      let dName = document.createElement('div');
      dName.classList.add('text-center');
      dName.textContent = 'Name';
      dName.style = 'width: 18%';
      dRow.appendChild(dName);

      let dHealth = document.createElement('div');
      dHealth.classList.add('text-center');
      dHealth.textContent = 'Health';
      dHealth.style = 'width: 18%';
      dRow.appendChild(dHealth);

      let dac = document.createElement('div');
      dac.classList.add('text-center');
      dac.textContent = 'AC';
      dac.style = 'width: 12%';
      dRow.appendChild(dac);

      let dref = document.createElement('div');
      dref.classList.add('text-center');
      dref.textContent = 'Reflex';
      dref.style = 'width: 12%';
      dRow.appendChild(dref);

      let dattack = document.createElement('div');
      dattack.classList.add('text-center');
      dattack.textContent = 'Attack';
      dattack.style = 'width: 12%';
      dRow.appendChild(dattack);

      let dIntel = document.createElement('div');
      dIntel.classList.add('text-center');
      dIntel.textContent = 'Bonuses';
      dIntel.style = 'width: 18%';
      dRow.appendChild(dIntel);
      troopInfoBox.appendChild(dRow);

      let spacer2 = document.createElement('div');
      spacer2.innerHTML = '&nbsp;'
      spacer2.style = 'width: 5%';
      dRow.appendChild(spacer2);

      let deployArea = document.createElement('div');
      deployArea.id = 'deployArea';
      troopInfoBox.appendChild(deployArea);

      





      //////if intelDefMod == 1, use shield icon;
      //////if intelOffMod == 1, use swords icon;
      //////background color = troopcolor;
      //////hp is input number;
      //////show any bonuses for the troop instead of damage or whatever;

      content.appendChild(troopInfoBox);
      renderDeployed();
}

let troopnotes = '';

function renderDeployWindow() {
    let garrisonFail = 0;
    let intelFail = 0;
    let equipmentFail = 0;

    let barracks = buildings[3].level;

    let infirmary = buildings[8].level;

    let school = buildings[7].level;

    let wrapper = document.querySelector('#troopInfoBox');
    wrapper.innerHTML = '';

    let deployTroopsHeader = document.createElement('div');
    deployTroopsHeader.textContent = 'Deploy Troops';
    deployTroopsHeader.classList.add('subHeader');
    deployTroopsHeader.style = 'background: none;'
    wrapper.appendChild(deployTroopsHeader);

    let selectRow = document.createElement('div');
    selectRow.classList.add('flexRow');
    selectRow.style = 'margin-bottom: 1rem;'

    let selectorLabel = document.createElement('div');
    selectorLabel.textContent = 'Select Troop';
    selectorLabel.style = 'width: 50%; box-sizing: border-box; padding-left: 0rem'
    selectRow.appendChild(selectorLabel);

    let troopSelector = document.createElement('select');
    troopSelector.style = 'width: 50%';
    troopSelector.id = 'troopSelector';


    switch(barracks) {
        case 0:
        case .5:
            troopSelector.appendChild(troopSelect(2,barracksTroopInfo));
            break;
        case 1:
        case 1.5: 
            troopSelector.appendChild(troopSelect(4,barracksTroopInfo));
            break;
        case 2:
        case 2.5:
            troopSelector.appendChild(troopSelect(8,barracksTroopInfo));
            break;
        case 3:
            troopSelector.appendChild(troopSelect(12,barracksTroopInfo));
            break;
        }

        switch(infirmary) {
            case 2:
            case 2.5:
                troopSelector.appendChild(troopSelect(1,infirmaryTroopInfo));
                break;
            case 3:
                troopSelector.appendChild(troopSelect(2,infirmaryTroopInfo));
                break;
            default:
                break;   
            
        }

        switch(school) {
            case 2:
            case 2.5:
                troopSelector.appendChild(troopSelect(1,schoolTroopInfo));
                break;
            case 3:
                troopSelector.appendChild(troopSelect(2,schoolTroopInfo));
                break;
            default:
                break;
        }

    selectRow.appendChild(troopSelector);
    troopSelector.value = selectValue;
    troopSelector.addEventListener('change', () => {
        selectValue = troopSelector.value;
        renderDeployWindow();
    })
    wrapper.appendChild(selectRow);

    let colorRow = document.createElement('div');
    colorRow.classList.add('flexRow');
    colorRow.style = 'margin-bottom: 1rem'

    let colorLabel = document.createElement('div');
    colorLabel.textContent = 'Select Color';
    colorLabel.style = 'width: 50%'
    colorRow.appendChild(colorLabel);

    let colorPick = document.createElement('input');
    colorPick.style = 'width: 50%'
    colorPick.type = 'color';
    colorPick.id = 'troopColorPick';
    colorPick.value = colorValue;
    colorPick.addEventListener('change', () => {
        colorValue = colorPick.value;
    })
    colorRow.appendChild(colorPick);
    wrapper.appendChild(colorRow)

    let eImpactRow = document.createElement('div');
    eImpactRow.classList.add('flexRow');
    eImpactRow.style = 'margin-bottom: 1rem;'

    let eImpactLabel = document.createElement('div');
    eImpactLabel.textContent = 'Economy Equipment Impact';
    eImpactLabel.style = 'width: 50%;';
    eImpactRow.appendChild(eImpactLabel);

    let equipValue = document.createElement('div');
    if((calcEquipMod() - amod - dmod) > 0) {
        equipValue.textContent = "+" + (calcEquipMod() - amod - dmod) + " Point(s) Left";
        equipValue.style = 'color: blue; width: 50%';
        equipmentFail++
    } else if((calcEquipMod() - amod - dmod) < 0){
        equipValue.textContent = (calcEquipMod() - amod - dmod) + " Point(s) Left";
        equipValue.style = 'color: red; width: 50%';
        equipmentFail++
    } else if((calcEquipMod() - amod - dmod) == 0) {
        equipValue.textContent = '0 Points Left';
        equipValue.style = 'color: green; width: 50%';
    }

    eImpactRow.appendChild(equipValue);
    wrapper.appendChild(eImpactRow);


    let dModRow = document.createElement('div')
    dModRow.classList.add('flexRow');
    dModRow.style = 'margin-bottom: 1rem'

    let dModLabel = document.createElement('div');
    dModLabel.textContent = 'Defensive Mod'
    dModLabel.style = 'width: 50%'
    dModRow.appendChild(dModLabel);

    let dModValue = dModSelect();
    dModValue.id = 'dModValue';
    dModValue.style = 'width: 50%'
    dModRow.appendChild(dModValue);
    wrapper.appendChild(dModRow);

    let aModRow = document.createElement('div')
    aModRow.classList.add('flexRow');
    aModRow.style = 'margin-bottom: 1rem'

    let aModLabel = document.createElement('div');
    aModLabel.textContent = 'Offensive Mod'
    aModLabel.style = 'width: 50%'
    aModRow.appendChild(aModLabel);

    let aModValue = aModSelect();
    aModValue.id = 'aModValue';
    aModValue.style = 'width: 50%'
    aModRow.appendChild(aModValue);
    wrapper.appendChild(aModRow);

    let intelRowDef = document.createElement('div');
    intelRowDef.classList.add('flexRow');
    intelRowDef.style = 'margin-bottom: 1rem;'

    let intelLabelDef = document.createElement('div');
    intelLabelDef.textContent = 'Spend Intelligence to grant Resistance equal to Troop Level?'
    intelLabelDef.style = 'width: 50%'
    intelRowDef.appendChild(intelLabelDef)

    let intelDefSelect = document.createElement('select');
    intelDefSelect.style = 'width: 15%';

    let iDefNo = document.createElement('option');
    iDefNo.label = 'No';
    iDefNo.value = 'false'; 
    intelDefSelect.appendChild(iDefNo);

    if(safety.intelC > 0) {
    let iDefYes = document.createElement('option');

    iDefYes.label = 'Yes';
    iDefYes.value = 'true';
    intelDefSelect.appendChild(iDefYes);
    }

    intelRowDef.appendChild(intelDefSelect);

    if(intelDef == 0) {
        intelDefSelect.value = 'false';
    } else if (intelDef == 1) {
        intelDefSelect.value = 'true';
    }

    intelDefSelect.addEventListener('change', () => {
        if(intelDefSelect.value == 'true') {
            intelDef = 1;
            renderDeployWindow();
        } else if(intelDefSelect.value == 'false') {
            intelDef = 0;
            renderDeployWindow();

        }
    })

    if(intelDef == 1) {
        let type = document.createElement('select');
        type.id = 'iDefYes'
        type.style = 'width: 35%';

        let piercing = document.createElement('option');
        piercing.value = 'piercing';
        piercing.label = 'Piercing';
        type.appendChild(piercing);

        let slashing = document.createElement('option');
        slashing.value = 'slashing';
        slashing.label = 'Slashing';
        type.appendChild(slashing);

        let bludgeoning = document.createElement('option');
        bludgeoning.value = 'bludgeoning';
        bludgeoning.label = 'Bludgeoning';
        type.appendChild(bludgeoning);

        let fire = document.createElement('option');
        fire.value = 'fire';
        fire.label = 'Fire';
        type.appendChild(fire);

        let cold = document.createElement('option');
        cold.value = 'cold';
        cold.label = 'Cold';
        type.appendChild(cold);
        

        intelRowDef.appendChild(type);
    }

    wrapper.appendChild(intelRowDef);

    let intelRowOff = document.createElement('div');
    intelRowOff.classList.add('flexRow');
    intelRowOff.style = 'margin-bottom: 1rem'

    let intelLabelOff = document.createElement('div');
    intelLabelOff.textContent = 'Spend Intelligence to grant bonus damage equal to Troop Level?'
    intelLabelOff.style = 'width: 50%'
    intelRowOff.appendChild(intelLabelOff)

    let intelOffSelect = document.createElement('select');
    intelOffSelect.style = 'width: 15%';

    let iOffNo = document.createElement('option');
    iOffNo.label = 'No';
    iOffNo.value = 'false'; 
    intelOffSelect.appendChild(iOffNo);

    if(safety.intelC > 0) {
    let iOffYes = document.createElement('option');
    iOffYes.id = 'iOffYes';
    iOffYes.label = 'Yes';
    iOffYes.value = 'true';
    intelOffSelect.appendChild(iOffYes);
    }

    intelRowOff.appendChild(intelOffSelect);

    if(intelOff == 0) {
        intelOffSelect.value = 'false';
    } else if (intelOff == 1) {
        intelOffSelect.value = 'true';
    }

    intelOffSelect.addEventListener('change', () => {
        if(intelOffSelect.value == 'true') {
            intelOff = 1;
            renderDeployWindow();
        } else if(intelOffSelect.value == 'false') {
            intelOff = 0;
            renderDeployWindow();

    }
})

wrapper.appendChild(intelRowOff);

let costRow = document.createElement('div');
costRow.classList.add('flexRow');
costRow.style = 'margin-bottom: 1rem'

let gLabel = document.createElement('div');
gLabel.textContent = 'Garrison Cost:'
gLabel.style = 'width: 25%'
costRow.appendChild(gLabel);

let gValue = document.createElement('div');
gValue.textContent = troopsArrayGarrisonCost[troopSelector.value];
gValue.classList.add('text-center')
gValue.style = 'width: 25%';
costRow.appendChild(gValue);

let iLabel = document.createElement('div');
iLabel.textContent = 'Intelligence Cost:';
iLabel.style = 'width: 25%';
costRow.appendChild(iLabel);

let iValue = document.createElement('div');
iValue.textContent = (intelDef + intelOff);
iValue.classList.add('text-center')
iValue.style = 'width: 25%';
if(troopSelector.value != '') {
costRow.appendChild(iValue);
}
wrapper.appendChild(costRow);

if(parseInt(iValue.textContent) > safety.intelC) {
    intelFail++;
    iValue.style = 'width: 25%; color: red'
}

if(parseInt(gValue.textContent) > safety.garC) {
    gValue.style = 'width: 25%; color: red'
    garrisonFail++
}

let notesHeader = document.createElement('div');
notesHeader.classList.add('text-center');
notesHeader.textContent = 'Troop Notes';
wrapper.appendChild(notesHeader);

let noteBox = document.createElement('div');
noteBox.classList.add('flexRow','center');

let troopNotes = document.createElement('textarea');
troopNotes.value = troopnotes;
troopNotes.style = 'height: 13rem'
troopNotes.id = 'troopNotes'
troopNotes.addEventListener('change', () => {
    troopnotes = troopNotes.value;
})
noteBox.appendChild(troopNotes);
wrapper.appendChild(noteBox);

let deployBar = document.createElement('div');
deployBar.classList.add('flexRow','center')

let deployBtn = document.createElement('button');
deployBtn.style = 'width: 100%';

if(garrisonFail == 0 && intelFail == 0 && equipmentFail == 0) {
    deployBtn.textContent = 'Deploy'
    deployBtn.addEventListener('click', () => {
        compileDeployment(troopSelector.value);
        renderTroops();

        intelOff = 0;
        intelDef = 0;
        selectValue = '';
        amod = 0;
        dmod = 0;
        troopnotes = '';
        colorValue = '';
})
}


if(garrisonFail > 0 && intelFail > 0 && equipmentFail > 0) {
    deployBtn.textContent = 'Not Enough Intelligence or Garrison; Unallocated Equipment Impact';
    deployBtn.style = 'border: dashed red 1px; width: 100%'
} else if(garrisonFail == 0 && intelFail > 0 && equipmentFail > 0) {
    deployBtn.textContent = 'Not enough Intelligence; Unallocated Equipment Impact';
    deployBtn.style = 'border: dashed red 1px; width: 100%'
} else if (garrisonFail > 0 && intelFail == 0 && equipmentFail > 0) {
    deployBtn.textContent = 'Not enough Garrison; Unallocated Equipment Impact';
    deployBtn.style = 'border: dashed red 1px; width: 100%'
} else if(garrisonFail > 0 && intelFail > 0 && equipmentFail == 0) {
    deployBtn.textContent = 'Not enough Garrison or Intelligence';
    deployBtn.style = 'border: dashed red 1px; width: 100%'
} else if(garrisonFail == 0 && intelFail == 0 && equipmentFail > 0) {
    deployBtn.textContent ='Unallocated Equipment Impact';
    deployBtn.style = 'border: dashed red 1px; width: 100%'
} else if(garrisonFail == 0 && intelFail > 0 && equipmentFail == 0) {
    deployBtn.textContent = 'Not enough Intelligence';
    deployBtn.style = 'border: dashed red 1px; width: 100%'
} else if(garrisonFail > 0 && intelFail == 0 && equipmentFail == 0) {
    deployBtn.textContent = 'Not enough Garrison';
    deployBtn.style = 'border: dashed red 1px; width: 100%'
}

deployBar.appendChild(deployBtn);
wrapper.appendChild(deployBar);


}




function compileDeployment(id) {
    if(id == '') {
        return
    }
    let index = Object.keys(troopsArrayGarrisonCost);
    let num = Object.values(troopsArrayGarrisonCost);

    let location = index.findIndex((e) => e == id);

    let troopIndex = barracksTroopInfo.findIndex((e) => e.name == id);

    let troop = barracksTroopInfo[troopIndex];
    
    let deployment = {};

    deployment.troop = index[location];

    deployment.garrison = num[location];

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      let rgbColor = hexToRgb(document.querySelector('#troopColorPick').value);

    deployment.color = rgbColor;

    let hp = troop.hp;

    
    switch(survivalRating()) {
        case 'Dying': 
            hp = (hp * .667).toFixed(0);
            break;
        case 'Endangered':
            hp = (hp * .75).toFixed(0);
            break;
        case 'Desperate':
            hp = (hp * .95).toFixed(0);
            break;
        case 'Stable':
            break;
        case 'Developing':
            hp = (hp * 1.05).toFixed(0);
            break;
        case 'Blossoming':
            hp = (hp * 1.1).toFixed(0);
            break;
        case 'Flourishing':
            hp = (hp * 1.2).toFixed(0);
            break;
    }

    let modDef = parseInt(document.querySelector('#dModValue').value);

    let modOff =  parseInt(document.querySelector('#aModValue').value);

    deployment.modDef = modDef

    deployment.modOff = modOff;

    deployment.hp = parseInt(hp);

    deployment.maxhp = troop.hp;

    deployment.count = troopCount;

    troopCount++;

    if(deployment.hp < deployment.maxhp) {
        deployment.maxhp = deployment.hp;
    }

    deployment.dice = troop.dice;

    deployment.static = parseInt(troop.static);

    deployment.attack = parseInt(troop.attack + modOff);

    deployment.ac = parseInt(troop.ac + modDef);

    deployment.level = troop.level;

    deployment.ref = parseInt(troop.ref + parseInt(modDef/2));

    deployment.intelDef = intelDef;

    deployment.intelOff = intelOff;

    if(document.querySelector('#iOffYes') != undefined) {
    deployment.intelOffValue = document.querySelector('#iOffYes').value;
    }

    if(document.querySelector('#iDefYes') != undefined) {
    deployment.intelDefValue = document.querySelector('#iDefYes').value;
    }

    deployment.notes = document.querySelector('#troopNotes').value;

    deployment.hide = true;


    

    intelCurrent(-parseInt(intelDef + intelOff));

    
    garCurrent((troop.garrison * -1));
  

    deployedArray.push(deployment);

    renderAll();
}

let troopsArrayGarrisonCost = {
    'Militia Infantry': 1,
    'Militia Archers': 1,
    'Militia Pikemen': 2,
    'Militia Cavalry': 2,
    'Guard Infantry': 3,
    'Guard Archers': 3,
    'Guard Spearmen': 3,
    'Guard Cavalry': 3,
    'Combat Medics': 3,
    'Combat Wizards': 3,
    'Soldiers': 4,
    'Longbowmen': 4,
    'Phalanx': 4,
    'Cannons': 5,
    'Battle Medics': 4,
    'Battle Mages': 4
}


function calcEquipMod() {
    let i = 0;
    switch(economyRating()) {
        case 'Struggling':
            i = -4
            break;
        case 'Fragile':
            i = -2
            break;
        case 'Stagnant':
            i = 0;
            break;
        case 'Growing':
            i = 1;
            break;
        case 'Prosperous':
            i = 2;
            break;
        case 'Thriving':
            i = 3;
            break;
        case 'Golden Era':
            i = 4
            break;
  }

  return i;
}

let dmod = 0;
let amod = 0;

function dModSelect() {
    let select = document.createElement('select');

    if(calcEquipMod() >= 0) {
    let length = calcEquipMod() - amod;

    for(let i = 0; i < length+1; i++) {
        let option = document.createElement('option');
        option.label = i;
        option.value = i;
        select.appendChild(option)
    }
    }

    if(calcEquipMod() < 0) {
        let length = (calcEquipMod() - amod) * -1;

        for(let e = 0; e < length + 1; e++) {
            let optionNeg = document.createElement('option');
            optionNeg.label = -e;
            optionNeg.value = -e;
            select.appendChild(optionNeg);
        }   
    }

    select.value = dmod;

    select.addEventListener('change', () => {
        dmod = select.value;
        renderDeployWindow();;
    })


    return select
}


    


function aModSelect() {
    let select = document.createElement('select');

    if(calcEquipMod() >= 0) {
        let length = calcEquipMod() - dmod;
    
        for(let i = 0; i < length+1; i++) {
            let option = document.createElement('option');
            option.label = i;
            option.value = i;
            select.appendChild(option)
        }
        }
    
        if(calcEquipMod() < 0) {
            let length = (calcEquipMod() - dmod) * -1;
    
            for(let e = 0; e < length + 1; e++) {
                let optionNeg = document.createElement('option');
                optionNeg.label = -e;
                optionNeg.value = -e;
                select.appendChild(optionNeg);
            }   
        }

        select.value = amod;

        select.addEventListener('change', () => {
            amod = select.value;
            renderDeployWindow();;
        });

    return select
}

function troopSelect(x,y) {
    let group = document.createElement('optgroup');
    
    if(y == barracksTroopInfo) {
        group.label = 'Barracks';
    } else if (y == schoolTroopInfo) {
        group.label = 'School';
    } else if (y == infirmaryTroopInfo) {
        group.label = 'Infirmary';
    }

    for(let i = 0; i < x; i ++) {
        let troop = y[i];

        let option = document.createElement('option');

        option.value = troop.name;
        option.label = troop.name;

        if(y == barracksTroopInfo) {
            option.classList.add('barracksTroop')
        } else if (y == schoolTroopInfo) {
            option.classList.add('schoolTroop');
        } else if (y == infirmaryTroopInfo) {
            option.classList.add('infirmaryTroop')
        }

        group.appendChild(option);
    }

    return group;
}

let count = 0

function renderTroopBlock(x,y) {
    let troopRow = document.createElement('div');
  

    for(let i = 0; i < x; i++) {
        let troop = y[i];

        let hp = troop.hp;

    
        switch(survivalRating()) {
            case 'Dying': 
                hp = (hp * .667).toFixed(0);
                break;
            case 'Endangered':
                hp = (hp * .75).toFixed(0);
                break;
            case 'Desperate':
                hp = (hp * .95).toFixed(0);
                break;
            case 'Stable':
                break;
            case 'Developing':
                hp = (hp * 1.05).toFixed(0);
                break;
            case 'Blossoming':
                hp = (hp * 1.1).toFixed(0);
                break;
            case 'Flourishing':
                hp = (hp * 1.2).toFixed(0);
                break;
        }

        let row = document.createElement('div');
        row.classList.add('troopRow');

        let name = document.createElement('button');
        name.textContent = troop.name;
        name.style = 'justify-self: start; border-radius: .5rem; background: lightgray; border: 1px solid black; width: 100%';
        name.addEventListener('click', () => {
            openGlossary(troop.id);
        })
        row.appendChild(name);

        let health = document.createElement('div');
        health.textContent = hp;

        let normalHealth = document.createElement('span');
        normalHealth.textContent = '/' + troop.hp;
        normalHealth.style = 'font-size: 14px'
        health.appendChild(normalHealth);
        row.appendChild(health);

        let ac = document.createElement('div');
        ac.textContent = troop.ac;
        row.appendChild(ac);

        let ref = document.createElement('div');
        ref.textContent = troop.ref;
        row.appendChild(ref);

        let attack = document.createElement('div');
        attack.textContent = troop.attack;
        attack.classList.add('text-center');
        row.appendChild(attack);

        let damage = document.createElement('div');
        damage.textContent = troop.dice + "+" + troop.static;
        damage.classList.add('text-center')
        row.appendChild(damage);

        if(count == 0) {
            count = 1
        } else if(count == 1) {
            count = 0;
            row.style = 'background: rgba(100,100,100,.1)'
        }

        troopRow.appendChild(row);
    }

    return(troopRow);
}




let barracksTroopInfo = [
    {
        barracks: 0,
        garrison: 1,
        deployed: 0,
        name: 'Militia Infantry',
        level: 2,
        hp: 36,
        ac: 18,
        ref: 8,
        dice: '1d8',
        static: 8,
        attack: 16,
        id: 'militiaInfantry'
    },
    {
        barracks: 0,
        garrison: 1,
        deployed: 0,
        name: 'Militia Archers',
        level: 3,
        hp: 30,
        ac: 18,
        ref: 9,
        dice: '1d8',
        static: 10,
        attack: 18,
        id: 'militiaArchers'
    },
    {
        barracks: 1,
        garrison: 2,
        deployed: 0,
        name: 'Militia Pikemen',
        level: 4,
        hp: 48,
        ac: 20,
        ref: 10,
        dice: '2d8',
        static: 9,
        attack: 19,
        id: 'militiaPikemen'
    },
    {
        barracks: 1,
        garrison: 2,
        deployed: 0,
        name: 'Militia Cavalry',
        level: 4,
        hp: 63,
        ac: 21,
        ref: 11,
        dice: '2d6',
        static: 9,
        attack: 20,
        id: 'militiaCavalry'
    },
    {
        barracks: 2,
        garrison: 3,
        deployed: 0,
        name: 'Guard Infantry',
        level: 5,
        hp: 90,
        ac: 22,
        ref: 12,
        dice: '2d8',
        static: 7,
        attack: 20,
        id: 'guardInfantry'
    },
    {
        barracks: 2,
        garrison: 3,
        deployed: 0,
        name: 'Guard Archers',
        level: 6,
        hp: 75,
        ac: 21,
        ref: 12,
        dice: '2d6',
        static: 12,
        attack: 21,
        id: 'guardArchers'
    },
    {
        barracks: 2,
        garrison: 3,
        deployed: 0,
        name: 'Guard Spearmen',
        level: 7,
        hp: 90,
        ac: 24,
        ref: 15,
        dice: '2d10',
        static: 13,
        attack: 23,
        id: 'guardSpearmen'
    },
    {
        barracks: 2,
        garrison: 3,
        deployed: 0,
        name: 'Guard Cavalry',
        level: 8,
        hp: 120,
        ac: 26,
        ref: 16,
        dice: '2d8',
        static: 13,
        attack: 24,
        id: 'guardCavalry'
    },
    {
        barracks: 3,
        garrison: 4,
        deployed: 0,
        name: 'Soldiers',
        level: 11,
        hp: 240,
        ac: 31,
        ref: 21,
        dice: '2d10',
        static: 16,
        id: 'soldiers'
    },
    {
        barracks: 3,
        garrison: 4,
        deployed: 0,
        name: 'Longbowmen',
        level: 11,
        hp: 150,
        ac: 30,
        ref: 21,
        dice: '2d10',
        static: 16,
        id: 'longbowmen'
    },
    {
        barracks: 3,
        garrison: 4,
        deployed: 0,
        name: 'Phalanx',
        level: 12,
        hp: 165,
        ac: 0,
        ref: 0,
        dice: '3d10',
        static: 18,
        id: 'phalanx'
    },
    {
        barracks: 3,
        garrison: 5,
        deployed: 0,
        name: 'Cannons',
        level: 13,
        hp: 120,
        ac: 0,
        ref: 0,
        dice: '16d6',
        static: 0,
        id: 'cannons'
    },
    {
        infirmary: 2,
        garrison: 3,
        deployed: 0,
        name: 'Combat Medics',
        level: 9,
        hp: 66,
        ac: 0,
        ref: 0,
        dice: '2d6',
        static: 6,
        id: 'combatMedics'
    },
    {
        infirmary: 3,
        garrison: 4,
        deployed: 0,
        name: 'Battle Medics',
        level: 14,
        hp: 141,
        ac: 0,
        ref: 0,
        dice: '2d10',
        static: 11,
        id: 'combatMedics'
    },
    {
        school: 2,
        garrison: 3,
        deployed: 0,
        name: 'Combat Wizards',
        level: 10,
        hp: 81,
        ac: 0,
        ref: 0,
        dice: '6d6',
        static: 0,
        id: 'combatWizards'
    },
    {
        school: 3,
        garrison: 4,
        deployed: 0,
        name: 'Battle Mages',
        level: 15,
        hp: 153,
        ac: 0,
        ref: 0,
        dice: '8d6',
        static: 0,
        id: 'battleMages'
    },
    ]

let infirmaryTroopInfo = [
    {
        infirmary: 2,
        garrison: 3,
        deployed: 0,
        name: 'Combat Medics',
        level: 9,
        hp: 66,
        ac: 0,
        ref: 0,
        dice: '2d6',
        static: 6,
        id: 'combatMedics'
    },
    {
        infirmary: 3,
        garrison: 4,
        deployed: 0,
        name: 'Battle Medics',
        level: 14,
        hp: 141,
        ac: 0,
        ref: 0,
        dice: '2d10',
        static: 11,
        id: 'combatMedics'
    },
]

let schoolTroopInfo = [
    {
        school: 2,
        garrison: 3,
        deployed: 0,
        name: 'Combat Wizards',
        level: 10,
        hp: 81,
        ac: 0,
        ref: 0,
        dice: '6d6',
        static: 0,
        id: 'combatWizards'
    },
    {
        school: 3,
        garrison: 4,
        deployed: 0,
        name: 'Battle Mages',
        level: 15,
        hp: 153,
        ac: 0,
        ref: 0,
        dice: '8d6',
        static: 0,
        id: 'battleMages'
    },
]
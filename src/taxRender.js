import { actualTaxes, commonItem, economy, economyRating, uncommonItem } from "./economyStats";
import { levelCost, renderAll } from "./pageRenders";
import { baseTaxes, settlement } from "./settlementStats";

export default function taxRender() { 
    let wrapper = document.querySelector("#taxBox");
    wrapper.innerHTML = "";

    wrapper.style = "justify-content: start";
    let header = document.createElement('div');
    header.textContent = "Taxes and Items";
    header.classList.add("header");
    header.style = 'border-radius: .5rem .5rem 0 0'
    wrapper.appendChild(header);


    let baseTaxBox = document.createElement('div'); 
    baseTaxBox.classList.add('taxRow');
    

    let baseTaxLabel = document.createElement('div');
    baseTaxLabel.classList.add('taxLabel')
    baseTaxLabel.textContent = "Base Taxes:";
    baseTaxBox.appendChild(baseTaxLabel);

    let baseTaxValue = document.createElement('div');
    baseTaxValue.textContent = baseTaxes();
    baseTaxValue.classList.add('taxValue');
    baseTaxValue.style = "justify-content: center"
    baseTaxBox.appendChild(baseTaxValue);

    let taxIncBox = document.createElement('div');
    taxIncBox.classList.add('taxRow');

    let taxIncLabel = document.createElement('div');
    taxIncLabel.classList.add('taxLabel');
    taxIncLabel.textContent = "Increase %";
    taxIncBox.appendChild(taxIncLabel);

    let taxIncValBox = document.createElement('div');
    taxIncValBox.classList.add('taxValue');

    let taxIncDec = document.createElement('button');
    taxIncDec.textContent = "<";
    taxIncDec.classList.add('taxChngBtn');
    

    let taxIncVal = document.createElement('div'); 
    taxIncVal.textContent = economy.taxInc;
    taxIncVal.id = "taxIncVal";

    let taxIncInc = document.createElement('button');
    taxIncInc.classList.add('taxChngBtn');
    taxIncInc.textContent = ">";

    taxIncDec.addEventListener('click', () => {
        if(economy.taxInc > 0) {
        economy.taxInc -= 5;
        renderAll()
        };
    });

    taxIncInc.addEventListener('click', () => {      
        if(economy.taxInc <= 95) {
        economy.taxInc +=5;
        economy.taxDec = 0;
        renderAll();
        };

        if(economy.Adjusted < 0) {
            economy.taxInc -= 5;
            renderAll();
        };
    });

    taxIncValBox.appendChild(taxIncDec);
    taxIncValBox.appendChild(taxIncVal);
    taxIncValBox.appendChild(taxIncInc);
    taxIncBox.appendChild(taxIncValBox);

    let taxDecBox = document.createElement('div');
    taxDecBox.classList.add('taxRow');

    let taxDecLabel = document.createElement('div');
    taxDecLabel.classList.add('taxLabel');
    taxDecLabel.textContent = "Decrease %";
    taxDecBox.appendChild(taxDecLabel);

    let taxDecValBox = document.createElement('div');
    taxDecValBox.classList.add('taxValue');

    let taxDecDec = document.createElement('button');
    taxDecDec.textContent = "<";
    taxDecDec.classList.add('taxChngBtn');

    let taxDecVal = document.createElement('div');
    taxDecVal.id = "taxDecVal"
    taxDecVal.textContent = economy.taxDec;

    let taxDecInc = document.createElement('button');
    taxDecInc.classList.add('taxChngBtn');
    taxDecInc.textContent = ">";

    taxDecDec.addEventListener('click', () => {
        if(economy.taxDec > 0) {
            economy.taxDec -=5;
            renderAll();
        }
    })

    taxDecInc.addEventListener('click', () => {
        if(economy.taxDec <= 95) {
            economy.taxDec += 5;
            economy.taxInc = 0;
            renderAll();
        }
    })

    taxDecValBox.appendChild(taxDecDec);
    taxDecValBox.appendChild(taxDecVal);
    taxDecValBox.appendChild(taxDecInc);
    taxDecBox.appendChild(taxDecValBox);

    let aTaxesBox = document.createElement('div');
    aTaxesBox.classList.add('taxRow');

    let aTaxesLabel = document.createElement('div');
    aTaxesLabel.textContent = "Actual Taxes:";
    aTaxesLabel.style = "font-size: 16px";
    aTaxesLabel.classList.add('taxLabel');
    aTaxesBox.appendChild(aTaxesLabel);

    let aTaxesValue = document.createElement('div');
    aTaxesValue.textContent = actualTaxes();
    aTaxesValue.classList.add('taxValue');
    aTaxesValue.style = "justify-content: center";
    aTaxesBox.appendChild(aTaxesValue);

    let cItemBox = document.createElement('div');
    cItemBox.classList.add('taxRow');

    let cItemLabel = document.createElement('div');
    cItemLabel.textContent = "Common Lvl:";
    cItemLabel.classList.add('taxLabel');
    cItemLabel.style = "font-size: 15px"
    cItemBox.appendChild(cItemLabel);

    let cItemVal = document.createElement('div');
    cItemVal.textContent = commonItem();
    cItemVal.classList.add('taxValue');
    cItemVal.style = "justify-content: center";
    cItemBox.appendChild(cItemVal);

    let uItemBox = document.createElement('div');
    uItemBox.classList.add('taxRow');

    let uItemLabel = document.createElement('div');
    uItemLabel.textContent = "Uncommon Lvl:";
    uItemLabel.classList.add('taxLabel');
    uItemLabel.style = "font-size: 15px;"
    uItemBox.appendChild(uItemLabel);

    let uItemVal = document.createElement('div');
    uItemVal.textContent = uncommonItem();
    uItemVal.classList.add('taxValue');
    uItemVal.style = "justify-content: center";
    uItemBox.appendChild(uItemVal);

    let splitter =document.createElement('div');
    splitter.classList.add('header');
    splitter.textContent = 'Tax Vault';
    splitter.style = 'border-radius: 0'

    let taxVaultBox = document.createElement('div');
    taxVaultBox.classList.add('taxRow');

    let taxVaultLabel = document.createElement('div');
    taxVaultLabel.classList.add('taxLabel');
    taxVaultLabel.textContent = "Tax Vault";
    taxVaultBox.appendChild(taxVaultLabel);

    let taxVaultValue = document.createElement('div');
    taxVaultValue.textContent = settlement.vault;
    taxVaultValue.classList.add('taxValue');
    taxVaultValue.style = "justify-content: center"
    taxVaultBox.appendChild(taxVaultValue);

    let levelBox = document.createElement('div');
    levelBox.classList.add('taxRow');

    let levelLabel = document.createElement('div');
    levelLabel.classList.add('taxLabel');
    levelLabel.textContent = 'Level Up Cost';
    levelBox.appendChild(levelLabel);

    let levelValue = document.createElement('div');
    levelValue.classList.add('taxValue');
    levelValue.textContent = levelCost();
    levelBox.appendChild(levelValue);
    
    
    wrapper.appendChild(baseTaxBox);
    wrapper.appendChild(taxIncBox);
    wrapper.appendChild(taxDecBox);
    wrapper.appendChild(aTaxesBox);
    wrapper.appendChild(cItemBox);
    wrapper.appendChild(uItemBox);
    wrapper.appendChild(splitter);
    wrapper.appendChild(taxVaultBox);
    wrapper.appendChild(levelBox);
}


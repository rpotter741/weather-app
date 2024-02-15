import { economy, prodCurrent, tradeCurrent } from "./economyStats";
import { renderAll } from "./pageRenders";
import { garCurrent, intelCurrent, safety } from "./safetyStats";
import { settlement, vaultAdd } from "./settlementStats";
import { shopStatus } from "./shopWindow";
import { foodCurrent, medCurrent, supCurrent, survival } from "./survivalStats";
import taxRender from "./taxRender";

function shopInterface() {
    ////////FOOD ROW////////
        let wrapper = document.querySelector('#shopWrapper');
        wrapper.innerHTML = ""

        let shopWrapper = document.createElement('div');
        
    
        let foodRow = document.createElement('div');
        foodRow.classList.add('shopRow');
    
        let foodLabel = document.createElement('div');
        foodLabel.textContent = "Food:";
        foodLabel.classList.add('shopLabel');
        foodRow.appendChild(foodLabel);
    
        let foodBSBox = document.createElement('div');
        foodBSBox.classList.add('bsBox');
    
        let foodDec = document.createElement('button');
        foodDec.textContent = "<";
        foodDec.classList.add('shopBtn');
    
        let foodValue = document.createElement('div');
        foodValue.textContent = shoppingList.food;
    
        let foodInc = document.createElement('button');
        foodInc.textContent = ">";
        foodInc.classList.add('shopBtn');
    
        foodDec.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.food > 0) {
                    shoppingList.food--
                    shoppingList.value -= foodCost();
                    shopInterface();
                    return;
                }
            } else {
                if(shoppingList.food > 0) {
                    survival.foodC++;
                    renderAll();
                    shoppingList.food--
                    shoppingList.value -= foodProfit();
                    shopInterface();
                    return;
                }
            }
        })
    
        foodInc.addEventListener('click', () => {
                if(shopStatus == 0) {
                    if(shoppingList.value + foodCost() < settlement.vault) {
                        shoppingList.food++;
                        shoppingList.value += foodCost();
                        shopInterface();
                    }                 
                    
                } else if(survival.foodC > 0) {
                    survival.foodC--;
                    shoppingList.food++;
                    shoppingList.value += foodProfit();
                    renderAll();
                    shopInterface();

                }
        }), 
    
        foodBSBox.appendChild(foodDec);
        foodBSBox.appendChild(foodValue);
        foodBSBox.appendChild(foodInc);
        foodRow.appendChild(foodBSBox)
    
        shopWrapper.appendChild(foodRow);
    
    ////////SUPPLIES ROW////////
    
        let supRow = document.createElement('div');
        supRow.classList.add('shopRow');
    
        let supLabel = document.createElement('div');
        supLabel.textContent = "Supplies:";
        supLabel.classList.add('shopLabel');
        supRow.appendChild(supLabel);
    
        let supBSBox = document.createElement('div');
        supBSBox.classList.add('bsBox');
    
        let supDec = document.createElement('button');
        supDec.textContent = "<";
        supDec.classList.add('shopBtn');
    
        let supValue = document.createElement('div');
        supValue.textContent = shoppingList.sup;
    
        let supInc = document.createElement('button');
        supInc.textContent = ">";
        supInc.classList.add('shopBtn');
    
        supDec.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.sup > 0) {
                    shoppingList.sup--
                    shoppingList.value -= supCost();
                    shopInterface();
                    return;
                }
            } else {
                if(shoppingList.sup > 0) {
                    survival.supC++;
                    renderAll();
                    shoppingList.sup--
                    shoppingList.value -= supProfit();
                    shopInterface();
                    return;
                }
            }
        })
    
        supInc.addEventListener('click', () => {
                if(shopStatus == 0) {
                    if(shoppingList.value + supCost() < settlement.vault) {
                        shoppingList.sup++;
                        shoppingList.value += supCost();
                        shopInterface();
                    }
                } else {
                    if(survival.supC > 0) {
                        survival.supC--;
                        renderAll();
                        shoppingList.sup++
                        shoppingList.value += supProfit();
                        shopInterface();
                    }
                }
        }), 
    
        supBSBox.appendChild(supDec);
        supBSBox.appendChild(supValue);
        supBSBox.appendChild(supInc);
        supRow.appendChild(supBSBox)
    
        shopWrapper.appendChild(supRow);
    
    ////////MED ROW////////
    
        let medRow = document.createElement('div');
        medRow.classList.add('shopRow');
    
        let medLabel = document.createElement('div');
        medLabel.textContent = "Medicine:";
        medLabel.classList.add('shopLabel');
        medRow.appendChild(medLabel);
    
        let medBSBox = document.createElement('div');
        medBSBox.classList.add('bsBox');
    
        let medDec = document.createElement('button');
        medDec.textContent = "<";
        medDec.classList.add('shopBtn');
    
        let medValue = document.createElement('div');
        medValue.textContent = shoppingList.med;
    
        let medInc = document.createElement('button');
        medInc.textContent = ">";
        medInc.classList.add('shopBtn');
    
        medDec.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.med > 0) {
                    shoppingList.med--
                    shoppingList.value -= medCost();
                    shopInterface();
                    return;
                }
            } else {
                if(shoppingList.med > 0) {
                    survival.medC++;
                    renderAll();
                    shoppingList.med--
                    shoppingList.value -= medProfit()
                    shopInterface();
                    return;
                }
            }
        })
    
        medInc.addEventListener('click', () => {
                if(shopStatus == 0) {
                    if(shoppingList.value + medCost() < settlement.vault) {
                        shoppingList.med++;
                        shoppingList.value += medCost();
                        shopInterface();
                    }
                } else {
                    if(survival.medC > 0) {
                        survival.medC--;
                        renderAll();
                        shoppingList.med++;
                        shoppingList.value += medProfit();
                        shopInterface();
                    }
                }
        }), 
    
        medBSBox.appendChild(medDec);
        medBSBox.appendChild(medValue);
        medBSBox.appendChild(medInc);
        medRow.appendChild(medBSBox)
    
        shopWrapper.appendChild(medRow);
    
        /////////SCOUT ROW////////
    
        let scoutRow = document.createElement('div');
        scoutRow.classList.add('shopRow');
        
        let scoutLabel = document.createElement('div');
        scoutLabel.textContent = "Scouts:";
        scoutLabel.classList.add('shopLabel');
        scoutRow.appendChild(scoutLabel);
        
        let scoutBSBox = document.createElement('div');
        scoutBSBox.classList.add('bsBox');
        
        let scoutDec = document.createElement('button');
        scoutDec.textContent = "<";
        scoutDec.classList.add('shopBtn');
        
        let scoutValue = document.createElement('div');
        scoutValue.textContent = shoppingList.scout;
        
        let scoutInc = document.createElement('button');
        scoutInc.textContent = ">";
        scoutInc.classList.add('shopBtn');
        
        scoutDec.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.scout > 0) {
                    shoppingList.scout--
                    shoppingList.value -= scoutCost();
                    shopInterface();
                    return;
                }
            } else {
                if(shoppingList.scout > 0) {
                    safety.intelC++;
                    renderAll();
                    shoppingList.scout--
                    shoppingList.value -= scoutProfit();
                    shopInterface();
                    return;
                }
            }
        })
        
        scoutInc.addEventListener('click', () => {
                if(shopStatus == 0) {
                    if(shoppingList.value + scoutCost() < settlement.vault) {
                        shoppingList.scout++;
                        shoppingList.value += scoutCost();
                        shopInterface();
                    }
                } else {
                    if(safety.intelC > 0) {
                        safety.intelC--;
                        renderAll();
                        shoppingList.scout++;
                        shoppingList.value += scoutProfit();
                        shopInterface();
                    }
                }
        }), 
        
        scoutBSBox.appendChild(scoutDec);
        scoutBSBox.appendChild(scoutValue);
        scoutBSBox.appendChild(scoutInc);
        scoutRow.appendChild(scoutBSBox)
        
        shopWrapper.appendChild(scoutRow);
    
        ////////GUARDS ROW////////
    
        let garRow = document.createElement('div');
        garRow.classList.add('shopRow');
        
        let garLabel = document.createElement('div');
        garLabel.textContent = "Guards:";
        garLabel.classList.add('shopLabel');
        garRow.appendChild(garLabel);
        
        let garBSBox = document.createElement('div');
        garBSBox.classList.add('bsBox');
        
        let garDec = document.createElement('button');
        garDec.textContent = "<";
        garDec.classList.add('shopBtn');
        
        let garValue = document.createElement('div');
        garValue.textContent = shoppingList.gar;
        
        let garInc = document.createElement('button');
        garInc.textContent = ">";
        garInc.classList.add('shopBtn');
        
        garDec.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.gar > 0) {
                    shoppingList.gar--
                    shoppingList.value -= garCost();
                    shopInterface();
                    return;
                }
            } else {
                if(shoppingList.gar > 0) {
                    safety.garC++;
                    renderAll();
                    shoppingList.gar--
                    shoppingList.value -= garProfit();
                    shopInterface();
                    return;
                }
            }
        })
        
        garInc.addEventListener('click', () => {
                if(shopStatus == 0) {
                    if(shoppingList.value + garCost() < settlement.vault) {
                        shoppingList.gar++;
                        shoppingList.value += garCost();
                        shopInterface();
                    }
                } else {
                    if(safety.garC > 0) {
                        safety.garC--;
                        renderAll();
                        shoppingList.gar++;
                        shoppingList.value += garProfit();
                        shopInterface();
                    }
                }
        }), 
        
        garBSBox.appendChild(garDec);
        garBSBox.appendChild(garValue);
        garBSBox.appendChild(garInc);
        garRow.appendChild(garBSBox)
        
        shopWrapper.appendChild(garRow);
    
        /////WAGON ROW////
        
        let wagonRow = document.createElement('div');
        wagonRow.classList.add('shopRow');
    
        let wagonLabel = document.createElement('div');
        wagonLabel.textContent = "Wagons:";
        wagonLabel.classList.add('shopLabel');
        wagonRow.appendChild(wagonLabel);
    
        let wagonBSBox = document.createElement('div');
        wagonBSBox.classList.add('bsBox');
    
        let wagonDec = document.createElement('button');
        wagonDec.textContent = "<";
        wagonDec.classList.add('shopBtn');
    
        let wagonValue = document.createElement('div');
        wagonValue.textContent = shoppingList.wagon;
    
        let wagonInc = document.createElement('button');
        wagonInc.textContent = ">";
        wagonInc.classList.add('shopBtn');
    
        wagonDec.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.wagon > 0) {
                    shoppingList.wagon--
                    shoppingList.value -= wagonCost();
                    shopInterface();
                    return;
                }
            } else {
                if(shoppingList.wagon > 0) {
                    economy.tradeC++;
                    renderAll();
                    shoppingList.wagon--
                    shoppingList.value -= wagonProfit();
                    shopInterface();
                    return;
                }
            }
        })
    
        wagonInc.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.value + wagonCost() < settlement.vault) {
                    shoppingList.wagon++;
                    shoppingList.value += wagonCost();
                    shopInterface();
                }
            } else {
                if(economy.tradeC > 0) {
                    economy.tradeC--;
                    renderAll();
                    shoppingList.wagon++;
                    shoppingList.value += wagonProfit();
                    shopInterface();
                }
            }
            }
    ), 
    
        wagonBSBox.appendChild(wagonDec);
        wagonBSBox.appendChild(wagonValue);
        wagonBSBox.appendChild(wagonInc);
        wagonRow.appendChild(wagonBSBox)
    
        shopWrapper.appendChild(wagonRow);
    
        ////////TOOLS ROW////////
    
    let toolsRow = document.createElement('div');
    toolsRow.classList.add('shopRow');
    
    let toolsLabel = document.createElement('div');
    toolsLabel.textContent = "Tools:";
    toolsLabel.classList.add('shopLabel');
    toolsRow.appendChild(toolsLabel);
    
    let toolsBSBox = document.createElement('div');
    toolsBSBox.classList.add('bsBox');
    
    let toolsDec = document.createElement('button');
    toolsDec.textContent = "<";
    toolsDec.classList.add('shopBtn');
    
    let toolsValue = document.createElement('div');
    toolsValue.textContent = shoppingList.tools;
    
    let toolsInc = document.createElement('button');
    toolsInc.textContent = ">";
    toolsInc.classList.add('shopBtn');
    
    toolsDec.addEventListener('click', () => {
        if(shopStatus == 0) {
            if(shoppingList.tools > 0) {
                shoppingList.tools--
                shoppingList.value -= toolsCost();
                shopInterface();
                return;
            }
        } else {
            if(shoppingList.tools > 0) {
                economy.prodC++;
                renderAll();
                shoppingList.tools--;
                shoppingList.value -= toolsProfit();
                shopInterface();
                return;
            }
        }
    })
    
    toolsInc.addEventListener('click', () => {
            if(shopStatus == 0) {
                if(shoppingList.value + toolsCost() < settlement.vault) {
                    shoppingList.tools++;
                    shoppingList.value += toolsCost();
                    shopInterface();
                }
            } else {
                if(economy.prodC > 0) {
                    economy.prodC--;
                    renderAll();
                    shoppingList.tools++;
                    shoppingList.value += toolsProfit();
                    shopInterface();
                }
            }
    }), 
    
    toolsBSBox.appendChild(toolsDec);
    toolsBSBox.appendChild(toolsValue);
    toolsBSBox.appendChild(toolsInc);
    toolsRow.appendChild(toolsBSBox)
    
    shopWrapper.appendChild(toolsRow);


////////BUY SELL INTERFACE////////
    let bsRow = document.createElement('div');
    bsRow.classList.add('bsRow','subHeader','center');

    let cxBtn = document.createElement('button');
    cxBtn.style = 'width: 20%; margin: 1rem; border-radius: .5rem; text-align: center; font-size: 15px'
    cxBtn.id = 'shopCXBtn';
    cxBtn.textContent ="Clear";
    cxBtn.addEventListener('click', () => {
        cancelTrade();
    })
    bsRow.appendChild(cxBtn);

    let tradeValue = document.createElement('div');
    tradeValue.id = 'tradeValue';
    if(shopStatus == 0) {
        tradeValue.classList.add('buy');
    } else if(shopStatus ==1) {
        tradeValue.classList.add('sell');
    }
    tradeValue.textContent = shoppingList.value;
    bsRow.appendChild(tradeValue);

    let buysellBtn = document.createElement('button');
    buysellBtn.style = 'height: 100%; width: 20%; margin: 1rem; border-radius: .5rem; font-size: 15px'
    if(shopStatus == 0) {
        buysellBtn.textContent = "Buy";
    } else {
        buysellBtn.textContent = "Sell";
    }
    buysellBtn.addEventListener('click', () => {
        confirmTrade();
    })
    bsRow.appendChild(buysellBtn);
    shopWrapper.appendChild(bsRow);

    wrapper.appendChild(shopWrapper);
    
}

    
    let shoppingList = {
        food: 0,
        sup: 0,
        med: 0,
        scout: 0,
        gar: 0,
        wagon: 0,
        tools: 0,
        value: 0    
    };

    function cancelTrade() {
        clearList();
        shopInterface();
    }
    
    function confirmTrade() {
        if(shopStatus == 0) {
            foodCurrent(shoppingList.food);
            supCurrent(shoppingList.sup);
            medCurrent(shoppingList.med);
            intelCurrent(shoppingList.scout);
            garCurrent(shoppingList.gar);
            tradeCurrent(shoppingList.wagon);
            prodCurrent(shoppingList.tools);
            vaultAdd(-shoppingList.value);
            zeroList();
            renderAll();
            taxRender();
            shopInterface();
        } else {
            if(shopStatus == 1) {
                vaultAdd(shoppingList.value);
                zeroList();
                renderAll();
                taxRender();
                shopInterface();
            }
        }
    }

    function zeroList() {
        shoppingList.food = 0;
        shoppingList.sup = 0;
        shoppingList.med = 0;
        shoppingList.scout = 0;
        shoppingList.gar = 0;
        shoppingList.wagon = 0;
        shoppingList.tools = 0;
        shoppingList.value = 0;
    }

    function clearList() {
        if(shopStatus == 1) {
            survival.foodC += shoppingList.food;
            survival.supC += shoppingList.sup;
            survival.medC += shoppingList.med;
            safety.intelC += shoppingList.scout;
            safety.garC += shoppingList.gar;
            economy.tradeC += shoppingList.wagon;
            economy.prodC += shoppingList.tools;
        }         
        zeroList();
        renderAll();
    }
    
    function foodCost() {
        return parseInt((settlement.level * 5).toFixed(0));
    }
    
    function foodProfit() {
        return parseInt((settlement.level * 2.5).toFixed(0));
    }

    function supCost() {
        return parseInt((settlement.level * 15).toFixed(0));
    }

    function supProfit() {
        return parseInt((settlement.level * 7.5).toFixed(0));
    }

    function medCost() {
        return parseInt((settlement.level * 25).toFixed(0));
    }

    function medProfit() {
        return parseInt((settlement.level * 12.5).toFixed(0));
    }

    function scoutCost() {
        return parseInt((settlement.level * 20).toFixed(0));
    }

    function scoutProfit() {
        return parseInt((settlement.level * 10).toFixed(0));
    }

    function garCost() {
        return parseInt((settlement.level * 40).toFixed(0));
    }

    function garProfit() {
        return parseInt((settlement.level * 20).toFixed(0));
    }

    function wagonCost() {
        return parseInt((settlement.level * 30).toFixed(0));
    }

    function wagonProfit() {
        return parseInt((settlement.level * 15).toFixed(0));
    }

    function toolsCost() {
        return parseInt((settlement.level * 18).toFixed(0));
    }

    function toolsProfit() {
        return parseInt((settlement.level * 9).toFixed(0));
    }

export {clearList, shopInterface}
import { setBuildings } from "./buildingsStats";
import { setCount } from "./compileEvent";
import { setEconomy } from "./economyStats";
import { refreshPage, renderAll } from "./pageRenders";
import { setProjects } from "./projectBoxRender";
import { setDeployed } from "./renderDeployed";
import { setNotes, userNotes,} from "./renderNotes";
import { setNonselectedUpgrades, setSelectedLevels, setSelectedUpgrades } from "./renderUpgrades";
import { setSafety } from "./safetyStats";
import { setSettlement, settlement } from "./settlementStats";
import { saveSettlement, settlementList } from "./storage";
import { setSurvival } from "./survivalStats";
import { setChangeLog, setWeekLog } from "./weekLog";

let loadOption = 'none';

function swapButtonRender() {
    let wrapper = document.querySelector('body');
    
    let swap = document.createElement('button');
    swap.textContent = 'Change Settlements'
    swap.style = 'position: absolute; top: 0; left: 0; border-radius: 1rem'
    swap.addEventListener('click', () => {
        openSettlementSwap()
    })

    wrapper.appendChild(swap);
}

function openSettlementSwap() {
    let wrapper = document.querySelector('body');

    let overlay = document.createElement('div');
    overlay.id = 'changeOverlay'
    overlay.style = 'background: rgba(0,0,0,.5); height: 100vh; width: 100vw; position: absolute; top: 0; left: 0; z-index: 1'
    overlay.addEventListener('click', () => {
        document.querySelector('#changeOverlay').remove();
        document.querySelector('#changeBox').remove();
    })
    wrapper.appendChild(overlay);

    let box = document.createElement('div');
    box.style = 'width: 60rem; height: 30rem; position: absolute; top: calc(50% - 15rem); left: calc(50% - 30rem); z-index: 1; background: aliceblue; border-radius: 1rem; border: 2px solid rgba(0,0,0,.5)';
    box.id = 'changeBox'

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.style = 'border-radius: 1rem 1rem 0 0; padding: 1rem';

    let backBox = document.createElement('div');
    backBox.style = 'width: 25%; display: flex; justify-content: center; align-items: center'

    let backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.style = 'border-radius: 1rem'
    backBtn.addEventListener('click', () => {
        document.querySelector('#changeOverlay').remove();
        document.querySelector('#changeBox').remove();
    })
    backBox.appendChild(backBtn);
    header.appendChild(backBox);

    let textBox = document.createElement('div');
    textBox.textContent = 'Change Settlements';
    textBox.style = 'display: flex; justify-content: center; align-items: center; font-size: 22px; width: 50%'
    header.appendChild(textBox)

    let newBox = document.createElement('div');
    newBox.style = 'width: 25%;'
    header.appendChild(newBox);
    box.appendChild(header)

    let displayArea = document.createElement('div');
    displayArea.style = 'display: flex; flex-wrap: wrap; width: 100%'
    displayArea.id = 'settlementChangeArea'
    box.appendChild(displayArea);
    wrapper.appendChild(box);

    settlementChangeArea()

}



function settlementChangeArea() {
    let displayArea = document.querySelector('#settlementChangeArea')
    displayArea.innerHTML = '';

    let chooseRow = document.createElement('div');
    chooseRow.classList.add('flexRow','center','gap')
    chooseRow.style = 'width: 100%; padding: 2rem';

    let selectLabel = document.createElement('div');
    selectLabel.textContent = 'Select Settlement'
    chooseRow.appendChild(selectLabel);

    let selectorBox = document.createElement('div');

    let selector = document.createElement('select');
    selector.style = 'width: 100%';



    let selectOption = document.createElement('option');
    selectOption.value = 'none';
    selectOption.label = '-Select-';
    selector.appendChild(selectOption);    

    Object.keys(settlementList).forEach((item) => {
        let town = settlementList[item]

        let option = document.createElement('option');
        option.value = item;
        option.label = town["Settlement Data"].name;
        selector.appendChild(option);

    })

    let newOption = document.createElement('option');
    newOption.value = 'create';
    newOption.label = '-Create New-';
    selector.appendChild(newOption);

    selectorBox.appendChild(selector);
    chooseRow.appendChild(selectorBox);
    displayArea.appendChild(chooseRow);

    selector.value = loadOption

    let inputRow = document.createElement('div');
    inputRow.classList.add('flexRow','center','gap');
    inputRow.style = 'align-items: center; width: 100%; margin: 0 2rem 2rem'
    
    let inputLabel = document.createElement('div');
    inputLabel.textContent = 'New Settlement Name:'
    inputRow.appendChild(inputLabel);

    let input = document.createElement('input');
    input.style = 'width: 25%'
    inputRow.appendChild(input);

    let buttonRow = document.createElement('div');
    buttonRow.classList.add('flexRow','center');
    buttonRow.style = 'gap: 4rem; width: 100%; padding: 0 2rem'

    let createBox = document.createElement('div');
    let createBtn = document.createElement('button');
    createBtn.textContent = 'Create';
    createBtn.addEventListener('click', () => {
        let newSettlement = input.value;
        createNewSettlement(newSettlement);
        let set = settlementList[input.value];

        setSettlement(set["Settlement Data"]);
        setSurvival(set["Survival Data"]);
        setSafety(set["Safety Data"]);
        setEconomy(set["Economy Data"]);
        setBuildings(set["Building Data"]);
        setProjects(set["Project Data"]);
        setDeployed(set["Deployed Data"]);
        setNotes(set["Notes Data"]);
        setSelectedUpgrades(set["Selected Upgrades Data"]);
        setSelectedLevels(set["Selected Levels Data"]);
        setNonselectedUpgrades(set["Nonselected Upgrades Data"]);
        setCount(set["Project Count Data"]);
        setWeekLog(set["Week Log Data"]);
        setChangeLog(set["Change Log Data"]);
        document.querySelector('body').innerHTML = '';
        refreshPage();
        loadOption = 'none'


    })
    createBox.appendChild(createBtn);

    let switchBox = document.createElement('div');
    let switchBtn = document.createElement('button');
    switchBtn.textContent = 'Switch';
    switchBtn.addEventListener('click', () => {
            saveSettlement([settlement.name])

            let set = settlementList[selector.value];

            setSettlement(set["Settlement Data"]);
            setSurvival(set["Survival Data"]);
            setSafety(set["Safety Data"]);
            setEconomy(set["Economy Data"]);
            setBuildings(set["Building Data"]);
            setProjects(set["Project Data"]);
            setDeployed(set["Deployed Data"]);
            setNotes(set["Notes Data"]);
            setSelectedUpgrades(set["Selected Upgrades Data"]);
            setSelectedLevels(set["Selected Levels Data"]);
            setNonselectedUpgrades(set["Nonselected Upgrades Data"]);
            setCount(set["Project Count Data"]);
            setWeekLog(set["Week Log Data"]);
            setChangeLog(set["Change Log Data"]);
            console.log(set["Week Log Data"]);
            console.log(set["Change Log Data"]);
            document.querySelector('body').innerHTML = '';
            refreshPage();
            loadOption = 'none';

            })
    
    switchBox.appendChild(switchBtn);

    let resetBox = document.createElement('div');
    let resetBtn = document.createElement('button');
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener('click', () => {
        let answer3 = confirm(`Are you sure you want to reset ${selector.value}?`)

        if(answer3 == true) {
            resetSettlement(selector.value);
            document.querySelector('body').innerHTML = '';
            refreshPage();
            location.reload()
            loadOption = 'none'
        }
    })
    resetBox.appendChild(resetBtn);

    let deleteBox = document.createElement('div');
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        let answer4 = confirm("Are you sure you want to delete this Settlement?");

        if(answer4 == true) {
            delete settlementList[selector.value];
            
            if(Object.keys(settlementList).length == 0) {
                let response = prompt('Enter new Settlement Name');
                createNewSettlement(response);
            }

            let item = Object.keys(settlementList)[0];

            let set = settlementList[item];

            setSettlement(set["Settlement Data"]);
            setSurvival(set["Survival Data"]);
            setSafety(set["Safety Data"]);
            setEconomy(set["Economy Data"]);
            setBuildings(set["Building Data"]);
            setProjects(set["Project Data"]);
            setDeployed(set["Deployed Data"]);
            setNotes(set["Notes Data"]);
            setSelectedUpgrades(set["Selected Upgrades Data"]);
            setSelectedLevels(set["Selected Levels Data"]);
            setNonselectedUpgrades(set["Nonselected Upgrades Data"]);
            setCount(set["Project Count Data"]);
            setWeekLog(set["Week Log Data"]);
            setChangeLog(set["Change Log Data"]);
            loadOption = 'none';
            document.querySelector('body').innerHTML = '';
            refreshPage();
            openSettlementSwap()
            
        }
    })
    deleteBox.appendChild(deleteBtn);

    let box = document.querySelector('#changeBox')
    box.appendChild(displayArea);

    selector.addEventListener('change', () => {
        loadOption = selector.value;

        if(selector.value != 'create' && selector.value != '' && selector.value != settlement.name) {
            settlementChangeArea();
            buttonRow.appendChild(switchBox);
            buttonRow.appendChild(resetBox);
            buttonRow.appendChild(deleteBox);
            displayArea.appendChild(buttonRow);
        } else if(selector.value == settlement.name) {
            settlementChangeArea();
            buttonRow.appendChild(resetBox);
            buttonRow.appendChild(deleteBox);
            displayArea.appendChild(buttonRow);
        } else if(selector.value == 'create') {
            settlementChangeArea();
            buttonRow.appendChild(createBox);
            displayArea.appendChild(inputRow);
            displayArea.appendChild(buttonRow);
        } else if(selector.value == 'none') {
            settlementChangeArea();

        }
    })
    
    }


function createNewSettlement(inputName) {
    let settlementCount = Object.keys(settlementList).length;
    settlementCount++;

    let newName = 'Settlement ' + settlementCount;

    if(inputName == '') {
        inputName = newName;
    }

    settlementList[inputName] = {
        "Settlement Data": {
            name: inputName,
            level: 3,
            currentHealth: 100,
            maxHealthBase: 100,
            maxHealthBonus: 0,
            settlementPoints: 0,
            weeksPassed: 0,
            drought: false,
            type: 0,
            vault: 385,
            notes: '',
        
        },
        "Survival Data": {
            Base: 0,
            Adjusted: 0,
            Rating: 0,
            Bonus: 0,
            foodB: 0,
            foodC: 9,
            foodM: 0,
            supB: 0,
            supC: 5,
            supM: 0,
            medB: 0,
            medC: 3,
            medM: 0
        },
        "Safety Data": {
            Base: 0,
            Adjusted: 0,
            Rating: 0,
            Bonus: 0,
            status: '',
            diB: 0,
            diC: 2,
            diM: 0,
            intelB: 0,
            intelC: 2,
            intelM: 0,
            garB: 0,
            garC: 3,
            garM: 0
        },
        "Economy Data": {
            Base: 0,
            Adjusted: 0,
            Rating: 0,
            status: '',
            Bonus: 0,
            tradeB: 0,
            tradeC: 6,
            tradeM: 0,
            prodB: 0,
            prodC: 4,
            prodM: 0,
            taxInc: 0,
            taxDec: 0,
        },
        "Building Data": [
            {
                name: 'Walls',
                id: 'wa',
                level: 0,
                status: "You haven't built any walls yet.",
                level0: {
                    name: 'No Walls',
                    desc: 'Having no walls is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Pallisade Walls',
                    desc: 'Pallisade walls are a great first line of defense against unorganized attacks or attacks from mindless creatures. They increase Defensive Infrastructure Bonus by +1 and Settlement Max Health by +5.',
                    prod: 14,
                    level: 2,
                    rewards: {
                        di: 1,
                        maxHealth: 5
                    },
                    status: "You have Pallisade Walls, granting you a Defense Bonus of +1 and Max Health bonus of +5",
                    gold: 350,
                    supplies: 8,
        
                },
                level2: {
                    name: 'Stone Walls',
                    desc: 'Stone Walls are a significant improvement over Pallisade Walls, proving difficult for all but the most militant of attackers. They increase Defensive Infrastructure Bonus by +1 and increase Settlement Max Health by +10.',
                    prod: 21,
                    level: 6,
                    rewards: {
                        di: 1,
                        maxHealth: 10
                    },
                    status: "You have Stone Walls, granting you a total Defense Bonus of +2 and total Max Health Bonus of +15 ",
                    gold: 1200,
                    supplies: 10,
                },
                level3: {
                    name: 'Reinforced Stone Walls',
                    desc: 'Reinforced Stone Walls are the epitome of static settlement protection. They increase Defensive Infrastructure and Intelligence bonuses by +1 and increase Settlement Max Health by +20.',
                    prod: 28,
                    level: 10,
                    rewards: {
                        di: 1,
                        intel: 1,
                        maxHealth: 20
                    },
                    status: "You have Reinforced Stone Walls, granting you a total Defense Bonus of +3, an Intelligence Bonus of +1, and a Max Health Bonus of +35.",
                    gold: 3200,
                    supplies: 20
        
                }
            },
            {
                name: 'Wells',
                id: 'we',
                level: 0,
                status: "You haven't built any wells yet.",
                level0: {
                    name: 'No Well',
                    desc: 'Having no well is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Simple Well',
                    desc: 'Building a simple Well reduces the Health damage from being without water for a week from 25 to 20; it also reduces the impact of Drought Events by 1.',
                    prod: 7,
                    level: 1,
                    rewards: {},
                    status: "You have a Simple Well, reducing weekly health loss from a lack of water from 25 to 20; Drought Event Impacts reduced by 1",
                    gold: 100,
                    supplies: 2
                },
                level2: {
                    name: 'Simple Well Network',
                    desc: 'Building a Simple Well Network expands the capacity of groundwater access. It further reduces the Health damage from being without water for a week from 20 to 15 and also reduces the impact of Drought Events by 2.',
                    prod: 10,
                    level: 5,
                    rewards: {},
                    status: "You have a Simple Well Network, reducing weekly health loss from a lack of water from 20 - 15; Drought Event Impacts reduced by 2",
                    gold: 200,
                    supplies: 6,
                },
                level3: {
                    name: 'Evaporation Collectors',
                    desc: 'Building Evaporation Collectors provides much better water retention for the well network. This upgrade ensures the settlement always has access to water and futher decreases the impact from Drought Events by 3.',
                    prod: 14,
                    level: 8,
                    rewards: {},
                    status: "You have Evaporation Collectors, removing health loss from a lack of water; Drought Impact Events reduced by 4",
                    gold: 800,
                    supplies: 14
        
                }
                
            },
            {
                name: 'Network',
                id: 'ne',
                level: 0,
                status: "You haven't built an Intelligence Network yet.",
                level0: {
                    name: 'No Intelligence Network',
                    desc: 'Having no Intelligence Network is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Community Watch Hub',
                    desc: "Building a Community Watch Hub is a solid start to improving leadership's knowledge of internal affairs - particularly those things that aren't generally made public. It provides and Intelligence Bonus of +1.",
                    prod: 10,
                    level: 3,
                    rewards: {
                        intel: 1
                    },
                    status: "You have a Community Watch Hub, increasing your Intelligence Bonus by +1",
                    gold: 150,
                    supplies: 2,
                    intelligence: 2
                },
                level2: {
                    name: 'Planted Merchants',
                    desc: "Funding Planted Merchants provides a much wider berth of knowledge about the goings on in and around town. It provides an Intelligence Bonus of +1 and prevents you from losing Intelligence every week.",
                    prod: 18,
                    level: 7,
                    rewards: {
                        intel: 1
                    },
                    status: "You have Planted Merchants, increasing your Intelligence Bonus by +2 and preventing weekly Intel loss.",
                    gold: 900,
                    supplies: 6,
                    intelligence: 4
                },
                level3: {
                    name: 'Sensitive Compartmented Information Facility (SCIF)',
                    desc: "Building a SCIF ensures intelligence remains the sole property of the leadership of the settlement. It Increase Intelligence Bonus by +2 and allows you to convert Garrison into Intelligence.",
                    prod: 21,
                    level: 11,
                    rewards: {
                        intel: 2
                    },
                    status: "You have a SCIF, increasing your Intelligence Bonus by +4, preventing weekly Intel Loss, and unlocking the 'Active ISR' Action",
                    gold: 3000,
                    supplies: 15,
                    intelligence: 7
        
                }
            },
            {
                name: 'Barracks',
                id: 'ba',
                level: 0,
                status: "You haven't upgraded the Barracks yet.",
                level0: {
                    name: 'Standard Barracks',
                    desc: 'Having a standard Barracks is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Kitchen',
                    desc: "Building a Kitchen ensures garrisoned forces are well fed at all times and can support more strenuous training exercises. This upgrade unlocks Militia Cavalry and Militia Pikemen, as well as the 'Feed the Troops' action, which allows you to convert Food into Garrison at a 6-1 rate. Finally, it grants a Garrison Bonus of +1.",
                    prod: 7,
                    level: 2,
                    rewards: {
                        gar: 1
                    },
                    status: "You have built a Kitchen, increasing your Garrison Bonus by +1. See Troop Info for unlocks; 'Feed the Troops' Action",
                    gold: 300,
                    supplies: 4,
                    food: 4
                },
                level2: {
                    name: 'Training Ground',
                    desc: "Building a Training Ground allows garrisoned forces to complete regular training exercises in a variety of circumstances. It unlocks Guard Infantry, Guard Archers, Guard Pikemen, and Guard Cavalry troop and provides a Garrison Bonus of +1.",
                    prod: 10,
                    level: 6,
                    rewards: {
                        gar: 1
                    },
                    status: "You have a Training Ground, increasing Garrison Bonus by +2. See Troop Info for unlocks; 'Feed the Troops' Action",
                    gold: 900,
                    supplies: 10,
                    'medical capacity': 4
                },
                level3: {
                    name: 'War Room',
                    desc: "Building a War Room allows garrisoned units to study battles, engage in theoretical wartime discussions, and maintain tactical capabilities on larger scales. It unlocks Soldier Infantry, Longbowmen, Phalanx, and Cannon troops and provides a Garrison Bonus of +1.",
                    prod: 20,
                    level: 11,
                    rewards: {
                        gar: 1
                    },
                    status: "You have a War Room, increasing your Garrison Bonus by +4. See Troop Info for unlocks; 'Feed the Troops' Action",
                    gold: 3100,
                    supplies: 16,
                    intelligence: 4
        
                }
            },
            {
                name: 'Granary',
                id: 'gr',
                level: 0,
                status: "You haven't built a Granary yet.",
                level0: {
                    name: 'No Granary',
                    desc: 'Having no Granary is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Improved Sifters',
                    desc: "Building Improved Sifters allows finer flours to be separated from unrefined grains, increasing operating efficiency of the granary. This increases Food Bonus by +1, grants +2 Food points per week, and unlocks the Harvest Action, allowing you to convert Productivity into Food at a 2-1 ratio.",
                    prod: 7,
                    level: 2,
                    rewards: {
                        food: 1
                    },
                    status: "You have Improved Sifters, increasing your Food Bonus by +1; Food Points +2 per week; 'Harvest' Action",
                    gold: 125,
                    supplies: 4
                },
                level2: {
                    name: 'Reinforced Silos',
                    desc: "Building Reinforced Silos greatly improves the settlement's capacity for storing food and ensures it remains viable for longer. This increases Food Bonus by +1 and grants a total of +4 Food points per week.",
                    prod: 14,
                    level: 6,
                    rewards: {
                        food: 1
                    },
                    status: "You have Reinforced Silos, increasing your Food Bonus by +2; Food Points +4 per week; 'Harvest' Action",
                    gold: 700,
                    supplies: 10,
                },
                level3: {
                    name: 'Reinforced Grinder',
                    desc: "Building a Reinforced Grinder greatly improves the speed with which harvested grain can be turned into a usable product. This increases Food Bonus by +2 and grants a total of +7 Food points per week.",
                    prod: 16,
                    level: 10,
                    rewards: {
                        food: 2
                    },
                    status: "You have Reinforced Grinder, increasing your Food Bonus by +4; Food Points +7 per week; 'Harvest' Action",
                    gold: 2800,
                    supplies: 15
        
                }
            },
            {
                name: 'Market',
                id: 'ma',
                level: 0,
                status: "You haven't upgraded the Market yet.",
                level0: {
                    name: 'Standard Market',
                    desc: 'Having a Standard Market is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Legal Fence',
                    desc: "Funding a Legal Fence ensures more products reach the market, driving higher trade. This increases Trade Bonus by +1, increases the sale value of goods by 2%, and decreases buy price by 5%.",
                    prod: 7,
                    level: 3,
                    rewards: {
                        trade: 1
                    },
                    status: "You have a Legal Fence, increasing Trade Bonus by +1; Buy at 5% discount; Sell at 2% mark-up",
                    gold: 200,
                    supplies: 3
                },
                level2: {
                    name: 'Night Market',
                    desc: "Building a Night Market ensures there is always trade happening, even if its in short supply. This further increases Trade Bonus by +1, increases total sale value of goods by 5%, and decreases the total price by 10%.",
                    prod: 12,
                    level: 6,
                    rewards: {
                        trade: 1
                    },
                    status: "You have a Night Market, increasing Trade Bonus by +2; Buy at 10% discount; Sell at 5% mark-up",
                    gold: 850,
                    supplies: 8,
                },
                level3: {
                    name: 'Auction House',
                    desc: "Building an Auction House drastically improves the number of out-of-towners coming in to strike a deal. This futher increases Trade Bonus by +2, increases the total sale value of goods by 10%, and decreases total buy price by 20%. It also unlocks the 'Fire Sale' action, where you decrease each sellable component by 1d6 (roll separately for each). When you do, you gain 150% profit.",
                    prod: 21,
                    level: 8,
                    rewards: {
                        trade: 2
                    },
                    status: "You have an Auction House, increasing Trade Bonus by +4; Buy at 20% discount; Sell at 10% mark-up; 'Firesale' Action",
                    gold: 2500,
                    supplies: 12
        
                }
            },
            {
                name: 'Union',
                id: 'un',
                level: 0,
                status: "You haven't unionized workers yet.",
                level0: {
                    name: 'No Unionized Workers',
                    desc: 'Having No Unionized Workers is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Unionize Blue Collar Workers',
                    desc: "Unionizing Blue Collar Workers boosts morale for the unskilled laborers in the market, increasing productivity. This increase Productivity Bonus by +1 and reduces repair costs by 1 supply and 1 die.",
                    prod: 10,
                    level: 3,
                    rewards: {
                        prod: 1
                    },
                    status: "You have Unionized Blue Collar Workers, increasing Productivity Bonus by +1; Repair Supplies cost decreased by 1; Repair Gold cost reduced by 1 die;",
                    gold: 175,
                    supplies: 6
                },
                level2: {
                    name: 'Unionize White Collar Workers',
                    desc: "Unionizing White Collar Workers boosts morale for the tradesmen and artisans in the community, improving overall settlement productivity. This further increases Productivity by +1 and further reduces repair costs by 1 supply and 1 die.",
                    prod: 14,
                    level: 6,
                    rewards: {
                        prod: 1
                    },
                    status: "You have Unionized White Collar Workers; increasing Productivity Bonus by +2; Repair Supplies cost decreased by 2; Repair Gold cost reduced by 2 die",
                    gold: 1000,
                    supplies: 7,
                },
                level3: {
                    name: 'Worker Representation',
                    desc: "Funding Worker Representation guarantees workers' needs are heard, understood, and met. A remarkably forward thinking decision to make, it works wonders in motivating the population to work harder. This further increases Productivity Bonus by +2 and further reduces repair costs by 2 supply and 2 die.",
                    prod: 18,
                    level: 8,
                    rewards: {
                        prod: 2
                    },
                    status: "You have Funded Worker Representation, increasing Productivity Bonus by +4; Repair Supplies cost decreased by 4; Repair Gold cost reduced by 2 die",
                    gold: 2750,
                    supplies: 12
        
                }
            },
            {
                name: 'School',
                id: 'sc',
                level: 0,
                status: "You haven't upgraded the School yet.",
                level0: {
                    name: 'Standard School',
                    desc: 'Having a Standard School is the fefault settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Expanded Classrooms',
                    desc: "Building Expanded Classrooms makes sure more people can receive vital education simultaneously. This increases troop Lore:Warfare by +1, making it easier to issue commands to deployed troops on the battlefield. While this may seem a mior upgrade, it's also required to eventually unlocking Combat Wizards and Battlemages for deployment.",
                    prod: 5,
                    level: 2,
                    rewards: {},
                    status: "You have Expanded Classrooms, increasing Troop Lore: Warfare Bonus by +1",
                    gold: 250,
                    supplies: 4
                },
                level2: {
                    name: 'Basic Magic Curriculum',
                    desc: "Writing a Basic Magic Curriculum ushers in an age of ubiquitous magical representation and application. This further increases troop Lore:Warfare by +1 and unlocks Combat Wizards for deployment.",
                    prod: 10,
                    level: 6,
                    rewards: {},
                    status: "You have a Basic Magic Curriculum, increasing Troop Lore: Warfare Bonus by +2; See Troop Info for unlocks",
                    gold: 950,
                    supplies: 9,
                    'player character with Expert in a spell skill': 1
                },
                level3: {
                    name: 'Advanced Magical Theory',
                    desc: "Writing Advanced Magical Theory is a taxing endeavor that calls to it the brightest minds not only in the settlement, but in the nation as a whole. This further increases troop Lore: Warfare by +2 and unlocks Battle Mages for deployment",
                    prod: 21,
                    level: 10,
                    rewards: {},
                    status: "You have Advanced Magical Theory, increasing Troop Lore: Warfare Bonus by +4; See Troop Info for unlocks",
                    gold: 2850,
                    supplies: 14,
                    'player character with Master in a spell skill': 1
        
                }
            },
            {
                name: 'Infirmary',
                id: 'in',
                level: 0,
                status: "You haven't built an Infirmary yet.",
                level0: {
                    name: 'No Infirmary',
                    desc: 'Having No Infirmary is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Sterilization Stations',
                    desc: "Building Sterilization Stations is all one needs to establish a makeshift infirmary, allowing treatment of the sick and injured away from the filth of day-to-day living. This increases Medical Capacity Bonus by +1, increases passive settlement healing by +2, and decreases damage done to settlement health by 10% (minimum -1).",
                    prod: 10,
                    level: 3,
                    rewards: {
                        med: 1
                    },
                    status: "You have Sterilization Stations, increasing Medical Bonus by +1; Weekly Healing increased by +2; Damage decreased by 10% (min 1)",
                    gold: 275,
                    'medical capacity': 2
                },
                level2: {
                    name: 'Operating Rooms',
                    desc: "Building Operating Rooms allows treatment of criticall ill or injured patients in clean environments to prevent infection and drastically improve prognosis. This further increases Medical Capacity Bonus by +1, further increases passive settlement healing by +2, and decreases damage to settlement health by 20% (minimum -2).",
                    prod: 14,
                    level: 7,
                    rewards: {
                        med: 1
                    },
                    status: "You have Operating Rooms, increasing Medical Bonus by +2; Weekly Healing increased by + 4; Damage decreased by 20% (min 1)",
                    gold: 750,
                    'medical capacity': 6,
                },
                level3: {
                    name: 'Health Education',
                    desc: "Funding Health Education provides baseline education and awareness to the general population. This further increases Medical Capacity by +2, further increases passive settlement healing by 4, and decreases damage to settlement health by 33% (minimum -4).",
                    prod: 14,
                    level: 11,
                    rewards: {
                        med: 2
                    },
                    status: "You have Health Education, increasing Medical Bonus by +4; Weekly Healing increased by +8; Damage decreased by 33% (min 1)",
                    gold: 2900,
                    supplies: 15,
                    'medical capacity': 11
        
                }
            },
            {
                name: 'Commerce Office',
                id: 'co',
                level: 0,
                status: "You haven't built a Commerce Office yet.",
                level0: {
                    name: 'No Commerce Office',
                    desc: 'Having No Commerice Office is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Census Office',
                    desc: "Building a Census Office allows better tracking of citizens, both old and new. This increases Actual Weekly Taxes by 10% and increases the level of available items by 1.",
                    prod: 12,
                    level: 1,
                    rewards: {},
                    status: "You have a Census Office, increasing Weekly Tax Gain by 10%; Available Item Level increased by +1",
                    gold: 225,
                    supplies: 2
                },
                level2: {
                    name: 'Internal Revenue Office',
                    desc: "Building an Internal Revenue Office allows better tracking of taxation for import and export trade. This increases Actual Weekly Taxes by 15% and increases the level of available items by 2 total.",
                    prod: 14,
                    level: 5,
                    rewards: {},
                    status: "You have an Internal Revenue Office, increasing Weekly Tax Gain by 15%; Available Item Level increased by +2",
                    gold: 875,
                    supplies: 6,
                },
                level3: {
                    name: 'Economic Office',
                    desc: "Building an Economic Office enables realtime analysis of how and where gold is moving, both in the local market and the region. This increases Actual Weekly Taxes by 25% total and increases the level of available items by 4.",
                    prod: 16,
                    level: 9,
                    rewards: {},
                    status: "You have an Economic Office, increasing Weekly Tax Gain by 25%; Available Item Level increase by +4",
                    gold: 2700,
                    supplies: 18
        
                }
            }
        ],
        "Project Data": [],
        "Deployed Data": [],
        "Notes Data": '',
        "Selected Upgrades Data": [],
        "Selected Levels Data": [3],
        "Nonselected Upgrades Data": [],
        "Project Count Data": 0,
        "Week Log Data": {},
        "Change Log Data": {

            survival: 0,
            food: 0,
            foodB: 0,
            supplies: 0,
            suppliesB: 0,
            meds: 0,
            medsB: 0,
            safety: 0,
            di: 0,
            diB: 0,
            intel: 0,
            intelB: 0,
            gar: 0,
            garB: 0,
            economy: 0,
            trade: 0,
            tradeB: 0,
            prod: 0,
            prodB: 0,
            vault: 0,
            health: 0,
            level: 0,
            sp: 0,
            eventStart: [],
            eventEnd: [],
            week: 0,
        
        }
    }
}

function resetSettlement(inputName) {

    let saved = inputName;

    settlementList[inputName] = {
        "Settlement Data": {
            name: saved,
            level: 3,
            currentHealth: 100,
            maxHealthBase: 100,
            maxHealthBonus: 0,
            settlementPoints: 0,
            weeksPassed: 0,
            drought: false,
            type: 0,
            vault: 385,
            noteS: '',
        
        },
        "Survival Data": {
            Base: 0,
            Adjusted: 0,
            Rating: 0,
            Bonus: 0,
            foodB: 0,
            foodC: 9,
            foodM: 0,
            supB: 0,
            supC: 5,
            supM: 0,
            medB: 0,
            medC: 3,
            medM: 0
        },
        "Safety Data": {
            Base: 0,
            Adjusted: 0,
            Rating: 0,
            Bonus: 0,
            status: '',
            diB: 0,
            diC: 2,
            diM: 0,
            intelB: 0,
            intelC: 2,
            intelM: 0,
            garB: 0,
            garC: 3,
            garM: 0
        },
        "Economy Data": {
            Base: 0,
            Adjusted: 0,
            Rating: 0,
            status: '',
            Bonus: 0,
            tradeB: 0,
            tradeC: 6,
            tradeM: 0,
            prodB: 0,
            prodC: 4,
            prodM: 0,
            taxInc: 0,
            taxDec: 0,
        },
        "Building Data": [
            {
                name: 'Walls',
                id: 'wa',
                level: 0,
                status: "You haven't built any walls yet.",
                level0: {
                    name: 'No Walls',
                    desc: 'Having no walls is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Pallisade Walls',
                    desc: 'Pallisade walls are a great first line of defense against unorganized attacks or attacks from mindless creatures. They increase Defensive Infrastructure Bonus by +1 and Settlement Max Health by +5.',
                    prod: 14,
                    level: 2,
                    rewards: {
                        di: 1,
                        maxHealth: 5
                    },
                    status: "You have Pallisade Walls, granting you a Defense Bonus of +1 and Max Health bonus of +5",
                    gold: 350,
                    supplies: 8,
        
                },
                level2: {
                    name: 'Stone Walls',
                    desc: 'Stone Walls are a significant improvement over Pallisade Walls, proving difficult for all but the most militant of attackers. They increase Defensive Infrastructure Bonus by +1 and increase Settlement Max Health by +10.',
                    prod: 21,
                    level: 6,
                    rewards: {
                        di: 1,
                        maxHealth: 10
                    },
                    status: "You have Stone Walls, granting you a total Defense Bonus of +2 and total Max Health Bonus of +15 ",
                    gold: 1200,
                    supplies: 10,
                },
                level3: {
                    name: 'Reinforced Stone Walls',
                    desc: 'Reinforced Stone Walls are the epitome of static settlement protection. They increase Defensive Infrastructure and Intelligence bonuses by +1 and increase Settlement Max Health by +20.',
                    prod: 28,
                    level: 10,
                    rewards: {
                        di: 1,
                        intel: 1,
                        maxHealth: 20
                    },
                    status: "You have Reinforced Stone Walls, granting you a total Defense Bonus of +3, an Intelligence Bonus of +1, and a Max Health Bonus of +35.",
                    gold: 3200,
                    supplies: 20
        
                }
            },
            {
                name: 'Wells',
                id: 'we',
                level: 0,
                status: "You haven't built any wells yet.",
                level0: {
                    name: 'No Well',
                    desc: 'Having no well is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Simple Well',
                    desc: 'Building a simple Well reduces the Health damage from being without water for a week from 25 to 20; it also reduces the impact of Drought Events by 1.',
                    prod: 7,
                    level: 1,
                    rewards: {},
                    status: "You have a Simple Well, reducing weekly health loss from a lack of water from 25 to 20; Drought Event Impacts reduced by 1",
                    gold: 100,
                    supplies: 2
                },
                level2: {
                    name: 'Simple Well Network',
                    desc: 'Building a Simple Well Network expands the capacity of groundwater access. It further reduces the Health damage from being without water for a week from 20 to 15 and also reduces the impact of Drought Events by 2.',
                    prod: 10,
                    level: 5,
                    rewards: {},
                    status: "You have a Simple Well Network, reducing weekly health loss from a lack of water from 20 - 15; Drought Event Impacts reduced by 2",
                    gold: 200,
                    supplies: 6,
                },
                level3: {
                    name: 'Evaporation Collectors',
                    desc: 'Building Evaporation Collectors provides much better water retention for the well network. This upgrade ensures the settlement always has access to water and futher decreases the impact from Drought Events by 3.',
                    prod: 14,
                    level: 8,
                    rewards: {},
                    status: "You have Evaporation Collectors, removing health loss from a lack of water; Drought Impact Events reduced by 4",
                    gold: 800,
                    supplies: 14
        
                }
                
            },
            {
                name: 'Network',
                id: 'ne',
                level: 0,
                status: "You haven't built an Intelligence Network yet.",
                level0: {
                    name: 'No Intelligence Network',
                    desc: 'Having no Intelligence Network is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Community Watch Hub',
                    desc: "Building a Community Watch Hub is a solid start to improving leadership's knowledge of internal affairs - particularly those things that aren't generally made public. It provides and Intelligence Bonus of +1.",
                    prod: 10,
                    level: 3,
                    rewards: {
                        intel: 1
                    },
                    status: "You have a Community Watch Hub, increasing your Intelligence Bonus by +1",
                    gold: 150,
                    supplies: 2,
                    intelligence: 2
                },
                level2: {
                    name: 'Planted Merchants',
                    desc: "Funding Planted Merchants provides a much wider berth of knowledge about the goings on in and around town. It provides an Intelligence Bonus of +1 and prevents you from losing Intelligence every week.",
                    prod: 18,
                    level: 7,
                    rewards: {
                        intel: 1
                    },
                    status: "You have Planted Merchants, increasing your Intelligence Bonus by +2 and preventing weekly Intel loss.",
                    gold: 900,
                    supplies: 6,
                    intelligence: 4
                },
                level3: {
                    name: 'Sensitive Compartmented Information Facility (SCIF)',
                    desc: "Building a SCIF ensures intelligence remains the sole property of the leadership of the settlement. It Increase Intelligence Bonus by +2 and allows you to convert Garrison into Intelligence.",
                    prod: 21,
                    level: 11,
                    rewards: {
                        intel: 2
                    },
                    status: "You have a SCIF, increasing your Intelligence Bonus by +4, preventing weekly Intel Loss, and unlocking the 'Active ISR' Action",
                    gold: 3000,
                    supplies: 15,
                    intelligence: 7
        
                }
            },
            {
                name: 'Barracks',
                id: 'ba',
                level: 0,
                status: "You haven't upgraded the Barracks yet.",
                level0: {
                    name: 'Standard Barracks',
                    desc: 'Having a standard Barracks is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Kitchen',
                    desc: "Building a Kitchen ensures garrisoned forces are well fed at all times and can support more strenuous training exercises. This upgrade unlocks Militia Cavalry and Militia Pikemen, as well as the 'Feed the Troops' action, which allows you to convert Food into Garrison at a 6-1 rate. Finally, it grants a Garrison Bonus of +1.",
                    prod: 7,
                    level: 2,
                    rewards: {
                        gar: 1
                    },
                    status: "You have built a Kitchen, increasing your Garrison Bonus by +1. See Troop Info for unlocks; 'Feed the Troops' Action",
                    gold: 300,
                    supplies: 4,
                    food: 4
                },
                level2: {
                    name: 'Training Ground',
                    desc: "Building a Training Ground allows garrisoned forces to complete regular training exercises in a variety of circumstances. It unlocks Guard Infantry, Guard Archers, Guard Pikemen, and Guard Cavalry troop and provides a Garrison Bonus of +1.",
                    prod: 10,
                    level: 6,
                    rewards: {
                        gar: 1
                    },
                    status: "You have a Training Ground, increasing Garrison Bonus by +2. See Troop Info for unlocks; 'Feed the Troops' Action",
                    gold: 900,
                    supplies: 10,
                    'medical capacity': 4
                },
                level3: {
                    name: 'War Room',
                    desc: "Building a War Room allows garrisoned units to study battles, engage in theoretical wartime discussions, and maintain tactical capabilities on larger scales. It unlocks Soldier Infantry, Longbowmen, Phalanx, and Cannon troops and provides a Garrison Bonus of +1.",
                    prod: 20,
                    level: 11,
                    rewards: {
                        gar: 1
                    },
                    status: "You have a War Room, increasing your Garrison Bonus by +4. See Troop Info for unlocks; 'Feed the Troops' Action",
                    gold: 3100,
                    supplies: 16,
                    intelligence: 4
        
                }
            },
            {
                name: 'Granary',
                id: 'gr',
                level: 0,
                status: "You haven't built a Granary yet.",
                level0: {
                    name: 'No Granary',
                    desc: 'Having no Granary is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Improved Sifters',
                    desc: "Building Improved Sifters allows finer flours to be separated from unrefined grains, increasing operating efficiency of the granary. This increases Food Bonus by +1, grants +2 Food points per week, and unlocks the Harvest Action, allowing you to convert Productivity into Food at a 2-1 ratio.",
                    prod: 7,
                    level: 2,
                    rewards: {
                        food: 1
                    },
                    status: "You have Improved Sifters, increasing your Food Bonus by +1; Food Points +2 per week; 'Harvest' Action",
                    gold: 125,
                    supplies: 4
                },
                level2: {
                    name: 'Reinforced Silos',
                    desc: "Building Reinforced Silos greatly improves the settlement's capacity for storing food and ensures it remains viable for longer. This increases Food Bonus by +1 and grants a total of +4 Food points per week.",
                    prod: 14,
                    level: 6,
                    rewards: {
                        food: 1
                    },
                    status: "You have Reinforced Silos, increasing your Food Bonus by +2; Food Points +4 per week; 'Harvest' Action",
                    gold: 700,
                    supplies: 10,
                },
                level3: {
                    name: 'Reinforced Grinder',
                    desc: "Building a Reinforced Grinder greatly improves the speed with which harvested grain can be turned into a usable product. This increases Food Bonus by +2 and grants a total of +7 Food points per week.",
                    prod: 16,
                    level: 10,
                    rewards: {
                        food: 2
                    },
                    status: "You have Reinforced Grinder, increasing your Food Bonus by +4; Food Points +7 per week; 'Harvest' Action",
                    gold: 2800,
                    supplies: 15
        
                }
            },
            {
                name: 'Market',
                id: 'ma',
                level: 0,
                status: "You haven't upgraded the Market yet.",
                level0: {
                    name: 'Standard Market',
                    desc: 'Having a Standard Market is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Legal Fence',
                    desc: "Funding a Legal Fence ensures more products reach the market, driving higher trade. This increases Trade Bonus by +1, increases the sale value of goods by 2%, and decreases buy price by 5%.",
                    prod: 7,
                    level: 3,
                    rewards: {
                        trade: 1
                    },
                    status: "You have a Legal Fence, increasing Trade Bonus by +1; Buy at 5% discount; Sell at 2% mark-up",
                    gold: 200,
                    supplies: 3
                },
                level2: {
                    name: 'Night Market',
                    desc: "Building a Night Market ensures there is always trade happening, even if its in short supply. This further increases Trade Bonus by +1, increases total sale value of goods by 5%, and decreases the total price by 10%.",
                    prod: 12,
                    level: 6,
                    rewards: {
                        trade: 1
                    },
                    status: "You have a Night Market, increasing Trade Bonus by +2; Buy at 10% discount; Sell at 5% mark-up",
                    gold: 850,
                    supplies: 8,
                },
                level3: {
                    name: 'Auction House',
                    desc: "Building an Auction House drastically improves the number of out-of-towners coming in to strike a deal. This futher increases Trade Bonus by +2, increases the total sale value of goods by 10%, and decreases total buy price by 20%. It also unlocks the 'Fire Sale' action, where you decrease each sellable component by 1d6 (roll separately for each). When you do, you gain 150% profit.",
                    prod: 21,
                    level: 8,
                    rewards: {
                        trade: 2
                    },
                    status: "You have an Auction House, increasing Trade Bonus by +4; Buy at 20% discount; Sell at 10% mark-up; 'Firesale' Action",
                    gold: 2500,
                    supplies: 12
        
                }
            },
            {
                name: 'Union',
                id: 'un',
                level: 0,
                status: "You haven't unionized workers yet.",
                level0: {
                    name: 'No Unionized Workers',
                    desc: 'Having No Unionized Workers is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Unionize Blue Collar Workers',
                    desc: "Unionizing Blue Collar Workers boosts morale for the unskilled laborers in the market, increasing productivity. This increase Productivity Bonus by +1 and reduces repair costs by 1 supply and 1 die.",
                    prod: 10,
                    level: 3,
                    rewards: {
                        prod: 1
                    },
                    status: "You have Unionized Blue Collar Workers, increasing Productivity Bonus by +1; Repair Supplies cost decreased by 1; Repair Gold cost reduced by 1 die;",
                    gold: 175,
                    supplies: 6
                },
                level2: {
                    name: 'Unionize White Collar Workers',
                    desc: "Unionizing White Collar Workers boosts morale for the tradesmen and artisans in the community, improving overall settlement productivity. This further increases Productivity by +1 and further reduces repair costs by 1 supply and 1 die.",
                    prod: 14,
                    level: 6,
                    rewards: {
                        prod: 1
                    },
                    status: "You have Unionized White Collar Workers; increasing Productivity Bonus by +2; Repair Supplies cost decreased by 2; Repair Gold cost reduced by 2 die",
                    gold: 1000,
                    supplies: 7,
                },
                level3: {
                    name: 'Worker Representation',
                    desc: "Funding Worker Representation guarantees workers' needs are heard, understood, and met. A remarkably forward thinking decision to make, it works wonders in motivating the population to work harder. This further increases Productivity Bonus by +2 and further reduces repair costs by 2 supply and 2 die.",
                    prod: 18,
                    level: 8,
                    rewards: {
                        prod: 2
                    },
                    status: "You have Funded Worker Representation, increasing Productivity Bonus by +4; Repair Supplies cost decreased by 4; Repair Gold cost reduced by 2 die",
                    gold: 2750,
                    supplies: 12
        
                }
            },
            {
                name: 'School',
                id: 'sc',
                level: 0,
                status: "You haven't upgraded the School yet.",
                level0: {
                    name: 'Standard School',
                    desc: 'Having a Standard School is the fefault settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Expanded Classrooms',
                    desc: "Building Expanded Classrooms makes sure more people can receive vital education simultaneously. This increases troop Lore:Warfare by +1, making it easier to issue commands to deployed troops on the battlefield. While this may seem a mior upgrade, it's also required to eventually unlocking Combat Wizards and Battlemages for deployment.",
                    prod: 5,
                    level: 2,
                    rewards: {},
                    status: "You have Expanded Classrooms, increasing Troop Lore: Warfare Bonus by +1",
                    gold: 250,
                    supplies: 4
                },
                level2: {
                    name: 'Basic Magic Curriculum',
                    desc: "Writing a Basic Magic Curriculum ushers in an age of ubiquitous magical representation and application. This further increases troop Lore:Warfare by +1 and unlocks Combat Wizards for deployment.",
                    prod: 10,
                    level: 6,
                    rewards: {},
                    status: "You have a Basic Magic Curriculum, increasing Troop Lore: Warfare Bonus by +2; See Troop Info for unlocks",
                    gold: 950,
                    supplies: 9,
                    'player character with Expert in a spell skill': 1
                },
                level3: {
                    name: 'Advanced Magical Theory',
                    desc: "Writing Advanced Magical Theory is a taxing endeavor that calls to it the brightest minds not only in the settlement, but in the nation as a whole. This further increases troop Lore: Warfare by +2 and unlocks Battle Mages for deployment",
                    prod: 21,
                    level: 10,
                    rewards: {},
                    status: "You have Advanced Magical Theory, increasing Troop Lore: Warfare Bonus by +4; See Troop Info for unlocks",
                    gold: 2850,
                    supplies: 14,
                    'player character with Master in a spell skill': 1
        
                }
            },
            {
                name: 'Infirmary',
                id: 'in',
                level: 0,
                status: "You haven't built an Infirmary yet.",
                level0: {
                    name: 'No Infirmary',
                    desc: 'Having No Infirmary is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Sterilization Stations',
                    desc: "Building Sterilization Stations is all one needs to establish a makeshift infirmary, allowing treatment of the sick and injured away from the filth of day-to-day living. This increases Medical Capacity Bonus by +1, increases passive settlement healing by +2, and decreases damage done to settlement health by 10% (minimum -1).",
                    prod: 10,
                    level: 3,
                    rewards: {
                        med: 1
                    },
                    status: "You have Sterilization Stations, increasing Medical Bonus by +1; Weekly Healing increased by +2; Damage decreased by 10% (min 1)",
                    gold: 275,
                    'medical capacity': 2
                },
                level2: {
                    name: 'Operating Rooms',
                    desc: "Building Operating Rooms allows treatment of criticall ill or injured patients in clean environments to prevent infection and drastically improve prognosis. This further increases Medical Capacity Bonus by +1, further increases passive settlement healing by +2, and decreases damage to settlement health by 20% (minimum -2).",
                    prod: 14,
                    level: 7,
                    rewards: {
                        med: 1
                    },
                    status: "You have Operating Rooms, increasing Medical Bonus by +2; Weekly Healing increased by + 4; Damage decreased by 20% (min 1)",
                    gold: 750,
                    'medical capacity': 6,
                },
                level3: {
                    name: 'Health Education',
                    desc: "Funding Health Education provides baseline education and awareness to the general population. This further increases Medical Capacity by +2, further increases passive settlement healing by 4, and decreases damage to settlement health by 33% (minimum -4).",
                    prod: 14,
                    level: 11,
                    rewards: {
                        med: 2
                    },
                    status: "You have Health Education, increasing Medical Bonus by +4; Weekly Healing increased by +8; Damage decreased by 33% (min 1)",
                    gold: 2900,
                    supplies: 15,
                    'medical capacity': 11
        
                }
            },
            {
                name: 'Commerce Office',
                id: 'co',
                level: 0,
                status: "You haven't built a Commerce Office yet.",
                level0: {
                    name: 'No Commerce Office',
                    desc: 'Having No Commerice Office is the default settlement configuration.',
                    prod: 'N/A',
                    level: 'N/A',
                },
                level1: {
                    name: 'Census Office',
                    desc: "Building a Census Office allows better tracking of citizens, both old and new. This increases Actual Weekly Taxes by 10% and increases the level of available items by 1.",
                    prod: 12,
                    level: 1,
                    rewards: {},
                    status: "You have a Census Office, increasing Weekly Tax Gain by 10%; Available Item Level increased by +1",
                    gold: 225,
                    supplies: 2
                },
                level2: {
                    name: 'Internal Revenue Office',
                    desc: "Building an Internal Revenue Office allows better tracking of taxation for import and export trade. This increases Actual Weekly Taxes by 15% and increases the level of available items by 2 total.",
                    prod: 14,
                    level: 5,
                    rewards: {},
                    status: "You have an Internal Revenue Office, increasing Weekly Tax Gain by 15%; Available Item Level increased by +2",
                    gold: 875,
                    supplies: 6,
                },
                level3: {
                    name: 'Economic Office',
                    desc: "Building an Economic Office enables realtime analysis of how and where gold is moving, both in the local market and the region. This increases Actual Weekly Taxes by 25% total and increases the level of available items by 4.",
                    prod: 16,
                    level: 9,
                    rewards: {},
                    status: "You have an Economic Office, increasing Weekly Tax Gain by 25%; Available Item Level increase by +4",
                    gold: 2700,
                    supplies: 18
        
                }
            }
        ],
        "Project Data": [],
        "Deployed Data": [],
        "Notes Data": userNotes,
        "Selected Upgrades Data": [],
        "Selected Levels Data": [3],
        "Nonselected Upgrades Data": [],
        "Project Count Data": 0,
        "Week Log Data": {},
        "Change Log Data": {

            survival: 0,
            food: 0,
            foodB: 0,
            supplies: 0,
            suppliesB: 0,
            meds: 0,
            medsB: 0,
            safety: 0,
            di: 0,
            diB: 0,
            intel: 0,
            intelB: 0,
            gar: 0,
            garB: 0,
            economy: 0,
            trade: 0,
            tradeB: 0,
            prod: 0,
            prodB: 0,
            vault: 0,
            health: 0,
            level: 0,
            sp: 0,
            eventStart: [],
            eventEnd: [],
            week: 0,
        
        }
    }
}


export {
    swapButtonRender,
    createNewSettlement
}
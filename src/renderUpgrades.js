import { economyBonus, prodBonus, tradeBonus } from "./economyStats";
import { renderAll } from "./pageRenders";
import { renderBuildings } from "./renderBuildings";
import { diBonus, garBonus, intelBonus, safetyBonus } from "./safetyStats";
import { health, maxHealth, settlement } from "./settlementStats";
import { foodBonus, medBonus, supBonus, survivalBonus } from "./survivalStats";

function renderUpgrades() {
    let wrapper = document.querySelector('#contentArea'); 
    wrapper.innerHTML = '';

    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.textContent = "Settlement Upgrades";
    wrapper.appendChild(header);

    let upgArea = document.createElement('div');
    upgArea.style = 'display: flex; flex-wrap: wrap; overflow-y: scroll; scrollbar-width: none;'
    wrapper.appendChild(upgArea);

    if(settlement.level < 4) {
        let disclaimer = document.createElement('div'); 
        disclaimer.style = "display: flex; align-items: center; justify-content: center; width: 100%; height: 50%;"
        disclaimer.textContent = "Your Settlement needs to be level 4 to unlock Settlement Upgrades"
        upgArea.appendChild(disclaimer);
        return;
    }

    for(let i = 4; i <= settlement.level; i++) {
        let index = 'level' + i;

        let source = upgradeTree[index];

        if(settlement.level > 4 && settlement.type != 0 && i >= 5 && i % 2 != 0) {
            let type = settlement.type
            let setChoice = source[type];
            source = setChoice;
        }

        if(settlement.type == 0 && i >= 5) {
            return;
        }

        let header = document.createElement('div');
        header.classList.add('subHeader');
        header.style = 'background: none; margin-bottom: 1rem; width: 100%'
        header.textContent = source.title;
        upgArea.appendChild(header);

        let row = document.createElement('div');
        row.classList.add('flexRow');
        row.style = 'justify-content: space-around; width: 100%; margin-bottom: 1rem';


        source = source.array;


        source.forEach((upg) => {
            let btnBox = document.createElement('div');
            btnBox.style = 'width: 33%; display: flex; justify-content: center'

            let btn = document.createElement('button');
            btn.classList.add('upgBtn');
            btn.textContent = upg.name;
            btn.id = upg.id;
            btnBox.appendChild(btn);
            row.appendChild(btnBox);

            let passCheck = selectedUpgrades.findIndex((e) => e == upg.id);

            let failCheck = nonselectedUpgrades.findIndex((e) => e == upg.id);

            if(passCheck == -1 && failCheck == -1) {
                btn.addEventListener('click', () => {
                    showUpgradeDetails(i, upg.id)
                })
            } else if(passCheck != -1) {
                btn.style = 'background: rgba(50,160,80,.3)';
                btn.addEventListener('click', () => {
                    showUpgradeDetails(i, upg.id);
            })
            } else if(failCheck != -1) {
                btn.style = 'background: gray';
                btn.addEventListener('click', () => {
                    showUpgradeDetails(i, upg.id);
                })

            }
        })

        upgArea.appendChild(row);

    }


    }
    
function showUpgradeDetails(level, id) {
    let wrapper = document.querySelector('#contentArea');
    wrapper.innerHTML = '';

    let index = 'level' + level;

    let upgIndex = 0;
    let upg = 0;

    if(level % 2 == 0) {
        upgIndex = upgradeTree[index].array.findIndex((e) => e.id == id);
        upg = upgradeTree[index].array[upgIndex];

    } else {
        let type = settlement.type
        let upgIndex = upgradeTree[index][type].array.findIndex((e) => e.id == id);
        upg = upgradeTree[index][type].array[upgIndex];
    }
    


    let header = document.createElement('div');
    header.classList.add('subHeader');
    header.textContent = upg.name;
    wrapper.appendChild(header);

    for(let i = 0; i < upg.content.length; i++) {
        let text = document.createElement('p');
        text.textContent = upg.content[i];
        text.style = 'font-size: 18px; padding: 0 2rem; box-sizing: border-box; font-family: "monospace";'
        text.classList.add('text-center');
        wrapper.appendChild(text);
    }

    let chosen = selectedUpgrades.findIndex((e) => e == upg.id);
    let ignored = nonselectedUpgrades.findIndex((e) => e == upg.id);

    let buttonRow = document.createElement('div');
    buttonRow.classList.add('flexRow');
    buttonRow.style = 'width: 100%; justify-content: center; gap: 8rem';

    let previousCheck = selectedLevels.findIndex((e) => e == (level-1))

    if(previousCheck == -1) {
        let length = selectedLevels.length
        let first = selectedLevels[(length - 1)] + 1;
        let warning = document.createElement('div');
        warning.textContent = `You need to select an earlier upgrade from Level ${first} and work your way up first.`
        warning.style = 'color: red; font-size: 22px;;margin-bottom: 2rem'
        warning.classList.add('text-center');
        wrapper.appendChild(warning);
    }

    if(chosen == -1 && ignored == -1 && previousCheck != -1) {
        let confirmBox = document.createElement('div');

        let confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Confirm Upgrade';
        confirmBtn.addEventListener('click', () => {
            confirmSettlementUpgrade(level, id);
            renderAll();
            renderUpgrades();
        })
        confirmBox.appendChild(confirmBtn);
        buttonRow.appendChild(confirmBox);
    } 

    let cancelBox = document.createElement('div');

    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        renderUpgrades();
    })
    cancelBox.appendChild(cancelBtn);
    buttonRow.appendChild(cancelBox);
    wrapper.appendChild(buttonRow);


}

let selectedUpgrades = [];

let selectedLevels = [3];

let nonselectedUpgrades = [];

function setSelectedUpgrades(data) {
    selectedUpgrades = data;
}

function setSelectedLevels(data) {
    selectedLevels = data
}

function setNonselectedUpgrades(data) {
    nonselectedUpgrades = data
}

function confirmSettlementUpgrade(level, id) {
    let index = 'level' + level;

    let source = upgradeTree[index];

    if(settlement.level > 4 && settlement.type != 0 && level >= 5 && level % 2 != 0) {
        let type = settlement.type
        let setChoice = source[type];
        source = setChoice;
    }

    if(settlement.type == 0 && level >= 5) {
        return;
    }

    source = source.array;

    source.forEach((upg) => {

        if(upg.id == id) {
            selectedUpgrades.push(upg.id);

        } else {
            nonselectedUpgrades.push(upg.id);
        }
    })

    switch(id) {
        case 'a4c1': 
            survivalBonus(1);
            economyBonus(-1);
            settlement.type = 'Survivalist';
            break;
        case 'a4c2':
            safetyBonus(1);
            survivalBonus(-1);
            settlement.type = 'Fortified'
            break;
        case 'a4c3':
            economyBonus(1);
            safetyBonus(-1);
            settlement.type = 'Mercantile'
            break;
        case 'a5c1':
            foodBonus(1);
            break;
        case 'a5c2':
            supBonus(2);
            break;
        case 'a5c3':
            garBonus(1);
            break;
        case 'a5c4':
            intelBonus(1);
            break;
        case 'a5c5':
            tradeBonus(1);
            break;
        case 'a5c6':
            prodBonus(1);
            break;
        case 'a7c1':
            tradeBonus(1);
            foodBonus(2);
            prodBonus(-1);
            break;
        case 'a7c2':
            medBonus(1);
            prodBonus(1);
            supBonus(-1);
            break;
        case 'a7c3':
            supBonus(1);
            diBonus(1);
            tradeBonus(-1);
            break;
        case 'a7c4':
            diBonus(2);
            supBonus(-1);
            break;
        case 'a7c5':
            garBonus(1);
            maxHealth(10);
            medBonus(-1);
            break;
        case 'a7c6':
            intelBonus(2);
            foodBonus(-1);
            supBonus(-1);
            break;
        case 'a7c7':
            tradeBonus(1);
            medBonus(-1);
            break;
        case 'a7c8':
            tradeBonus(1);
            supBonus(-1);
            break;
        case 'a7c9':
            prodBonus(1);
            maxHealth(-5);
            health(-5);
            break;
        default:
            break;

    }

    selectedLevels.push(level);



}

let upgradeTree = {
    level4: {
        title: 'Level 4 - Settlement Style',
        array: [
            {
                name: 'Survivalist Settlement',
                id: 'a4c1',
                content: [
                    "A Survivalist Settlement understands the importance of keeping everything - from food and water to construction supplies and medicine - the highest quality possible. Many a would-be city fell to the hardships following The Great Sacrifice because they lacked a sufficient stockpile of those things needed for survival.",
                    "Your emphasis on ensuring the highest quality goods means sending away those traders with less than exceptional items.",
                    "Choosing a Settlement Style should not be decided quickly. Your choice of the kind of settlement has a significant impact in the type of upgrades the Settlement unlocks at higher levels.",
                    "Finally, selecting Survivalist Settlement will grant you a +1 Survival Bonus and a -1 Economy Penalty."
                ],
            },
            {
                name: 'Fortified Settlement',
                id: 'a4c2',
                content: [
                    "A Fortified Settlement has endured more than its fair share of trials and tribulations, particularly when it comes to the safety of its citizens. It knows that ample supplies means naught when you can't defend them.",
                    "Your emphasis on keeping troops well fed and in good shape means you go through food and medicine more quickly.",
                    "Choosing a Settlement Style should not be decided quickly. Your choice of the kind of settlement has a significant impact in the type of upgrades the Settlement unlocks at higher levels.",
                    "Selecting Fortified Settlement will grant you a +1 Safety Bonus and a -1 Survival Penalty."

                ]
            },
            {
                name: 'Mercantile Settlement',
                id: 'a4c3',
                content: [
                    "A Mercantile Settlement thrives with a welcoming population and less restrictions on what can be bought and sold within its walls. It always has a surplus of goods - from exquisite quality to shit! A Mercantile settlement knows nothing - even settlements - survive on their own.",
                    "Your open trade practices improves settlement commerce, but it means those with nefarious means have an easier time disrupting the settlement.",
                    "Choosing a Settlement Style should not be decided quickly. Your choice of the kind of settlement has a significant impact in the type of upgrades the Settlement unlocks at higher levels.",
                    "Selecting Mercantile Settlement will grant you a +1 Economy Bonus and a -1 Safety Penalty."

                ]
            }
        ]
    },
    level5: {
        Survivalist: {
            title: 'Level 5 - Storage Refinement',
            array: [
                {
                    name: 'Deep Cellars',
                    id: 'a5c1',
                    content: [
                        "Dwarves, Halflings, Drow, and plenty of other creatures find solace in the depths of Vals'kar - why not add food to the list? It's clear things tend to last longer when chilled, so dig deeper cellars and keep food safe!",
                        "By keeping food stuffs tucked deeper in the earth, they don't spoil as quickly. As an added benefit, mold and rot doesn't spread as quickly either, reducing the impact of negative Food Events by 1.",
                        "Selecting Deep Cellars will grant you a +1 Food Bonus in addition to the reduced Food Event impact."
                    ]
                },
                {
                    name: 'Expanded Warehouse',
                    id: 'a5c2',
                    content: [
                        "Any successful entreprenuer would tell you that it takes a sizeable nest-egg to reliably begin expansion of the business. Turns out, a settlement is no different - that's where an expanded warehouse comes in!",
                        "By making the warehouse larger, the settlement can store more construction materials and out-of-season accoutrements.",
                        "Selecting Expanded Warehouse will grant you a +2 Supply Bonus."
                    ]
                },
                {
                    name: 'Expanded Barracks',
                    id: 'a5c3',
                    content: [
                        "As it turns out, the 'storage' of people is important too! By expanding the barracks, the settlement is capable of housing more troops for patrols and deployments, ensuring greater combat might in the local area.",
                        "Additionally, the expanded barracks allows you to bring a free Militia Infantry Troop on a deployment once a month.",
                        "Selecting Expanded Barracks will grant you a +1 Garrison Bonus in addition to the free troop."
                    ]
                },
            ]
        },
        Fortified: {
            title: 'Level 5 - Safety Measures',
            array: [
                {
                    name: 'Expanded Barracks',
                    id: 'a5c3',
                    content: [
                        "The best offense is a good offense and defense! By expanding the barracks, the settlement is capable of housing more troops for patrols and deployments, ensuring greater combat might in the local area.",
                        "Additionally, the expanded barracks allows you to bring a free Militia Infantry Troop on a deployment once every week.",
                        "Selecting Expanded Barracks will grant you a +1 Garrison Bonus in addition to the free troop."
                    ]
                },
                {
                    name: 'Awareness Training',
                    id: 'a5c4',
                    content: [
                        "A good leader knows that they dont' know everything and must rely on the eyes and ears of their people to truly have the complete picture - or at least something close to it. To that end, making sure they know how to gather and report information is of the utmost importance.",
                        "As an added benefit, a perceptive population is also less likely to be in dangerous situations, should they arrive. On any event that affects village health negatively, roll a d20. On an 11+, reduce the damage by your Intel Bonus (before Infirmary upgrade reductions)",
                        "Selecting Awareness Training will grant you a +1 Intel Bonus in addition to the damage reduction effect."
                    ]
                },
                {
                    name: 'Expanded Warehouse',
                    id: 'a5c2',
                    content: [
                        "Any leader capable of planning for the future knows that successful settlements can be targeted for raids and sieges. Storing extra supplies for those contingencies, then, seems like second-nature to you.",
                        "By making the warehouse larger, the settlement can store more construction materials for things like walls and barricades.",
                        "Selecting Expanded Warehouse will grant you a +2 Supply Bonus."
                    ]
                },
            ]
        },
        Mercantile: {
            title: 'Level 5 - Mercantile Improvements',
            array: [
                {
                    name: 'Improved Advertising',
                    id: 'a5c5',
                    content: [
                        "A settlement is nothing if not for its trade and camaraderie, and nothing brings people in droves like some good old-fashioned advertising.",
                        "So excited by the storm of good deals around them, there's a chance to buy and sell at rates better for you! Roll a d20 when buying or selling (everything triggers on a 19-20). If buying 1-2 items, get it 50% off. If buying 3 or more, get an extra free. If selling, increase sale value by 20%. Can happen once per management turn.",
                        "Selecting Improved Advertising will grant you a +1 Trade Bonus in addition to the chance of better trade deals."
                    ]
                },
                {
                    name: 'Mandatory Work Breaks',
                    id: 'a5c6',
                    content: [
                        "Wizards and Clerics need to often take breaks to recharge their minds and bodies for their work - why should it be any different for the skilled laborers in the settlement? With Mandatory Work Breaks, it doesn't have to be!",
                        "As it turns out, respecting a worker's rights to a lunch break and a few minutes off their feet in the sweltering heat means they work even harder! As an added benefit, they'll stay healthier, too! This reduces the Productivity impact of disease outbreaks in the settlement by 1.",
                        "Selecting Mandatory Work Breaks will grant you a +1 Productivity Bonus in addition to the reduced disease impact."
                    ]
                },
                {
                    name: 'Expanded Warehouse',
                    id: 'a5c2',
                    content: [
                        "Any successful entreprenuer would tell you that it takes a sizeable nest-egg to reliably begin expansion of the business. Turns out, a settlement is no different - that's where an expanded warehouse comes in!",
                        "By making the warehouse larger, the settlement can store more construction materials and out-of-season accoutrements.",
                        "Selecting Expanded Warehouse will grant you a +2 Supply Bonus."
                    ]
                },
            ]
        },
    }, 
    level6: {
        title: 'Level 6 - Expert Leadership',
        array: [
            {
                name: 'Lead By Example',
                id: 'a6c1',
                content: [
                    "You understand that the best way to be a successful leader is leading by example. When you do things, you do them successfully. Crazily enough, once a week when you do something successfully, you do so critically!",
                    "Choose one of Safety, Survival, or Economy. Once per week, when a player succeeds at an Action to improve a component score of that category, you can treat it as a critical success instead.",
                    "At Settlement Level 10, this can happen twice per week.",
                    "At Settlement Level 15, this can happen three times per week."
                ]
            },
            {
                name: 'Cautious Leadership',
                id: 'a6c2',
                content: [
                    "You understand that while it is imperative that work be completed to sustain the town, you also understand that those efforts are completely worthless if everyone is getting injured in the process.",
                    "Choose one of Safety, Survival, or Economy. Once per week, when a player critically fails at an Action to improve the component score of that category, you can treat it as a failure instead.",
                    "At Settlement Level 10, this can happen twice per week.",
                    "At Settlement Level 15, this can happen three times per week.",
                    
                ]
            },
            {
                name: 'Try, Try Again',
                id: 'a6c3',
                content: [
                    "You understand that discipline and a can-do attitude are the most important parts of being a leader. When things go awry, don't quit! Try it again! (Maybe quit if it doesn't work a second time...)",
                    "Choose one of Safety, Survival, or Economy. Once per week, a player may choose to reroll an Action made to improve the component score of that category. They must use the new roll, even if the result is worse.",
                    "At Settlement Level 10, this can happen twice per week.",
                    "At Settlement Level 15, this can happen three times per week."
                ]
            }
        ]
    },
    level7: {
        Survivalist: {
            title: 'Level 7 - Survivalist Epiphanies',
            array: [
                {
                    name: 'Farming Breakthrough',
                    id: 'a7c1',
                    content: [
                        "By taking a more regimented, almost assembly-line methodology to various farming techniques, a number of safe 'shortcuts' have been discovered, significantly improving food output from those willing to adopt the increased labor.",
                        "These processes increase usuable food yields, granting a steadier supply of food as well as boosting activity at local farmers' markets.",
                        "Selecting Farming Breakthrough will increase Trade Bonus by 1 and Food Bonus by 2 while decreasing Productivity Bonus by 1."
                    ]
                },
                {
                    name: 'Scientific Methods',
                    id: 'a7c2',
                    content: [
                        "Following a year's-long study into a locally sourced plant and its applications as both a local anesthetic and fever-reducer has led to a cheapened way of producing useful medical supplies.",
                        "The brewing process, while relatively simple, requires a significant amount of space and resources, as it will need to be scaled appropriately to provide a benefit to the entire settlement.",
                        "Selecting Scientific Methods will increase Medical Capacity and Productivity Bonus by 1 while decreasing Supplies Bonus by 1."
                    ]
                },
                {
                    name: 'Logistics Breakthrough',
                    id: 'a7c3',
                    content: [
                        "With the implementation of some new packaging and transportation methods, goods are delivered much more quickly and safer than ever before. This expedited movement has worked wonders on timely delivery of supplies.",
                        "Faster movement of goods has decreased 'last-minute sales' as things just don't take nearly as long to process and move.",
                        "Selecting Logistics Breakthrough increases Supplies and Defensive Infrastructure Bonuses by 1 while decreasing Trade Bonus by 1.",
                        
                    ]
                }
            ]
        },
        Fortified: {
            title: 'Level 7 - Basic Militant Regiments',
            array: [
                {
                    name: 'Reinforced Structures',
                    id: 'a7c4',
                    content: [
                        "Thoughtful leaders (called paranoid by some) recognize the risk the outside world can play in disrupting and damaging a settlement, be it weather, bandits, or worse.",
                        "Those same leaders understand a great way to mitigate those losses ahead of time is by reinforcing the structures they're responsible for. While this makes the buildings tougher, they are also slightly more expensive to maintain.",
                        "Selecting Reinforced Structures increases Defensive Infrastructure Bonus by 2 and decreases Supplies Bonus by 1."
                    ]
                },
                {
                    name: 'Scheduled Physicals',
                    id: 'a7c5',
                    content: [
                        "Few things matter more in the defense of a settlement than the equipment and training of its troops. A wise leader knows that the health of those troops is the ultimately the most important part.",
                        "By scheduling regular physicals for the fighting forces, you ensure they're always in tip-top shape to deal with the threats of today and tomorrow.",
                        "Selecting Scheduled Physicals increases Garrison Bonus by 1, Max Health by 10, and decreases Medical Capacity Bonus by 1."
                    ]
                },
                {
                    name: 'Regular Scouting',
                    id: 'a7c6',
                    content: [
                        "Knowing your enemy is half that battle - or more, if you can exploit their weaknesses and fortify against their strengths. Such is the philosophy of a leader who prioritizes the gathering of intelligence in and around the settlement.",
                        "Sending regular Scouting Parties is a somewhat expensive endeavor but it ensures the settlement has a solid foundation of knowledge for any threats that appear.",
                        "Selecting Regular Scouting increases Intelligence Bonus by 2 while decreasing Food and Supply Bonuses by 1. Regular Scouting also increases Intelligence by 1 every 2 weeks, up to the maximum."
                    ]
                },
            ]
        },
        Mercantile: {
            title: 'Level 7 - Foreign Trade Strategies',
            array: [
                {
                    name: 'Rare Traders',
                    id: 'a7c7',
                    content: [
                        "Spreading word about all the settlement has to offer has yielded exceptional results! Namely in the occasional arrival of incredibly well-stocked (and defended!) traders.",
                        "Each week, make a DC19 Check, adding the Settlement's Trade Bonus. On a Success, you may purchase rare items equal to Uncommon Item Level - 3. On a Critical Success, increase Safety Bonus by 1 for a week.",
                        "Selecting Rare Traders increases Trade Bonus by 1 and decreases Medical Capacity Bonus by 1, thanks to the higher chance of disease from outsiders."
                    ]
                },
                {
                    name: 'Occasional Hoarding',
                    id: 'a7c8',
                    content: [
                        "The best thing about having an active and healthy economy is the fact that sometimes, those key participants within it, decide it's best to not let a deal go away without exploiting it.",
                        "Each week, make a DC19 Check, adding the Settlement's Trade Bonus. On a Success, you can add a passive Trade Bonus equal to your existing Trade Bonus +1 that lasts for the week. On a critical success, double the bonus.",
                        "Selecting Occasional Hoarding increases Trade Bonus by 1 and decreases Supplies Bonus by 1, thanks to the populations need for more storage."
                    ]
                },
                {
                    name: "Work 'Em Dry",
                    id: 'a7c9',
                    content: [
                        "Some people work to live, but you understand that doesn't really help business enterprises nearly as much as those who live to work. With this leadership technique, you can start to force people's hands.",
                        "Each week, you can give yourself a passive Productivity Bonus that lasts for the week at the cost of 5 Current Health per Producitivity Point.",
                        "Selecting Work 'Em Dry increases Productivity Bonus by 1 and decreases Max Health by 5. What, are they getting tired?"
                    ]
                },
            ]
        },
    },
    level8: {
        title: 'Level 8 - Resource Management',
        array: [
            {
                name: 'Adaptive Resources',
                id: 'a8c1',
                content: [
                    "You know there are dozens of solutions to any given problem. All it takes is adjusting the aperture of how you look at the problem; as it turns out, sometimes a square block does fit in a round hole.",
                    "As a reaction to an event which would damage Health from a lack of resources, you can instead choose to lose points from another component in the same category.",
                    "With Survival, each negative point in Food deals 5 damage, negative Supplies deals 5 damage, and negative Medical Capacity deals 10 damage.",
                    "With Safety, each negative point in Defensive Infrastructure deals 10 damage, negative Intel deals no damage, and negative Garrison deals 10 damage.",
                    "With Trade, each negative point in Trade deals 5 damage, and each negative point in Productivity deals 10 damage.",
                    "With this reaction, if you're short 2 Medical Supplies and are going to lose 20 Health, you can instead use 4 Food or 4 Supplies or any combination to prevent the Health loss."
                ]
            },
            {
                name: 'Resource Hoarder',
                id: 'a8c2',
                content: [
                    "You know that scrapes, bumps, and bruises serve a very important purpose: they build character. What is life without a little pain? Those small annoyances chipping away at a soft exterior harden it to stone. Sometimes, that's exactly what the settlement needs.",
                    "As a reaction to an event which would drain resources, you can instead have it damage your health directly. This DOES NOT apply to Intel, which has no health penalty.",
                    "With Survival, each point of Food spared will deal 3 damage, each point of Supplies will deal 5 damage, and each point of Medical Capacity will deal 10 damage.",
                    "With Safety, each point of Defensive Infrastructure spared will deal 5 damage and each point of Garrison spared will deal 10 damage.",
                    "With Economy, each point of Trade spared will deal 3 damage and each point of Productivity spared will deal 5 damage.",
                    "With this reaction, if an event would cause you to lose 7 food, you could instead choose to lose 21 Health, 18, or any multiplier up to the event cost amount."
                    
                ]
            },
            {
                name: 'Work Fixes Everything',
                id: 'a8c3',
                content: [
                    "You've seen first-hand that there isn't a single problem in the world that cannot be fixed with brute force. In this case, the brute force is a measure of effort to rectify problems that pop up around the settlement.",
                    "As a reaction to an event which would damage settlement health, you can instead have it lower health and max health by half the amount. All of the damage can then be repaired by assigning productivity to a Fix-Action Event.",
                    "Typically, these repairs are free of charge, other than the productivity cost, but that does mean they take a much higher amount of productivity to complete."
                ]
            }
        ]
    },
    
}


export { renderUpgrades, selectedLevels, selectedUpgrades, nonselectedUpgrades, setNonselectedUpgrades, setSelectedLevels, setSelectedUpgrades}
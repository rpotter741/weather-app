function setStorage() {
    localStorage.setItem('settlementData', JSON.stringify(settlement));
    localStorage.setItem('survivalData', JSON.stringify(survival));
    localStorage.setItem('safetyData', JSON.stringify(safety));
    localStorage.setItem('economyData', JSON.stringify(economy));
    localStorage.setItem('buildingData', JSON.stringify(buildings));
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    localStorage.setItem('deployedArray', JSON.stringify(deployedArray));
    localStorage.setItem('playerNotes', JSON.stringify(userNotes));
    localStorage.setItem('selectedUpgrades', JSON.stringify(selectedUpgrades));
    localStorage.setItem('selectedLevels', JSON.stringify(selectedLevels));
    localStorage.setItem('nonselectedUpgrades', JSON.stringify(nonselectedUpgrades));
    localStorage.setItem('projectCount', JSON.stringify(count));
    localStorage.setItem('weekLog', JSON.stringify(weekLog));
    localStorage.setItem('changeLog', JSON.stringify(changeLog));

}

  function checkStorage() {
    if (storageAvailable("localStorage")) {
        if(!localStorage.getItem('settlementData')) {
            setStorage();
        } else {
            loadStorage();
        }
      } else {
        alert('fuck no');
      }
  }

  function loadStorage() {
    let settlementData = JSON.parse(localStorage.getItem('settlementData'));
    settlement = settlementData;

    let survivalData = JSON.parse(localStorage.getItem('survivalData'));
    survival = survivalData;

    let safetyData = JSON.parse(localStorage.getItem('safetyData'));
    safety = safetyData;

    let economyData = JSON.parse(localStorage.getItem('economyData'));
    economy = economyData;

    let buildingData = JSON.parse(localStorage.getItem('buildingData'));
    buildings = buildingData;

    let projectData = JSON.parse(localStorage.getItem('projectArray'));
    projectArray = projectData;

    let deployedData = JSON.parse(localStorage.getItem('deployedArray'));
    deployedArray = deployedData;

    let notesData = JSON.parse(localStorage.getItem('playerNotes'));
    userNotes = notesData;

    let selectedData = JSON.parse(localStorage.getItem('selectedUpgrades'));;
    selectedUpgrades = selectedData;

    let selectedLevelsData = JSON.parse(localStorage.getItem('selectedLevels'));
    selectedLevels = selectedLevelsData;

    let nonselectedData = JSON.parse(localStorage.getItem('nonselectedUpgrades'));
    nonselectedUpgrades = nonselectedData;

    let countData = JSON.parse(localStorage.getItem('projectCount'));
    count = countData;

    let weekData = JSON.parse(localStorage.getItem('weekLog'));
    weekLog = weekData;

    let changeData = JSON.parse(localStorage.getItem('changeLog'));;
    changeLog = changeData;

    console.log(changeData);
  }

  export { checkStorage, setStorage }
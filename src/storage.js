import { buildings, setBuildings } from "./buildingsStats";
import { count, setCount } from "./compileEvent";
import { economy, setEconomy } from "./economyStats";
import { projectArray, setProjects } from "./projectBoxRender";
import { deployedArray, setDeployed } from "./renderDeployed";
import { setNotes, userNotes } from "./renderNotes";
import { nonselectedUpgrades, selectedLevels, selectedUpgrades, setNonselectedUpgrades, setSelectedLevels, setSelectedUpgrades } from "./renderUpgrades";
import { safety, setSafety } from "./safetyStats";
import { setSettlement, settlement } from "./settlementStats";
import { setSurvival, survival } from "./survivalStats";
import { changeLog, setChangeLog, setWeekLog, weekLog } from "./weekLog";

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

let settlementList = {};

function saveSettlement(data) {
  settlementList[data] = {
      "Settlement Data": settlement,
      "Survival Data": survival,
      "Safety Data": safety,
      "Economy Data": economy,
      "Building Data": buildings,
      "Project Data": projectArray,
      "Deployed Data": deployedArray,
      "Notes Data": userNotes,
      "Selected Upgrades Data": selectedUpgrades,
      "Selected Levels Data": selectedLevels,
      "Nonselected Upgrades Data": nonselectedUpgrades,
      "Project Count Data": count,
      "Week Log Data": weekLog,
      "Change Log Data": changeLog
  }
    }

function checkSettlement() {
  if(Object.keys(settlementList).length < 1) {
    settlementList[settlement.name] = {
      "Settlement Data": settlement,
      "Survival Data": survival,
      "Safety Data": safety,
      "Economy Data": economy,
      "Building Data": buildings,
      "Project Data": projectArray,
      "Deployed Data": deployedArray,
      "Notes Data": userNotes,
      "Selected Upgrades Data": selectedUpgrades,
      "Selected Levels Data": selectedLevels,
      "Nonselected Upgrades Data": nonselectedUpgrades,
      "Project Count Data": count,
      "Week Log Data": weekLog,
      "Change Log Data": changeLog
    }
  }
}

  function setStorage() {
    checkSettlement();
    localStorage.setItem('settlementList', JSON.stringify(settlementList))
}

  function checkStorage() {
    if (storageAvailable("localStorage")) {
        if(!localStorage.getItem('settlementList')) {
            setStorage();
        } else {
            loadStorage();
        }
      } else {
        alert('fuck no');
      }
  }

  function loadStorage() {
    let settlementListData = JSON.parse(localStorage.getItem('settlementList'));
    settlementList = settlementListData;

    let name = Object.keys(settlementList)[0];

    let set = settlementList[name]    

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

    
  }

  export { checkStorage, setStorage, settlementList, saveSettlement }
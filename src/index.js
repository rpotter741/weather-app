import './style.css'
import { refreshPage, renderAll } from "./pageRenders";
import { checkStorage, setStorage } from "./storage";
import { weekLog } from './weekLog';
import { swapButtonRender } from './settlementManager';

///localStorage.clear()
checkStorage();
refreshPage();


window.addEventListener('beforeunload', setStorage)


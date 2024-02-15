import { buildings } from "./buildingsStats";
import { calcWorkers, projectArray } from "./projectBoxRender";
import renderProjects from "./renderProjects";

export default function nextWeek() {
    if(calcWorkers() < 0) {
        alert("You've assigned more workers than you have available. Make sure Productivity Available is at or above 0.");
        return;
    }

    projectArray.forEach((proj) => {
        proj.duration -= proj.workers;

        if(proj.duration <= 0) {
            endEvent(proj);
        }
    });


}
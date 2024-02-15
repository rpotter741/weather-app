
import { settlement } from "./settlementStats";
import { clearList, shopInterface } from "./shopInterface";
import { survival } from "./survivalStats";

function shopWindow() {
    let wrapper = document.querySelector('#buyBox');
    wrapper.id = 'buyBox'

    let header = document.createElement('div');
    header.textContent = "Management Shop";
    header.classList.add('header');
    header.style = 'border-radius: .5rem .5rem 0 0'
    wrapper.appendChild(header);

////////BUY/SELL SWITCHER////////
let buySell = document.createElement('div');
buySell.id = 'buySell';

let buy = document.createElement('button');
buy.textContent = "Buy";
buy.id = 'buyMode';
buy.classList.add('buybuy')


let sell = document.createElement('button');
sell.textContent = "Sell";
sell.id = 'sellMode';
sell.classList.add('sellbuy')


buy.addEventListener('click', () => {
    buy.classList.add('buybuy');
    buy.classList.remove('buysell');
    sell.classList.remove('sellsell');
    sell.classList.add("sellbuy");
    clearList();
    shopStatus = 0;
    shopInterface();
    document.querySelector('#tradeValue').classList.remove('sell');
    document.querySelector('#tradeValue').classList.add('buy');
    shopWrapper.classList.add('buy');
    shopWrapper.classList.remove('sell');
    

})

sell.addEventListener('click', () => {    
    sell.classList.add('sellsell');
    sell.classList.remove('sellbuy');
    buy.classList.remove('buybuy');
    buy.classList.add('buysell');
    clearList();
    shopStatus = 1;
    shopInterface();
    document.querySelector('#tradeValue').classList.add('sell');
    document.querySelector('#tradeValue').classList.remove('buy');
    shopWrapper.classList.remove('buy');
    shopWrapper.classList.add('sell');
    
})

buySell.appendChild(buy);
buySell.appendChild(sell);

wrapper.appendChild(buySell);

let shopWrapper = document.createElement('div');
shopWrapper.id = 'shopWrapper'
shopWrapper.classList.add('buy');

wrapper.appendChild(shopWrapper);

shopInterface();
document.querySelector('#tradeValue').classList.add('buy');

}

let shopStatus = 0;

export { shopStatus, shopWindow}


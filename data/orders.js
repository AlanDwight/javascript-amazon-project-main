export let orderList = JSON.parse(localStorage.getItem('orderListData')) || []; 

export function addingOrders(order){ 
    orderList.unshift(order);
    saveOrderListToLocalStorage();
}

function saveOrderListToLocalStorage(){
    localStorage.setItem('orderListData', JSON.stringify(orderList)); 
}
export let orderList = JSON.parse(localStorage.getItem('orderListData')) || []; 

export function addingOrders(order){ 
    orderList.unshift(order);
    orderList.forEach((item,index)=>{
        
        let ids = item.id
        
        orderList[index].products.forEach((item2, index2 )=>{
            item2.id = ids;
        })
        saveOrderListToLocalStorage();
    })
   console.log(orderList)
}

function saveOrderListToLocalStorage(){
    localStorage.setItem('orderListData', JSON.stringify(orderList)); 
}
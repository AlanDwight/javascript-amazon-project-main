// export let cartData = [
//         {
//             product : '',
//             quantity : 0 ,
//         } 
// ];
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from './deliveryOption.js';
import { converterFunc } from '../scripts/utils/currencyConverter.js';



// export let cartData = jsObj ; 

// if(!cartData){
//   cartData = [ 
//     {
//         id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//         image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//         name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//         rating: {
//           stars: 4.5,
//           count: 87
//         },
//         price: (1090/100).toFixed(2),
//         keywords: [
//           "socks",
//           "sports",
//           "apparel"
//         ], 
//         quantity : 2 , 
//       },
//       {
//         id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         image: "images/products/intermediate-composite-basketball.jpg",
//         name: "Intermediate Size Basketball",
//         rating: {
//           stars: 4,
//           count: 127
//         },
//         price: (2095/100).toFixed(2),
//         keywords: [
//           "sports",
//           "basketballs"
//         ],
//         quantity : 3 ,
//       },
// ]

// }

// ----------------------------------------------------

// export let cartData;
// dataCart();
// export function dataCart(){
//   cartData = jsObj || [ 
//     {
//         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//         image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//         name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//         rating: {
//           stars: 4.5,
//           count: 87
//         },
//         price: (1090/100).toFixed(2),
//         keywords: [
//           "socks",
//           "sports",
//           "apparel"
//         ], 
//         quantity : 2 , 
//         itemID : '1', 
//       },
//       {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         image: "images/products/intermediate-composite-basketball.jpg",
//         name: "Intermediate Size Basketball",
//         rating: {
//           stars: 4,
//           count: 127
//         },
//         price: (2095/100).toFixed(2),
//         keywords: [
//           "sports",
//           "basketballs"
//         ],
//         quantity : 3 ,
//         itemID : '2',
//       },
//   ]
// }


// ----------------------------------------------------
export let cartData; 
cartStorageFunc ();
function cartStorageFunc(){
  
  let jsonObj = localStorage.getItem('cartData'); 
  let jsObj = JSON.parse(jsonObj);
  
  cartData = jsObj || [ 
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        price: (1090/100).toFixed(2),
        keywords: [
          "socks",
          "sports",
          "apparel"
        ], 
        quantity : 2 , 
        itemID : '1', 
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
          stars: 4,
          count: 127
        },
        price: (2095/100).toFixed(2),
        keywords: [
          "sports",
          "basketballs"
        ],
        quantity : 3 ,
        itemID : '2',
      },
  ]
}



let data = [ 
    { 
        ite : 1, 
        qu : 2,
    }
]

export function addingProductToCart(item){
  let timeOutFunc;
  clearTimeout(timeOutFunc);
  let totalQuantity = 0 ;
  let quantityValue = Number(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value);
  for(let i = 0 ; i < cartData.length ; i ++ ){ 
    if(item.dataset.itemId == cartData[i].productId){ 
      clearTimeout(timeOutFunc);
      cartData[i].quantity+= quantityValue;
      console.log(cartData);
      
      cartQuantityCalc();
      
      console.log(totalQuantity);
      timerFunction();
      saveCartDataFunc(cartData);
      return;
    }
  }

  let condition = true ; 
  // for(let j = 0 ; j < cartData.length ; j ++ ){
  //   if(item.dataset.itemId != cartData[j].productId){
  //     timerFunction();
  //     condition = true ; 
  //   }
  // }

  if(condition){ 
    timerFunction();
    cartData.push({
      productId : `${item.dataset.itemId}`,
      quantity : quantityValue,
      image : `${item.dataset.itemImage}`,
      name : `${item.dataset.itemName}`,
      // price : `${((item.dataset.itemPrice)/100).toFixed(2)}`, 
      price : `${item.dataset.itemPrice}`, 
      itemID : '1', 
    });
    cartQuantityCalc();
    saveCartDataFunc(cartData);
    
  }

  function timerFunction(){ 
    clearTimeout(timeOutFunc);
    document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
    
    timeOutFunc = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
    }, 2000);
  }

  function cartQuantityCalc(){ 
    cartData.forEach((item, index)=> { 

      totalQuantity += item.quantity;  
    
    })
    document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
  };
  console.log(cartData);
  console.log(totalQuantity);

}

export function removeCartItem(cartItemId){ 
  let newCart = [];
  cartData.forEach((product,index)=>{ 
    if(product.productId !== cartItemId){ 
      newCart.push(product);
    }
  })
  cartData = newCart;
  saveCartDataFunc(cartData); 
  return newCart;
}

export function saveCartDataFunc(cartData){ 
  localStorage.setItem('cartData', JSON.stringify(cartData));
}

export function updateCartStorage(product, productID, deliveryOptions){ 
  let matchingItem ; 
  let day ;
  // console.log(product);

  cartData.forEach((item, index)=>{
    product == item.productId ? matchingItem = item : null ; 
  })
  // console.log(matchingItem)
  matchingItem.itemID = productID;

  deliveryOptions.forEach((options,index)=>{
    if(options.id == productID) {
       day = options.deliveryDays; 
    } 
  })
  let daysOpt = dayjs().add(Number(day), 'day');
  let date = daysOpt.format('dddd, MMMM D');
  // console.log(pro);
  // document.querySelector(`.delivery-date-${product}`).innerHTML = `Delivery date: ${date} `;
  saveCartDataFunc(cartData);
  return date ; 
   
}

export function dateCalculation(addedProduct){
  let day ;
  let days; 
  // let day; 
  let dateArray = []; 
  deliveryOptions.forEach ((options, index)=> { 
    if(addedProduct.itemID == options.id ){
       day =  options.deliveryDays; 
       days =  options.deliveryDays; 
    }
  })

  let todayDate = dayjs().format('d');
  
  if(todayDate == 0 || todayDate == 6) { 
    console.log('it\'s weekend');
    if(todayDate == 6 && day == 1 ){ 
      day = 2 ; 
    }
    if (todayDate == 0 && day == 7 ){ 
      day = 8 ; 
    }
    if (todayDate == 6 && day == 7){ 
      day = 9;
    }
  }else{ 
    console.log('it\s a weekday');
    if(todayDate == 3 && day == 3) { 
      day = 5 ; 
    }
    
    if(todayDate == 5 && day == 1 ){ 
      day = 3; 
    }

    if(todayDate == 4 && day == 3){ 
      day = 4;
    }

  }

  let daysOpt = dayjs().add(Number(day), 'day');
  let date = daysOpt.format('dddd, MMMM D');

  let deliveryCharge = 0;

  if(days == 7){ 
    deliveryCharge = 0;
  }else if(days == 3){ 
    deliveryCharge = 4.99; 
  }else if(days == 1){
    deliveryCharge = 9.99;
  }

  dateArray.push(date);
  dateArray.push(deliveryCharge);
  return dateArray ; 
}
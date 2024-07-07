// export let cartData = [
//         {
//             product : '',
//             quantity : 0 ,
//         } 
// ];
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from './deliveryOption.js';


let jsonObj = localStorage.getItem('cartData'); 
let jsObj = JSON.parse(jsonObj);

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

export let cartData = jsObj || [ 
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

let data = [ 
    { 
        ite : 1, 
        qu : 2,
    }
]

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
  let dateArray = []; 
  deliveryOptions.forEach ((options, index)=> { 
    if(addedProduct.itemID == options.id ){
       day =  options.deliveryDays; 
    }
  })
  let daysOpt = dayjs().add(Number(day), 'day');
  let date = daysOpt.format('dddd, MMMM D');

  let deliveryCharge = 0;

  if(day == 7){ 
    deliveryCharge = 0;
  }else if(day == 3){ 
    deliveryCharge = 4.99; 
  }else if(day == 1){
    deliveryCharge = 9.99;
  }

  dateArray.push(date);
  dateArray.push(deliveryCharge);
  return dateArray ; 
}
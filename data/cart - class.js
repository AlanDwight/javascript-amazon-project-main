// export let cartData = [
//         {
//             product : '',
//             quantity : 0 ,
//         } 
// ];
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from './deliveryOption.js';
import { converterFunc } from '../scripts/utils/currencyConverter.js';
import { cartData } from './cart.js';
// import { cartData } from './cart.js';
import { ProductClass,ClothingProductClass, Applicance } from './products.js';

export class CartClass{
  // class properties
  cartData; 
  #storageData;

  // class constructor 
  constructor(storageData){
    this.#storageData = storageData; 
    this.#cartStorageFunc();
  }
  
  // class method
  #cartStorageFunc(){
      
    let jsonObj = localStorage.getItem(this.#storageData); 
    let jsObj = JSON.parse(jsonObj);
  
    this.cartData = jsObj || [ 
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
          deliveryOptionId : '1',  
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
          deliveryOptionId : '2',  
        },
    ]
  };
  addingProductToCart(item){
    let timeOutFunc;
    clearTimeout(timeOutFunc);
    // let totalQuantity = 0 ;
    let quantityValue = Number(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value);
    for(let i = 0 ; i < this.cartData.length ; i ++ ){ 
      if(item.dataset.itemId == this.cartData[i].productId){ 
        clearTimeout(timeOutFunc);
        this.cartData[i].quantity+= quantityValue;
        console.log(this.cartData);
        
        this.cartQuantityCalc();
        
        // console.log(totalQuantity);
        this.timerFunction(item);
        this.saveCartDataFunc(this.cartData);
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
      this.timerFunction(item);
      this.cartData.push({
        productId : `${item.dataset.itemId}`,
        quantity : quantityValue,
        image : `${item.dataset.itemImage}`,
        name : `${item.dataset.itemName}`,
        // price : `${((item.dataset.itemPrice)/100).toFixed(2)}`, 
        // price : `${converterFunc(item.dataset.itemPrice)}`, 
        price : `${item.dataset.itemPrice}`, 
        itemID : '1', 
        deliveryOptionId: '1',
      });
      this.cartQuantityCalc();
      this.saveCartDataFunc(this.cartData);
      
    }
  
    // function timerFunction(){ 
    //   clearTimeout(timeOutFunc);
    //   document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
      
    //   timeOutFunc = setTimeout(() => {
    //     document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
    //   }, 2000);
    // }
  
    // function cartQuantityCalc(){ 
    //   this.cartData.forEach((item, index)=> { 
  
    //     totalQuantity += item.quantity;  
      
    //   })
    //   document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
    // };
    console.log(this.cartData);
    console.log(totalQuantity);
  
  };
  removeCartItem(cartItemId){ 
    let newCart = [];
    this.cartData.forEach((product,index)=>{ 
      if(product.productId !== cartItemId){ 
        newCart.push(product);
      }
    })
    this.cartData = newCart;
    this.saveCartDataFunc(this.cartData); 
    return newCart;
  };
  saveCartDataFunc(cartData){ 
    localStorage.setItem(this.#storageData, JSON.stringify(cartData));
  };
  updateCartStorage(product, productID, deliveryOptions){ 
    let matchingItem ; 
    let day ;
    // console.log(product);
  
    this.cartData.forEach((item, index)=>{
      product == item.productId ? matchingItem = item : null ; 
    })
    // console.log(matchingItem)
    matchingItem.itemID = productID;
    matchingItem.deliveryOptionId = productID;
  
    deliveryOptions.forEach((options,index)=>{
      if(options.id == productID) {
        day = options.deliveryDays; 
      } 
    })
    let daysOpt = dayjs().add(Number(day), 'day');
    let date = daysOpt.format('dddd, MMMM D');
    // console.log(pro);
    // document.querySelector(`.delivery-date-${product}`).innerHTML = `Delivery date: ${date} `;
    this.saveCartDataFunc(this.cartData);
    return date ; 
    
  };
  dateCalculation(addedProduct){
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
  };
  // adding new method (optional)
  cartQuantityCalc(){ 
    let totalQuantity = 0 ;
    this.cartData.forEach((item, index)=> { 

      totalQuantity += item.quantity;  
    
    })
    document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
  };
  timerFunction(item){ 
    let timeOutFunc;
    clearTimeout(timeOutFunc);
    document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
    
    timeOutFunc = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
    }, 2000);
  };
  // cartQuantityCalc(){ 
  //   let totalQuantity = 0 ;
  //   cartData.forEach((item, index)=> { 

  //     totalQuantity += item.quantity;  
    
  //   })
  //   document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
  // };


}


// function CartClass(storageData){ 
//       let  cartData = {
//         cartData : undefined,
//         cartStorageFunc(){
      
//           let jsonObj = localStorage.getItem(storageData); 
//           let jsObj = JSON.parse(jsonObj);
        
//           this.cartData = jsObj || [ 
//             {
//                 productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//                 image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//                 name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//                 rating: {
//                   stars: 4.5,
//                   count: 87
//                 },
//                 price: (1090/100).toFixed(2),
//                 keywords: [
//                   "socks",
//                   "sports",
//                   "apparel"
//                 ], 
//                 quantity : 2 , 
//                 itemID : '1', 
//               },
//               {
//                 productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//                 image: "images/products/intermediate-composite-basketball.jpg",
//                 name: "Intermediate Size Basketball",
//                 rating: {
//                   stars: 4,
//                   count: 127
//                 },
//                 price: (2095/100).toFixed(2),
//                 keywords: [
//                   "sports",
//                   "basketballs"
//                 ],
//                 quantity : 3 ,
//                 itemID : '2',
//               },
//           ]
//         },
//         addingProductToCart(item){
//           let timeOutFunc;
//           clearTimeout(timeOutFunc);
//           let totalQuantity = 0 ;
//           let quantityValue = Number(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value);
//           for(let i = 0 ; i < this.cartData.length ; i ++ ){ 
//             if(item.dataset.itemId == this.cartData[i].productId){ 
//               clearTimeout(timeOutFunc);
//               this.cartData[i].quantity+= quantityValue;
//               console.log(this.cartData);
              
//               cartQuantityCalc();
              
//               console.log(totalQuantity);
//               timerFunction();
//               this.saveCartDataFunc(this.cartData);
//               return;
//             }
//           }
        
//           let condition = true ; 
//           // for(let j = 0 ; j < cartData.length ; j ++ ){
//           //   if(item.dataset.itemId != cartData[j].productId){
//           //     timerFunction();
//           //     condition = true ; 
//           //   }
//           // }
        
//           if(condition){ 
//             timerFunction();
//             this.cartData.push({
//               productId : `${item.dataset.itemId}`,
//               quantity : quantityValue,
//               image : `${item.dataset.itemImage}`,
//               name : `${item.dataset.itemName}`,
//               // price : `${((item.dataset.itemPrice)/100).toFixed(2)}`, 
//               price : `${converterFunc(item.dataset.itemPrice)}`, 
//               itemID : '1', 
//             });
//             cartQuantityCalc();
//             this.saveCartDataFunc(this.cartData);
            
//           }
        
//           function timerFunction(){ 
//             clearTimeout(timeOutFunc);
//             document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
            
//             timeOutFunc = setTimeout(() => {
//               document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
//             }, 2000);
//           }
        
//           function cartQuantityCalc(){ 
//             cartData.forEach((item, index)=> { 
        
//               totalQuantity += item.quantity;  
            
//             })
//             document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
//           };
//           console.log(this.cartData);
//           console.log(totalQuantity);
        
//         },
//         removeCartItem(cartItemId){ 
//           let newCart = [];
//           this.cartData.forEach((product,index)=>{ 
//             if(product.productId !== cartItemId){ 
//               newCart.push(product);
//             }
//           })
//           this.cartData = newCart;
//           this.saveCartDataFunc(this.cartData); 
//           return newCart;
//         },
//         saveCartDataFunc(cartData){ 
//           localStorage.setItem(storageData, JSON.stringify(cartData));
//         },
//         updateCartStorage(product, productID, deliveryOptions){ 
//           let matchingItem ; 
//           let day ;
//           // console.log(product);
        
//           this.cartData.forEach((item, index)=>{
//             product == item.productId ? matchingItem = item : null ; 
//           })
//           // console.log(matchingItem)
//           matchingItem.itemID = productID;
        
//           deliveryOptions.forEach((options,index)=>{
//             if(options.id == productID) {
//               day = options.deliveryDays; 
//             } 
//           })
//           let daysOpt = dayjs().add(Number(day), 'day');
//           let date = daysOpt.format('dddd, MMMM D');
//           // console.log(pro);
//           // document.querySelector(`.delivery-date-${product}`).innerHTML = `Delivery date: ${date} `;
//           this.saveCartDataFunc(this.cartData);
//           return date ; 
          
//         },
//         dateCalculation(addedProduct){
//           let day ;
//           let days; 
//           // let day; 
//           let dateArray = []; 
//           deliveryOptions.forEach ((options, index)=> { 
//             if(addedProduct.itemID == options.id ){
//               day =  options.deliveryDays; 
//               days =  options.deliveryDays; 
//             }
//           })
        
//           let todayDate = dayjs().format('d');
          
//           if(todayDate == 0 || todayDate == 6) { 
//             console.log('it\'s weekend');
//             if(todayDate == 6 && day == 1 ){ 
//               day = 2 ; 
//             }
//             if (todayDate == 0 && day == 7 ){ 
//               day = 8 ; 
//             }
//             if (todayDate == 6 && day == 7){ 
//               day = 9;
//             }
//           }else{ 
//             console.log('it\s a weekday');
//             if(todayDate == 3 && day == 3) { 
//               day = 5 ; 
//             }
            
//             if(todayDate == 5 && day == 1 ){ 
//               day = 3; 
//             }
        
//             if(todayDate == 4 && day == 3){ 
//               day = 4;
//             }
        
//           }
        
//           let daysOpt = dayjs().add(Number(day), 'day');
//           let date = daysOpt.format('dddd, MMMM D');
        
//           let deliveryCharge = 0;
        
//           if(days == 7){ 
//             deliveryCharge = 0;
//           }else if(days == 3){ 
//             deliveryCharge = 4.99; 
//           }else if(days == 1){
//             deliveryCharge = 9.99;
//           }
        
//           dateArray.push(date);
//           dateArray.push(deliveryCharge);
//           return dateArray ; 
//         }
//       }
//       return cartData; 
// }


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

// const cartData  = CartClass('cartData');
// const businessCart = CartClass('businessCartData');

export let cartDataInstance = new CartClass('cartData'); 
let businessCart = new CartClass('businessCartData');

// cartDataInstance.storageData = 'cartData'; 
// businessCart.storageData = 'businessCartData';

// cartDataInstance.cartStorageFunc(); 
// businessCart.cartStorageFunc(); 

console.log('hello this is the start of oop');
console.log(cartDataInstance.cartData);
console.log(businessCart.cartData);
// cartData.removeCartItem('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')
console.log(cartDataInstance instanceof CartClass)
console.log('---------------------------')


let data = [ 
    { 
        ite : 1, 
        qu : 2,
    }
]


export function loadBackendCartList(fun){
  let requestHeader = new XMLHttpRequest();
  console.log('loading cart list');
  requestHeader.addEventListener('load', ()=>{
      console.log(requestHeader.response);
      fun(); // gonna run the main funtion on product front page (amazon_product.js) //call back after load
  });
  
  requestHeader.open('GET', 'https://supersimplebackend.dev/cart'); 
  requestHeader.send(); 
}

let product = []; 
export function loadBackendCartListUsingFetch(){
  fetch('https://supersimplebackend.dev/products').then((backendResponse)=>{
    console.log('cart list is loading');
    return backendResponse.json(); 
  }).then((data)=>{
    product = data.map((productInfo)=>{
      if(productInfo.type == 'clothing'){
        return new ClothingProductClass(productInfo);
      }else if(productInfo.type == 'appliance'){
        return new Applicance(productInfo);
      }
      return new ProductClass(productInfo);
    });
  }); 
}


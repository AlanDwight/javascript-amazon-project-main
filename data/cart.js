// export let cartData = [
//         {
//             product : '',
//             quantity : 0 ,
//         } 
// ];

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
  // {
  //     id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  //     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  //     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  //     rating: {
  //       stars: 4.5,
  //       count: 87
  //     },
  //     price: (1090/100).toFixed(2),
  //     keywords: [
  //       "socks",
  //       "sports",
  //       "apparel"
  //     ], 
  //     quantity : 2 , 
  //   },
  //   {
  //     id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  //     image: "images/products/intermediate-composite-basketball.jpg",
  //     name: "Intermediate Size Basketball",
  //     rating: {
  //       stars: 4,
  //       count: 127
  //     },
  //     price: (2095/100).toFixed(2),
  //     keywords: [
  //       "sports",
  //       "basketballs"
  //     ],
  //     quantity : 3 ,
  //   },
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


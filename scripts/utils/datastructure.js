// let savedData = [ 
//     { 
//         itemId : '1',
//         itemName : 'Computer', 
//         itemPrice : 800,
//     },
//     { 
//         itemId : '2',
//         itemName : 'Mouse', 
//         itemPrice : 100,
//     },
//     { 
//         itemId : '3',
//         itemName : 'keyboard', 
//         itemPrice : 200,
//     },
// ]

// let newSavedData = [ 
//     { 
//         itemId : '1',
//         itemName : 'item1', 
//         itemPrice : 800,
//     },
//     { 
//         itemId : '2',
//         itemName : 'item2', 
//         itemPrice : 100,
//     },
//     { 
//         itemId : '3',
//         itemName : 'item3', 
//         itemPrice : 200,
//     },
// ]

// savedData.forEach((item,index)=>{ 
//     console.log(`${item.itemName} is going to cost ${item.itemPrice} and insert Data ${insertData(item.itemName)}`)
// })

// function insertData(itemName){
//     let dataArray = '';
//     newSavedData.forEach((item,index)=>{
//         dataArray += `\n data array is ${itemName} and it's ${item.itemName}`
//     })

//     return dataArray;

// }

function headOrTail(){ 
    let randNum = Math.random(); 
    // console.log(randNum);
    if(randNum > 0.5){ 
        return `head`;
    }else {
        return `tail`;
    }
}


headOrTail();

function play(choice){ 
    let compChoice = headOrTail(); 
    if (choice == compChoice){ 
        return console.log(`your choice is ${choice} and comp choice is ${compChoice} and you win`); 
    }else {
        return console.log(`your choice is ${choice} and comp choice is ${compChoice} and you lose`)
    } 
}

play('head')

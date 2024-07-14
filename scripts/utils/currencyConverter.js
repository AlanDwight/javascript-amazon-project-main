export function converterFunc(cents){ 
    let output = (cents/100).toFixed(2); 
    return output; 
}


// console.log(converterFunc(3915.56))
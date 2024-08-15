export function convertToMonthDate(isoString) {
    const date = new Date(isoString);
    const options = {month: 'long', day: 'numeric' };
    
    let dayOfWeek = date.getDay(isoString);
    // date.toLocaleDateString('en-US', options) >> August 17
    // using space " " as delimiter
    // date.toLocaleDateString('en-US', options).split(" ") 
    // above snippet give us array of [August, 17]
    // date.toLocaleDateString('en-US', options).split(" ")[0] >> August
    // date.toLocaleDateString('en-US', options).split(" ")[1] >> 17
    
    let dayName; 
    function calculateDayName(dayOfWeek){ 
        date.setDate(date.getDate() - date.getDay() + dayOfWeek);
        dayName =  date.toLocaleDateString('en-US', { weekday: 'long' });
    }
    calculateDayName(dayOfWeek)

    
    if(dayOfWeek == 6){ 
        
        let newDayofWeek = dayOfWeek + 2;
        calculateDayName(newDayofWeek)
        let day = Number(date.toLocaleDateString('en-US', options).split(" ")[1]) + 2;
        
        return dayName + ', ' + date.toLocaleDateString('en-US', options).split(" ")[0] + ' ' + day;
    }else if (dayOfWeek == 0){ 
       
        let newDayofWeek = dayOfWeek + 1;
        calculateDayName(newDayofWeek)
        let day = Number(date.toLocaleDateString('en-US', options).split(" ")[1]) + 1;
        
        return dayName + ', ' + date.toLocaleDateString('en-US', options).split(" ")[0] + ' ' + day;
    }
    
    return dayName + ', ' + date.toLocaleDateString('en-US', options);
}


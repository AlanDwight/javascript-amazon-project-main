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

export function convertToMonthDateWithoutSkipping(isoString) {
    const date = new Date(isoString);
    const options = {month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', { day: 'numeric' })
}

export function calculatePercentageForTrackingProgressBar(orderDate,estDeliDate){
    let date = new Date();
    let currentDate = Number(date.toLocaleDateString('en-US', { day: 'numeric' }));
    let currentMonth = date.toLocaleDateString('en-US', { month: 'long' });
    let orderDateModify = Number((convertToMonthDate(orderDate).split(',')[1]).split(' ')[2]);
    let estDeliveryTimeModify = Number((convertToMonthDate(estDeliDate).split(',')[1]).split(' ')[2]); 

    let deliMonth; 
    let trackingPercentage; 
    
    deliMonth = (convertToMonthDate(estDeliDate).split(',')[1]).split(' ')[1]; 
    
    if((convertToMonthDate(orderDate).split(',')[1]).split(' ')[1] == (convertToMonthDate(estDeliDate).split(',')[1]).split(' ')[1]){
        trackingPercentage = ((currentDate - orderDateModify)/(estDeliveryTimeModify - orderDateModify))*100; 
        return trackingPercentage;
    }
    
    if(deliMonth == "September" || "April" || "June" || "November") { 
        // 30
        if(currentMonth != deliMonth){ 
            trackingPercentage = ((currentDate - orderDateModify)/((estDeliveryTimeModify + 30) - orderDateModify))*100; 
            return trackingPercentage;
        }else if(currentMonth == deliMonth){ 
            trackingPercentage = (((currentDate + 30) - orderDateModify)/((estDeliveryTimeModify + 30) - orderDateModify))*100; 
            return trackingPercentage; 
        }
    }else if(deliMonth == "February" ){ 
        // 28
        if(currentMonth != deliMonth){ 
            trackingPercentage = ((currentDate - orderDateModify)/((estDeliveryTimeModify + 28) - orderDateModify))*100; 
            return trackingPercentage;
        }else if(currentMonth == deliMonth){ 
            trackingPercentage = (((currentDate + 28) - orderDateModify)/((estDeliveryTimeModify + 28) - orderDateModify))*100; 
            return trackingPercentage; 
        }
    }else { 
        // 31
        if(currentMonth != deliMonth){ 
            trackingPercentage = ((currentDate - orderDateModify)/((estDeliveryTimeModify + 31) - orderDateModify))*100; 
            return trackingPercentage;
        }else if(currentMonth == deliMonth){ 
            trackingPercentage = (((currentDate + 31) - orderDateModify)/((estDeliveryTimeModify + 31) - orderDateModify))*100; 
            return trackingPercentage; 
        }
    }
}
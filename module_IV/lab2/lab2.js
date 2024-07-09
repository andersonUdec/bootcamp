const performance = require("perf_hooks");
const elementsJson =  require('../elements.json');

function gruopByMobileDeviceBrand(elements){
    const mobileDeviceBrand = elements.reduce((deviceBrand, element) => {
        const brand = element.mobile_device_brand.toLowerCase();
        if (!deviceBrand[brand]) {
            deviceBrand[brand] = []
        } 
        deviceBrand[brand].push(element);
        return deviceBrand;
    }, {});

    return mobileDeviceBrand;
}

let start = performance.performance.now();
const result = gruopByMobileDeviceBrand(elementsJson);
let end = performance.performance.now();
let durationInTime = end - start;
console.log(`Time ${durationInTime}ms.`);
console.log(result);
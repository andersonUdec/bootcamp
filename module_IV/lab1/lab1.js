const performance = require("perf_hooks");
const elementsJson =  require('../elements.json');

function countGenders(elements) {
    const genderCounts = elements.reduce((genderName, element) => {
        const gender = element.gender.toLowerCase().replace('-','');
        if (genderName[gender]) {
            genderName[gender]++;
        } else {
            genderName[gender] = 1;
        }
        return genderName;
    }, {});

    return genderCounts;
}
let start = performance.performance.now();
const result = countGenders(elementsJson);
let end = performance.performance.now();
let durationInTime = end - start;
console.log(`Time ${durationInTime}ms.`);
console.log(result);
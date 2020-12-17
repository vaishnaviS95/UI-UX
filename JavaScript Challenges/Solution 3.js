function solve(str) {
    let upper = str.split('').filter(x=> x===x.toUpperCase()).length;
    let lower = str.length - upper;
    return (upper>lower)? str.toUpperCase() : str.toLowerCase();
}


console.log(solve("ADIL"))
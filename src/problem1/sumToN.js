var sum_to_n_a = function (n) {
    // for loop method: looping through the number 1 to n
    if (n < 0) return 0
    let sum = 0
    for (let num = 1; num <= n; num++) {
        sum += num
    }
    return sum
}

var sum_to_n_b = function (n) {
    // mathematical method: using the mathematical formula n(n+1)/2
    if (n < 0) return 0
    return (n * (n + 1)) / 2
}

var sum_to_n_c = function (n) {
    // javascript function method: using javascript array and reduce function
    if (n < 0) return 0
    let array = Array.from(Array(n + 1).keys())
    return array.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    )
}

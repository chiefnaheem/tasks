function counter (initialNumber = 0) {
    const next = () => initialNumber++
    const get = () => initialNumber;
    return [get, next]
}

const [getA, nextA] = counter(1)
console.log(getA())
nextA()
console.log(getA())

const [getB, nextB] = counter(10)
nextB()
console.log(getA())
console.log(getB())
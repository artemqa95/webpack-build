async function start () {
    let a = await Promise.resolve('async working')
    return a
}

const unused = 42
start().then(console.log)
class Util {
    static id = Date.now()
}
console.log(Util.id)
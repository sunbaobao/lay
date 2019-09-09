setImmediate(() => {
    console.log('setImmediate1');
    process.nextTick(() => {
        console.log('nextTick1')
    });
    setTimeout(() => {
        console.log('setTimeout1')
    }, 0)
});
setTimeout(() => {
    console.log('setTimeout21');
}, 0);
setTimeout(() => {
    console.log('setTimeout2');
    Promise.resolve().then(() => {
        console.log("promise1")
    });
    process.nextTick(() => {
        console.log('nextTick11')
    });
    Promise.resolve().then(() => {
        console.log("promise2")
    });
    setImmediate(() => {
        console.log('setImmediate2')
    })
}, 0);

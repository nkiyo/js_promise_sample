async function sample(value, toSec) {
    console.log(`sample(${value}) start`);
    return new Promise((resolve, reject) => {
        if(value === 444) {
            throw new Error('reject!!');
        }
        setTimeout(() => {
            console.log(`sample(${value}) resolved ${value * 2}.`);
            resolve(value * 2);
        }, toSec * 1000);
    });
    //throw new Error('reject!');
    //return 'resolve!';
}

function func() {
    sample().then(value => {
        console.log(`then ${value}`);
    }).catch(err => {
       console.log(`catch ${err}`);
    });
}

// 直列で非同期処理を実行
async function serialFunc() {
    try {
        console.log(`serialFunc() start`);
        const res1 = await sample(5, 5);
        console.log(`...`);
        const res2 = await sample(3, 3);
        const res444 = await sample(444, 4);
        console.log(`serialFunc() end`);
        return res1 + res2;
    } catch(e) {
        console.log(`catch`);
        throw e;
    } finally {
        console.log(`serialFunc() finally`);
    }
}

// 並列で非同期処理を実行
async function parallelFunc() {
}

serialFunc().
then(res => {
    console.log(`res is ${res}.`);
})
.catch(err => {
    console.error(err.stack);
});


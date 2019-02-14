// Promiseを返すサンプル関数
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
}

// 直列で非同期処理を実行
async function serialFunc() {
    try {
        console.log(`serialFunc() start`);
        const res1 = await sample(5, 5);
        console.log(`...`);
        const res2 = await sample(3, 3);
        //const res444 = await sample(444, 4);
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
    const [a, b, c] = await Promise.all([
        sample(3, 3),
        sample(2, 2),
        sample(1, 1),
        //sample(444, 1),
    ]);

    return [a, b, c];
}

async function parallelFunc2() {
    const a = await Promise.race([
        sample(3, 3),
        sample(2, 2),
        sample(1, 1),
        //sample(444, 1),
    ]);

    return a;
}

//serialFunc().
//then(res => {
//    console.log(`res is ${res}.`);
//})
//.catch(err => {
//    console.error(err.stack);
//});

//parallelFunc().
//then(([a, b, c]) => {
//    console.log(`res is ${a + b + c}`);
//}).
//catch(err => {
//    console.error(err.stack);
//});

parallelFunc2().
then((a) => {
    console.log(`res is ${a}`);
}).
catch(err => {
    console.error(err.stack);
});

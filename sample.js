async function sample(value) {
    console.log(`sample(${value}) start`);
    return new Promise((resolve, reject) => {
        if(value === 444) {
            throw new Error('reject!!');
        }
        setTimeout(() => {
            console.log(`sample(${value}) resolved ${value * 2}.`);
            resolve(value * 2);
        }, 2000);
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

async function f2() {
    try {
        console.log(`f2() start`);
        const res1 = await sample(5);
        console.log(`...`);
        const res2 = await sample(3);
        //const res444 = await sample(444);
        console.log(`f2() end`);
        return res1 + res2;
    } catch(e) {
        console.log(`catch ${e}`);
        throw new Error('f2 failed.');

    }
}

f2().
then(res => {
    console.log(`res is ${res}.`);
})
.catch(err => {
    console.error('f2 catch');
});

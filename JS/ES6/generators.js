/*
 *
 *
 */

//
// function *foo() {
//     try {
//         var x = yield 3;
//         console.log( "x: " + x ); // may never get here!
//     }
//     catch (err) {
//         console.log( "Error: " + err );
//     }
// }
//
// var it = foo();
//
// var res = it.next(); // { value:3, done:false }
// console.log(res);
//
// // instead of resuming normally with another `next(..)` call,
// // let's throw a wrench (an error) into the gears:
// it.throw( "Oops!" ); // Error: Oops!

function runGenerator(g) {
    let it = g();

    // asynchronously iterate over generator
    (function iterate(val){
        let ret = it.next(val);
        if (!ret.done) {
            if (ret.value instanceof Promise ) {
                // promise
                ret.value.then( iterate );
                // error handling
                // ret.value.then( iterate, (err) => {it.throw(err)} );
            }

            else {
                // immediate value
                setTimeout( function(){
                    iterate( ret.value );
                }, 0 );
            }
        }
    })();
}

function req(val) {
    return new Promise( (resolve,reject) => {
        setTimeout(()=>{ resolve('resolved ' + val) }, 1000)
});
}

function *foo() {
    console.log(yield);

    console.log(yield req('a'));
    console.log(yield req('b'));
    console.log(yield req('c'));

    console.log(yield 1);
    console.log(yield 10);
}



runGenerator(foo);

console.log('started')
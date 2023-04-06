// When implementing a promise-based API, a Promise object is utilized to handle the success or failure of an asynchronous operation
// The Promise() constructor accepts an executor function as an argument
//  -Executor function accepts two functions as arguments called "resolve" and "reject"
//  -Async function in the executor is called and if it succeeds, "resolve" is called. Otherwise, "reject" is called.

const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#button');
const output = document.querySelector('#output');

// Promise() constructor can be implemented like so:
function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error('Alarm delay cannot be negative');
        }
        if (person === '') {
            throw new Error('A name has not been entered')
        }
        setTimeout(() => {
            resolve(`Wake up, ${person}!`)
        }, delay);
    });
}
// The function above creates and returns a new Promise that is then handled

// The alarm() API above can be used by calling alarm() and then calling then() and catch() to handle the promise
/*
    button.addEventListener('click', () => {
        alarm(name.value, delay.value)
            .then(message => output.textContent = message)
            .catch(error => output.textContent = error);
    });
*/

// "async" and "await" can also be used with the alarm() API since alarm() returns a promise
button.addEventListener('click', async () => {
    try {
        const message = await alarm(name.value, delay.value);
        output.textContent = message;
    }
    catch (error) {
        output.textContent = error;
    }
});
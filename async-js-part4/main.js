// A program that contains only synchronous code is single-threaded
//  -A thread is a series of instructions that are to be executed
//  -Being single-threaded means only one task can be accomplished at a time
// Workers allow for multithreading
// If threads have access to the same variables, this can cause unexpected bugs that are difficult to find
//  -Can be avoided by separating the main code and worker code so that they do not share variables
// Workers have no access to the DOM
// Three types of workers include:
//  -Dedicated workers
//  -Shared workers
//  -Service workers

/* The following code is synchronous and single-threaded:
function generatePrimes(quota) {

    function isPrime(n) {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    }

    const primes = [];
    const maximum = 1000000;

    while (primes.length < quota) {
        const candidate = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }

    return primes;
}

document.querySelector('#generate').addEventListener('click', () => {
    const quota = document.querySelector('#quota').value;
    const primes = generatePrimes(quota);
    document.querySelector('#output').textContent = `Finished generating ${quota} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
    document.querySelector('#user-input').value = '';
    document.location.reload();
});

// After generatePrimes() is called, the program becomes unresponsive and the text box cannot be interacted with until the function is done executing
*/

/* The code above is modified to incorporate worker code. Here is the modified code: */

// Assign worker with the code in "generate.js"
const worker = new Worker('./generate.js');

document.querySelector('#generate').addEventListener('click', () => {
    const quota = document.querySelector('#quota').value;

    // A message is sent to the worker when "Generate primes" is clicked
    // The message accepts a JSON object as an argument that contains the properties "command" and "quota"
    // The message command is "generate" and quota is the number of primes to generate
    worker.postMessage({
        command: 'generate',
        quota,
    });
});

// A "message" event handler is added to the worker
// Output is updated when the worker sends a message back to the main thread
// Message data contains the number of primes generated
worker.addEventListener('message', (message) => {
    document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
    document.querySelector('#user-input').value = '';
    document.location.reload();
});
// Listen for messages from the "main.js", which is the main thread
addEventListener('message', (message) => {
    // Call generatePrimes() if the message command is "generate"
    if (message.data.command === 'generate') {
        generatePrimes(message.data.quota);
    }
});

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

    // Send a message containing the number of primes generated to the main thread when the function is finished executing
    postMessage(primes.length);
}

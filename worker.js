// worker.js
const { parentPort, workerData } = require('worker_threads');
const { ethers } = require('ethers');

const prefix = workerData.prefix.toLowerCase();
let attempts = 0;
const progressInterval = 10000; // send progress update every 10,000 attempts

while (true) {
    const wallet = ethers.Wallet.createRandom();
    attempts++;

    // Send periodic progress updates to the main process
    if (attempts > 0) {
        parentPort.postMessage({ type: 'progress', attempts });
    }

    // Check if the generated address matches the desired prefix
    if (wallet.address.slice(2).toLowerCase().startsWith(prefix)) {
        parentPort.postMessage({
            type: 'result',
            address: wallet.address,
            privateKey: wallet.privateKey,
            attempts
        });
        break; // Exit the loop when a match is found
    }
}

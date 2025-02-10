// Import ipcRenderer to communicate with the main process
const { ipcRenderer } = require('electron');

// Get DOM elements for later use
const generateButton = document.getElementById('generate');
const prefixInput = document.getElementById('prefix');
const resultDiv = document.getElementById('result');

let generationStatus = false;

// Event listener for the "Generate Address" button
generateButton.addEventListener('click', async () => {
    document.getElementById('generate').innerText = generationStatus ? 'Start' : 'Stop';
    generationStatus = !generationStatus;

    let prefix = prefixInput.value.trim().toLowerCase();

    // Ensure the prefix is provided
    if (!prefix) {
        alert('Please enter a prefix!');
        return;
    }

    // Remove "0x" if accidentally included
    if (prefix.startsWith('0x')) {
        prefix = prefix.slice(2);
    }

    resultDiv.innerHTML = '<p>Starting generation... please wait.</p>';

    // Clear any existing listeners (to avoid duplicates if reusing the UI)
    ipcRenderer.removeAllListeners('vanity-progress');
    ipcRenderer.removeAllListeners('vanity-result');
    ipcRenderer.removeAllListeners('vanity-error');

    // Listen for progress updates from the main process
    ipcRenderer.on('vanity-progress', (event, data) => {
        resultDiv.innerHTML = `<p>Attempts so far: ${data.attempts}</p>`;
    });

    // Listen for the final result (using once so that it's handled only a single time)
    ipcRenderer.once('vanity-result', (event, data) => {
        resultDiv.innerHTML = `
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Private Key:</strong> ${data.privateKey}</p>
        <p><strong>Total Attempts:</strong> ${data.attempts}</p>
        `;

        generationStatus = false;
        document.getElementById('generate').innerText = 'Start';
    });

    // Optionally, listen for error events
    ipcRenderer.once('vanity-error', (event, data) => {
        resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
    });

    // Send a message to start the generation in the worker thread
    ipcRenderer.send('start-generation', prefix);
});

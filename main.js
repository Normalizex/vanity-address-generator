// Import required modules from Electron and ethers.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { ethers } = require('ethers');
const { Worker } = require('worker_threads');

// Function to create the main application window
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 450,
        frame: false,
        webPreferences: {
            // In this example, nodeIntegration is enabled for simplicity.
            // For production, consider using preload scripts and enabling contextIsolation.
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load the HTML file for the UI
    win.loadFile('index.html');
}

// Wait for Electron to be ready before creating the window
app.whenReady().then(createWindow);

// Listen for "start-generation" events from the renderer process
ipcMain.on('start-generation', (event, prefix) => {
    // Create a new worker thread to generate the vanity address
    const worker = new Worker(path.join(__dirname, 'worker.js'), {
        workerData: { prefix } // pass the desired prefix to the worker
    });

    // Forward messages from the worker to the renderer process
    worker.on('message', (msg) => {
        if (msg.type === 'progress') {
            // Forward progress updates
            event.sender.send('vanity-progress', msg);
        } else if (msg.type === 'result') {
            // Forward the final result and optionally terminate the worker
            event.sender.send('vanity-result', msg);
        }
    });

    // Log any errors that occur in the worker
    worker.on('error', (error) => {
        console.error('Worker error:', error);
        event.sender.send('vanity-error', { error: error.message });
    });

    // Optionally, listen for worker exit event
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
});
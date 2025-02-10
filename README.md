# vanity-address-generator
An Electron-based utility for generating Ethereum vanity addresses with a custom prefix.

## Overview

This application uses Electron, Node.js, and ethers.js to generate Ethereum addresses that start with a user-defined prefix. The heavy computation is offloaded to a separate worker thread, which sends asynchronous progress updates to the UI.

### Key Features
- **Customizable Vanity Prefix:** Specify the prefix your Ethereum address should start with.
- **Asynchronous Generation:** Uses Node.js worker threads to perform address generation without freezing the UI.
- **Real-Time Progress Updates:** See the number of attempts as the generator works.
- **Modern, Minimal UI:** Built with HTML/CSS.

## Project Structure
```
vanity-address-generator/ 
├── package.json # Project configuration and dependencies 
├── main.js # Main Electron process (window creation, IPC) 
├── index.html # Application HTML UI 
├── renderer.js # Renderer process: UI logic and IPC communication 
└── worker.js # Worker thread: performs the vanity address generation
```
## Prerequisites

- [Node.js](https://nodejs.org/) (v12+ recommended)
- npm (included with Node.js)

## Installation

1. **Clone or Download the Repository:**  
   Copy the project files into a local directory.

2. **Install Dependencies:**  
   Open a terminal in the project directory and run:
   ```bash
   npm install
   ```

## Running the Application
To start the Electron application, run:
```
npm start
```
This will open the application window where you can input your desired prefix and start the generation process.

## How to Use
1. **Enter the Prefix:**
In the input field, type the desired prefix (e.g., faded1 for an address starting with 0xfaded1...).

2. **Start Generation:**
Click the "Start" button to initiate the vanity address generation.

3. **View Progress and Result:**
A logging section shows the number of attempts made.
Once a matching address is found, the application displays the address, its private key, and the total number of attempts.

## Dependencies
* [Electron](https://www.electronjs.org/): Used to create the cross-platform desktop application.
* [ethers.js](https://docs.ethers.org/): Library for generating Ethereum wallets.
* Node.js `worker_threads`: Module used for asynchronous processing.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing
Contributions, suggestions, and bug reports are welcome! Feel free to submit pull requests or open issues.
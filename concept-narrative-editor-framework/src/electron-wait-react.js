// A script that executes the 'npm run electron' command if the React dev server is ready.

const net = require('net');
// Foreman will offset the port number by 100 for processes of different types.
// So, this script subtracts 100 to set the port number of the React dev server correctly.
// https://github.com/strongloop/node-foreman#advanced-usage
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_ENTRY_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('Starting Electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            exec('npm run electron');
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});


const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const { performance } = require('perf_hooks');

// 1. Encrypt the string "Hello, Good Morning" and generate a random string using UUID
function encryptString() {
    const algorithm = 'aes-256-cbc';
    const password = crypto.randomBytes(32); // Key
    const iv = crypto.randomBytes(16); // Initialization vector

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv);
    let encrypted = cipher.update('Hello, Good Morning', 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    console.log('Encrypted String:', encrypted);
    
    const uuid = crypto.randomUUID();
    console.log('Generated UUID:', uuid);
}

// 2. Handle stream to read large txt files, compare it with normal file system read function
function handleStream(filePath) {
    const startStream = performance.now();
    const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    stream.on('data', (chunk) => {});
    stream.on('end', () => {
        const endStream = performance.now();
        console.log('Stream Read Time:', (endStream - startStream).toFixed(2), 'ms');
    });

    const startNormalRead = performance.now();
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        const endNormalRead = performance.now();
        console.log('Normal Read Time:', (endNormalRead - startNormalRead).toFixed(2), 'ms');
    });
}

// 3. Print all the details of your system
function printSystemDetails() {
    console.log('System Information:');
    console.log('Architecture:', os.arch());
    console.log('CPUs:', os.cpus());
    console.log('Free Memory:', os.freemem());
    console.log('Total Memory:', os.totalmem());
    console.log('Home Directory:', os.homedir());
    console.log('OS Platform:', os.platform());
    console.log('OS Release:', os.release());
    console.log('Network Interfaces:', os.networkInterfaces());
}

// Main function to run based on command-line arguments
function main() {
    const args = process.argv.slice(2);

    if (args.includes('--encrypt')) {
        encryptString();
    }

    if (args.includes('--stream')) {
        const filePath = args[args.indexOf('--stream') + 1];
        if (filePath) {
            handleStream(filePath);
        } else {
            console.log('Please provide a file path for the stream.');
        }
    }

    if (args.includes('--os-info')) {
        printSystemDetails();
    }
}

main();

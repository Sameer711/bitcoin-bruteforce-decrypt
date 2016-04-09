/*
Source: https://github.com/salibhai1/bitcoin-bruteforce-decrypt
Author: Sameer Alibhai
Description: Read words from stdin and try to decrypt the wallet using multiple threads (defined as NUM_THREADS)
USE FOR GOOD NOT EVIL!!!!

to use this:

1) npm install underscore, and install node-gyp whiich requires python. see https://github.com/nodejs/node-gyp#installation
npm install node-gyp 
2) install webworker-threads, see https://github.com/audreyt/node-webworker-threads
npm install webworker-threads
3) input the passwords using stdin. The following will feed the wordlist to john the ripper and send the words 1 by 1 to the js engine. you can get JTR from http://www.openwall.com/john/ or use any other way of feeding in words to stdin
c:\utils\john179\run\john.exe -wordlist=1to10.txt --stdout | node wallet-node-stdin-multithread-crack.js

*/
var Threads = require('webworker-threads');
var _ = require('underscore');
var fs = require('fs');
var vm = require('vm');
var encrypted = '1dMO9KjdMNuHreZ6x3QLqJR8WHjVjpb+XAOAJh7EKmP7PRMPSs/BRTjowVb0tAzZ9hu/sBRngEoQjYfdFcVDIXP/I4fRu9WxEfiR/76nqQ2qt7Ro2gisZ9RaRBI8oQTfdNjLJxK2P4iF1EtNPqeyJvh21uQOtZQuhxoAuUkKDJlrjOY1akKzth3rw+orQ8L7v1u74toHaIDFSyrMk6e3JiX/6C2e3QVzAkwD6yIh0mNppnoijDSVsbIpaOAyzurE1Pz7SAmTvKMz8igAXSXgGwhtyV+5UMJg4eVcIr+2M623SesaqWqMatYDqNIHKDFs/0ZRxpwzfU1mw+csq+FyunV68xiZKR28g1ZIWg5halhk064nU2QRiM7OzTLm7IXNuztjkWNC4deZgNcYCNFJXKsVaK1N+ch2BHDJx/UW+etAb2YN/tOkSHHPjJ4XLeVsyaU1ztla0t28x+IUyjn6ZL+7KtE+f7IGxEuO762qYQzZB25Z4xjI2Srd8P7d+qLaAhjVVjaM2dl+WEhixs0x65Fc139+j+w6vQc23XaPqJN1lV7laoqSGqMnAcyHLtuIMS5yuTHHTuV+CyaWHaCmZLuNvsWATJ0rhCUZbcvWK8r3XrCUhjzuu8xyaerBrzddy0WNH9HVUmocSyimJR6VzTKwQ0nnFplMFsPf+eC3Qp9o4DepZSk+gyIjolc/LTRW';
//1to10 test
var NUM_THREADS = 7;
function include(path) {
    var code = fs.readFileSync(path, 'utf-8');
    vm.runInThisContext(code, path);
}
include("lib/crypto.js");

function decrypt(password) {
    //console.log('testing with pass' + password);
    //var testEncrypted = '1dMO9KjdMNuHreZ6x3QLqJR8WHjVjpb+XAOAJh7EKmP7PRMPSs/BRTjowVb0tAzZ9hu/sBRngEoQjYfdFcVDIXP/I4fRu9WxEfiR/76nqQ2qt7Ro2gisZ9RaRBI8oQTfdNjLJxK2P4iF1EtNPqeyJvh21uQOtZQuhxoAuUkKDJlrjOY1akKzth3rw+orQ8L7v1u74toHaIDFSyrMk6e3JiX/6C2e3QVzAkwD6yIh0mNppnoijDSVsbIpaOAyzurE1Pz7SAmTvKMz8igAXSXgGwhtyV+5UMJg4eVcIr+2M623SesaqWqMatYDqNIHKDFs/0ZRxpwzfU1mw+csq+FyunV68xiZKR28g1ZIWg5halhk064nU2QRiM7OzTLm7IXNuztjkWNC4deZgNcYCNFJXKsVaK1N+ch2BHDJx/UW+etAb2YN/tOkSHHPjJ4XLeVsyaU1ztla0t28x+IUyjn6ZL+7KtE+f7IGxEuO762qYQzZB25Z4xjI2Srd8P7d+qLaAhjVVjaM2dl+WEhixs0x65Fc139+j+w6vQc23XaPqJN1lV7laoqSGqMnAcyHLtuIMS5yuTHHTuV+CyaWHaCmZLuNvsWATJ0rhCUZbcvWK8r3XrCUhjzuu8xyaerBrzddy0WNH9HVUmocSyimJR6VzTKwQ0nnFplMFsPf+eC3Qp9o4DepZSk+gyIjolc/LTRW';
    var encrypted = '1dMO9KjdMNuHreZ6x3QLqJR8WHjVjpb+XAOAJh7EKmP7PRMPSs/BRTjowVb0tAzZ9hu/sBRngEoQjYfdFcVDIXP/I4fRu9WxEfiR/76nqQ2qt7Ro2gisZ9RaRBI8oQTfdNjLJxK2P4iF1EtNPqeyJvh21uQOtZQuhxoAuUkKDJlrjOY1akKzth3rw+orQ8L7v1u74toHaIDFSyrMk6e3JiX/6C2e3QVzAkwD6yIh0mNppnoijDSVsbIpaOAyzurE1Pz7SAmTvKMz8igAXSXgGwhtyV+5UMJg4eVcIr+2M623SesaqWqMatYDqNIHKDFs/0ZRxpwzfU1mw+csq+FyunV68xiZKR28g1ZIWg5halhk064nU2QRiM7OzTLm7IXNuztjkWNC4deZgNcYCNFJXKsVaK1N+ch2BHDJx/UW+etAb2YN/tOkSHHPjJ4XLeVsyaU1ztla0t28x+IUyjn6ZL+7KtE+f7IGxEuO762qYQzZB25Z4xjI2Srd8P7d+qLaAhjVVjaM2dl+WEhixs0x65Fc139+j+w6vQc23XaPqJN1lV7laoqSGqMnAcyHLtuIMS5yuTHHTuV+CyaWHaCmZLuNvsWATJ0rhCUZbcvWK8r3XrCUhjzuu8xyaerBrzddy0WNH9HVUmocSyimJR6VzTKwQ0nnFplMFsPf+eC3Qp9o4DepZSk+gyIjolc/LTRW';
    var mode = new Crypto.mode.CBC(Crypto.pad.iso10126);
    var data = encrypted;
    try {
        var decoded = Crypto.AES.decrypt(data, password, { mode: mode, iterations: 10 });
        if (decoded != null && decoded.length > 0) {
            decoded += "\npassword:" + password;
            return decoded;
        }
    } catch (e) {
        //console.log("exception:" + e);
    }
    return null;
}

//var pool = Threads.createPool(NUM_THREADS);
//pool.load('crypto.js');
//pool.all.eval(decrypt);

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    processLine(line);
});

rl.on('close', function () {
    pool.destroy();
    process.exit(0);
});

function processLine(line) {
    //console.log('node received' + line);
    var password = line + "";
    //pool.any.eval('decrypt("' + password + '")', function (err, val) {
    val = decrypt(password);
    if (val != null && val != "null" && val.length > 0) {
        writeResult(val);
        console.log("** RESULT FOUND***" + val);
        //pool.destroy();
        process.exit(0);

    }
    //if (err) {
    //    console.log(err);
    //}
    //});
    //var result = decrypt(encrypted, password);
}

function writeResult(result) {
    fs.writeFile("result.txt", result, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}
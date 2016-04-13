# bitcoin-bruteforce-decrypt
A simple wrapper to decrypt bitcoin wallets by trying keys sequentually

Back in April 2014 my friend lost his bitcoin wallet password.  He pretty much knew it, but he was missing a character here and there.  
So I took this as a challenge to find different ways of solving this problem. I had a decrypt library in javascript, so I tried using node.js, web workers, phantom js and other means to get this to work.
Eventually I did get his bitcoin wallet recovered :)  I inputted a list of 1000 passwords or so to the app based on his hints, and it worked!

Excuse the mess, I never intended to share this with anyone, but I wanted to put it up as an example of some of the stuff I was playing around with.

Try it here:
- [simple UI](http://agilechai.com/code/bitcoin-bruteforce-decrypt-poc/DecryptWallet_2PW_Fix3.html)
- [Using javascript webworkers](http://agilechai.com/code/bitcoin-bruteforce-decrypt-poc/ReadExternalUriWebWorkers.html)

And then there's the most powerful one, a [multithreaded node.js version](https://github.com/salibhai1/bitcoin-bruteforce-decrypt/blob/master/wallet-node-stdin-multithread-crack.js) (tested with Node 4.4.2 LTS built using webworker-threads npm package).  There is a property that controls how many threads you wish to run.  By default it's set to 7.

Here is how you would run it on Windows:
- c:\utils\john179\run\john.exe -wordlist=data\1to10.txt --stdout | node wallet-node-stdin-multithread-crack.js

The sample wallet used above is [1CkjhyBqfGVMME82nMrQYgtW7UAmibvvUW](https://blockchain.info/address/1CkjhyBqfGVMME82nMrQYgtW7UAmibvvUW) , the json encrypted backup is secured with the key 1234567890

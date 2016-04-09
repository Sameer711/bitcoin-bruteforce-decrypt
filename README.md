# bitcoin-bruteforce-decrypt
A simple wrapper to decrypt bitcoin wallets by trying keys sequentually

Back in April 2014 my friend lost his bitcoin wallet password.  He pretty much knew it, but he was missing a character here and there.  
So I took this as a challenge to find different ways of solving this problem. I had a decrypt library in javascript, so I tried using node.js, web workers, phantom js and other means to get this to work.
Eventually I did get his bitcoin wallet recovered :)  I inputted a list of 1000 passwords or so to the app based on his hints, and it worked!

Excuse the mess, I never intended to share this with anyone, but I wanted to put it up as an example of some of the stuff I was playing around with.

Try it here:
- [simple UI](http://agilechai.com/code/bitcoin-bruteforce-decrypt-poc/DecryptWallet_2PW_Fix3.html)
- [read external URI](http://agilechai.com/code/bitcoin-bruteforce-decrypt-poc/ReadExternalUriWebWorkers.html)


The wallet is [1CkjhyBqfGVMME82nMrQYgtW7UAmibvvUW](https://blockchain.info/address/1CkjhyBqfGVMME82nMrQYgtW7UAmibvvUW) , the json encrypted backup is secured with the key 1234567890
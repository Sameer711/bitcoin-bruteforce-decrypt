importScripts('lib/crypto.js','http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js');    

var index = 0;
self.addEventListener('message', function(e) {
		
	 var encrypted = e.data.encrypted;
	 var passwords = e.data.passwords;
	 var result = decryptWallet(encrypted,passwords);
	 self.postMessage(result);
	  self.close();
}, false);


function decrypt(data, password) {

	var mode = new Crypto.mode.CBC(Crypto.pad.iso10126);
	try {
		var decoded = Crypto.AES.decrypt(data, password, { mode: mode, iterations : 10 });
		if (decoded != null && decoded.length > 0) {
			//backup_found_cb(decoded);
			decoded += "\npassword:" + password;
			return decoded;				
		}
	} catch (e) {
		//console.log(e);
	}
	return null;
}

function decryptWallet(encrypted, passwords) {
	//self.postMessage(index++);
	var result =  null;

	_.each(passwords, function(password) {
		self.postMessage(result);
		if (password == null || password.length == 0) {
			return;
		}
		
		var v = decrypt(encrypted, password);
		if (v != null)
		{ 
			result = v;
		}
	});
		
	return result;
	
}

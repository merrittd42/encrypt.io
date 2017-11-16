module.exports = {
//These are your public methods,

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      shiftAmount - Number representing the amount the original text was shifted

    Returns:
      Needs to return the location on the server of the encrypted file as well as
	  the key to be used for decryption
    */
    encryptCustom: function(fileLoc){
		var outputFileLoc = fileLoc + '.enc';
		var fs = require('fs');	  

		var plainText = fs.readFileSync(fileLoc); // read plain text from input file
		var cipherText = '';
		
		var key = generateRandomKey(); // generate a random 64-byte key
		
		var prevKeyCode = '0'; //initialize as 0
		// perform encryption one character at a time
		for (var i = 0, len = plainText.length; i < len; i++) {
			var nextCharByteCode = '';
			var byteCode = plainText[i]; // get byte code for this character 
			
			var currentKeyCode = key[i % key.length]; // get current index of key to look at

			switch(currentKeyCode){ // encrypt next byte based on current key code
				case '0':
					nextCharByteCode = encrypt0(byteCode);
					break;
				case '1':
					nextCharByteCode = encrypt1(byteCode, prevKeyCode);
					break;
				case '2':
					nextCharByteCode = encrypt2(byteCode);
					break;
				case '3':
					nextCharByteCode = encrypt3(byteCode);
					break;
				case '4':
					nextCharByteCode = encrypt4(byteCode, prevKeyCode);
					break;
				case '5':
					nextCharByteCode = encrypt5(byteCode, prevKeyCode);
					break;
				case '6':
					nextCharByteCode = encrypt6(byteCode);
					break;
				case '7':
					nextCharByteCode = encrypt7(byteCode, prevKeyCode);
					break;
				case '8':
					nextCharByteCode = encrypt8(byteCode, prevKeyCode);
					break;
				case '9':
					nextCharByteCode = encrypt9(byteCode);
					break;
				case 'A':
					nextCharByteCode = encryptA(byteCode);
					break;
				case 'B':
					nextCharByteCode = encryptB(byteCode);
					break;
				case 'C':
					nextCharByteCode = encryptC(byteCod, prevKeyCode);
					break;
				case 'D':
					nextCharByteCode = encryptD(byteCode);
					break;
				case 'E':
					nextCharByteCode = encryptE(byteCode);
					break;
				case 'F':
					nextCharByteCode = encryptF(byteCode);
					break;		
			}

			cipherText += String.fromCharCode(nextCharByteCode); // append the encrypted char to the cipher text
			prevKeyCode = currentKeyCode; //update previous code for next iteration
		}

		// write cipher text to output file location
		fs.writeFileSync(outputFileLoc, cipherText,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});

		return [outputFileLoc, key]; // return location of encrypted file
    },

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      key - Key to perform decryption

    Returns:
      fileLoc - Location on the server of the decrypted file.
    */
    decryptCustom: function(fileLoc, key){
		var outputFileLoc = fileLoc + '.dec';
		var fs = require('fs');	  

		var cipherText = fs.readFileSync(fileLoc); // read cipher text from input file
		var plainText = '';

		var prevKeyCode = '0'; //initialize as 0
		// perform encryption one character at a time
		for (var i = 0, len = cipherText.length; i < len; i++) {
			var nextCharByteCode = '';		
			var byteCode = cipherText[i]; // get byte code for this character 
			
			var currentKeyCode = key[i % key.length]; // get current index of key to look at

			switch(currentKeyCode){ // encrypt next byte based on current key code
				case '0':
					nextCharByteCode = decrypt0(byteCode);
					break;
				case '1':
					nextCharByteCode = decrypt1(byteCode, prevKeyCode);
					break;
				case '2':
					nextCharByteCode = decrypt2(byteCode);
					break;
				case '3':
					nextCharByteCode = decrypt3(byteCode);
					break;
				case '4':
					nextCharByteCode = decrypt4(byteCode, prevKeyCode);
					break;
				case '5':
					nextCharByteCode = decrypt5(byteCode, prevKeyCode);
					break;
				case '6':
					nextCharByteCode = decrypt6(byteCode);
					break;
				case '7':
					nextCharByteCode = decrypt7(byteCode, prevKeyCode);
					break;
				case '8':
					nextCharByteCode = decrypt8(byteCode, prevKeyCode);
					break;
				case '9':
					nextCharByteCode = decrypt9(byteCode);
					break;
				case 'A':
					nextCharByteCode = decryptA(byteCode);
					break;
				case 'B':
					nextCharByteCode = decryptB(byteCode);
					break;
				case 'C':
					nextCharByteCode = decryptC(byteCode, prevKeyCode);
					break;
				case 'D':
					nextCharByteCode = decryptD(byteCode);
					break;
				case 'E':
					nextCharByteCode = decryptE(byteCode);
					break;
				case 'F':
					nextCharByteCode = decryptF(byteCode);
					break;		
			}

			plainText += String.fromCharCode(nextCharByteCode); // append the decrypted char to the cipher text
			prevKeyCode = currentKeyCode; //update previous code for next iteration
		}

		// write cipher text to output file location
		fs.writeFileSync(outputFileLoc, plainText,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});

		return outputFileLoc; // return location of encrypted file
    }

};

/*
Generates a random 64-bit key
*/
var generateRandomKey = function(){
  var possibleChars = '0123456789ABCDEF';
  var key = '';
  
  for(var i=0; i<64; i++)
	key += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
	  
  return key;
};

/*
Encryption for key byte 0.

XOR with 1001
*/
var encrypt0 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 0.

XOR with 1001
*/
var decrypt0 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 1.

Caesar shift forwards by [0,15]*3 based on previous character in key
*/
var encrypt1 = function(originalByte, prevKeyChar){
  return (originalByte + parseInt("0x" + prevKeyChar)*3) % 128;
};

/*
Decryption for key byte 1.

Caesar shift back by [0,15]*3 based on previous character in key
*/
var decrypt1 = function(encryptedByte, prevKeyChar){
  return (encryptedByte - parseInt("0x" + prevKeyChar)*3 + 128) % 128;
};

/*
Encryption for key byte 2.

if (byte < 63.5) -> reflect across 31.5; 
else -> reflect across 95.5 
(see #9 for shift explanation, this time, we split the set of numbers into four sets and reflect each set across its halfway point)
*/
var encrypt2 = function(originalByte){
  var encryptedByte;
  if (originalByte < 63.5) {
	encryptedByte = 63 - originalByte;
  } else {
	originalByte = originalByte - 63;
	encryptedByte = 127 - originalByte;
  }
  return encryptedByte;
};

/*
Decryption for key byte 2.

if (byte < 63.5) -> reflect across 31.5; 
else -> reflect across 95.5 
(see #9 for shift explanation, this time, we split the set of numbers into four sets and reflect each set across its halfway point)
*/
var decrypt2 = function(encryptedByte){
  var decryptedByte;
  if (originalByte < 63.5) {
	decryptedByte = 63 - encryptedByte;
  } else {
	encryptedByte = encryptedByte - 63;
	decryptedByte = 127 - encryptedByte;
  }
  return decryptedByte;
};

/*
Encryption for key byte 3.

caesar shift forwards by 79
*/
var encrypt3 = function(originalByte){
  return (originalByte + 79) % 128;
};

/*
Decryption for key byte 3.

caesar shift back by 79
*/
var decrypt3 = function(encryptedByte){
  return (encryptedByte - 79 + 128) % 128;
};

/*
Encryption for key byte 4.

XOR with binary from previous character in key
*/
var encrypt4 = function(originalByte, prevKeyChar){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 4.

XOR with binary from previous character in key
*/
var decrypt4 = function(encryptedByte, prevKeyChar){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 5.

caesar shift forwards by [0,15] based on previous character in key, then XOR with previous character in key
*/
var encrypt5 = function(originalByte, prevKeyChar){
  return (originalByte + parseInt("0x" + prevKeyChar)) % 128;
};

/*
Decryption for key byte 5.

XOR with previous character in key, then caesar shift back by [0,15] based on previous character in key
*/
var decrypt5 = function(encryptedByte, prevKeyChar){
  return (encryptedByte - parseInt("0x" + prevKeyChar) + 128) % 128;
};

/*
Encryption for key byte 6.

XOR with 0111
*/
var encrypt6 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 6.

XOR with 0111
*/
var decrypt6 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 7.

caesar shift backwards by [0,15] based on previous character in key
*/
var encrypt7 = function(originalByte, prevKeyChar){
  return (originalByte - parseInt("0x" + prevKeyChar) + 128) % 128;
};

/*
Decryption for key byte 7.

caesar shift forwards by [0,15] based on previous character in key
*/
var decrypt7 = function(encryptedByte, prevKeyChar){
  return (encryptedByte + parseInt("0x" + prevKeyChar)) % 128;
};

/*
Encryption for key byte 8.

reflect previous character in key across 7.5 (0 -> 15, 1 -> 14), then XOR with the result
*/
var encrypt8 = function(originalByte, prevKeyChar){
  var reflectedByte = 15 - parseInt("0x" + prevKeyChar);
  /*
  TODO: XOR
  */
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 8.

reflect previous character in key across 7.5 (0 -> 15, 1 -> 14), then XOR with the result
*/
var decrypt8 = function(encryptedByte, prevKeyChar){
  var reflectedByte = 15 - parseInt("0x" + prevKeyChar);
  /*
  TODO: XOR 
  */
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 9.

reflect across 63.5 (i.e. 0 -> 127, 127 -> 0, 1 -> 126, 125 -> 3, etc.)...this splits the set of numbers perfectly in half and reflects across halfway point
*/
var encrypt9 = function(originalByte){
  encryptedByte = 127 - originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 9.

reflect across 63.5 (i.e. 0 -> 127, 127 -> 0, 1 -> 126, 125 -> 3, etc.)...this splits the set of numbers perfectly in half and reflects across halfway point
*/
var decrypt9 = function(encryptedByte){
  decryptedByte = 127 - encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte A.

XOR with 0100
*/
var encryptA = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte A.

XOR with 0100
*/
var decryptA = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte B.

caesar shift forwards by 12, then reflect across 63.5 (like #9)
*/
var encryptB = function(originalByte){
  var shiftedByte = (originalByte + 12) % 128;
  
  /*
  TODO: reflection on shiftedByte
  */
  var reflectedByte = 127 - shiftedByte;
  
  return reflectedByte;
};

/*
Decryption for key byte B.

reflect across 63.5 (like #9), then caesar shift backwards by 12
*/
var decryptB = function(encryptedByte){
  /*
  TODO: reflection on encrypted byte
  */
  var reflectedByte = 127 - encryptedByte;
  
  return (reflectedByte - 12 + 128) % 128;
};

/*
Encryption for key byte C.

caesar shift forwards by [0,15]*2 based on previous character in key
*/
var encryptC = function(originalByte, prevKeyChar){
  return (originalByte + parseInt("0x" + prevKeyChar)*2) % 128;
};

/*
Decryption for key byte C.

caesar shift backwards by [0,15]*2 based on previous character in key
*/
var decryptC = function(encryptedByte, prevKeyChar){
  return (encryptedByte - parseInt("0x" + prevKeyChar)*2 + 128) % 128;
};

/*
Encryption for key byte D.

XOR with 1010
*/
var encryptD = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte D.

XOR with 1010
*/
var decryptD = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte E.

if (byte < 15.5) -> reflect across 7.5, 
elseif(byte < 31.5) -> reflect across 23.5, 
elseif(byte < 47.5) -> reflect across 39.5, 
elseif(byte < 63.5) -> reflect across 55.5, 
elseif(byte < 79.5) -> reflect across 71.5, 
elseif(byte < 95.5) -> reflect across 87.5, 
elseif(byte < 111.5) -> reflect across 103.5, 
else -> reflect across 119.5 
(see #9 for shift explanation, this time, we split the set of numbers into eight sets and reflect each set across its halfway point)
*/
var encryptE = function(originalByte){
  var encryptedByte;
  if (originalByte < 15.5) {
	encryptedByte = 15 - originalByte;
  } else if (originalByte < 31.5) {
	originalByte = originalByte - 15;
	encryptedByte = 31 - originalByte;
  } else if (originalByte < 47.5) {
  	originalByte = originalByte - 31;
	encryptedByte = 47 - originalByte;
  } else if (originalByte < 63.5) {
  	originalByte = originalByte - 47;
	encryptedByte = 63 - originalByte;
  } else if (originalByte < 79.5) {
  	originalByte = originalByte - 63;
	encryptedByte = 79 - originalByte;
  } else if (originalByte < 95.5) {
  	originalByte = originalByte - 79;
	encryptedByte = 95 - originalByte;
  } else if (originalByte < 111.5) {
  	originalByte = originalByte - 95;
	encryptedByte = 111 - originalByte;
  } else {
  	originalByte = originalByte - 111;
	encryptedByte = 127 - originalByte;
  }
  return encryptedByte;
};

/*
Decryption for key byte E.

if (byte < 15.5) -> reflect across 7.5, 
elseif(byte < 31.5) -> reflect across 23.5, 
elseif(byte < 47.5) -> reflect across 39.5, 
elseif(byte < 63.5) -> reflect across 55.5, 
elseif(byte < 79.5) -> reflect across 71.5, 
elseif(byte < 95.5) -> reflect across 87.5, 
elseif(byte < 111.5) -> reflect across 103.5, 
else -> reflect across 119.5 
(see #9 for shift explanation, this time, we split the set of numbers into eight sets and reflect each set across its halfway point)
*/
var decryptE = function(encryptedByte){
  var decryptedByte;
  if (encryptedByte < 15.5) {
	decryptedByte = 15 - encryptedByte;
  } else if (encryptedByte < 31.5) {
	encryptedByte = encryptedByte - 15;
	decryptedByte = 31 - encryptedByte;
  } else if (encryptedByte < 47.5) {
  	encryptedByte = encryptedByte - 31;
	decryptedByte = 47 - encryptedByte;
  } else if (encryptedByte < 63.5) {
  	encryptedByte = encryptedByte - 47;
	decryptedByte = 63 - encryptedByte;
  } else if (encryptedByte < 79.5) {
  	encryptedByte = encryptedByte - 63;
	decryptedByte = 79 - encryptedByte;
  } else if (encryptedByte < 95.5) {
  	encryptedByte = encryptedByte - 79;
	decryptedByte = 95 - encryptedByte;
  } else if (encryptedByte < 111.5) {
  	encryptedByte = encryptedByte - 95;
	decryptedByte = 111 - encryptedByte;
  } else {
  	encryptedByte = encryptedByte - 111;
	decryptedByte = 127 - encryptedByte;
  }
  return decryptedByte;
};

/*
Encryption for key byte F.

caesar shift backwards by 12
*/
var encryptF = function(originalByte){
  return (originalByte - 12 + 128) % 128;
};

/*
Decryption for key byte F.

caesar shift forwards by 12
*/
var decryptF = function(encryptedByte){
  return (encryptedByte + 12) % 128;
};
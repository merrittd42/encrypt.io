module.exports = {

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc

    Returns:
      Needs to return a zipped folder containing two files: the encrypted file,
      and a file that contains the pad key.
    */
    encryptPad : function(fileLoc){
      var outputFileLoc = fileLoc + '.enc';
      var fs = require('fs');	  
      var archiver = require('archiver');
      var path = require('path');

      var zipLoc = path.dirname(fileLoc) + '/padEncryption.zip';
      
      // create a file to stream archive data to.
      var output = fs.createWriteStream(zipLoc);
      var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });
  
      var plainText = fs.readFileSync(fileLoc); // read plain text from input file
      var cipherText = '';
      var padKey = '';
  
      // perform encryption one character at a time
      for (var i = 0, len = plainText.length; i < len; i++) {
        var nextChar = '';		
        var byteCode = plainText[i]; // get byte code for this character 
        
        var shiftAmount = Math.floor(Math.random() * 26) + 1; // gets a number between 1 and 26

        if(byteCode >= 65 && byteCode <= 90){ // character is an upper case letter
          encryptedCode = ((byteCode - 65 + shiftAmount) % 26) + 65;
          nextChar = String.fromCharCode(encryptedCode);
        }else if(byteCode >= 97 && byteCode <= 122){ // character is a lower case letter
          encryptedCode = ((byteCode - 97 + shiftAmount) % 26) + 97;
          nextChar = String.fromCharCode(encryptedCode);
        }else{ // character is not a letter
          nextChar = String.fromCharCode(plainText[i]);
        }

        padKey += shiftAmount.toString(); // slowly create the pad key

        cipherText += nextChar; // append the (possibly encrypted) char to the cipher text
      }
  
      // write cipher text to output file location
      fs.writeFile(outputFileLoc, cipherText,  function(err) {
        if (err) {
          return console.error(err);
        }
      });

      archive.append(fs.createReadStream(outputFileLoc), { name: 'encryptedFile.txt' });

      // append a file from string
      archive.append(padKey, { name: 'pad.txt' });

      archive.finalize();

      // pipe archive data to the file
      archive.pipe(output);
  
      return zipLoc; // return location of encrypted folder
    },

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      pad - String representing the pad needed to decrypt the file

    Returns:
      Needs to return the location on the server of the decrypted file

    */
    decryptPad: function(fileLoc, pad){

    }

};

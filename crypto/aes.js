module.exports = {


    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc

    Returns:
      Needs to return a two-tuple array with the file location of the
      encrypted file in the 0th index, and the randomly generated AES cipher key in the
      1st index.
    */
    encryptAES : function(fileLoc){

    },

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      key - String representing the key needed to decrypt the file

    Returns:
      Needs to return the location on the server of the decrypted file

    */
    decryptAES : function(fileLoc, key){

    }

};

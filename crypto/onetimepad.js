module.exports = {

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc

    Returns:
      Needs to return a two-tuple array with the file location of the
      encrypted file in the 0th index, and the randomly generated pad key in the
      1st index.
    */
    encryptPad : function(fileLoc){

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



/* FILE UPLOAD Javascript to go here */




var selector = document.getElementById('selector');
var mode = document.getElementById('mode');
var encryptButton = document.getElementById('encryptButton');
//var encryptButton = document.getElementById('encryptButton');
//encryptButton.onClick = upload();
selector.value = "Caesar Cipher";
mode.value = "Encrypt";

console.log(mode);

document.addEventListener('DOMContentLoaded',function() {
    mode.onchange=modeChangeEventHandler;
},false);
document.addEventListener('DOMContentLoaded',function() {
    selector.onchange=methodChangeEventHandler;
},false);
document.addEventListener('DOMContentLoaded',function() {
    selector.onchange=methodChangeEventHandler;
},false);



var uploadForm = document.getElementById('uploadForm');


var inputElement = document.getElementById("input");


//uploadForm.action = "/upload/encrypt/caesar/";

var shiftMag = document.getElementById('shiftMag');
var shiftMagHidden = document.getElementById('shiftMagF');
var shiftMagHead = document.getElementById('shiftMagHead');
var keyPhrase = document.getElementById('keyPhrase');
var keyPhraseHead = document.getElementById('keyPhraseHead');
var keyPhraseHidden = document.getElementById('keyPhraseF');
var file = document.getElementById('file');

file.addEventListener("change", handleFiles, false);
function handleFiles() {
  var fileList = this.files;
}
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
    shiftMag.style.visibility = "visible";
    shiftMagHead.style.visibility = "visible";
    uploadForm.action = "/upload/encrypt/caesar/";

function modeChangeEventHandler(event){
  if(selector.value == "Caesar Cipher" && mode.value == "Encrypt"){
    uploadForm.action = "/upload/encrypt/caesar/";
    shiftMag.style.visibility = "visible";
    shiftMagHead.style.visibility = "visible";
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
  }
  else if (selector.value == "Caesar Cipher" && mode.value == "Decrypt") {
    uploadForm.action = "/upload/decrypt/caesar/";
    shiftMag.style.visibility = "visible";
    shiftMagHead.style.visibility = "visible";
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
  }
  if (selector.value == "One Time Pad" && mode.value == "Encrypt") {
    uploadForm.action = "/upload/encrypt/onetimepad/";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
  }
  else if (selector.value == "One Time Pad" && mode.value == "Decrypt") {
    uploadForm.action = "/upload/decrypt/onetimepad/";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
    keyPhrase.style.visibility = "visible";
    keyPhraseHead.style.visibility = "visible";
  }
  if (selector.value == "Custom Polyalphabetic" && mode.value == "Encrypt") {
    uploadForm.action = "/upload/encrypt/custom/";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
  }
  else if (selector.value == "Custom Polyalphabetic" && mode.value == "Decrypt") {
    uploadForm.action = "/upload/decrypt/custom/";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
    keyPhrase.style.visibility = "visible";
    keyPhraseHead.style.visibility = "visible";
  }
  if (selector.value == "AES 192" && mode.value == "Encrypt") {
    uploadForm.action = "/upload/encrypt/AES/";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
  }
  else if (selector.value == "AES 192" && mode.value == "Decrypt") {
    uploadForm.action = "/upload/decrypt/AES/";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
    keyPhrase.style.visibility = "visible";
    keyPhraseHead.style.visibility = "visible";
  }

  if(mode.value == "Decrypt"){
    encryptButton.value = "Decrypt";
  }
  else{
    encryptButton.value = "Encrypt";
  }

}


shiftMag.style.visibility = "visible";
shiftMagHead.style.visibility = "visible";
keyPhrase.style.visibility = "hidden";
keyPhraseHead.style.visibility = "hidden";
shiftMag.value = "";
keyPhrase.value = "";

function methodChangeEventHandler(event) {
  modeChangeEventHandler(null);
  shiftMag.value = "";
  keyPhrase.value = "";
  if(selector.value == "Caesar Cipher"){
    shiftMag.style.visibility = "visible";
    shiftMagHead.style.visibility = "visible";
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";

  }
  else if((selector.value == "One Time Pad" || selector.value == "Custom Polyalphabetic") && encryptButton.value == "Decrypt"){
        keyPhrase.style.visibility = "visible";
        keyPhraseHead.style.visibility = "visible";
        shiftMag.style.visibility = "hidden";
        shiftMagHead.style.visibility = "hidden";
  }
  else if(selector.value == "AES 192" && encryptButton.value == "Decrypt"){
    keyPhrase.style.visibility = "visible";
    keyPhraseHead.style.visibility = "visible";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
  }
  else{
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
  }
}


function clicked() {
  var shiftInput = shiftMag.value;
  var keyInput = keyPhrase.value;


    if((shiftInput  != "") && shiftMag.style.visibility == "visible" && file.value != ""){
        shiftMagHidden.value = shiftInput;
        post(file.value, uploadForm.action, {data: shiftInput});
    }
    else if((selector.value == "One Time Pad") && file.value != ""){
      keyPhraseHidden.value = keyInput;
      post(file.value,uploadForm.action, {data: keyInput});
    }
	  else if((selector.value == "Custom Polyalphabetic") && file.value != ""){
      keyPhraseHidden.value = keyInput;
      post(file.value,uploadForm.action, {data: keyInput});
    }
    else if((selector.value == "AES 192") && file.value != ""){
      keyPhraseHidden.value = keyInput;
      post(file.value,uploadForm.action, {data: keyInput});
    }
    else{
         return confirm("Error: invalid file or data input.");
    }
}

function post(file, path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("value", file);
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("data", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

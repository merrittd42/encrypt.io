

/* Code for encryptio frontend
   By Jon Reed and Dillon Merritt */



// Page elements
var selector = document.getElementById('selector');
var mode = document.getElementById('mode');
var encryptButton = document.getElementById('encryptButton');
var uploadForm = document.getElementById('uploadForm');
var inputElement = document.getElementById("input");
var shiftMag = document.getElementById('shiftMag');
var shiftMagHidden = document.getElementById('shiftMagF');
var shiftMagHead = document.getElementById('shiftMagHead');
var keyPhrase = document.getElementById('keyPhrase');
var keyPhraseHead = document.getElementById('keyPhraseHead');
var keyPhraseHidden = document.getElementById('keyPhraseF');
var file = document.getElementById('file');

// Initial values for selectors
selector.value = "Caesar Cipher";
mode.value = "Encrypt";

// Event listeners for selectors

document.addEventListener('DOMContentLoaded',function() {
    mode.onchange=modeChangeEventHandler;
},false);
document.addEventListener('DOMContentLoaded',function() {
    selector.onchange=methodChangeEventHandler;
},false);
document.addEventListener('DOMContentLoaded',function() {
    selector.onchange=methodChangeEventHandler;
},false);

file.addEventListener("change", handleFiles, false);


function handleFiles() {
  var fileList = this.files;
}
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
    shiftMag.style.visibility = "visible";
    shiftMagHead.style.visibility = "visible";
    uploadForm.action = "/upload/encrypt/caesar/";

// Method which will update file upload tables based on UI change
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

// Reset values on page reset
shiftMag.style.visibility = "visible";
shiftMagHead.style.visibility = "visible";
keyPhrase.style.visibility = "hidden";
keyPhraseHead.style.visibility = "hidden";
shiftMag.value = "";
keyPhrase.value = "";

// Function which updates UI based on encryption mode choice
function methodChangeEventHandler(event) {
  modeChangeEventHandler(null); // Call the mode change event function
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

// Function on click of the encrypt/decrypt function
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

// Helper function to interface with the server
function post(file, path, params, method) {
    method = method || "post";

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

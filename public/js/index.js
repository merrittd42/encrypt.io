

/* FILE UPLOAD Javascript/AJAX to go here...

var form = document.getElementById('file-upload-field');
var fileSelect = document.getElementById('file-upload-wrapper');
var uploadButton = document.getElementById('upload-button');
*/






var selector = document.getElementById('selector');
//var encryptButton = document.getElementById('encryptButton');
//encryptButton.onClick = upload();
selector.value = "Caesar Cipher";

document.addEventListener('DOMContentLoaded',function() {
    selector.onchange=methodChangeEventHandler;

},false);


var uploadForm = document.getElementById('uploadForm');


var inputElement = document.getElementById("input");


//uploadForm.action = "/upload/encrypt/caesar/";

var shiftMag = document.getElementById('shiftMag');
var shiftMagHead = document.getElementById('shiftMagHead');
var keyPhrase = document.getElementById('keyPhrase');
var keyPhraseHead = document.getElementById('keyPhraseHead');
var file = document.getElementById('file');

file.addEventListener("change", handleFiles, false);
function handleFiles() {
  var fileList = this.files;
  console.log(fileList);
  console.log(file.value); /* now you can work with the file list */
}
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";
    shiftMag.style.visibility = "visible";
    shiftMagHead.style.visibility = "visible";
    uploadForm.action = "/upload/encrypt/caesar/";

function methodChangeEventHandler(event) {
  shiftMag.value = "";
  keyPhrase.value = "";
  if(selector.value == "Caesar Cipher"){
    uploadForm.action = "/upload/encrypt/caesar/";
    shiftMag.style.visibility = "visible";
    shiftMagHead.style.visibility = "visible";
    keyPhrase.style.visibility = "hidden";
    keyPhraseHead.style.visibility = "hidden";

  }
  else if(selector.value == "One Time Pad"){
    uploadForm.action = "/upload/encrypt/onetimepad/";
      keyPhrase.style.visibility = "hidden";
      keyPhraseHead.style.visibility = "hidden";
        shiftMag.style.visibility = "hidden";
        shiftMagHead.style.visibility = "hidden";
  }
  else{
    uploadForm.action = "/upload/encrypt/AES";
    keyPhrase.style.visibility = "visible";
    keyPhraseHead.style.visibility = "visible";
    shiftMag.style.visibility = "hidden";
    shiftMagHead.style.visibility = "hidden";
  }
}


function clicked() {
  var shiftInput = shiftMag.value;

    if((shiftInput  != "") && shiftMag.style.visibility == "visible" && file.value != ""){
        post(file.value, uploadForm.action, {data: shiftInput});
    }
    else if(selector.value == "One Time Pad" && file.value != ""){
      post(file.value,uploadForm.action);
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

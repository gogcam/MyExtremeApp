/// <reference path="../../ts/phonegap.d.ts" />
module MyExtremeApp {
    export function camera(params: { id: any }) {
        return {
            //  Put the binding properties here
        };
    }

    
}

var destinationType; // sets the format of returned value 

function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    //smallImage.src = "data:image/jpeg;base64," + imageData;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    if (navigator.camera == null) {
        alert('NO camera found');
        return;
    } 



    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL,
        saveToPhotoAlbum: true
    });
}

function onFail(message) {
    alert('Failed because: ' + message);
}
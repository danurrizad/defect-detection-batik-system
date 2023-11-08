class WebcamClass {
    open = (videoRef, constraints) => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            videoRef.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing webcam:', error);
          });
      } else {
        alert('Tidak dapat membuka Webcam!');
      }
    };
  
    close = (videoRef) => {
      if (videoRef.srcObject) {
        videoRef.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
        videoRef.srcObject = null;
      } else {
        alert('Silakan membuka webcam terlebih dahulu');
      }
    };
  }
  
  var DEVICES = [];
  var final = null;
  
  export class Webcam{
    open = (videoRef) => {
        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
            var arrayLength = devices.length;
            for (var i = 0; i < arrayLength; i++) {
                var tempDevice = devices[i];
                if (tempDevice.kind == 'videoinput') {
                DEVICES.push(tempDevice);
                if (
                    tempDevice.facingMode == 'environment' ||
                    tempDevice.label.indexOf('facing back') >= 0
                ) {
                    final = tempDevice;
                }
                }
            }
        
            var totalCameras = DEVICES.length;
            if (final == null) {
                final = DEVICES[totalCameras - 1];
            }
        
            // Set the constraints
            var constraints = {
                audio: false,
                video: {
                deviceId: { exact: final.deviceId },
                },
            };
        
            // Create a new instance of the Webcam class
            var webcam = new WebcamClass();
        
            // Open the webcam using the specified constraints
            webcam.open(videoRef, constraints);
            })
            .catch(function(err) {
            console.log(err.name + ': ' + err.message);
            });
    }

    close =(videoRef)=>{
        var webcam = new WebcamClass();
        webcam.close(videoRef)
    }
  }
  
  
export class Webcam {
    /**
     * Open webcam and stream it through video tag.
     * @param {HTMLVideoElement} videoRef video tag reference
     */
    open = (videoRef) => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              facingMode: { ideal: "environment", },
            },
          })
          .then((stream) => {
            videoRef.srcObject = stream;
          });
      } else alert("Tidak dapat membuka Webcam!");
    };
  
    /**
     * Close opened webcam.
     * @param {HTMLVideoElement} videoRef video tag reference
     */
    close = (videoRef) => {
      if (videoRef.srcObject) {
        videoRef.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
        videoRef.srcObject = null;
      } else alert("Silakan membuka webcam terlebih dahulu");
    };
  }
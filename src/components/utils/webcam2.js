export class Webcam {
    constructor() {
      this.selectedCamera = null;
    }
  
    async getAvailableCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        return videoDevices;
      } catch (error) {
        console.error('Error enumerating devices:', error);
        return [];
      }
    }
  
    async selectCamera(cameraDeviceId) {
      this.selectedCamera = cameraDeviceId;
    }
  
    getSelectedCamera() {
      return this.selectedCamera;
    }
  
    async open(videoRef) {
      const constraints = {
        audio: false,
        video: {
          deviceId: this.selectedCamera ? { exact: this.selectedCamera } : undefined,
        },
      };
  
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.srcObject = stream;
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }
  
    async close(videoRef) {
      if (videoRef.srcObject) {
        const tracks = videoRef.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.srcObject = null;
      }
    }
  }
  
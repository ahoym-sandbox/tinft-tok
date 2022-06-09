import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import { CaptureIcon } from './CaptureIcon';
import './imageCapture.css';

interface ImageCaptureWebcamProps {
  onSubmit?: (file: File) => void;
  onChange?: (file: File | null) => void;
  loading?: boolean;
}

export const ImageCaptureWebcam: React.FC<ImageCaptureWebcamProps> = (
  props
) => {
  const { onSubmit, onChange, loading } = props;
  const [file, setFile] = React.useState<File | null>(null);
  const [canvasCtx, setCanvasCtx] =
    React.useState<CanvasRenderingContext2D | null>();
  const [canvasWidth, setCanvasWidth] = React.useState<string>('0px');
  const [canvasHeight, setCanvasHeight] = React.useState<string>('0px');

  const [autoPlay, setAutoPlay] = React.useState<boolean>(false);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const video = React.useRef<HTMLVideoElement>(null);

  const startWebcam = async () => {
    setAutoPlay(true);
    if (canvas.current) {
      setCanvasCtx(canvas.current.getContext('2d'));
    }
    if (navigator.mediaDevices?.getUserMedia) {
      const constraints = {
        video: true,
        audio: false,
      };
      let stream: MediaStream | null;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        const webcamWidth = stream.getVideoTracks()[0].getSettings().width!;
        const webcamHeight = stream.getVideoTracks()[0].getSettings().height!;
        setCanvasWidth(`${webcamWidth}`);
        setCanvasHeight(`${webcamHeight}`);

        if (video.current) {
          video.current.srcObject = stream;
          video.current.onloadedmetadata = (e) => {
            video.current?.play();
          };
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('getUserMedia not supported by your browser');
    }
  };

  const getCurrentFrame = async () => {
    if (canvasCtx && canvas.current && video.current) {
      video.current.pause();
      canvasCtx.drawImage(video.current, 0, 0);
      const dataURL = canvas.current.toDataURL('image/png');
      const blob = await (await fetch(dataURL)).blob();
      const file = new File([blob], `webcam-${Date.now()}.jpg`, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
      setFile(file);
      if (onChange) {
        onChange(file);
      }
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    _event
  ) => {
    if (file) {
      if (onSubmit) {
        onSubmit(file);
      } else {
        alert(`${file.name} submitted`);
      }
      setFile(null);
    } else {
      alert('Please select an image');
    }
  };

  React.useEffect(() => {
    startWebcam();
  }, []);

  return (
    <div className="capture-webcam-wrapper">
      <div className="capture-webcam-video-container">
        <div className="capture-webcom-video-loader">
          {loading ? (
            <CircularProgress
              size={150}
              sx={{
                color: '#61dafb',
                opacity: '0.75',
              }}
            />
          ) : null}
        </div>
        <video
          id="video"
          className="video"
          ref={video}
          autoPlay={autoPlay}
        ></video>
      </div>
      <canvas
        id="myCanvas"
        ref={canvas}
        width={canvasWidth}
        height={canvasHeight}
        hidden
      ></canvas>
      {!file ? (
        <div onClick={getCurrentFrame}>
          <CaptureIcon />
        </div>
      ) : (
        <div>
          <div className="capture-preview-item">
            <span className="capture-preview-field">File name:</span>
            <span>{file.name}</span>
          </div>
          <div className="capture-preview-item">
            <span className="capture-preview-field">File type:</span>
            <span>{file.type}</span>
          </div>
          <div className="capture-preview-item">
            <span className="capture-preview-field">File size:</span>
            <span>{file.size}</span>
          </div>
          <div className="capture-preview-item">
            <span className="capture-preview-field">File created at:</span>
            <span>{file.lastModified}</span>
          </div>

          <button
            className="upload-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            Mint NFT
          </button>
        </div>
      )}
    </div>
  );
};

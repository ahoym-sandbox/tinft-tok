import * as React from "react";
import { ImageCapturePhone } from "./ImageCapturePhone";
import { ImageCaptureWebcam } from "./ImageCaptureWebcam";

interface ImageCaptureProps {
  onSubmit?: (file: File) => void;
  onChange?: (file: File | null) => void;
}

export const ImageCapture: React.FC<ImageCaptureProps> = (props) => {
  const { onChange, onSubmit } = props;
  // @ts-expect-error - TS is wrong - navigator.mediaDevices is NOT always defined
  if (navigator?.mediaDevices?.getUserMedia) {
    return <ImageCaptureWebcam onChange={onChange} onSubmit={onSubmit} />;
  } else {
    return <ImageCapturePhone onChange={onChange} onSubmit={onSubmit} />;
  }
};

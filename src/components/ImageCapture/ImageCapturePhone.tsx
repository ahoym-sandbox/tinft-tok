import * as React from "react";
import { CaptureIcon } from "./CaptureIcon";
import { UploadIcon } from "./UploadIcon";
import "./imageCapture.css";

interface ImageCapturePhoneProps {
  onSubmit?: (file: File) => void;
  onChange?: (file: File | null) => void;
}

const ImageCapturePhone: React.FC<ImageCapturePhoneProps> = (props) => {
  const { onSubmit, onChange } = props;
  const testEl = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const handleOnChange: React.FormEventHandler<HTMLInputElement> = async (
    _event
  ) => {
    const maybeFile = !!testEl?.current?.files?.length
      ? testEl.current.files[0]
      : null;
    if (maybeFile) {
      setFile(maybeFile);
    }
    if (onChange) {
      onChange(maybeFile);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (file) {
      if (onSubmit) {
        onSubmit(file);
      } else {
        alert(`${file.name} submitted`);
      }
      setFile(null);
    } else {
      alert("Please select an image");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!file ? (
        <>
          <input
            id="capture-input"
            className="capture-input"
            ref={testEl}
            type="file"
            name="video"
            accept="video/*,image/*"
            capture
            onChange={handleOnChange}
          />

          <label htmlFor="capture-input" className="capture-label">
            <CaptureIcon />
          </label>
        </>
      ) : (
        <>
          <UploadIcon />
          <br />
          <button className="upload-button" type="submit">
            Mint NFT from {file.name}
          </button>
        </>
      )}
    </form>
  );
};

export { ImageCapturePhone };

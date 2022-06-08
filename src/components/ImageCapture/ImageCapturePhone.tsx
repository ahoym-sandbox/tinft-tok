import * as React from "react";
import { CaptureIcon } from './CaptureIcon';
import './imageCapture.css';
import { LandscapeIcon } from './LandscapeIcon';

interface ImageCapturePhoneProps {
  onSubmit?: (file: File) => void;
  onChange?: (file: File | null) => void;
}

const ImageCapturePhone: React.FC<ImageCapturePhoneProps> = (props) => {
  const { onSubmit, onChange } = props;
  const testEl = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

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
      alert('Please select an image');
    }
  };

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImgSrc(e.target?.result as string);
        // $('#blah').attr('src', e.target.result).width(150).height(200);
      };

      reader.readAsDataURL(file);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      {!file ? (
        <>
          <div className="upload-preview-wrapper">
            <LandscapeIcon />
          </div>
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
          {imgSrc && (
            <div className="upload-preview-wrapper">
              <img className="upload-preview" src={imgSrc} alt="Preview" />
              <div className="capture-preview-item">
                <span>File name:</span>
                <span>{file.name}</span>
              </div>
              <div className="capture-preview-item">
                <span>File type:</span>
                <span>{file.type}</span>
              </div>
              <div className="capture-preview-item">
                <span>File size:</span>
                <span>{file.size}</span>
              </div>
              <div className="capture-preview-item">
                <span>File created at:</span>
                <span>{file.lastModified}</span>
              </div>
            </div>
          )}
          <button className="upload-button" type="submit">
            Mint NFT
          </button>
        </>
      )}
    </form>
  );
};

export { ImageCapturePhone };

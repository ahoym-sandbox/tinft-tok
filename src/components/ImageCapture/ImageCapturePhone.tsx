import * as React from 'react';
import { CaptureIcon } from './CaptureIcon';
import './imageCapture.css';
import { LandscapeIcon } from './LandscapeIcon';
import CircularProgress from '@mui/material/CircularProgress';

interface ImageCapturePhoneProps {
  onSubmit?: (file: File) => void;
  onChange?: (file: File | null) => void;
  loading?: boolean;
}

const ImageCapturePhone: React.FC<ImageCapturePhoneProps> = (props) => {
  const { onSubmit, onChange, loading } = props;
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

      const reader = new FileReader();
      reader.onload = function (e) {
        setImgSrc(e.target?.result as string);
      };
      reader.readAsDataURL(maybeFile);
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
    } else {
      alert('Please select an image');
    }
  };

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
            <div>
              <div className="upload-preview-wrapper">
                <div className="upload-preview-loader">
                  {loading ? (
                    <CircularProgress
                      size={150}
                      sx={{
                        color: '#61dafb',
                        opacity: '0.75',
                        zIndex: 99,
                      }}
                    />
                  ) : null}
                </div>
                <img
                  className="upload-preview"
                  src={imgSrc}
                  alt="Preview"
                  style={{ zIndex: 1 }}
                />
              </div>
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
            </div>
          )}
          <button className="upload-button" type="submit" disabled={loading}>
            Mint NFT
          </button>
        </>
      )}
    </form>
  );
};

export { ImageCapturePhone };

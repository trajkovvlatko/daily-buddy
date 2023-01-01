import Webcam from 'react-webcam';
import { useCallback, useRef } from 'react';

const WebCamForm = ({
  imageData,
  setImageData,
}: {
  imageData: string | null;
  setImageData: (val: string | null) => void;
}) => {
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    setImageData(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const retake = () => setImageData(null);

  return !!imageData ? (
    <>
      <img src={imageData} />
      <div className="mt-3 flex justify-center">
        <button onClick={retake} className="green-button">
          Retake
        </button>
      </div>
    </>
  ) : (
    <>
      <Webcam
        width={720}
        height={480}
        ref={webcamRef}
        screenshotFormat="image/png"
        minScreenshotHeight={720}
        minScreenshotWidth={1080}
      />
      <div className="mt-3 flex justify-center">
        <button onClick={capture} className="green-button">
          Capture photo
        </button>
      </div>
    </>
  );
};

export default WebCamForm;

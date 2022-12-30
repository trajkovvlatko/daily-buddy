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
      <button onClick={retake}>Retake</button>
    </>
  ) : (
    <>
      <Webcam width={720} height={480} ref={webcamRef} screenshotFormat="image/png" />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export default WebCamForm;

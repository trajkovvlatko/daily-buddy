import { useCallback, useRef } from 'react';

import Webcam from 'react-webcam';

import { isMobile } from 'src/lib/isMobile';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  const retake = () => setImageData(null);

  return imageData ? (
    <>
      <img src={imageData} alt="" />
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
        videoConstraints={{
          facingMode: isMobile() ? 'environment' : 'user',
        }}
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

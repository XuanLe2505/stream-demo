import { useEffect, useRef } from 'react'

const VideoPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    return (
        <video
            className='w-full'
            ref={videoRef}
            autoPlay
            muted={true}
        />
    )
}

export default VideoPlayer
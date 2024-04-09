import { useEffect, useRef } from 'react'

const VideoPlayer: React.FC<{ stream?: MediaStream, key?: string, isCamera?: boolean, isMicrophone?: boolean }> = ({ stream, isCamera = true, isMicrophone = true }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);;
    return (
        <div className='relative rounded-xl'>
            {/* {!isCamera &&
                <div className='absolute w-full h-full bg-gray-400 rounded-xl'></div>
            } */}
            <video
                className='w-full rounded-xl'
                ref={videoRef}
                autoPlay
                muted={isMicrophone}
            />
        </div>
    )
}

export default VideoPlayer
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'


const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream>();

    useEffect(() => {
        if (stream) return;
        (async function initStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                })
                console.log("setting your stream");
                setStream(stream);
            } catch (e) {
                console.log("Error in media navigator", e);
            }
        })()
    }, []);

    return {
        stream
    }
}

export default useMediaStream
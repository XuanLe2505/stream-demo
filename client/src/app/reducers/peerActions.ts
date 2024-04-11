import { MediaConnection } from "peerjs";

export const ADD_PEER_STREAM = 'ADD_PEER_STREAM' as const;
export const ADD_PEER_NAME = 'ADD_PEER_NAME' as const;
export const REMOVE_PEER_STREAM = 'REMOVE_PEER_STREAM' as const;
export const ADD_ALL_PEER = 'ADD_ALL_PEER' as const;

export const addPeerStreamAction = (peer: MediaConnection, stream: MediaStream) => ({
    type: ADD_PEER_STREAM,
    payload: { peer, stream },
});

export const addPeerNameAction = (peer: MediaConnection, userName: string) => ({
    type: ADD_PEER_NAME,
    payload: { peer, userName },
});

export const removePeerStreamAction = (peerId: string) => ({
    type: REMOVE_PEER_STREAM,
    payload: { peerId },
});

export const addAllPeerAction = (peers: Record<string, { peer: MediaConnection, userName: string }>) => ({
    type: ADD_ALL_PEER,
    payload: { peers },
});

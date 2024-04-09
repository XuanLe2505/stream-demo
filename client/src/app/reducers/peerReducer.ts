import { ADD_ALL_PEER, ADD_PEER_NAME, ADD_PEER_STREAM, REMOVE_PEER_STREAM } from "./peerActions";

export type peerStateType = Record<string, { peerId: string, userName?: string, stream?: MediaStream }>;

type addPeerStreamType = {
    type:typeof ADD_PEER_STREAM,
    payload: { peerId: string, stream: MediaStream },
}
type addPeerNameType = {
    type: typeof ADD_PEER_NAME,
    payload: { peerId: string, userName: string },
}
type addAllPeersType = {
    type: typeof ADD_ALL_PEER,
    payload: { peers: Record<string, { peerId: string, userName: string }> },
}
type removePeerStreamType = {
    type: typeof REMOVE_PEER_STREAM,
    payload: { peerId: string },
}

export type peerActionType = addPeerStreamType | addPeerNameType | addAllPeersType | removePeerStreamType;

export const peersReducer = (state: peerStateType, action : peerActionType) => {
    switch (action.type) {
        case ADD_PEER_STREAM:
            return {
                ...state,
                [action.payload.peerId]: {
                    peerId: action.payload.peerId,
                    stream: action.payload.stream,
                }
            };
        case ADD_PEER_NAME:
            return {
                ...state,
                [action.payload.peerId]: {
                    peerId: action.payload.peerId,
                    userName: action.payload.userName,
                }
            };
        case ADD_ALL_PEER:
            return {...state, ...action.payload.peers};
        case REMOVE_PEER_STREAM:
            const { [action.payload.peerId]: {}, ...rest } = state;
            return rest;
        default:
            return { ...state };
    }
};
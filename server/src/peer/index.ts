import { PeerServer } from "peer";

const BootstrapPeer = () => {
    PeerServer({ port: 9000, path: "/myapp" });
}

export default BootstrapPeer;
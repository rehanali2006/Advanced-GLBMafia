const {Server}=require("socket.io");

let io;

// Maps userId -> socket.id so we can send targeted notifications
const onlineUsers=new Map();

function initSocket(server){
    io=new Server(server);

    io.on("connection",(socket)=>{
        console.log("socket connected:",socket.id);

        // Client sends their userId after connecting so we can map them
        socket.on("register",(userId)=>{
            if(userId){
                onlineUsers.set(userId.toString(),socket.id);
                console.log(`user ${userId} registered with socket ${socket.id}`);
            }
        });

        socket.on("disconnect",()=>{
            // Remove user from the map on disconnect
            for(const [userId,sockId] of onlineUsers.entries()){
                if(sockId===socket.id){
                    onlineUsers.delete(userId);
                    console.log(`user ${userId} disconnected`);
                    break;
                }
            }
        });
    });

    return io;
}

function getIo(){
    if(!io) throw new Error("Socket.io not initialised");
    return io;
}

function getOnlineUsers(){
    return onlineUsers;
}

module.exports={initSocket,getIo,getOnlineUsers};

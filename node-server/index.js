const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowEIO3: true,
  },
  transport: ["websocket"],
});

const user = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log(name);
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", { message, name: user[socket.id] });
  });
});

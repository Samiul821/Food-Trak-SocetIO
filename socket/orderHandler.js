const orderHandler = (io, socket) => {
  console.log("a user connected", socket.io);

  //   emit -> trigger -> on -> listen

  // place order
  socket.on("placeOrder", async (data, callback) => {
    try {
      console.log(`Placed Order from ${socket.id}`);
      const validation = validateOrder(data);
    } catch (error) {
      console.log(error);
    }
  });
};

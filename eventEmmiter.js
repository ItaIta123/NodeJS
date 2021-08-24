const EventEmitter = require("events");
emitter = new EventEmitter();

emitter.on("logging", (e) => {
  console.log("logging", e);
});

emitter.emit("logging", { data: "message" });

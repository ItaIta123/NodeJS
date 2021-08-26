const p = new Project((resolve, reject) => {
  // Kick off some Async work (fetch from db, timeout, and etc...)

  setTimeout(() => {
    // resolve(1);
    reject(new Error("error message"));
  }, 2000);
});

p.then((res) => console.log("Successfully result:" + res)).catch((err) =>
  console.log("Error" + err)
);

const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();


app.get("/api/test", (req, res) => {

    console.log("Correct Server")
  res.json({ message: "Week 1 complete" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

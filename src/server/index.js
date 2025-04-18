const express = require("express");
const api = require('./api'); 

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json()); 

app.get("/api/test", (req, res) => {
  res.set ({
    'Access-Control-Allow-Origin': '*'
    })
  res.json({ message: "Week 1 complete" });
});

// Step 2: Register the endpoint, /prepareGoatMove on the server. Point it to the function that will contain the logic, getGoatLegalMoves
app.post("/api/prepareGoatMove", (req, res) => api.getGoatLegalMoves(JSON.stringify(req.body), res));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

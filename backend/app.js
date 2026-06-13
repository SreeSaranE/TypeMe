const { getStats, getStat } = require('./testServer');
const express = require('express');

const app = express();

app.get("/stats",async (req, res) => {
    const all_stats = await getStats()
    res.send(all_stats);
})

app.get("/stat/:id", async (req, res) => {
    const id = req.params.id
    const id_stat = await getStat(id)
    res.send(id_stat)
});

app.listen(3001, () => {
    console.log("App running in port 3001...")

})
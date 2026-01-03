const mongoose = require("mongoose");

const CompraAtivaSchema = new mongoose.Schema({
    userId: String,
    canalId: String,
    tipo: String // bot | design
});

module.exports = mongoose.model("CompraAtiva", CompraAtivaSchema);
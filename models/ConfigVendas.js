const mongoose = require("mongoose");

const ConfigVendasSchema = new mongoose.Schema({
    categoriaId: { type: String, required: true },
    emoji: { type: String, required: true },
    cargoVendedorId: { type: String, required: true }
});

module.exports = mongoose.model("ConfigVendas", ConfigVendasSchema);

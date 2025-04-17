const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: {
        type: String,
        enum: ['asmeninė', 'darbas', 'mokslai', 'kita'],
        default: 'kita'
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);

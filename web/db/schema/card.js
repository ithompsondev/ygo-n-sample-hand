import mongoose from 'mongoose';

export default new mongoose.Schema({
    name: { type: String, required: true },
    attribute: { type: String, required: false },
    level: { type: Number, required: false},
    card_type: { type: String, required: false },
    art: { type: String, required: true },
    art_small: { type: String, required: true },
    monster_type: { type: String, required: false },
    description: { type: String, required: true },
    attack: { type: String, require: false },
    defence: { type: String, required: false },
    link_value: { type: Number, required: false },
    link_arrows: { type: [String], required: false },
    scale: { type: Number, required: false },
    spell_type: { type: String, required: false },
    trap_type: { type:String, required: false }
});
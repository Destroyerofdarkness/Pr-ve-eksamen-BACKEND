const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const keySchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

keySchema.statics.generateKey = async()=>{
const key = crypto.randomBytes(32).toString('hex');
console.log("Key: ",key);
const hash = crypto.createHash("sha256").digest('hex');
console.log("Hash", hash);
const newKey = new Key({
    key:hash,
    user:"megatron"
})

await newKey.save();
}


const Key = model("Key", keySchema);

module.exports = Key;

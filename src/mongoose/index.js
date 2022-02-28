const mongoose = require('mongoose');

main().catch(err => console.log(err));

const kittySchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');

  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  await silence.save();

  const kittens = await Kitten.find();
  console.log(kittens);

  await mongoose.disconnect()
}

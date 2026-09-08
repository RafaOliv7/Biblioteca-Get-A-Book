const moongose = require("mongoose");

async function main() {
  await moongose.connect("mongodb://localhost:27017/getabook");
  console.log("Conectou ao Mongoose!");
}

main().catch((err) => console.log(err));

module.exports = moongose;

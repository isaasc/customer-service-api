const mongoose = require('mongoose');

async function main() {
  try {
    // mongoose.set("strictQuery", true);
    await mongoose.connect('mongodb://fiap:123456@localhost:27017/admin');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;

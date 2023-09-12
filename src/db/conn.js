const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://personal-department:SrOzFMKSkbDK86Rb@cluster0.gaxqkxk.mongodb.net/personal-department-db?retryWrites=true&w=majority',
    );
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;

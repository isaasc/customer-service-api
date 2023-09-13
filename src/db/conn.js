const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://customer-service:EAd2MpwB0WCbVyOI@cluster0.gaxqkxk.mongodb.net/customer-service-db?retryWrites=true&w=majority',
    );
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;

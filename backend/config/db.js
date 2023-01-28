const mongoose = require('mongoose');

const connectDb = async () => {
    const {
        DB_USER,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_NAME,
    } = process.env;
    let uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
    try {
        const conn = await mongoose.connect(uri)
        console.log(`connected to ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

module.exports = connectDb;
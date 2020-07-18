require('dotenv/config')
module.exports = {
    port: process.env.PORT,
    name: process.env.API_NAME,
    db_conn: process.env.MONGO_URL,
    db_name: process.env.DB_NAME
}
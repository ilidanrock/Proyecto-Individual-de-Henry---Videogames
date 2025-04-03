require("dotenv").config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    isProd: process.env.NODE_ENV === "production",
    dbEngine: process.env.DB_ENGINE || "postgres",
    dbUrl: process.env.DATABASE_URL 
}

module.exports = { config };
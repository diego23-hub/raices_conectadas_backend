const DB_TYPE = process.env.DB_TYPE || 'mysql';

let sequelize;
if (DB_TYPE === 'mysql') {
    sequelize = new Sequelize('demo', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql'
    });
}

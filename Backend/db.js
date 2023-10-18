const Sequelize = require('sequelize');
const RolModel = require('./tablas/roles2.js'); 
const faker = require('faker');

const sequelize = new Sequelize('sistema_gestion2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Rol = RolModel(sequelize, Sequelize);

function generateFakeRole() {
    return {
        nombreRol: faker.name.jobTitle(),
        descripcion: faker.lorem.sentence()
    };
}

async function seedRoles() {
    console.log('Tablas Creadas');

    const numberOfRoles = 10;

    for (let i = 0; i < numberOfRoles; i++) {
        const fakeRole = generateFakeRole();
        await Rol.create(fakeRole);
    }

    console.log(`${numberOfRoles} roles ficticios creados.`);
}

sequelize.sync({ force: false })
    .then(() => seedRoles())
    .finally(() => sequelize.close());
const request = require('supertest');
const app = require('../app'); // Certifique-se de exportar o app no arquivo app.js
const sequelize = require('../config/database');
const Profile = require('../models/Profile');
const Contract = require('../models/Contract');
const Job = require('../models/Job');

beforeAll(async () => {
  
  await sequelize.sync({ force: true });

  const client = await Profile.create({ firstName: 'Alice', lastName: 'Johnson', profession: 'Engineer', balance: 100, type: 'client' });
  const contractor = await Profile.create({ firstName: 'Bob', lastName: 'Smith', profession: 'Designer', balance: 200, type: 'contractor' });

  const contract = await Contract.create({ terms: 'Website redesign', status: 'active', clientId: client.id, contractorId: contractor.id });

  await Job.create({ description: 'Homepage design', price: 500, paid: false, contractId: contract.id });
  await Job.create({ description: 'Logo design', price: 300, paid: true, contractId: contract.id, paymentDate: new Date() });
});

afterAll(async () => {
  await sequelize.close();
});

describe('API Tests', () => {
  test('GET /profiles/:id/contracts - List contracts of a profile', async () => {
    const res = await request(app).get('/profiles/1/contracts');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('terms', 'Website redesign');
  });

  test('POST /profiles/:id/deposit - Deposit into profile', async () => {
    const res = await request(app).post('/profiles/1/deposit').send({ amount: 50 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('balance', 150);
  });

  test('GET /contracts/:id/jobs/unpaid - List unpaid jobs of a contract', async () => {
    const res = await request(app).get('/contracts/1/jobs/unpaid');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('description', 'Homepage design');
  });
});

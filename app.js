const express = require('express');
const sequelize = require('./config/database');
const Profile = require('./models/Profile');
const Contract = require('./models/Contract');
const Job = require('./models/Job');
const Deposit = require('./models/Deposit');
const Payment = require('./models/Payment');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    sequelize.sync();
  }

  (async () => {
    await sequelize.sync({ force: true });
  
    const clientProfile = await Profile.create({ firstName: 'Lucas', lastName: 'Robles', profession: 'Engenheiro', balance: 100, type: 'Funcionario' });
    const contractorProfile = await Profile.create({ firstName: 'Rogerio', lastName: 'Marinke', profession: 'Professor', balance: 200, type: 'Patrao' });
  
    const contract = await Contract.create({ terms: 'Aplicação Nodejs - Prova', status: 'Andamento', clientId: clientProfile.id, contractorId: contractorProfile.id });
  
    await Job.create({ description: 'Realizar prova', price: 500, paid: false, contractId: contract.id });
    await Job.create({ description: 'Tirar boa nota', price: 300, paid: true, contractId: contract.id, paymentDate: new Date() });
  
    console.log('Dados de teste preenchidos!');
  })();  

app.get('/profiles/:id/contracts', async (req, res) => {
    const contracts = await Contract.findAll({
      where: { clientId: req.params.id },
      include: { model: Profile, as: 'Client' },
    });
    res.json(contracts);
  });
  
  app.post('/profiles/:id/deposit', async (req, res) => {
    const { amount } = req.body;
  
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Perfil não encontrado' });
  
    profile.balance += amount;
    await profile.save();
  
    res.json(profile);
  });

  app.get('/contracts/:id/jobs/unpaid', async (req, res) => {
    const jobs = await Job.findAll({
      where: { contractId: req.params.id, paid: false },
    });
    res.json(jobs);
  });
  
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Servidor conectado na porta ${PORT}`);
    });
  }

  module.exports = app;
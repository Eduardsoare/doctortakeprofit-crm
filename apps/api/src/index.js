const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Import Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'DoctorTakeProfit CRM API',
    timestamp: new Date().toISOString()
  });
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: { deals: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create contact
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, source, notes } = req.body;
    const contact = await prisma.contact.create({
      data: { name, email, phone, source: source || 'manual', notes }
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all deals
app.get('/api/deals', async (req, res) => {
  try {
    const deals = await prisma.deal.findMany({
      include: { contact: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`DoctorTakeProfit API running on port ${PORT}`);
});

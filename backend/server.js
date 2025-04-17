const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger dokumentacija
const setupSwagger = require('./swagger');
setupSwagger(app);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000, () => {
    console.log('✅ Serveris paleistas: http://localhost:5000');
});

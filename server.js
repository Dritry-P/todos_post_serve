const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 5000;

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

let tasks = [];

app.post('/task', upload.single('file'), (req, res) => {
    const { title, description, status } = req.body;
    const file = req.file || null;

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        status: status || 'pending',
        file: file
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
    console.log('Нове завдання додано:', newTask);
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
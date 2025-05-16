const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./requests.json";

// Получить все заявки
app.get("/api/requests", (req, res) => {
    if (!fs.existsSync(DATA_FILE)) return res.json([]);
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    res.json(data);
});

// Добавить новую заявку
app.post("/api/requests", (req, res) => {
    const { name, phone, comment } = req.body;
    if (!name || !phone)
        return res.status(400).json({ error: "Missing fields" });
    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }
    data.push({
        name,
        phone,
        comment,
        date: new Date(),
        status: "необработанная",
    });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

// Обновить статус заявки по индексу
app.patch("/api/requests/:index", (req, res) => {
    const { index } = req.params;
    const { status } = req.body;
    if (!fs.existsSync(DATA_FILE))
        return res.status(404).json({ error: "Not found" });
    let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    if (!data[index])
        return res.status(404).json({ error: "Request not found" });
    data[index].status = status;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

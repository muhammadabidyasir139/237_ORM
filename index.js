const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route: POST /komiks
app.post("/komiks", async (req, res) => {
  try {
    const komik = await db.Komik.create(req.body); // ✅ req.body, bukan 'data'
    res.status(201).json(komik);
  } catch (error) {
    res.status(400).json({ message: error.message }); // ✅ pakai 'error'
  }
});

// Route: GET /komiks
app.get("/komiks", async (req, res) => {
  try {
    const komiks = await db.Komik.findAll();
    res.json(komiks);
  } catch (error) {
    res.status(500).json({ message: error.message }); // ✅
  }
});

// Route: PUT /komik/:id
app.put("/komik/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      // ✅ 'if', bukan 'it'
      return res.status(404).json({ message: "Komik not found" });
    }

    await Komik.update(data);
    res.json({ message: "Komik updated successfully", Komik });
  } catch (error) {
    res.status(500).json({ message: error.message }); // ✅
  }
});

// Route: DELETE /komik/:id
app.delete("/komik/:id", async (req, res) => {
  // ✅ tambahkan '/'
  const id = req.params.id;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).json({ message: "Komik not found" });
    }

    await Komik.destroy();
    res.json({ message: "Komik deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // ✅
  }
});

// Jalankan server SETELAH database siap
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

const express = require("express");
const app = express();
const db = require("./models");
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

db.sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/komiks", async (req, res) => {
  try {
    const komik = await db.Komik.create(data);
    res.send(komik);
  } catch (error) {
    res.send(err);
  }
});

app.get("/komiks", async (req, res) => {
  try {
    const komiks = await db.Komik.findAll();
    res.send(komiks);
  } catch (error) {
    res.send(err);
  }
});

app.put("/komik/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const Komik = await db.Komik.findByPk(id);
        it(!Komik) {
            return res.status(404).send({ message: "Komik not found" });
        }

        await Komik.update(data);
        res.send({message: "Komik updated successfully", Komik});
    } catch (error) {
        res.status(500).send(err);
    }
});

app.delete("komik/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const Komik = await db.Komik.findByPk(id);
        if(!Komik) {
            return res.status(404).send({ message: "Komik not found" });
        }

        await Komik.destroy();
        res.send({ message: "Komik deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
})

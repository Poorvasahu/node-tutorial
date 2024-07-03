const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newAge = req.body.age;
  const updateUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { age: newAge },
  });
  res.json(updateUser);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

app.post("/house", async (req, res) => {
  const newHouse = await prisma.house.create({ data: req.body });
  res.json(newHouse);
});

app.get("/allhouse", async (req, res) => {
  const allHouse = await prisma.house.findMany({
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouse);
});

app.get("/house/:id", async (req, res) => {
  const id = req.params.id;
  const allHouse = await prisma.house.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouse);
});

app.get("/house", async (req, res) => {
  const address = req.body.address;
  const allHouse = await prisma.house.findUnique({
    where: {
      address,
    },
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouse);
});

app.post("/house/many", async (req, res) => {
  const newhouses = await prisma.house.createMany({ data: req.body });
  res.json(newhouses);
});

app.get("/home/withFilters", async (req, res) => {
  try {
    const filteredHouse = await prisma.house.findMany({
      where: {
        wifiPassword: {
          not: null,
        },
        owner: {
          age: {
            gte: 20,
          },
        },
      },
      orderBy: [{
        owner: {
          firtsName: "desc",
        },
      },],
      include: {
        owner: true,
        builtBy: true,
      },
    });
    console.log("filtered houses: ", filteredHouse);
    res.json(filteredHouse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(3000, () => console.log(`server running on port ${3000}`));

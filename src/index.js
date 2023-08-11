const express = require("express");
const dotenv = require("dotenv");
const {PrismaClient} = require("@prisma/client");

// declare
const prisma = new PrismaClient()
const PORT = process.env.PORT;
const app = express();
const cors = require("cors")



app.use(express.json())
app.use(cors({
 origin: true
}))
dotenv.config();


/* ==========
tables : 
jabatan (default)
status (default)
roles (default)
jenissampel (default)
user (manually)
tiket (manually)
========== */


/* ========== Hit tiket table ========== */
// get tiket
app.get("/jadwal", async (req, res) => {
    try {
        const data = await prisma.tiket.findMany();
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

// post tiket
app.post("/jadwal", async (req, res) => {
    const value = req.body;
    value.statusId = 1;
    value.tanggal = new Date(value.tanggal).toISOString()
    try {
        const data = await prisma.tiket.create({ data: value })
        res.status(200).send(data)
    } catch(error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

// get tiket by id
app.get("/jadwal/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.tiket.findUnique({
            where: {
                id: id
            }, include: {
                status: true
            }
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

// delete tiket
app.delete("/jadwal/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.tiket.delete({
            where: {
                id: id
            }
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

// update tiket
app.put("/jadwal/:id", async (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.statusId;
    try {
        const data = await prisma.tiket.update({
            where: {id: id},
            data: {statusId: newStatus}
        })
        res.status(201).send(data);
    } catch(error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

/* ========== Hit user table ========== */
// get user
app.get("/karyawan", async (req, res) => {
    try {
        const data = await prisma.user.findMany({
            include: {
                jabatan: true
            }
        })
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

// get user by id
app.get("/karyawan/:id", async (req, res) => {
    const id = req.params.id
    try {
        const data = await prisma.user.findUnique({
            where: {id: id},
            include: {
                jabatan: true
            }
        })
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

// post user
app.post("/karyawan", async (req, res) => {
    try {
        const data = await prisma.user.create({ data: req.body })
        res.send(data)
    } catch(error) {
        res.status(500).send({error: "Internal server error!"})
    }
})
// update user password
app.put("/karyawan/:id/password", async (req, res) => {
    const id = req.params.id;
    const newPassword = req.body.password;
    try {
        const data = await prisma.user.update ({
            where: { id: id },
            data: { password: newPassword } 
        })
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({error: "Internal server error!"});
    }
});

// update user biodata
app.put("/karyawan/:id", async (req, res) => {
    const id = req.params.id;
    const value = req.body;
    try {
        const data = await prisma.user.update({ 
            where: { id: id },
            data: { 
                ...value,
                updateAt: new Date()
             }
        });
        res.status(200).send(data)
    } catch(error) {
        res.status(500).send({error: "Internal server error!"})
    }
})

// delete user 
app.delete("/karyawan/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.user.delete({
            where: { id: id }
        })
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({error: "Internal server error!"});
    }
})

/* ========== Hit default input ========== */
// jabatan table default input
app.post("/jabatan", async (req, res) => {
    const data = await prisma.jabatan.createMany({
        data: [
            {
                jabatan: "Kepala cabang"
            }, 
            {
                jabatan: "Engineer"
            },
            {
                jabatan: "Administrasi"
            }
        ]
    });
    res.status(201).send(data);
})

// jenissample tables default input
app.post("/jenissampel", async (req, res) => {
    const data = await prisma.jenisSampel.createMany({
        data: [
            {
                sampel: "Air limbah"
            },
            {
                sampel: "Air sungai"
            }, 
            {
                sampel: "Udara"
            },
            {
                sampel: "Udara ambient"
            },
            {
                sampel: "Oksigen"
            }
        ]
    });
    res.status(201).send(data)
})

// roles tables default input
app.post("/roles", async (req, res) => {
        const data = await prisma.roles.createMany({
            data: [
                {
                    role: "Engineer"
                },
                {
                    role: "Admin"
                }
            ]
        });
    res.status(201).send(data);
})

// status table default input
app.post("/status", async (req, res) => {
    const data = await prisma.status.createMany({
        data: [
            {
                status: "diproses"
            },
            {
                status: "selesai"
            },
            {
                status: "terlambat selesai"
            }
        ]
    });
    res.status(201).send(data);
})

app.listen(PORT, () => {
    console.log("App listen to port " + PORT);
})
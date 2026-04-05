var express = require("express");
var cors = require("cors");
var { Firestore } = require("@google-cloud/firestore");

var app = express();
var PORT = 3000;

// Firestore se autenticará automáticamente con las credenciales de la VM
// (service account asociada al Compute Engine)
var db = new Firestore();

app.use(cors({ origin: true }));
app.use(express.json());

// POST /api/contacto - Guardar un contacto
app.post("/api/contacto", function (req, res) {
    var nombre = (req.body.nombre || "").trim();
    var telefono = (req.body.telefono || "").trim();

    if (!nombre || !telefono) {
        return res.status(400).json({ error: "Nombre y teléfono son obligatorios." });
    }

    var contacto = {
        nombre: nombre,
        telefono: telefono,
        fecha: new Date().toISOString()
    };

    db.collection("contactos").add(contacto)
        .then(function (docRef) {
            console.log("Contacto guardado:", docRef.id);
            res.json({ ok: true, id: docRef.id });
        })
        .catch(function (err) {
            console.error("Error al guardar en Firestore:", err);
            res.status(500).json({ error: "Error al guardar los datos." });
        });
});

// GET /api/contactos - Listar contactos
app.get("/api/contactos", function (req, res) {
    db.collection("contactos").orderBy("fecha", "desc").get()
        .then(function (snapshot) {
            var contactos = [];
            snapshot.forEach(function (doc) {
                contactos.push({ id: doc.id, ...doc.data() });
            });
            res.json(contactos);
        })
        .catch(function (err) {
            console.error("Error al leer Firestore:", err);
            res.status(500).json({ error: "Error al obtener los datos." });
        });
});

app.listen(PORT, function () {
    console.log("API corriendo en http://localhost:" + PORT);
});

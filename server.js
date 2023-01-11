const session = require("express-session");
const Keycloak = require("keycloak-connect");

const memoryStore = new session.MemoryStore();

const express = require("express");
const app = express();
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());

app.listen(3000, function () {
  console.log("App listening on port 3000");
});

/*
public api
*/

// accessed by everyone
app.get("/", keycloak.protect("realm:master-admin"), function (req, res) {
  res.send("home");
});

/*
patient api
*/

// accessed by master-admin
app.get(
  "/hmomgt/patient",
  keycloak.protect("realm:master-admin"),
  function (req, res) {
    res.send("get all patients");
  }
);

// accessed by customer
app.post(
  "/hmomgt/patient",
  keycloak.protect("realm:customer"),
  function (req, res) {
    res.send("create patient");
  }
);

// accessed by customer
app.get(
  "/hmomgt/patient/:patientId",
  keycloak.protect("realm:customer"),
  function (req, res) {
    res.send("get patient" + req.params["patientId"]);
  }
);

/*
hospital api
*/

// accessed by master-admin and merchant
app.get(
  "/hmomgt/hospital",
  keycloak.protect(["realm:master-admin", "realm:merchant"]),
  function (req, res) {
    res.send("get all hospitals");
  }
);

// accessed by merchant
app.post(
  "/hmomgt/hospital",
  keycloak.protect("realm:merchant"),
  function (req, res) {
    res.send("create hospital");
  }
);

// accessed by merchant
app.get(
  "/hmomgt/hospital/:hospitalId",
  keycloak.protect("realm:merchant"),
  function (req, res) {
    res.send("get hospital" + req.params["hospitalId"]);
  }
);

/*
doctor api
*/

// accessed by master-admin
app.get(
  "/hmomgt/doctor",
  keycloak.protect("realm:master-admin"),
  function (req, res) {
    res.send("get all doctors");
  }
);

// accessed by merchant
app.post(
  "/hmomgt/doctor",
  keycloak.protect("realm:merchant"),
  function (req, res) {
    res.send("create doctor");
  }
);

// accessed by merchant
app.get(
  "/hmomgt/doctor/:doctorId",
  keycloak.protect("realm:merchant"),
  function (req, res) {
    res.send("get doctor" + req.params["doctorId"]);
  }
);

/*
prescription api
*/

// accessed by master-admin
app.get(
  "/hmomgt/prescription",
  keycloak.protect("realm:master-admin"),
  function (req, res) {
    res.send("get all prescriptions");
  }
);

// accessed by merchant and customer
app.post(
  "/hmomgt/prescription",
  keycloak.protect(["realm:merchant", "realm:customer"]),
  function (req, res) {
    res.send("create prescription");
  }
);

// accessed by merchant and customer
app.get(
  "/hmomgt/prescription/:prescriptionId",
  keycloak.protect(["realm:merchant", "realm:customer"]),
  function (req, res) {
    res.send("get prescription" + req.params["prescriptionId"]);
  }
);

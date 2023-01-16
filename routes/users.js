const express = require("express");
const { info, debug, error } = require("ps-logger");
const router = express.Router();

// for using middleware
// router.use(logger)

router.get("/", (req, res) => {
  info("users list");
  res.send("users list");
});

router.post("/", (req, res) => {
  const isValid = true;

  if (isValid) {
    users.push({ name: req.body.name });
    console.log(users);
    res.redirect(`/users/${users.length - 1}`);
  } else {
    error("Error");
    res.render("users/new", { name: req.body.name });
  }
});

// always put static routes above
router.get("/new", (req, res) => {
  info("users new form");
  res.render("users/new");
});

// use route method to chain similar route based apis
router
  .route("/:id")
  .get((req, res) => {
    info(JSON.stringify(req.user));
    res.send(`User with ID ${req.params.id} => ${req.user.name}`);
  })
  .post((req, res) => {
    res.send(`Create user with id ${req.params.id}`);
  });

router.get("/:id/:sub", (req, res) => {
  res.send(`Get User with ID ${req.params.id} and sub ${req.params.sub}`);
});

// used for executing a specific method if we get the param

const users = [{ name: "shivansh" }, { name: "Anurag" }, { name: "piyush" }];

router.param("id", (req, res, next, id) => {
  debug(`we get the id ${id}`);
  req.user = users[id];
  next();
});

module.exports = router;

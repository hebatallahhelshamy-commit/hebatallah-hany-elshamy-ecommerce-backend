const express = require("express");
const router = express.Router();

console.log("ROUTES FILE LOADED");
console.log("🔥 CATEGORY ROUTES ACTIVE");
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.post("/", createCategory);

module.exports = router;
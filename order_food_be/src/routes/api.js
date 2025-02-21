const express = require('express');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { createUser, handleLogin, getUser, getAccount  } = require('../controllers/userController');
const { createItem,listItem, editItem, deleteItem } = require('../controllers/itemController');
const { listCategory, createCategory } = require('../controllers/categoryController');
const { listTable, createTable, editTable, deleteTable } = require('../controllers/tableController');
const { listProduct } = require('../controllers/listProductController');

const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world API")
})



routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);
routerAPI.post("/post-item", createItem);
routerAPI.post("/product", listItem);
routerAPI.get("/category", listCategory);
routerAPI.post("/post-category", createCategory);
routerAPI.get("/table", listTable);
routerAPI.post("/post-table", createTable);
routerAPI.put("/edit-item", editItem);
routerAPI.delete('/delete-item', deleteItem);
routerAPI.get("/product/:id", listProduct);
routerAPI.put("/edit-table/:id", editTable);   // API cập nhật bàn
routerAPI.delete("/delete-table/:id", deleteTable); // API xóa bàn

module.exports = routerAPI; //export default
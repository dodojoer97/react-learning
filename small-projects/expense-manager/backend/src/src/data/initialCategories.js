"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Model
const Category_1 = require("../models/Category");
// UUID
const uuid_1 = require("uuid");
const initialCategories = [
    new Category_1.Category("faBowlFood", "Food", (0, uuid_1.v4)()),
    new Category_1.Category("faBus", "Transport", (0, uuid_1.v4)()),
    new Category_1.Category("faHouse", "Rent", (0, uuid_1.v4)()),
];
exports.default = initialCategories;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../services/CategoryService"));
const Category_1 = require("../models/Category");
// UUID
const uuid_1 = require("uuid");
class CategoryController {
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const { category, userId } = dto;
                // TODO move the creation Id to service or repo
                const categoryModel = new Category_1.Category(category.icon, category.name, (0, uuid_1.v4)());
                yield CategoryService_1.default.addCategoryForUser(categoryModel, userId);
                res.status(201).send(category);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    getCategoriesByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const categories = yield CategoryService_1.default.getCategoriesByUser(userId);
                res.status(200).send(categories);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.default = new CategoryController();

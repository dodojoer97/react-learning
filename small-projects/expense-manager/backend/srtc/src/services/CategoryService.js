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
// src/services/CategoryService.ts
const CategoryRepository_1 = __importDefault(require("../repositories/CategoryRepository"));
// Data
const initialCategories_1 = __importDefault(require("../data/initialCategories"));
class CategoryService {
    // Adds a single category for a specific user
    addCategoryForUser(category, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CategoryRepository_1.default.addCategoryForUser(category, userId);
        });
    }
    // Retrieves categories for a specific user
    getCategoriesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CategoryRepository_1.default.getCategoriesByUser(userId);
        });
    }
    // Adds default categories for a new user
    addDefaultCategoriesForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CategoryRepository_1.default.addCategoriesForUser(initialCategories_1.default, userId);
        });
    }
}
exports.default = new CategoryService();

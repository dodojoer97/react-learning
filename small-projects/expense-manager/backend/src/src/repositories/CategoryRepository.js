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
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/CategoryRepository.ts
const firebase_1 = require("../config/firebase");
class CategoryRepository {
    constructor() {
        this.categoriesCollection = firebase_1.adminDb.collection("categories");
    }
    // Add a category for a specific user
    addCategoryForUser(category, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryDoc = this.categoriesCollection.doc(category.name);
            const userCategory = Object.assign(Object.assign({}, category), { userId }); // Add userId to the category object
            yield categoryDoc.set(userCategory);
        });
    }
    // Add multiple categories for a specific user
    addCategoriesForUser(categories, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = firebase_1.adminDb.batch();
            categories.forEach((category) => {
                const categoryDoc = this.categoriesCollection.doc(category.name);
                const userCategory = Object.assign(Object.assign({}, category), { userId }); // Add userId to each category object
                batch.set(categoryDoc, userCategory);
            });
            yield batch.commit();
        });
    }
    // Retrieve categories by a specific user ID
    getCategoriesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.categoriesCollection.where("userId", "==", userId).get();
            return snapshot.docs.map((doc) => doc.data());
        });
    }
}
exports.default = new CategoryRepository();

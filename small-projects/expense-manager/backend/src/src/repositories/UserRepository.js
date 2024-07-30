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
const firebase_1 = require("../config/firebase");
class UserRepository {
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRecord = yield firebase_1.admin.auth().getUserByEmail(email);
                console.log("userRecordL ", userRecord);
                return {
                    uid: userRecord.uid,
                    email: userRecord.email,
                };
            }
            catch (error) {
                console.error("getUserByEmail error: ", error);
                return null;
            }
        });
    }
    createUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRecord = yield firebase_1.admin.auth().createUser({ email, password });
                return { uid: userRecord.uid, email: userRecord.email, password };
            }
            catch (error) {
                console.error("createUser error: ", error);
                return null;
            }
        });
    }
}
exports.default = new UserRepository();

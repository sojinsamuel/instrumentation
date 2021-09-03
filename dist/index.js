#!/usr/bin/env node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos
 *
 * This file is part of Project Fonos
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var utils_1 = require("./utils");
var express_1 = __importDefault(require("express"));
var agents_1 = __importDefault(require("@fonos/agents"));
var auth_1 = __importDefault(require("@fonos/auth"));
var faker_1 = __importDefault(require("faker"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
var port = 3000;
app.get("/instrumentation", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, projectInfo, auth, credentials, agents, username, secret, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.body.projectId;
                if (!projectId) {
                    res.status(405).send("Bad request.");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, utils_1.getProjectInfo)(projectId)];
            case 2:
                projectInfo = _a.sent();
                if (!projectInfo) {
                    res.status(404).send("Not found.");
                }
                auth = new auth_1.default();
                return [4 /*yield*/, auth.createToken({
                        accessKeyId: projectInfo.accessKeyId,
                        roleName: "USER",
                        expiration: "1d"
                    })];
            case 3:
                credentials = _a.sent();
                agents = new agents_1.default({
                    accessKeyId: projectInfo.accessKeyId,
                    accessKeySecret: credentials.token
                });
                username = faker_1.default.internet.userName().toLowerCase();
                secret = faker_1.default.internet.password(10);
                return [4 /*yield*/, agents.createAgent({
                        name: projectInfo.displayName,
                        username: username,
                        secret: secret,
                        domains: [projectInfo.sipDomain]
                    })];
            case 4:
                _a.sent();
                res.status(200).send({
                    signalServer: projectInfo.signalServer,
                    eventsServer: projectInfo.signalServer,
                    targetAOR: projectInfo.targetAOR,
                    didInfo: projectInfo.didInfo,
                    sipDomain: projectInfo.sipDomain,
                    clientDisplayName: projectInfo.displayName,
                    clientUsername: username,
                    clientSecret: secret
                });
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500).send("Server error.");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get("/ping", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).send("pong");
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("Service listening at http://localhost:" + port + "/instrumentation");
});
//# sourceMappingURL=index.js.map
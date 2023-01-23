"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase = __importStar(require("firebase-admin"));
const ServiceAccount = __importStar(require("./spmdemo-dcf07-firebase-adminsdk-q6ly7-f91baace94.json"));
const firebaseConfig = {
    type: ServiceAccount.type,
    projectId: ServiceAccount.project_id,
    privateKeyId: ServiceAccount.private_key_id,
    privateKey: ServiceAccount.private_key,
    clientEmail: ServiceAccount.client_email,
    clientId: ServiceAccount.client_id,
    authUri: ServiceAccount.auth_uri,
    tokenUri: ServiceAccount.token_uri,
    authProviderX509CertUrl: ServiceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: ServiceAccount.client_x509_cert_url,
};
let PreAuthMiddleware = class PreAuthMiddleware {
    constructor() {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseConfig),
            databaseURL: 'https://spmdemo-dcf07.firebaseio.com/',
        });
    }
    use(req, res, next) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.defaultApp
                .auth()
                .verifyIdToken(token.replace('Bearer ', ''))
                .then(async (decodedToken) => {
                const user = {
                    email: decodedToken.email,
                };
                req['user'] = user;
                next();
            })
                .catch((error) => {
                console.error(error);
                this.accessDenied(req.url, res);
            });
        }
        else {
            next();
        }
    }
    accessDenied(url, res) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied',
        });
    }
};
PreAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PreAuthMiddleware);
exports.PreAuthMiddleware = PreAuthMiddleware;
//# sourceMappingURL=preauth.middleware.js.map
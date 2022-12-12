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
exports.IDPService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const firebase = __importStar(require("firebase-admin"));
const action_code_1 = require("./constants/action-code");
const serviceAccount = __importStar(require("./firebaseServiceAccount.json"));
const firebase_params = {
    type: serviceAccount.type,
    project_id: serviceAccount.project_id,
    private_key_id: serviceAccount.private_key_id,
    private_key: serviceAccount.private_key,
    client_email: serviceAccount.client_email,
    client_id: serviceAccount.client_id,
    auth_uri: serviceAccount.auth_uri,
    token_uri: serviceAccount.token_uri,
    auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
    client_x509_cert_url: serviceAccount.client_x509_cert_url,
};
let IDPService = class IDPService {
    constructor(mailService) {
        this.mailService = mailService;
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(JSON.parse(JSON.stringify(firebase_params))),
            databaseURL: 'https://spm-demo-6f1c3.firebaseio.com',
        });
    }
    async verify(token) {
        try {
            const decodedToken = await this.defaultApp
                .auth()
                .verifyIdToken(token.replace('Bearer ', ''));
            return decodedToken;
        }
        catch (error) {
            throw new common_1.HttpException('Unauthenticated', common_1.HttpStatus.UNAUTHORIZED);
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
    async createUser(data) {
        try {
            const userRecord = await this.defaultApp.auth().createUser(data);
            return userRecord;
        }
        catch (error) {
            throw new common_1.HttpException('Unable to Register at this moment!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async resetPassword(uid, data) {
        try {
            const userRecord = await this.defaultApp.auth().updateUser(uid, data);
            return userRecord;
        }
        catch (error) {
            throw new common_1.HttpException('Unable Reset Password at this moment', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async forgotPassword(email) {
        try {
            const link = await this.defaultApp
                .auth()
                .generatePasswordResetLink(email, action_code_1.actionCodeSettings);
            const sendMail = await await this.mailService.sendMail({
                to: email,
                from: 'spmprojectdemo@gmail.com',
                subject: 'Forgot Password',
                template: 'forgotPassword',
                context: {
                    forgot: { link: link },
                },
            });
            const response = await { msg: 'mail has been sent Successfully. Review' };
            return response;
        }
        catch (error) {
            throw new common_1.HttpException('Unable to Configure Forgot Password at this moment!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
IDPService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], IDPService);
exports.IDPService = IDPService;
//# sourceMappingURL=idp.service.js.map
import { FileDTO } from '../str/dto/uploadFileDto';
import { storageService } from './storage.service';
export declare class storageController {
    private readonly uploadImageService;
    constructor(uploadImageService: storageService);
    getHandShake(): string;
    upload(file: FileDTO, response: any): Promise<any>;
}
//# sourceMappingURL=storage.controller.d.ts.map
import { S3Service } from './s3Storage/s3.service';
import { MockService } from './mockStorage/mock.service';
export declare function getStorageProvider(provider: string): ({
    provide: string;
    useClass: typeof S3Service;
} | {
    provide: string;
    useClass: typeof MockService;
})[];
//# sourceMappingURL=index.d.ts.map
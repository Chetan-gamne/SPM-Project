import * as s3 from 'aws-sdk/clients/s3';
export declare class StorageProvider {
    private readonly _s3;
    private readonly _bucketName;
    constructor();
    getS3(): s3;
    getBucketName(): string;
    uploadFile(file: any, bucket: any, name: any): Promise<unknown>;
    createBucket(): void;
}
//# sourceMappingURL=storageProvider.d.ts.map
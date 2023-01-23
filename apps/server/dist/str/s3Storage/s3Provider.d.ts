import * as s3 from 'aws-sdk/clients/s3';
export declare class S3Provider {
    private readonly _s3;
    private readonly _bucketName;
    constructor();
    getS3(): s3;
    getBucketName(): string;
    uploadFile(file: any, bucket: any, name: any): Promise<unknown>;
    createBucket(): void;
}
//# sourceMappingURL=s3Provider.d.ts.map
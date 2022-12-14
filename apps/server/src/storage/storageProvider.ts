import { Injectable } from '@nestjs/common';
import * as S3Client from 'aws-sdk/clients/s3';
import { constants } from 'src/server.constants';
import { S3 } from 'aws-sdk';

@Injectable()
export class StorageProvider {
  private readonly _s3: S3Client;
  private readonly _bucketName: string;

  // constructor() {
  //   (this._bucketName = process.env.AWS_BUCKET_NAME ?? 'testbucket'),
  //     (this._s3 = new S3({
  //       accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'testaccesskey',
  //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'testsecretkey',
  //       endpoint: process.env.DYNAMO_DB_END_POINT ?? 'http://localhost:4566',
  //       s3ForcePathStyle: true,
  //       region: process.env.AWS_REGION ?? 'ap-southeast-1',
  //       logger: console,
  //     }));
  // }

  constructor() {
    (this._bucketName = constants.aws.AWS_BUCKET_NAME),
      (this._s3 = new S3({
        accessKeyId: constants.aws.AWS_ACCESS_KEY_ID,
        secretAccessKey: constants.aws.AWS_SECRET_ACCESS_KEY,
        s3ForcePathStyle: true,
        region: process.env.AWS_REGION ?? 'ap-south-1',
        logger: console,
      }));
  }

  getS3() {
    return this._s3;
  }

  getBucketName() {
    return this._bucketName;
  }

  createBucket() {
    this.getS3().createBucket(
      { Bucket: 'testbucket', ACL: 'public-read' },
      (err, data) => {
        console.log(err, data);
      },
    );
  }
}

/* Create a bucket (run this once)*/
// new S3ConfigProvider().createBucket();

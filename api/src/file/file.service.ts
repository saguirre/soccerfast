import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { SpacesFolderEnum } from '../enums';

const s3Client = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT,
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  },
});

@Injectable()
export class FileService {
  uploadObject = async (
    file: any,
    previousFileName: string | null,
    fileInfo: Express.Multer.File,
    byteLength: number,
    folder: SpacesFolderEnum,
  ) => {
    try {
      const params = {
        Bucket: `${process.env.SPACES_NAME}`,
        Key: `${folder}/${fileInfo.filename}`,
        ContentLength: byteLength,
        ContentType: fileInfo.mimetype,
        Body: file,
        ACL: 'public-read',
      };
      const data = await s3Client.send(new PutObjectCommand(params));
      if (previousFileName) {
        await this.deleteObject(folder, previousFileName);
      }
      return data;
    } catch (error) {
      console.error('Error', error);
    }
  };

  deleteObject = async (folder: SpacesFolderEnum, fileName: string) => {
    try {
      const deleteParams = {
        Bucket: `${process.env.SPACES_NAME}`,
        Key: `${folder}/${fileName}`,
      };
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error('Error', error);
    }
  };
}

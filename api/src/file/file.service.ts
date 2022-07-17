import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SpacesFolderEnum } from '@enums';

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
  uploadObject = async (file: any, folder: SpacesFolderEnum) => {
    try {
      const params = {
        Bucket: `${process.env.SPACES_NAME}/${folder}`,
        Key: file.name,
        Body: file.content,
        ACL: 'public', // Defines ACL permissions, such as private or public.
      };
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log(
        'Successfully uploaded object: ' + params.Bucket + '/' + params.Key,
      );
      console.log("Data after upload: ", data);
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  };
}

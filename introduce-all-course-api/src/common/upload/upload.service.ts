import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";

@Injectable()
export class ImageUploadService {
  private readonly s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });

  async generateUploadURL(tag: string): Promise<string> {
    const key = `${tag}/${uuid()}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      ContentType: "image/jpeg",
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return url;
  }
}

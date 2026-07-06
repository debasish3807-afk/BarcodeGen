// ======================
// Storage - Multi-provider Support
// ======================

export type StorageProvider = "s3" | "cloudinary" | "backblaze" | "local";

export interface UploadResult {
  url: string;
  key: string;
  size: number;
  provider: StorageProvider;
}

function getProvider(): StorageProvider {
  return (process.env.STORAGE_PROVIDER as StorageProvider) || "local";
}

export async function uploadFile(file: Buffer, filename: string, contentType: string): Promise<UploadResult> {
  const provider = getProvider();
  switch (provider) {
    case "s3": return uploadToS3(file, filename, contentType);
    case "cloudinary": return uploadToCloudinary(file, filename);
    case "backblaze": return uploadToBackblaze(file, filename, contentType);
    default: return uploadLocal(file, filename);
  }
}

async function uploadToS3(file: Buffer, filename: string, contentType: string): Promise<UploadResult> {
  // In production: use @aws-sdk/client-s3
  // const client = new S3Client({ region: process.env.AWS_REGION });
  // await client.send(new PutObjectCommand({ Bucket, Key: filename, Body: file, ContentType }));
  void contentType;
  return { url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${filename}`, key: filename, size: file.length, provider: "s3" };
}

async function uploadToCloudinary(file: Buffer, filename: string): Promise<UploadResult> {
  // In production: use cloudinary SDK
  // const result = await cloudinary.uploader.upload_stream({ public_id: filename });
  void file;
  return { url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${filename}`, key: filename, size: 0, provider: "cloudinary" };
}

async function uploadToBackblaze(file: Buffer, filename: string, contentType: string): Promise<UploadResult> {
  // In production: use backblaze-b2 SDK
  void contentType;
  return { url: `https://f000.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${filename}`, key: filename, size: file.length, provider: "backblaze" };
}

async function uploadLocal(file: Buffer, filename: string): Promise<UploadResult> {
  // In production: write to disk
  void file;
  return { url: `/uploads/${filename}`, key: filename, size: file.length, provider: "local" };
}

export async function deleteFile(key: string): Promise<boolean> {
  const provider = getProvider();
  try {
    switch (provider) {
      case "s3":
        // await s3Client.send(new DeleteObjectCommand({ Bucket, Key: key }));
        break;
      case "cloudinary":
        // await cloudinary.uploader.destroy(key);
        break;
      default:
        // fs.unlinkSync(path.join(UPLOAD_DIR, key));
        break;
    }
    void key;
    return true;
  } catch { return false; }
}

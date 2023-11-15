import axios from "axios";

// @ts-ignore
// import MemoryStore from "cache-manager-memory-store";
// import cacheManager from "cache-manager";

// export const memStoreCache = async () =>
//   await cacheManager.caching("memory", {
//     ttl: 36400,
//     // store: sqliteStore,
//     // options: {
//     // serializer: "json", // default is 'cbor'
//     // ttl: 20, // TTL in seconds
//     // }
//   });

export const LanguageConstant = [
  { language: "Roman" },
  { language: "Hindi" },
  { language: "Urdu" },
];
export const cloudinaryConfig = {
  cloudName: "ahlesunnah",
  apiKey: "416834369334421",
  apiSecret: "WxLgEUuKBmFCKbGAr5IkBYSCm00",
};

export async function checkFileExistence(fileName: any) {
  try {
    const response = await axios.head(
      `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/raw/upload/${fileName}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function deleteFile(fileName: string) {
  try {
    const response = await axios.delete(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload/${fileName}`,
      {
        auth: {
          username: cloudinaryConfig.apiKey,
          password: cloudinaryConfig.apiSecret,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(fileName: string, fileContent: string) {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
      fileContent,
      {
        params: {
          public_id: fileName,
          overwrite: true,
          api_key: cloudinaryConfig.apiKey,
          api_secret: cloudinaryConfig.apiSecret,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log({ error });

    throw error;
  }
}

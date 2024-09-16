import { v2 as cloudinary } from "cloudinary";
 
try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
} catch (error) {
    console.error("Cloudinary configuration is missing. Please check your environment variables.");
    throw new Error("Cloudinary configuration is missing.");
    
}
 
export async function POST(request: Request) {
 
  const body = await request.json();
  const { paramsToSign } = body;
 
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);
  
  return Response.json({ signature });
}
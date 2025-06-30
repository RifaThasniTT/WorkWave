import multer from "multer";
import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

const getMulterUpload = (folderName: string, allowedFormats: string[] = ["jpg", "png", "jpeg", "pdf"]) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => ({
            folder: `workwave/${folderName}`,
            public_id: `${file.fieldname}-${Date.now()}`,
            format: path.extname(file.originalname).slice(1)
        })
    });

    const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
        const ext = path.extname(file.originalname).slice(1).toLowerCase();
        if (allowedFormats.includes(ext)) {
            return cb(null, true);
        } else {
            cb(new Error(`Unsupported file type: .${ext}!`), false);
        }
    }

    return multer({storage, fileFilter});
}


export const uploadUserProfile = getMulterUpload("userProfiles", ["jpg", "jpeg", "png"]);
export const uploadUserResume = getMulterUpload("resumes", ["pdf", "docx"]);
export const uploadCompanyProfile = getMulterUpload("companyProfiles", ["jpg", "jpeg", "png"]);
export const uploadCompanyKyc = getMulterUpload("companyKyc", ["pdf", "jpg", "jpeg", "png"]); 
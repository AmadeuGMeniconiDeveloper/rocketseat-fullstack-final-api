import multer from "multer";
import crypto from "crypto";

const upload = multer({
  storage: multer.diskStorage({
    destination: "temp",
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return cb(null, filename);
    },
  }),

  limits: {
    fileSize: 1024 * 1024,
  },
});

export default upload;

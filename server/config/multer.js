import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: 'public/imagens',
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.basename(file.originalname))
  }
})

export const upload = multer({ storage: storage })
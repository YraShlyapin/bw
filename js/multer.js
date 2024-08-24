import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.resolve(), 'image'))
    },
    filename: function (req, file, cb) {
      cb(null, +new Date() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
    }
  })
  
export default multer({ storage: storage })
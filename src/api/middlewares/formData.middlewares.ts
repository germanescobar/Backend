import busboy from 'busboy';
import cloudinary from '../../config/cloudinary/cloudinary.config';
import { Busboy } from 'busboy';
import { Stream } from 'stream';
import { UploadStream } from 'cloudinary';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { OBJ_FORM_DATA } from '../utils/constants.utils';

const formData = (folderName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const bb: Busboy = busboy({ headers: req.headers });
    let uploadingCount: number = 0;
    let uploadingFile: boolean = false;

    const done = (): void => {
      if (uploadingFile) return;
      if (uploadingCount) return;
      next();
    };

    bb.on('field', (key, value) => {
      if (OBJ_FORM_DATA.includes(key)) {
        req.body[key] = JSON.parse(value);
      } else {
        req.body[key] = value;
      }
    });

    bb.on('file', (key: string, stream: Stream) => {
      uploadingFile = true;
      uploadingCount++;
      const cloud: UploadStream = cloudinary.uploader.upload_stream(
        { upload_preset: folderName, folder: 'doctors' },
        (error, response) => {
          if (error) next(ApiError.Internal('Cloudinary Error'));
          req.body[key] = response?.secure_url;
          uploadingFile = false;
          uploadingCount--;
          done();
        }
      );

      stream.on('data', (data) => cloud.write(data));

      stream.on('end', () => cloud.end());
    });

    bb.on('finish', () => done());
    req.pipe(bb);
  };
};

export default formData;

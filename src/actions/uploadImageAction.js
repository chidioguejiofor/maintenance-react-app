import cloudinary from '../services/cloundinaryService';

import types from './index';
import store from '../store';


const uploadImageAction = (payload, status) => ({
  type: `${types.UPLOAD_IMAGE}_${status}`,
  payload,
});

const upload = (imagePath) => {
  store.dispatch(uploadImageAction({}, 'LOADING'));
  cloudinary.uploader.upload(imagePath, (result) => {
    if (!result) {
      return store.dispatch(uploadImageAction(result, 'FAILURE'));
    }
    store.dispatch(uploadImageAction(result, 'SUCCESS'));
  });
};


export default upload;

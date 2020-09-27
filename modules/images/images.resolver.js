import uploadService from './images.service';

const imagesQuery = {
    uploadImage: (_, args) => uploadService.uploadImage(args.image),
    deleteImage: (_, args) => uploadService.deleteImage(args.image),
};

const imagesMutation = {
};

export {imagesQuery, imagesMutation};

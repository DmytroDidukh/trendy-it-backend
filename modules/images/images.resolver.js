import uploadService from './images.service';

const imagesQuery = {
    uploadImage: (_, args) => uploadService.uploadImage(args.image),
    deleteImages: (_, args) => uploadService.deleteImages(args.images),
};

const imagesMutation = {
};

export {imagesQuery, imagesMutation};

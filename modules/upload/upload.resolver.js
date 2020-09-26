import uploadService from './upload.service';

const uploadQuery = {
    uploadFiles: (_, args) => uploadService.uploadFiles(args.files),
    deleteFiles: (_, args) => uploadService.deleteFiles(args.files),
};

const uploadMutation = {
};

export {uploadQuery, uploadMutation};

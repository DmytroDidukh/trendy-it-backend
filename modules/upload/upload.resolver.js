import uploadService from './upload.service';

const uploadQuery = {
    uploadFile: (_, args) => uploadService.uploadFile(args.file),
    deleteFile: (_, args) => uploadService.deleteFile(args.file),
};

const uploadMutation = {
};

export {uploadQuery, uploadMutation};

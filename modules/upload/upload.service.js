import cloudinary from '../../utils/cloudinary';


class UploadService {
    async uploadFile(file) {
        return await cloudinary.v2.uploader.upload(
            file, {
                folder: "trendy-it"
            })
    }

    async deleteFile(file) {
        const deleteResponse = await cloudinary.v2.api.delete_resources(file)
        return Object.values(deleteResponse.deleted)[0]
    }
}

export default new UploadService();

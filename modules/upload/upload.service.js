import cloudinary from '../../utils/cloudinary';


class UploadService {
    async uploadFile(file) {
        try {
            return await cloudinary.v2.uploader.upload(
                file, {
                    folder: "trendy-it"
                })

        } catch (e) {
            console.log(e)
        }

    }

    async deleteFile(file) {
        try {
            const deleteResponse = await cloudinary.v2.api.delete_resources(file)
            return Object.values(deleteResponse.deleted)[0]

        } catch (e) {
            console.log(e)
        }

    }
}

export default new UploadService();

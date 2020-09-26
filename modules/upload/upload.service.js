import cloudinary from '../../utils/cloudinary';


class UploadService {
    async uploadFiles(files) {

        try {
            const uploadResponse = files.map(async file => (
                await cloudinary.v2.uploader.upload(
                    file, {
                        folder: "trendy-it"
                    })
            ))

            const uploadResult = await Promise.allSettled(uploadResponse)

            return uploadResult.map(res => ({
                asset_id: res.value.asset_id,
                public_id: res.value.public_id,
                url: res.value.url,
            }))

        } catch (e) {
            console.error(e)
        }

    }

    async deleteFiles(files) {
        try {
            const deleteResponse = await cloudinary.v2.api.delete_resources(files)
            return Object.values(deleteResponse.deleted)

        } catch (e) {
            console.error(e)
        }

    }
}

export default new UploadService();

import cloudinary from '../../utils/cloudinary';


class ImagesService {
    async uploadImage(image) {
        const uploadResult = await cloudinary.v2.uploader.upload(
            image, {
                folder: "trendy-it"
            })

        return {
            assetId: uploadResult.asset_id,
            publicId: uploadResult.public_id,
            url: uploadResult.url,
        }
    }

    async deleteImages(images) {
        const deleteResult = await cloudinary.v2.api.delete_resources(images)
        return Object.values(deleteResult.deleted)
    }
}

export default new ImagesService();

import cloudinary from '../../utils/cloudinary';


class ImagesService {
    async uploadImage(image) {
        return await cloudinary.v2.uploader.upload(
            image, {
                folder: "trendy-it"
            })
    }

    async deleteImage(image) {
        const deleteResponse = await cloudinary.v2.api.delete_resources(image)
        return Object.values(deleteResponse.deleted)[0]
    }
}

export default new ImagesService();

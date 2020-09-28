import {Banner} from '../../models';
import ImagesService from '../images/images.service'

class BannerService {
    getBanners() {
        return Banner.find();
    }

    getBannerByUsability() {
        return Banner.find({toSlider: true});
    }

    getBannerById(id) {
        return Banner.findById(id);
    }

    addBanner(data) {
        const banner = new Banner(data);
        return banner.save();
    }

    updateBanner({id, banner}) {
        return Banner.findByIdAndUpdate(
            id,
            {$set: {...banner}},
            {new: true}
        );
    }

    async deleteBanner(id) {
        const currentBanner = await this.getBannerById(id)
        const {image} = currentBanner

        if (image) {
            await ImagesService.deleteImages([image.publicId])
        }

        return Banner.findByIdAndRemove(id)
    }
}

export default new BannerService();

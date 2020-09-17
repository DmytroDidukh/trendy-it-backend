import {Banner} from '../../models';

class BannerService {
    getBanners() {
        return Banner.find();
    }

    getBannerByUsability() {
        return Banner.find({toSlider: true});
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

    deleteBanner(id) {
        return Banner.findByIdAndRemove(id)
    }
}

export default new BannerService();

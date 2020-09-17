import {Subcategory, Product} from '../../models';

class SubcategoryService {
    getSubcategories() {
        return Subcategory.find();
    }

    getSubcategoryById(id) {
        return Subcategory.findById(id);
    }

    getSubcategoriesByCategoryId(id) {
        return Subcategory.find({categoryId: id})
    }

    addSubcategory(data) {
        const subcategory = new Subcategory(data);
        return subcategory.save();
    }

    updateSubcategory({id, subcategory: {name, categoryId}}) {
        return Subcategory.findByIdAndUpdate(
            id,
            {$set: {name, categoryId}},
            {new: true}
        );
    }

    deleteSubcategory(id) {
        return Promise.all([
            Product.deleteMany({subcategoryId: id}),
            Subcategory.findByIdAndRemove(id)
        ])
    }
}

export default new SubcategoryService();

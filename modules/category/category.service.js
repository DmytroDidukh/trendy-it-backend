import {Category, Subcategory, Product} from "../../models";

class CategoryService {
    getCategories() {
        return Category.find();
    }

    getCategoryById(id) {
        return Category.findById(id);
    }

    addCategory(data) {
        const category = new Category(data);
        return category.save();
    }

    updateCategory({id, category: {name, image}}) {
        return Category.findByIdAndUpdate(
            id,
            {$set: {name, image}},
            {new: true}
        );
    }

    deleteCategory(id) {
        return Promise.all([
            Product.deleteMany({categoryId: id}),
            Subcategory.deleteMany({categoryId: id}),
            Category.findByIdAndRemove(id)
        ])
    }
}

export default new CategoryService();

import subcategoryService from './subcategory.service';

const subcategoryQuery = {
    getSubcategories: () => subcategoryService.getSubcategories(),
    getSubcategoryById: (parent, args) => subcategoryService.getSubcategoryById(args.id),
};

const subcategoryMutation = {
    addSubcategory: (parent, args) => subcategoryService.addSubcategory(args.subcategory),
    updateSubcategory: (parent, args) => subcategoryService.updateSubcategory(args),
    deleteSubcategory: (parent, args) => subcategoryService.deleteSubcategory(args.id),
};

export {subcategoryQuery, subcategoryMutation};

const Category = require("../models/category");

const createCateService = async (name) => {
    try {
        let result = await Category.create({
            name: name,
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}


const getCategoryService = async () => {
    try {
        let result = await Category.find({});
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createCateService, getCategoryService
}

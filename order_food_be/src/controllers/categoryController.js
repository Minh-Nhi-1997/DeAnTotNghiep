const { createCateService, getCategoryService} = require('../services/categoryService');


const createCategory = async (req, res) => {
    const {name} = req.body;
    const data = await createCateService(name)
    return res.status(200).json(data)
}
const listCategory = async (req, res) => {
    const data = await getCategoryService();
    return res.status(200).json(data)
}
module.exports = {
    createCategory, listCategory
}
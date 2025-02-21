const mongoose = require('mongoose');
const { createItemService, getItemService } = require('../services/itemService');
const updateItemService = require('../services/editItemService');
const { deleteItemService } = require('../services/deleteItemService');

const createItem = async (req, res) => {
    const { name, price, img, c_id } = req.body;
    const data = await createItemService(name, price, img, c_id)
    return res.status(200).json(data)
}
const listItem = async (req, res) => {
    const { c_id } = req.body;
    const data = await getItemService(c_id);
    return res.status(200).json(data)
}


const editItem = async (req, res) => {
    const { itemId, name, price, img, c_id } = req.body;
    // Kiểm tra xem itemId có hợp lệ không
    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: "Item ID is required and must be valid." });
    }
    try {
        // Gọi service để cập nhật item
        const updatedItem = await updateItemService(itemId, name, price, img, c_id);
        return res.status(200).json({
            message: "Item updated successfully",
            updatedItem,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating the item",
            error: error.message,
        });
    }
};

// controllers/itemController.js
 // Import service

const deleteItem = async (req, res) => {
    const { itemId } = req.body; // Lấy itemId từ body request

    if (!itemId) {
        return res.status(400).json({ message: "Item ID is required" });
    }

    try {
        // Gọi service để xoá sản phẩm
        const deletedItem = await deleteItemService(itemId);

        // Trả về phản hồi thành công
        return res.status(200).json({
            message: "Item deleted successfully",
            item: deletedItem,
        });
    } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({
            message: "An error occurred while deleting the item",
            error: error.message,
        });
    }
};





module.exports = {
    createItem, listItem, editItem,deleteItem
}
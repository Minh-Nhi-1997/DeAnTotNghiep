// services/itemService.js
const mongoose = require('mongoose');
const Item = require('../models/item'); // Đảm bảo rằng bạn đã có model Item

// Hàm xoá sản phẩm
const deleteItemService = async (itemId) => {
    try {
        // Kiểm tra xem itemId có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            throw new Error('Invalid item ID');
        }

        // Tìm và xoá item theo itemId
        const item = await Item.findByIdAndDelete(itemId);

        // Nếu không tìm thấy sản phẩm, ném lỗi
        if (!item) {
            throw new Error('Item not found');
        }

        return item; // Trả về sản phẩm đã xoá
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { deleteItemService };

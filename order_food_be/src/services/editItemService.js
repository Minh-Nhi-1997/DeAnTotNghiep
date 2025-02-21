const Item = require('../models/item'); // Đảm bảo rằng bạn đã có model Item

const updateItemService = async (id, name, price, img, c_id) => {
    try {
        // Tìm kiếm item bằng id
        const item = await Item.findById(id);

        if (!item) {
            throw new Error('Item not found');
        }

        // Cập nhật các trường thông tin của item
        item.name = name || item.name; // Nếu name không được truyền, giữ nguyên tên hiện tại
        item.price = price || item.price;
        item.img = img || item.img;
        item.c_id = c_id || item.c_id;

        // Lưu lại item sau khi cập nhật
        const updatedItem = await item.save();

        return updatedItem;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

module.exports = updateItemService;

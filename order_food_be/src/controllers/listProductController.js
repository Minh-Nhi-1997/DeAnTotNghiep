const Product = require('../models/item'); // Giả sử bạn có model Product

const listProduct = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ tham số đường dẫn
        const product = await Product.findById(id); // Tìm sản phẩm theo ID

        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Trả về lỗi nếu không tìm thấy sản phẩm
        }

        res.status(200).json(product); // Trả về thông tin sản phẩm
    } catch (error) {
        console.error(error); // Ghi log lỗi ra console
        res.status(500).json({ message: 'Server error', error: error.message }); // Trả về lỗi server nếu xảy ra lỗi
    }
};

module.exports = { listProduct };

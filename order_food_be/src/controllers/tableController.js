const { 
    getTableService, 
    createTableService, 
    editTableService,  // Thêm service chỉnh sửa
    deleteTableService // Thêm service xóa
} = require('../services/tableService');

const listTable = async (req, res) => {
    const data = await getTableService();
    return res.status(200).json(data);
};

const createTable = async (req, res) => {
    const { table_name, capacity, notes } = req.body;
    const data = await createTableService(table_name, capacity, notes);
    return res.status(200).json(data);
};

// ✅ Cập nhật thông tin bàn
const editTable = async (req, res) => {
    try {
        const { id } = req.params;
        const { table_name, capacity, notes } = req.body;

        const updatedTable = await editTableService(id, table_name, capacity, notes);
        if (!updatedTable) {
            return res.status(404).json({ message: "Không tìm thấy bàn!" });
        }

        return res.status(200).json({ message: "Cập nhật bàn thành công!", table: updatedTable });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server!", error });
    }
};

// ✅ Xóa bàn
const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTable = await deleteTableService(id);
        if (!deletedTable) {
            return res.status(404).json({ message: "Không tìm thấy bàn!" });
        }

        return res.status(200).json({ message: "Xóa bàn thành công!" });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server!", error });
    }
};

module.exports = { listTable, createTable, editTable, deleteTable };

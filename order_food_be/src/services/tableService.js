const Table = require("../models/table");

// ✅ Lấy danh sách bàn
const getTableService = async () => {
    try {
        let result = await Table.find({});
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// ✅ Tạo bàn mới
const createTableService = async (table_name, capacity, notes) => {
    try {
        let result = await Table.create({
            table_name: table_name,
            capacity: capacity,
            notes: notes
        });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// ✅ Chỉnh sửa bàn
const editTableService = async (id, table_name, capacity, notes) => {
    try {
        let updatedTable = await Table.findByIdAndUpdate(
            id,
            { table_name, capacity, notes },
            { new: true }
        );
        return updatedTable;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// ✅ Xóa bàn
const deleteTableService = async (id) => {
    try {
        let deletedTable = await Table.findByIdAndDelete(id);
        return deletedTable;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    getTableService,
    createTableService,
    editTableService, // Thêm sửa bàn
    deleteTableService // Thêm xóa bàn
};

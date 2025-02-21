const Item = require("../models/item");

const createItemService = async (name, price, img, c_id) => {
    try {
        let result = await Item.create({
            name: name,
            price: price,
            img: img,
            c_id: c_id
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}


const getItemService = async (c_id) => {
    try {
        let result = await Item.find({c_id});
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createItemService,getItemService
}

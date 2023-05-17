const mongoose = require('mongoose')

const { Schema } = mongoose;


const accountSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    power: {
        type: Array,
        default: [
            {
                level: 0,
                name: 'Người dùng'
            }]
    }
    // 
    // nguời dùng => quyền 0
    // thêm sửa xoá account => quyền 1
    // thêm sửa xoá contact => quyền 2
    // thêm sửa xoá detailnews => quyền 3
    // thêm sửa xoá detailtour => quyền 4
    // thêm sửa xoá infouser => quyền 5
    // thêm sửa xoá introduce => quyền 6
    // thêm sửa xoá news => quyền 7
    // thêm sửa xoá tour => quyền 8
    // thêm sửa xoá tour user => quyền 9
    // tất cả các quyền => quyền 10
    ,
    refreshToken: []
},
    { timestamps: true },
    {
        collection: 'account'
    });

const ModelAccount = mongoose.model('account', accountSchema);

module.exports = ModelAccount


// username: 'ngonhatduy'
// password: '01214266994vN'
// power: [
//     {
//         level: 1,
//         name: 'thêm sửa xoá account'
//     },
//     {
//         level: 4,
//         name: 'thêm sửa xoá detailtour'
//     }
// ]
// infoUser: {
//     name: 'Ngô Nhật Duy'
//     age: 18
//     email: 'duynbabylon@gmail.com'
//     phone: 01214266
//     address: 'Ấp Hoà Lộc 2, Xã Xuân Hoà, Huyện Kế Sách, Tỉnh Sóc Trăng'
// }
// tourUser: [
//     {
//         _id: '64304a9d67b4ed1c71f225c0',
//         name: "Tour du lịch Đà Lạt Nha Trang 5 ngày 4 đêm từ Hà Nội | Cao nguyên đại ngàn & Biển xanh vẫy gọi",
//         code: "TOHANDALNHT5N4D-TTMBHE-239864",
//         price: 8990000,
//         timeStart: '2023-04-09T16:53:49.544+00:00',
//         timeEnd: '2023-04-09T16:53:49.544+00:00',
//         pay: {
//             method: "thanh toán bằng tiền mặt", // thanh toán bằng tiền mặt, bằng chuyển khoản ngân hàng
//             status: "đã thanh toán", // đã thanh toán, chưa thanh toán, trả trước 20%
//         }
//     }
// ]
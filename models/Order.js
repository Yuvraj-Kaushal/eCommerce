const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: {type: String, required:true},
    orderId: {type: String, required:true},
    paymentInfo: {type: String, default:''},
    products: {type: Object, required: true },
    address: {type: String, require: true},
    amount: {type: Number, require: true},
    status: {type: String, default: 'Initiated', required:true},
    deliveryStatus: {type: String, default: 'unshipped', required:true},

  }, {timestamps: true});

//   mongoose.models = {}
  export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
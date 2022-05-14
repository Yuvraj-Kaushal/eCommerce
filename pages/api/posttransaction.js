// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order"
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose"

const handler = async (req, res)=> {
  let order;
    //Validate paytm checksum

    //Update status into orders table after checking the transaction status
    if(req.body.STATUS == 'TXN_SUCCESS' ){
      order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status: 'Paid', paymentInfo: JSON.stringify(req.body)})
      let products = order.products
      for(let slug in products){
      await Product.findOneAndUpdate({slug: slug}, {$inc:{"availableQty": - products[slug].qty}})
      }
    }
    else if(req.body.STATUS == 'PENDING'){
      order = await Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status: 'Pending', paymentInfo: JSON.stringify(req.body)})
    }
 

    //Initiate shipping

    //Redirect user to the order confirmation page
    res.redirect('/order?clearCart=1&id=' + order._id, 200)
    // res.status(200).json({ body: req.body })
  }

export default connectDb(handler);

  
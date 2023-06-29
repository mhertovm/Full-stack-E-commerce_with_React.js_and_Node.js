const { Buys, Products } = require("../../models");

function addCart(req, res){
    const {cart_id, product_id, quantity, size, color} = req.body

    Buys.create({cart_id, product_id, quantity, size, color}).then(()=>{
        res.json({status: "product added"})
    }).catch((err)=>{
        console.log(err);
        res.json({status:'failed to add'})
    })
};

function deleteCart(req, res){
    const {buy_id} = req.body
    Buys.destroy({
        where:{
            buy_id
        }
    }).then(()=>{
        res.json('deleted')
    }).catch((err)=>{
        console.log(err)
        res.json('failed to delete')
    }) 
};

function userBuys(req, res){
    const cart_id = req.params.cart_id
    Buys.findAll({
        where:{
            cart_id: cart_id
        },
        include: Products
    }).then((buy)=>{
        res.json(buy)
    }).catch((err)=>{
        console.log(err)
        res.json({status:"buy is not found"})
    })
};

function deleteShCart(req,res){
    const {id} = req.body;
    Buys.destroy({where:{id}}).then(()=>{
        res.json({status:"product deleted"})
    }).catch((err)=>{
        console.log(err);
        res.json({status:"failed to delete product"})
    }) 
};

module.exports = {addCart, deleteCart, userBuys, deleteShCart}

const { Products, Categories, Navbars, Carts } = require("../../models");
const fs = require('fs')

function addNavbar(req, res){
    const name = req.body.name

    Navbars.create({name}).then((navbar)=>{
        res.json({status:"navbar added", navbar})
    }).catch((err)=>{
        console.log(err);
        res.json({status:"failed to add navbar"})
    })
};

function addCategory(req, res){
    const {name, navbar_id} = req.body

    Categories.create({name, navbar_id}).then((category)=>{
        res.json({status:"category added"})
    }).catch((err)=>{
        console.log(err);
        res.json({status:"failed to add category"})
    })
};

function addProduct(req, res){
    const {category_id, name, description, price, discount, img} = req.body
    const newProduct = {
        category_id,
        name,
        description,
        price,
        discount,
        img
    }

    Products.create(newProduct).then(()=>{
        res.json({status:"product added"})
    }).catch((err)=>{
        console.log(err);
        res.json({status:"failed to add product"})
    })
};

function upload(req, res){
    if(req.file){
        res.json(req.file)
    }else{
        res.json('failed to add image')
    }
};

function deleteProduct(req,res){
    const {id} = req.body;
    Products.destroy({where:{id}}).then(()=>{
        res.json({status:"product deleted"})
    }).catch((err)=>{
        console.log(err);
        res.json({status:"failed to delete product"})
    }) 
};

function deleteCategory(req,res){
    const {id} = req.body;
    Categories.destroy({where:{id}}).then(()=>{
        res.json({status:"category deleted"})
    }).catch((err)=>{
        console.log(err);
        res.json({status:"failed to delete category"})
    }) 
};

function deleteNavbar(req,res){
    const {id} = req.body;
    Navbars.destroy({where:{id}}).then(()=>{
        res.json({status:"navbar deleted"})
    }).catch((err)=>{
        console.log(err);
        res.json({status:"failed to delete navbar"})
    }) 
};

function updateProduct(req, res){
    const praduct_id = req.params.product_id;
    const {category_id, name, description, price, discount, img} = req.body
    Products.update({category_id, name, description, price, discount, img},{where:{id: praduct_id}}).then(()=>{
        res.json({status:'product updated'})
    }).catch((err)=>{
        console.log(err)
        res.json({status:"failed to update product"})
    })
};

function updateCategory(req, res){
    const category_id = req.params.category_id;
    const {name, navbar_id} = req.body
    Categories.update({name, navbar_id},{where:{id: category_id}}).then(()=>{
        res.json({status:'category updated'})
    }).catch((err)=>{
        console.log(err)
        res.json({status:"failed to update category"})
    })
};

function updateNavbar(req, res){
    const navbar_id = req.params.navbar_id;
    const {name} = req.body
    Navbars.update({name},{where:{id: navbar_id}}).then(()=>{
        res.json({status:'navbar updated'})
    }).catch((err)=>{
        console.log(err)
        res.json({status:"failed to update navbar"})
    })
};

function imagesdelete(req, res){
    const image_name = req.body.image_name

    fs.unlinkSync(`./server/images/${image_name}`, function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.json({status: "img deleted"});
        }
    });
};

function userTable(req, res){

    Users.findAll({include: Carts}).then((user)=> {
        res.json(user)
    }).catch((err)=> {
        console.log(err)
        res.json("user is not found")
    })
};

module.exports = { addCategory, addProduct, upload, addNavbar, deleteProduct, deleteCategory, deleteNavbar, updateProduct, updateCategory, updateNavbar, imagesdelete, userTable}

const {Users, Carts, Products, Categories, Navbars } = require("../../models");

const bcrypt = require('bcrypt');
const { generateAccessToken } = require("../generateAccessToken/generateAccessToken")
const {sendmail} = require('../verify/sendmail')
const jwt = require('jsonwebtoken');
const SECRET = process.env.T_SECRET;
const fs = require('fs')


function allProducts(req, res){

    Products.findAll({include: Categories}).then((products)=> {
        res.json(products)
    }).catch((err)=> {
        console.log(err)
        res.json("products is not found")
    })
};

function allCategories(req, res){
    Categories.findAll({include: Navbars}).then((categories)=> {
        res.json(categories)
    }).catch((err)=> {
        console.log(err)
        res.json("categories is not found")
    })
};

function allNavbars(req, res){
    Navbars.findAll().then((navbars)=>{
        res.json(navbars)
    }).catch((err)=>{
        console.log(err)
        res.json("navbars is not found")
    })
};

function product(req, res){
    const product_id = req.params.product_id;

    Products.findOne({
        where: {
            id :product_id
          },
          include: Categories
    }).then((product)=> {
        res.json(product)
    }).catch((err)=> {
        console.log(err)
        res.json("product is not found")
    })
};

function navbars(req, res){
    Navbars.findAll({
        include: Categories
    }).then((navbars)=>{
        res.json(navbars)
    }).catch((err)=>{
        console.log(err);
        res.json("navbars is not found")
    })
};

function navbarId(req, res){
    const navbar_id = req.params.navbar_id
    Navbars.findOne({
        where: {
            id: navbar_id
        }
    }).then((navbar)=>{
        res.json(navbar)
    }).catch((err)=>{
        console.log(err);
        res.json("navbar is not found")
    })
}

function categoryId(req, res){
    const category_id = req.params.category_id

    Categories.findOne({
        where: {
            id: category_id
        },
        include: Navbars
    }).then((category)=>{
        res.json(category)
    }).catch((err)=>{
        console.log(err);
        res.json("category is not found")
    })
};

function categories(req, res){
    const category = req.params.category

    Categories.findOne({
        where: {
            name: category
        },
        include: Products
    }).then((category)=>{
        res.json(category.Products)
    }).catch((err)=>{
        console.log(err);
        res.json("category is not found")
    })
};

function images(req, res){
    const image_name = req.params.name
    fs.readFile(`./server/images/${image_name}`, function (err, data) {
        if (err) {
            return res.send(err);
        } else {
            res.send(data);
        }
    });
};

function verify(req, res){
    const token = req.params.token
    jwt.verify(token, SECRET, (err) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            const decoded = jwt.decode(token)
            const email = decoded.email
            Users.update({role:"verified_user"},{where:{email}}).then(()=>{
                res.json('verified user')
            }).catch((err)=>{
                console.log(err)
                res.json("failed to verify")
            })
        }
    })
};

async function register(req, res){
    const {name,surname,email,password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
  

    Carts.create({discount:0}).then(async (cart)=>{
        const newUser = {
            name,
            surname,
            email,
            password: hashed_password,
            role: "admin",
            cart_id: cart.id
        };
        await Users.create(newUser).then((user)=>{
            token = generateAccessToken(user.email),
            sendmail(user.email, token)
            res.json({registered:"ok", message:"We have sent an email to your email for verification"})
        }).catch((err)=>{
            console.log(err)
            res.json("failed to register")
        })
    }).catch((err)=>{
        console.log(err)
        res.json("failed to register")
    })
};

async function login (req, res){
    const { email, password } = req.body;
    console.log(email, password)
    await Users.findOne({
        where: {
          email
        },
    }).then(async (user)=> {
        const validPassword = await bcrypt.compare(password, user.password);
        if (email === user.email && validPassword){
            if("verified_user" === user.role || "admin" === user.role){
                const token = generateAccessToken(user.email);
                res.json({
                    status: "Login", 
                    jwt:token, 
                    user_id:user.id, 
                    user:user.name, 
                    surname:user.surname, 
                    email:user.email, 
                    cart_id:user.cart_id,
                    role:user.role
                });
            } else if ("user" === user.role){
                res.json({role:user.role})
            }
        } else {
            return res.json("Invalid password");
        }
    }).catch((err)=> {
        console.log(err)
        res.json("user is not found")
    })
};

module.exports = {allProducts, product, categories, register, login, verify, images, navbars, allCategories, allNavbars, categoryId, navbarId}
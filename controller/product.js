import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';

export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "add khong thanh cong"
            })
        }
        const { title, description} = fields;
        if (!title|| ! description) {
            return res.status(400).json({
                error: "ban can nhap du thong tin"
            })
        }
        let product = new Product(fields);
        if (files.image) {
            if (files.image.size > 100000) {
                return res.status(400).json({
                    error: " Upload anh 1MB"
                })
            }
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contenType = files.image.type;

        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "khong them duoc san pham "
                })
            }
            res.json(data);
        });
    });
}

///////////////////////
export const productById = (req, res, next, id) => {

    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return  res.status(400).json({
                error: "khong tim thay san pham  "
            })
        }
      req.product = product;
      next();
        console.log(product);
    })
}
////////////////////////////////////////////////////////////////
export const read = (req, res) => {
     return res.json(req.product);
 
}
//////////////
export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            error: "khong tim thay san pham";
        }
        res.json(data )
    })
}
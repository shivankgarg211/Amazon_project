import express from 'express';
import dotenv from 'dotenv';
import connection from './config.js';
import Joi from 'joi';
import cors from 'cors'
import multers3 from 'multer-s3'
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';

dotenv.config()
let port = process.env.SERVER_PORT;
let app = express()
app.use(express.json())
app.use(cors());

// bucket code

const buketName = "shivank"

const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId:"",
        secretAccessKey: ""

    }
})
//   storage configuration

let storage = multers3({
    s3: s3,
    bucket: buketName,
    acl:'public-read',
    metadata:(req, file, cd) =>{
        cd(null,{fieldname: file.fieldname})
    },
    contentType: multers3.AUTO_CONTENT_TYPE,
    key: (req,file,cd) =>{
        cd (null, file.originalname)
    }
})

let upload = multer({storage:storage})

// post api (category)

app.post('/api/category',  (req, res) => {
    let data = req.body;
    let sqlQuery = "INSERT INTO category SET ?"
    const schema = Joi.object({
        c_id: Joi.string().min(2).max(10).required(),
        c_name: Joi.string().min(3).max(20).required()
    })
    let result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    connection.query(sqlQuery, [data], (err, result) => {
        if (err)
            throw err
        else
            res.send(result);

    })
})

//  get api(category)

app.get('/api/category', (req, res) => {
    let id = req.params.id
    let sqlQuery = "SELECT * FROM category "

    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
        } else {
            res.send(result)
        }

    })
})

// Delete api (category)

app.delete('/api/category/:id', (req, res) => {
    let id = req.params.id;
    let sqlQuery = `DELETE FROM category WHERE c_id = '${id}'`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
});

// Put api (category)

app.put('/api/category/:c_id', (req, res) => {
    let id = req.params.c_id
    let data = req.body
    let sqlQuery = 'UPDATE category SET ? WHERE c_id = ?';
    const schema = Joi.object({
        c_id: Joi.string().min(2).max(5).required(),
        c_name: Joi.string().min(3).max(20).required()
    })
    let result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    connection.query(sqlQuery, [data, id], (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
});


// post api (product)

// app.post('/api/product', (req, res) => {
//     let data = req.body
//     let sqlQuery = "INSERT INTO product SET ?"
//     const schema = Joi.object({
//         p_id: Joi.string().min(2).max(10).required(),
//         p_name: Joi.string().min(3).max(20).required(),
//         p_price: Joi.number().positive().required(),
//         p_image: Joi.string().min(0).max(255).required(),
//         c_id: Joi.string().min(2).max(10).required(),
//     })
//     let result = schema.validate(req.body)
//     if (result.error) {
//         res.status(400).send(result.error.details[0].message)
//         return;
//     }
//     connection.query(sqlQuery, [data], (err, result) => {
//         if (err) {
//             res.send(err.sqlMessage);
//         } else {
//             res.send(result);
//         }
//     });

// });

app.post('/api/product', upload.single('image'), (req, res) => {
    let data = req.body
    let sqlQuery = "INSERT INTO product SET ?"
    const schema = Joi.object({
        p_id: Joi.string().min(2).max(10).required(),
        p_name: Joi.string().min(3).max(20).required(),
        p_price: Joi.number().positive().required(),
        p_image: Joi.string().min(0).max(255).required(),
        c_id: Joi.string().min(2).max(10).required(),
    })
    let result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    connection.query(sqlQuery, [data], (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });

});


// Delete api(product)

app.delete('/api/product/:id', (req, res) => {
    let id = req.params.id;
    let sqlQuery = `DELETE FROM product WHERE p_id = '${id}'`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
});
// get api (product)

app.get('/api/product', (req, res) => {
    let id = req.params.id
    let sqlQuery = "SELECT * FROM product "

    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
        } else {
            res.send(result)
        }

    });
});

// Put api (product)

app.put('/api/product/:p_id', (req, res) => {
    let id = req.params.p_id
    let data = req.body
    let sqlQuery = 'UPDATE product SET ? WHERE p_id = ?';
    const schema = Joi.object({
        p_name: Joi.string().min(3).max(20).required(),
        p_price: Joi.number().positive().required(),
        p_image: Joi.string().min(0).max(255).required(),
        c_id: Joi.string().min(2).max(10).required()
    })
    let result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    connection.query(sqlQuery, [data, id], (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
});


// [api serch by id]
app.get('/product/query', (req, res) => {
    let p_id = req.query.p_id;
    let sqlQuery = "SELECT * FROM product WHERE p_id=?";
    connection.query(sqlQuery, [p_id], (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
        } else {
            res.send(result)
        }
    });
});






app.listen(port, () => {
    console.log("connection established...")
})
express = require('express');
const router = express.Router();
const connection = require('../db');

router.route('/')
    .get((req, res) => {
        const query = 'SELECT * FROM TBL_PERSON'
        connection.query(query, (err, results) => {
            if(err){
                res.status(500).send('personGetErr: ', err);
                return;
            }
            res.json({success: true, list: results});
        })
    })
    .post((req, res) => {
        const query = 'INSERT INTO TBL_PERSON(NAME, GENDER, PHONE, ADDR) VALUES(?, ?, ?, ?)'
        const {name, gender, phone, addr} = req.body;
        connection.query(query,[name, gender, phone, addr], (err, results) => {
            if(err){
                res.status(500).send('personPostErr: ', err);
                return;
            }
            res.json({success: true});
        })
    })

router.route('/:id')
    .delete((req, res) => {
        const query = `DELETE FROM TBL_PERSON WHERE ID = ${req.params.id}`
        connection.query(query, (err, results) => {
            if(err){
                res.status(500).send('personDeleteErr: ', err);
                return;
            }
            res.json({success: true});
        })
    })
    .put((req, res) => {
        const query = `UPDATE TBL_PERSON SET GENDER = ? WHERE ID = ${req.params.id}`
        let {gender} = req.body;
        gender = (gender === 'F')?'M':'F'
        connection.query(query,[gender], (err, results) => {
            if(err){
                res.status(500).send('personPutErr: ', err);
                return;
            }
            res.json({success: true});
        })
    })


module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET games route');
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM game WHERE person_id = $1`;
        pool.query(queryText, [req.user.id])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on games GET: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }

});

router.post('/', (req, res) => {
    console.log('POST route:', req.body);
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO game (title, favorite, description, genre_id, image_url, person_id)
                VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(queryText, [req.body.title, false, req.body.description, req.body.genre_id, req.body.image_url, req.user.id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('error on POST: ', error)
            })
    } else {
        res.sendStatus(403);
    }

});

router.delete('/', (req, res) => {
    console.log('DELETE game route');
    if (req.isAuthenticated() && req.query.person_id == req.user.id) {
        let queryText = `DELETE FROM game WHERE id = $1`;
        pool.query(queryText, [req.query.id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on DELETE: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/', (req, res) => {
    console.log('PUT game route');
    if (req.isAuthenticated() && req.body.person_id == req.user.id) {
        let queryText = `UPDATE game SET favorite=$1 WHERE id=$2`;
        console.log(req.body);
        pool.query(queryText, [req.body.favorite, req.body.id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on PUT: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/complete', (req, res) => {
    console.log('PUT complete route');
    if (req.isAuthenticated() && req.body.person_id == req.user.id) {
        let queryText = `UPDATE game SET complete=$1 WHERE id=$2`;
        console.log(req.body);
        pool.query(queryText, [req.body.complete, req.body.id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on put: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

router.put('/sealed', (req, res) => {
    console.log('PUT sealed route');
    if (req.isAuthenticated() && req.body.person_id == req.user.id) {
        let queryText = `UPDATE game SET sealed=$1 WHERE id=$2`;
        console.log(req.body);
        pool.query(queryText, [req.body.sealed, req.body.id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on put: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

router.get('/search/:id', (req, res) => {
    console.log('GET by search route', req.user.id, req.params.id);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM game WHERE person_id = $1 AND title LIKE '%${req.params.id}%'`;
        pool.query(queryText, [req.user.id])
            .then((result) => {
                console.log(result.rows);
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on games GET: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/genre/:id', (req, res) => {
    console.log('GET genre route', req.user.id, req.params.id);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM game WHERE person_id = $1 AND genre_id = $2`;
        pool.query(queryText, [req.user.id, req.params.id])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on games GET: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/favorites/:id', (req, res) => {
    console.log('GET genre route', req.user.id, req.params.id);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM game WHERE person_id = $1 AND favorite = $2`;
        pool.query(queryText, [req.user.id, req.params.id])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on games GET: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }

});

module.exports = router;
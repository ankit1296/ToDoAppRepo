const express = require("express");
const ToDo = require("../models/ToDo");
const router = express.Router();
const toDo = require('../models/ToDo');


router.post('/', (req, res) => {
    const { taskToDo, completeBefore } = req.body;
    const toDoTask = new ToDo({
        taskToDo,
        completeBefore,
        createdAt: new Date().getTime(),
        isCompleted: false,
        isDeleted: false
    });
    toDoTask.save().then((task) => {
        console.log('task saved.');
        res.json(task);
    }).catch(err => {
        console.log('error while saving task', err);
        res.status(500).send();
    })

});

router.delete('/', (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(500).send({ error: 'Invalid TaskId' });
    } else {
        toDo.findOneAndUpdate({ _id: id }, { isDeleted: true }).then((task) => {
            console.log('task deleted.');
            res.status(200).send();
        }).catch(err => {
            console.log('error while deleting task', err);
            res.status(500).send();
        })
    }

});

router.patch('/', (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(500).send({ error: 'Invalid TaskId' });
    } else {
        toDo.findOneAndUpdate({ _id: id }, { isCompleted: true }).then((task) => {
            console.log('task completed.');
            res.status(200).send();
        }).catch(err => {
            console.log('error while updating task', err);
            res.status(500).send();
        })
    }

});


router.get('/', (req, res) => {
    toDo.find().then((items) => {
        console.log('items found: ', items)
        res.send(items);
    }).catch(err => {
        console.log('error while getting toDoList', err);
        res.status(500).send();
    })
});

module.exports = router;
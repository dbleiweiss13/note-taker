var dbData = require("../db/db.json");
var router = require("express").Router();
var fs = require("fs")


router.get('/notes', function (req, res) {
    res.json(dbData);
});

router.post('/notes', async function (req, res) {
    var newNote = req.body
    const newData = await createNewJson(newNote)

    res.json(newData);
    
});

router.delete('/notes/:id', function (req, res) {
    var id = req.params.id
    const newData = deleteObj(id)
    res.json(newData);
});

module.exports = router;


function createNewJson(data) {

    let id = dbData.length;

    const newObj = {
        id: id,
        title: data.title,
        text: data.text
    }

    dbData.push(newObj)

    fs.writeFileSync('./db/db.json', JSON.stringify(dbData))
 
    return dbData
}

function deleteObj(id) {
    if (dbData.length > 1) {
        if (id == 0) {
            dbData.shift()
        }
        else {
            dbData.splice(id, 1)
        }
        for (let i = id; i < dbData.length; i++) {
            dbData[i].id = i;
        }
    }
    else {
        dbData.length = 0
    }

    console.log(dbData)
    try {
        fs.writeFileSync('./db/db.json', JSON.stringify(dbData))
    }
    catch{ }
    return dbData
}



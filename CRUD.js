const express = require('express');
var app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log('Connected Successfully')
});

const EmployeeSchema = new mongoose.Schema({
    "index": {
      "type": "Number"
    },
    "guid": {
      "type": "String"
    },
    "isActive": {
      "type": "Boolean"
    },
    "balance": {
      "type": "String"
    },
    "picture": {
      "type": "String"
    },
    "age": {
      "type": "Number"
    },
    "eyeColor": {
      "type": "String"
    },
    "name": {
      "type": "String"
    },
    "gender": {
      "type": "String"
    },
    "company": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "phone": {
      "type": "String"
    },
    "address": {
      "type": "String"
    },
    "about": {
      "type": "String"
    },
    "registered": {
      "type": "String"
    },
    "latitude": {
      "type": "Number"
    },
    "longitude": {
      "type": "Number"
    },
    "tags": {
      "type": [
        "String"
      ]
    },
    "friends": {
      "type": [
        "Mixed"
      ]
    },
    "greeting": {
      "type": "String"
    },
    "favoriteFruit": {
      "type": "String"
    }
  });
const Employee = mongoose.model('Student', EmployeeSchema);
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello')
});

app.post('/', (req, res) => {
    insertRecord(req, res);
});

app.post('/update',(req, res) => {
    updateRecord(req, res);
})

function insertRecord(req, res) {
    var employee = new Employee({
        "index": req.body.index,
        "guid": req.body.guid,
        "isActive": req.body.isActive,
        "balance": req.body.balance,
        "picture": req.body.picture,
        "age": req.body.age,
        "eyeColor": req.body.eyeColor,
        "name": req.body.name,
        "gender": req.body.gender,
        "company": req.body.company,
        "email": req.body.email,
        "phone": req.body.phone,
        "address": req.body.address,
        "about": req.body.about,
        "registered": req.body.registered,
        "latitude": req.body.latitude,
        "longitude": req.body.longitude,
        "tags": req.body.tags,
        "friends": req.body.friends,
        "greeting": req.body.greeting,
        "favoriteFruit": req.body.favoriteFruit
      });
    employee.save((err, doc) => {
        if (!err)
            console.log('Error', err);
        else {
            if (err.name == 'ValidationError') {
                // handleValidationError(err, req.body);
                console.log('Inserted Succesfully');
            }
            else
                console.log('Error during record insertion : ' + err);
            console.log('Inserted Succesfully');
        }
        console.log('Inserted Succesfully');
        console.log(doc);
    });
    res.status(200);
    res.send('done');
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, { $set :{ name:req.body.name} }, (err, doc) => {
        if (!err) { console.log('Updated Successfully'); res.status(200); res.send('done')}
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log('Updated Succesfully');
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


app.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            console.log('All The Students', docs);
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

app.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log('Success', doc);
        }
    });
});

app.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            console.log('Deleted the record');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

app.listen(8080, () => {
    console.log('COnnected the server on port 8080');
})

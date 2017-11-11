const Datastore = require('nedb');
const db = new Datastore({ filename: './data/order.db', autoload: true });


function Notice(notice, importance, finishedDate, sessionID)
function Notice(title, notice, importance, finishedDate)
{
    // this.orderedBy = orderedBy;
    this.title = title;
    this.notice = notice;
    this.importance = importance;
    this.finishedDate = finishedDate;
    this.addedDate = JSON.stringify(new Date());
    this.state = "open";
    this.style = "white";   //style als boolean?
    this.sessionID = sessionID;
}


function publicAddNotice(notice, importance, finishedDate, sessionID, callback)
{
    let noticeAdd = new Notice(notice, importance, finishedDate, sessionID);
function publicAddNotice(title, notice, importance, finishedDate, callback)
{
    let noticeAdd = new Notice(title, notice, importance, finishedDate);
    db.insert(noticeAdd, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}




function getAllNotices(callback)
{
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}





function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "Finished"}}, {returnUpdatedDocs:true}, function (err, numDocs, doc) {
        callback(err, doc);
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNotice, delete : publicRemove, get : publicGet, all : publicAll, getAll : getAllNotices};
const notices = require("../services/orderStore.js");


module.exports.node = function (req, res) {
    res.type('text/html');
    res.write("<html>");

    res.write("<body>");
    res.write("<label>" + "Title" + "</label>" +
        "<input name='nodeTitle' type='text'/>" +
        "<label>" + "Beschreibung" + "</label>" +
        "<textarea name='nodeDescription'></textarea>" +
        "<label>" + "Wichtigkeit" + "</label>" +
        "<label>" + "Erledigt bis:" + "</label>" +
        "<input name='date' type='date'/>" +
        "<input name='btnSave' type='submit' value='Speichern'/>" +
        "<input name='btnCancel' type='submit' value='Cancel'/>");
    res.write("</body>");
    res.end("</html>");
};

module.exports.mainMenu = function (req, res) {
    res.type('text/html');
    res.write("<html>");

    res.write("<style>" +
        ".article { height: 100px;}" +
        ".title { margin-right: auto; margin-left: auto;}" +
        ".descriptionArea { width: 60%; height: 100%; margin-left: auto; margin-right: auto;}" +
        ".editButton {margin-right: 10px; width: 10%;}" +
        ".inputDiv {height: 60px; display: flex;}" +
        ".titleDiv {display: flex;}" +
        ".finishedCheckbox { float: left;}" +
        "</style>");

    res.write("<body>");
    //res.write("<input name='btnNewNode' type='submit' value='Create new Note'/>");
    //res.write("<input name='btnSwitch' type='submit' value='Switch Style'>");
    //res.write("<input name='btnFinishDate' type='submit' value='By finish Date'/>");
    //res.write("<input name='btnCreateDate' type='submit' value='By created Date'/>");
    //res.write("<input name='btnImportance' type='submit' value='By Importance'/>");
    //res.write("<input name='btnShowFinished' type='submit' value='Show finished'/>");

    res.write("<form action='/node' method='get'>" +
        "<input type='submit' value='Create new Note'>" +
        "<input type='submit' value='Switch Style'>" +
        "<input type='submit' value='By finish Date'/>" +
        "<input type='submit' value='By created Date'/>" +
        "<input type='submit' value='By Importance'/>" +
        "<input type='submit' value='Show finished'/>" +
        "</form>");


    for(i = 0; i < 5; i++) {
        res.write("<article class='article'>" +
            "<div class='titleDiv'>" +
            "<label name='date'>" + "Date" + "</label>" +
            "<label class='title' name='title'>" + "Titel" + "</label>" +
            "</div>" +
            "<div class='inputDiv'>" +
            "<label>" +
            "<input class='finishedCheckbox' type='checkbox' value='Finished'/>" +
            "Finished" +
            "</label>" +
            "<textarea class='descriptionArea'></textarea>" +
            "<input type='submit' value='Edit' class='editButton'/>" +
            "</div>" +
            "</article>");
    }

    res.write("</body>");
    res.end("</html>");
};




module.exports.showIndex = function(req, res)
{
    //cookieHandler
    if (req.session) {
       // req.session
      //  res.setHeader('Content-Type', 'text/html')
       // res.write('<p>views: ' + req.session.views + '</p>')
       // res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        //res.end()
        res.type('text/html');
        res.write("<html>");
        res.write("< Willkommen! Zu der besten Pizzaria auf der Welt!</p>");
        res.write("<img src='/images/pizza.jpg'>");
        //res.write("<form action='/notice' method='get'><input type='submit' value='Add a Notice'></form>");
        res.write("<form action='/main' method='get'><input type='submit' value='Add a Notice'></form>");
        res.write("" + notices.all);
        res.end("</html>");

    } else {
        //req.session.views = 1
        res.type('text/html');
        res.end("</html>");

        res.end('welcome to the session demo. refresh!')
    }


    //actualCode

};

module.exports.createNotice = function(req, res)
{
    //=:notice/importance=:importance/dateFinished=:dateFinished/
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Was fuer eine Pizze haetten Sie den gerne?</p>");
        res.write("<form action='/notice' method='post'>");
        res.write("<label for='title'>Titel</label>");
        res.write("<input id='title' name='title'>");
        res.write("<label for='notice'>Notitz</label>");
        res.write("<input id='notice' name='notice'>");
        res.write("<label for='importance'>Wichtigkeit</label>");
        res.write("<input id='importance' name='importance'>");
        res.write("<input type='submit' value='OK'>")

            //"<input name='importance'><input type='submit' value='Order a Pizza'><input type='date' name='dateFinished' placeholder=''><input type='submit' value='Order a Pizza'></form>");
};

module.exports.addNotice = function(req, res)
{
     notices.add(req.body.title, req.body.importance, req.body.notice, function(err, notice) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Erfolgreich!</p>");
        res.write("<p>Ihre order: " + notice.notice + "</p>");
        res.write("<p>Ihre Nummer: " + notice._id + " !</p>");
        res.write("<p><a href='/orders/" + notice._id + "/'>Zeige order an</a></p>");
        res.end("</html>");
    });
};

module.exports.showOrder = function(req, res)
{
     store.get(req.params.id, function(err, notice) {
        res.type('text/html');
        res.write("<html>");
        if (notice) {
            res.write("<p>Order-Number: " + notice._id + "</p>");
            res.write("<p>Status: " + notice.state + "</p>");
            if (notice.state === "open") {
                res.write("<form action='/orders/" + notice._id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
            }
        }
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};

module.exports.deleteOrder =  function (req, res)
{
    store.delete(  req.params.id , function(err, order) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Order-Number: " + order._id + "</p>");
        res.write("<p>Status: " + order.state + "</p>");
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};

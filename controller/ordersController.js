const notices = require("../services/orderStore.js");








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
        res.write("<form action='/notice' method='get'><input type='submit' value='Add a Notice'></form>");
        res.write("" + req.session.id);
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
     notices.add(req.body.title, req.body.importance, req.body.notice,  function(err, notice) {
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

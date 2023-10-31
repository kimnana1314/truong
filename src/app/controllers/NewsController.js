class NewsController {
    // Get /news
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.send('Chi tiết');
    }
}

module.exports = new NewsController();




const playGames = async (req, res) => {
   

  

    // res.header('Access-Control-Allow-Origin', '*');
    res.render('games/index.ejs');
}

export {playGames};
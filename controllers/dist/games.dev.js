"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playGames = void 0;

var playGames = function playGames(req, res) {
  return regeneratorRuntime.async(function playGames$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // res.header('Access-Control-Allow-Origin', '*');
          res.render('games/index.ejs');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.playGames = playGames;
var cemu = {
    exe: "C:\\Users\\Ryan\\Desktop\\cemu\\cemu.exe",
    gamedir: "E:\\Games\\cemu",
    initialize: function() {
        if (localStorage.getItem("exe")) {
            $('#navigation').addClass('top');
        }
        var games = ["Hyrule Warriors", "Donkey Kong Country Tropical Freeze", "Mario Kart 8", "Splatoon", "Captain Toad Treasure Tracker", "Super Mario Maker", "Legend of Zelda Wind Waker HD"]; // For testing purposes
        for (var i = 0; i < games.length; i++) {
            var c = Math.floor(Math.random() * 10);
            if (c < 3) {
                c = "USA";
            } else if (c >= 3 && c < 6) {
                c = "EUR";
            } else if (c >= 6 && c < 8) {
                c = "GER";
            } else {
                c = "JPN";
            }
            $('<tr class="game" data-game-id="' + games[i] + '"><td class="icon"><img src="img/icon/' + games[i] + '.png"></td><td class="name">' + games[i] + '</td><td class="flag"><img src="img/' + c + '.png"> ' + c + '</td><td class="status"></td></tr>').appendTo('#games');
        }
        $('#directory').click(function() {
            alert("Choose the exe directory.\nSet to " + cemu.exe + "."); //Choose directory here
            cemu.save();
            $('#navigation').addClass('top');
        });
        $('.game').hover(function() {
            cemu.select($(this).attr('data-game-id'));
            $(this).addClass('selected');
        });
        $('.game').dblclick(function() {
            cemu.launch($(this).attr('data-game-id'));
        });
        $('#launch').click(function() {
            cemu.launch(cemu.selected);
        });
    },
    save: function() {
        localStorage.setItem("exe", cemu.exe);
        localStorage.setItem("dir", cemu.gamedir);
    },
    select: function(game) {
        if (game != cemu.selected) {
            cemu.selected = game;
            $('#background').css('background-image', 'url("img/background/' + game + '.jpg")');
            $('#game-icon').css('background-image', 'url("img/icon/' + game + '.png")');
            $('h2').text(game);
            $('#game-playtime').text(Math.floor(Math.random() * 20) + " hours played");
            $('#game-lastplayed').text("Last played " + Math.floor(Math.random() * 7) + " days ago");
            $('.game').removeClass('selected');
        }
    },
    launch(game) {
        alert("Launched " + game); //Launch function here
    }
};

$(document).ready(function() {
    cemu.initialize();
});

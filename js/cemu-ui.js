var cemu = {
    cemu_dir: "C:\\Users\\Ryan\\Desktop\\cemu\\cemu.exe",
    game_dir: "E:\\Games\\cemu",
    initialize: function() {
        var games = ["Hyrule Warriors","Donkey Kong Country Tropical Freeze","Mario Kart 8"]; // For testing purposes
        for(var i=0; i < games.length; i++) {
            $('<tr class="game" data-game-id="'+games[i]+'"><td class="icon"><img src="img/icon/'+games[i]+'.png"></td><td class="name">'+games[i]+'</td><td class="flag">US</td><td class="status"></td></tr>').appendTo('#games');
        }
        $('#directory').click(function() {
            $('#navigation').addClass('top');
        });
        $('.game').hover(function() {
            $('#background').css('background-image','url("img/background/'+$(this).attr('data-game-id')+'.jpg")');
        });
    }
};

$(document).ready(function() {
    cemu.initialize();
});

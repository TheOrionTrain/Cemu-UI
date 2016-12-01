var cemu = {
    cemu_dir: "C:\\Users\\Ryan\\Desktop\\cemu\\cemu.exe",
    game_dir: "E:\\Games\\cemu",
    initialize: function() {
        var games = ["BWPE01","VAAE","VADE"]; // For testing purposes
        for(var i=0; i < games.length; i++) {
            $('<div class="game" data-game-id="'+games[i]+'" style="background-image: url(img/cover/'+games[i]+'.jpg); animation-delay: '+150*i+'ms;"></div>').appendTo('#games');
        }
        $('<div class="add game" style="animation-delay: '+150*games.length+'ms;">+</div>').appendTo('#games');
        $('#games .game').click(function() {
            cemu.launcher($(this).attr('data-game-id'));
        });
    },
    launcher: function(id) {
        $('#launch .cover').css('background-image', 'url(img/cover/'+id+'.jpg)');
        $('#launch .background').css('background-image', 'url(img/background/'+id+'.jpg)');
        $('#launch h2').text(id);
        $('#launch').fadeIn(400);
    }
};

$(document).ready(function() {
    cemu.initialize();
});

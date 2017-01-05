var cemu = {
    initialize: function() {
        $('#directory').click(function() {
            $('#navigation').addClass('top');
        });
        $('#settings').click(function() {
            $('#settings-container').addClass('center');
        });
        $('.game').hover(function() {
            cemu.select($(this).attr('data-game-id'));
            $(this).addClass('selected');
        });
        $('[data-setting="theme"]').text("Dark");
        $('[data-setting="background"]').text("On Hover");
        if(app) {
            $('[data-setting="game-dir"]').text(Settings.gamesDir);
            $('[data-setting="cemu-dir"]').text(Settings.cemuDir);
            $('.game').dblclick(function() {
                app.launchGame($(this).attr('data-game-id'));
            });
            $('#launch').click(function() {
                app.launchGame(cemu.selected);
            });
        }
    },
    select: function(game) {
        if (game != cemu.selected && app) {
            cemu.selected = game;
            $('#background').css('background-image', 'url("img/background/' + app.getPicture(game) + '.jpg")');
            $('#game-icon').css('background-image', 'url("img/icon/' + app.getPicture(game) + '.png")');
            $('h2').text(app.getName(game));
            $('#game-playtime').text(app.getTimePlayed(game));
            $('#game-lastplayed').text(app.getLastPlayed(game));
            $('.game').removeClass('selected');
        }
    }
};

$(document).ready(function() {
    cemu.initialize();
	if(window.console && console.log){
        var old = console.log;
        console.log = function(){
            old.apply(this, arguments);
			Logger.log(arguments[0].toString(), "Main");
        }
	}
});

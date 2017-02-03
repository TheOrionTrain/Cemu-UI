var cemu = {
    initialize: function() {
        $('#directory').click(function() {
            $('#navigation').addClass('top');
        });
        $('#settings').click(function() {
            $('#settings-container').addClass('center');
        });
        $('.game').hover(function() {
            cemu.select({game:$(this).attr('data-game-id'), titleId:(this).attr('data-title-id')});
            $(this).addClass('selected');
        });
        if(typeof app != "undefined") {
            $('[data-setting="game-dir"]').text(Settings.gamesDir);
            $('[data-setting="cemu-dir"]').text(Settings.cemuDir);
            $('.game').dblclick(function() {
                app.launchGame($(this).attr('data-game-id'));
            });
            $('#launch').click(function() {
                app.launchGame(cemu.selected.game);
				Events.onGameLaunched(cemu.selected.game);
            });
        } else {
            $('[data-setting="cemu-dir"]').text("/etc/cemu");
            $('[data-setting="game-dir"]').text("/home/thefeeltrain/Desktop/games");
        }
    },
    select: function(current) {
        if (current != cemu.selected && typeof app != "undefined") {
            cemu.selected = current;
            $('#background').css('background-image', 'url("img/background/' + app.getPicture(current.game) + '.jpg")');
            $('#game-icon').css('background-image', 'url("img/icon/' + app.getPicture(current.game) + '.png")');
            $('h2').text(app.getName(current.game));
            $('#game-playtime').text(app.getTimePlayed(current.game));
            $('#game-lastplayed').text(app.getLastPlayed(current.game));
            $('.game').removeClass('selected');
			Events.onGameSelected(current.game, current.titleId);
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

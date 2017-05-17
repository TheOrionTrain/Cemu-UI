const exe = (typeof app != "undefined") ? true : false;
var cemu = {
        initialize: function() {
            $('#directory').click(function() {
                $('#navigation').addClass('top');
            });
            $('#settings').click(function() {
                $('#settings-container').addClass('center');
            });
            $('.game').hover(function() {
                cemu.select({
                    game: $(this).attr('data-game-id'),
                    titleId: $(this).attr('data-title-id')
                });
                $(this).addClass('selected');
            });
			$('#games-tiled img').hover(function() {
				cemu.select({
					game: $($('#games tr')[$(this).index()]).attr('data-game-id'),
					titleId: $($('#games tr')[$(this).index()]).attr('data-title-id'),
				});
			});
            $('[data-setting] > select').change(function() {
                var s = $(this).parents('td').attr('data-setting');
                if (exe) {
                    Settings.save(s, $(this).val());
                }
            });
            $('#settings-container .nav li').click(function() {
                old($(this).text().toLowerCase());
                $('.settings').hide();
                $('#'+$(this).text().toLowerCase()).show();
                $('#settings-container .nav li').removeClass('on');
                $(this).addClass('on');
            });
            if (exe) {
				if (JSON.parse(Settings.extra).layout == "Tiled") {
					$('#games').hide();
					$('#games-tiled').show();
				}
                $('[data-setting="game-dir"]').text(Settings.gamesDir);
                $('[data-setting="cemu-dir"]').text(Settings.cemuDir);
                $('[data-setting="game-dir"]').click(function() {
                    $(this).text(app.chooseGameFolder());
                });
                $('[data-setting="cemu-dir"]').click(function() {
                    $(this).text(app.chooseCemuDirectory());
                });
                $('.game, #games-tiled img').dblclick(function() {
                    app.launchGame($(this).attr('data-game-id'));
                });
                $('#launch').click(function() {
                    app.launchGame(cemu.selected.game);
                    Events.onGameLaunched(cemu.selected.game);
                });
                $('[data-setting] > select').each(function() {
                    var s = $(this).parents('td').attr('data-setting'),
                        l = Settings.load(s);
                    if (l != null && l != "")
                        $(this).val(l);
                });
            } else {
                var games = ["ALZE01","ALZE01","ALZE01","ALZE01","ALZE01","ALZE01","ALZE01","ALZE01"]; // For testing purposes
                for(var i=0; i < games.length; i++) {
                    $('<img src="http://art.gametdb.com/wiiu/coverHQ/US/'+games[i]+'.jpg">').appendTo('#games-tiled');
                }
                $('[data-setting="cemu-dir"]').text("/etc/cemu");
                $('[data-setting="game-dir"]').text("/home/thefeeltrain/Desktop/games");
            }
        },
        select: function(current) {
            if (current != cemu.selected && exe) {
				Events.onGameSelected(current.game, current.titleId);
                cemu.selected = current;
                $('#background').css('background-image', 'url("../../ui/img/background/' + app.getPicture(current.game) + '.jpg")');
                $('#game-icon').css('background-image', 'url("../../ui/img/icon/' + app.getPicture(current.game) + '.png")');
                $('h2').text(app.getName(current.game));
                $('#game-playtime').text(app.getTimePlayed(current.game));
                $('#game-lastplayed').text(app.getLastPlayed(current.game));
                $('.game').removeClass('selected');
            }
        }
    },
    old = console.log;

$(document).ready(function() {
	Controller.bind();
    cemu.initialize();
    if (window.console && console.log) {
        console.log = function() {
            old.apply(this, arguments);
            Logger.log(arguments[0].toString(), "Main");
        }
    }
});

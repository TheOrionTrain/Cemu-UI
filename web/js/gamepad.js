var Controllers = [];

var lx = 0, ly = 0, rx = 0, ry = 0;

var Controller = {
    "bind": function() {
        window.gamepad = new Gamepad();

        gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
			if ($.inArray(device, Controllers) == -1) {
				Controllers.push(device);
				$('[data-setting="controller"] select').append('<option>' + device.name + '</option>');
				$('[data-setting="controller"] select').val(Settings.load('controller'));
			}
        });

        gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
			if (!device.connected) {
				console.log(device);
				Controllers = $.grep(Controllers, function (value) {
					return value != device;
				});
				
				$('[data-setting="controller"] select option:not(:contains("None"))').remove();
				Controllers.forEach((controller) => $('[data-setting="controller"] select').append('<option>' + controller.name + '</option>'));
			}
        });
		
        gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
			
        });

        gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
			console.log(e.gamepad.id);
			if (!app.isInFocus())
				return;
			if (e.control.includes("FACE") || e.control.includes("STICK"))
				$('div[data-name="' + e.control + '"]').removeClass('pressed');
			else
				$('div[data-name="' + e.control + '"]').css('opacity', 0);
				
			if (e.gamepad.name.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
				console.log(e);
				console.log(e.control);
				switch (e.control) {
					case "DPAD_DOWN":
						if (Settings.load("layout") != "Tiled") {
							$('tr.selected').next().mouseenter();//console.log("Move down.");
							$('#games-container').scrollTo($('#games-tiled img.hovered'));
						} else {
							var selected = $('#games-tiled img.hovered');
							$($('#games-tiled img')[selected.index() + 5]).mouseenter().addClass("hovered");
							selected.removeClass("hovered");
							$('#games-container').scrollTo($('#games-tiled img.hovered'));
						}
					break;
					
					case "DPAD_UP":
						if (Settings.load("layout") != "Tiled") {
							$('tr.selected').prev().mouseenter();//console.log("Move up.");
							$('#games-container').scrollTo($('#games-tiled img.hovered'));
						} else {
							var selected = $('#games-tiled img.hovered');
							$($('#games-tiled img')[selected.index() - 5]).mouseenter().addClass("hovered");
							selected.removeClass("hovered");
							$('#games-container').scrollTo($('#games-tiled img.hovered'));
						}
					break;
					
					case "DPAD_RIGHT":
						if (Settings.load("layout") != "Tiled")
							return;
						
						var selected = $('#games-tiled img.hovered');
						$($('#games-tiled img')[selected.index() + 1]).mouseenter().addClass("hovered");
						selected.removeClass("hovered");
						$('#games-container').scrollTo($('#games-tiled img.hovered'));
					break;
					
					case "DPAD_LEFT":
						if (Settings.load("layout") != "Tiled")
							return;
						
						var selected = $('#games-tiled img.hovered');
						$($('#games-tiled img')[selected.index() - 1]).mouseenter().addClass("hovered");
						selected.removeClass("hovered");
						$('#games-container').scrollTo($('#games-tiled img.hovered'));
					break;
					
					case "FACE_1":
						if ($('#navigation').hasClass('top'))
							app.launchGame(cemu.selected.game);
					break;
					
					case "START_FORWARD":
						$('#navigation').addClass('top');
					break;
				}
			}
        });
		
		gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
			if (!app.isInFocus())
				return;
			if (e.gamepad.name.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
				if (e.control.includes("FACE") || e.control.includes("STICK"))
					$('div[data-name="' + e.control + '"]').addClass('pressed');
				else
					$('div[data-name="' + e.control + '"]').css('opacity', 1);
			}
		});

        gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
			console.log(!app.isInFocus() || !$('#navigation').hasClass('top'));
			if (!app.isInFocus())
				return;
			if (e.gamepad.name.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
				//console.log('rotateX(' + lx  * -1 + 'deg) rotateY(' + ly + 'deg)');
				if (e.axis.includes("STICK")) {
					$('.stick.left').css({'margin-left' : lx + 'px', 'margin-top' : ly + 'px', 'transform' : 'rotateX(' + ly  * -1 + 'deg) rotateY(' + lx + 'deg)'});
					$('.stick.right').css({'margin-left' : rx + 'px', 'margin-top' : ry + 'px', 'transform' : 'rotateX(' + ry  * -1 + 'deg) rotateY(' + rx + 'deg)'});
				}
				
				/*if (e.axis.includes("SHOULDER"))
					$('div[data-name="' + e.axis + '"]').css('opacity', e.value);*/
					
				switch (e.axis) {
					case "LEFT_STICK_Y":
						ly = e.value * 22;
						if ($('#navigation').hasClass('top')) {
							if (e.value == 1) {
								$('tr.selected').next().mouseenter();//console.log("Move down.");
								$('#games-container').scrollTo($('#games-tiled img.hovered'));
							} else if (e.value == -1) {
								$('tr.selected').prev().mouseenter();//console.log("Move up.");
								$('#games-container').scrollTo($('#games-tiled img.hovered'));
							}
						}
					break;
					case "LEFT_STICK_X":
						lx = e.value * 22;
					break;
					case "RIGHT_STICK_Y":
						ry = e.value * 22;
					break;
					case "RIGHT_STICK_X":
						rx = e.value * 22;
					break;
				}
			}
        });
		
		if (!gamepad.init())
			console.log('error intializing controllers');
    }
};
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
			if (e.gamepad.name.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
				console.log(e);
				console.log(e.control);
				switch (e.control) {
					case "DPAD_DOWN":
						$('tr.selected').next().mouseenter();//console.log("Move down.");
						$('#games-container').scrollTo($('tr.selected'));
					break;
					
					case "DPAD_UP":
						$('tr.selected').prev().mouseenter();//console.log("Move up.");
						$('#games-container').scrollTo($('tr.selected'));
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
			if (e.gamepad.name.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
			}
		});

        gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
			console.log($('#navigation').hasClass('top'));
			if (!app.isInFocus() && $('#navigation').hasClass('top'))
				return;
			if (e.gamepad.name.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
				console.log('rotateX(' + x  * -1 + 'deg) rotateY(' + y + 'deg)');
				$('.stick.left').css({'margin-left' : x + 'px', 'margin-top' : y + 'px', 'transform' : 'rotateX(' + y  * -1 + 'deg) rotateY(' + x + 'deg)'});
				switch (e.axis) {
					case "LEFT_STICK_Y":
						ly = e.value * 22;
						if (e.value == 1) {
							$('tr.selected').next().mouseenter();//console.log("Move down.");
							$('#games-container').scrollTo($('tr.selected'));
						} else if (e.value == -1) {
							$('tr.selected').prev().mouseenter();//console.log("Move up.");
							$('#games-container').scrollTo($('tr.selected'));
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
var Controllers = [];

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
			if (!app.isInFocus() && $('#navigation').hasClass('top'))
				return;
			if (e.gamepad.name.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
				//console.log(e);
				switch (e.axis) {
					case "LEFT_STICK_Y":
						if (e.value == 1) {
							$('tr.selected').next().mouseenter();//console.log("Move down.");
							$('#games-container').scrollTo($('tr.selected'));
						} else if (e.value == -1) {
							$('tr.selected').prev().mouseenter();//console.log("Move up.");
							$('#games-container').scrollTo($('tr.selected'));
						}
					break;
				}
			}
        });
		
		if (!gamepad.init())
			console.log('error intializing controllers');
    }
};
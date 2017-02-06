var Controllers = [];

var Controller = {
    "bind": function() {
        window.gamepad = new Gamepad();

        gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
			if ($.inArray(device, Controllers) == -1) {
				Controllers.push(device);
				$('[data-setting="controller"] select').append('<option>' + device.id.split('(')[0] + '</option>');
				$('[data-setting="controller"] select').val(Settings.load('controller'));
			}
        });

        gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
			console.log(device.id);
            Controllers = $.grep(Controllers, function (value) {
				return value != device;
			});
			
			$('[data-setting="controller"] select option:not(:contains("None"))').remove();
			Controllers.forEach((controller) => $('[data-setting="controller"] select').append('<option>' + controller.id.split('(')[0] + '</option>'));
        });

        gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
			
        });

        gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
			if (e.gamepad.id.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
			}
        });
		
		gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
			if (e.gamepad.id.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
				console.log(e);
			}
		});

        gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
			if (e.gamepad.id.includes($('[data-setting="controller"] select').val())) {
				//do everything in here
			}
        });
		
		if (!gamepad.init())
			console.log('error intializing controllers');
    }
};
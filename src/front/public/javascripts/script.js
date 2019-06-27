$('document').ready(function() {
	$('#btn-login').click(function() {
		const data = $('#login-form').serialize();

		console.log(data);

		$.ajax({
			type: 'POST',
			url: 'user/login',
			data: data,
			dataType: 'json',
			beforeSend: function() {
				$('#btn-login').html('Validando ...');
			},
			success: function(response) {
				if (response.codigo == '1') {
					$('#btn-login').html('Entrar');
					window.location.href = '/';
				} else {
					$('#btn-login').html('Entrar');
				}
			}
		});
	});
});

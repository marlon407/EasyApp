module.exports = {
    'secret': 'ilovescotchyscotch',
		'database': 'mongodb://admin:admin@ds047812.mongolab.com:47812/jwtauth',
    //'database': 'mongodb://root:root@ds041571.mongolab.com:41571/easyad',
		//'database': 'mongodb://localhost:27017/jwtauth',
		'NODE_AWS_KEY': "AKIAJTFCGVIF3KVKRXEA",
		'NODE_AWS_SECRET': "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",
		'EC2-MongoPass': "O4VxwCKEcaML",
		'email': {
			'service': 'gmail',
			'auth': {
				'user':  'easyadbr@gmail.com',
				'pass': 'easyad2016'
				}
		},
		'confirEmail': {
			'subject': 'EasyAd - Confirmação de email',
			'text': '<br><h3>Sua inscrição na EasyAd foi confirmada.</h3><br><h3>Para a seguraça de todos nossos usuários, é necessário que você ative seu perfil. Por favor, acesse o link a seguir para a ativação.</h3><br>'
		},
		'adTypes': [
			{
				'id': 1,
				'type': "static",
				'price': 199.99,
			},
			{
				'id': 2,
				'type': "dinamic",
				'price': 199.99,
			},
	{
				'id': 3,
				'type': "flayer",
				'price': 199.99,
			},
			{
				'id': 4,
				'type': "poster",
				'price': 199.99,
			},
			{
				'id': 5,
				'type': "outdoor",
				'price': 199.99,
			},
			{
				'id': 6,
				'type': "news",
				'price': 199.99,
			},
			{
				'id': 7,
				'type': "internet",
				'price': 199.99,
			},
			{
				'id': 8,
				'type': "app",
				'price': 199.99,
			},
		]
};

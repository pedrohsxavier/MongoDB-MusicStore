/* Criação dos índices */

//Uso de índices no campo pais da coleção Artistas

db.artistas.createIndex({pais: 1})



//Uso de índices no campo genero da coleção Artistas

db.artistas.createIndex({genero: 1})





/* Atualizações */

//Alterando preço do(s) produto(s) para 4.99, com código igual a 5.

db.produtos.update({"codigo" : 5}, {$set : {"preco" : 4.99}});



//Alterando plano do cliente Paulo para Premium.

db.clientes.update({"nome" : 'Paulo'}, {$set : {"plano": 'Premium'}});







/* Remoções */

//Removendo clientes com o nome de Lauro.

db.clientes.remove({"nome" : 'Lauro'});



//Removendo o(s) produtos com o código 26.

db.produtos.remove({"codigo" : 26});







/* Consulta com coleção inteira */

//Consulta de todos os documentos da coleção Clientes.

db.clientes.find();

//Consulta de todos os documentos da coleção Produtos. 

db.produtos.find();

//Consulta de todos os documentos da coleção Artistas.

db.artistas.find();







/* Consulta com contagem de documentos na coleção */

//Contagem de documentos da coleção Clientes.

db.clientes.count()

//Contagem de documentos da coleção Produtos.

db.produtos.count()

//Contagem de documentos da coleção Artistas.

db.artistas.count()







/* Consultas com filtros diversos, sem projeção */

//Exibindo todos os artistas americanos do gênero Rock.

db.artistas.find(

	{pais: "Estados Unidos", genero: "Rock"}

);



//Exibindo todos os clientes do plano Gold.         

db.clientes.find(

	{plano: "Gold"}

);



//Exibindo os artistas brasileiros e canadenses.

db.artistas.find(

	{pais: {$in: ['Brasil', 'Canada']}}

);







/* Consultas com filtros diversos, com projeção */

//Exibindo apenas o nome de todos os produtos com preço maior que 5 e menor que 10.

db.produtos.find(

	{preco: {$gt: 5, $lt: 10}},

	{nome: 1, _id: 0}

);



//Exibindo o nome e o genêro (e o _id) de todos os artistas que fundaram o grupo na década de 90.

db.artistas.find(

	{anoFundacao: {$gt: '1990', $lt: '2000'}},

	{nome: 1, genero: 1}

);



//Exibindo o id, nome e país de todos os artistas que fundaram o grupo antes de 1980. 

db.artistas.find(

	{anoFundacao: {$lt: '1980'}},

	{_id: 1, nome: 1, pais: 1}

);







/* Consulta com filtro, projeção e expressão regular */

//Exibindo o nome, descrição e artista de todos os ábuns da coleção.

db.produtos.find(

//      {preco: {$gt: 5}}

        {descricao: /^Album/i},

        {nome: 1, descricao: 1, artista: 1, _id: 0}

//      {descricao: {$regex: /^A/i }}

)







/* Consulta com acesso a array de elementos */

//Exibindo nome, telefones de contato e emails do cliente Mario.

db.clientes.find(

            {"nome": 'Mario'},

            {nome: 1, telefone: 1, email: 1}

)

//Exibindo nome, telefones de contato e emails do cliente Ronaldo.

db.clientes.find(

            {"nome": 'Ronaldo'},

            {nome: 1, telefone: 1, email: 1}

)

//Exibindo nome, telefones de contato e emails da cliente Marta.

db.clientes.find(

            {"nome": 'Marta'},

            {nome: 1, telefone: 1, email: 1}

)







/* Consulta com acesso a estrutura embutida */

//Exibindo nome, sobrenome e endereço da cliente da cliente Carla Martins.

db.clientes.find(

        {nome: 'Carla'},

        {_id: 0, nome: 1, sobrenome: 1, "endereco.cidade": 1, "endereco.bairro": 1, "endereco.rua": 1}

)



//Exibindo nome, sobrenome e endereço da cliente do cliente Paulo Emanuel.

db.clientes.find(

        {nome: 'Paulo'},

        {_id: 0, nome: 1, sobrenome: 1, "endereco.cidade": 1, "endereco.bairro": 1, "endereco.rua": 1}

)



//Exibindo nome, sobrenome e endereço da cliente do cliente Roberto Santiago.

db.clientes.find(

        {nome: 'Roberto'},

        {_id: 0, nome: 1, sobrenome: 1, "endereco.cidade": 1, "endereco.bairro": 1, "endereco.rua": 1}

)







/* Consulta com função de agregação (SUM, AVG, MAX ou MIN) */

//Exibindo a média dos preços de todas as músicas.

db.produtos.aggregate([

        {$match: {descricao: "Musica"}},

        {$group: {_id: null, media: {$avg: "$preco"}}}

])

//Exibindo a média dos preços de todos os álbuns.

db.produtos.aggregate([

        {$match: {descricao: "Album"}},

        {$group: {_id: null, media: {$avg: "$preco"}}}

])







/* Consulta com DISTINCT ou LIMIT */

// 5 primeiros produtos com preço acima de 10, exibindo o id, nome e descrição.

db.produtos.find(

	{preco : {$gt : 10}},

	{nome: 1, descricao: 1}

).limit(5)







/* Consulta a seu critério, explicando o porquê dela */

//Listagens do nomes de todos os clientes da coleção em ordenados pelo nome.

db.clientes.find().sort({"nome": 1})

//Listagens do nomes de todos os produtos da coleção em ordenados pelo nome.

db.produtos.find().sort({"nome": 1})

//Listagens do nomes de todos os artistas da coleção em ordenados pelo nome.

db.artistas.find().sort({"nome": 1})




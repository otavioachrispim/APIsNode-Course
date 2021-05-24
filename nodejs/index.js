/*
0 - Obter um usuario
1 - Obter o número de telefone de um usuário a partir de seu id
2 - Obter o endereço do usuario pelo Id
*/
// importamos um módulo interno do Node.js
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

// quando chamar o usuario, passa uma função(callback) como parâmetro e ela é chamada passando o resultado pra quem chamou assim que ela for resolvida. A função sempre passa o primeiro valor como erro(null).
function obterUsuario() {
  // quando der algum problema -> reject (ERROR)
  // quando for sucess -> RESOLV
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error("DEU RUIM DE VERDADE!"));

      return resolve({
        id: 1,
        nome: "Otavio",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

// callback sempre é o ultimo parametro a ser passado
function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "999569920",
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Volta Redonda",
      numero: 21,
    });
  }, 2000);
}

// 1 passo adicionar a palavra async -> automaticamente ela retornara uma Promise
main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
    Nome: ${usuario.nome},
    Telefone: (${telefone.ddd})${telefone.telefone},
    Endereco: ${endereco.rua}, ${endereco.numero}
    `);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

// const usuarioPromise = obterUsuario();
// // para manipular o sucesso usamos a função .then
// // para manipular erros, usamos o .catch
// // usuario -> telefone ->
// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: usuario.nome,
//           id: usuario.id,
//         },
//         telefone: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     console.log(`
//     Nome: ${resultado.usuario.nome}
//     Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
//     Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone}
//     `);
//   })
//   .catch(function (error) {
//     console.error("DEU RUIM", error);
//   });

// obterUsuario(function resolverUsario(error, usuario) {
//   // null || "" || 0 === false
//   if (error) {
//     console.error("DEU RUIM em USUARIO", error);
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error("DEU RUIM em TELEFONE", error);
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error("DEU RUIM em ENDERECO", error);
//         return;
//       }

//       console.log(`
//       Nome: ${usuario.nome}
//       Endereco: ${endereco.rua}, ${endereco.numero}
//       Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `);
//     });
//   });
// });
// const tel = obterTelefone(usuario.id)

// console.log('telefone', telefone)

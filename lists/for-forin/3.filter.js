const { obterPessoas } = require('./service')

// o array prototype é utilizado para manipular o próprio array
Array.prototype.meuFilter = function(callback) {
  const lista = []
  for(index in this){
    const item = this[index]
    const result = callback(item, index, this)
    // 0, "", null,undefined === false ? null
    if(!result) continue;
    lista.push(item)
  }
  return lista;
}

async function main() {
  try {
    const { results } = await obterPessoas(`a`)

    // const familiaLars = results.filter(function(item){
    //   //  por padrão precisa retornar um booleano para informar se mantem ou remove da lista de
    //   // false > remove da lista(filtrando)
    //   // true > mantem
    //   // toLowerCase é para retornar todos com letra minuscula e o indexOf é para verificar se o objeto tem no texto(se ele encontrar retorna objetivo diferente de 0, se nao retorna -1)
    //   // nao encontrou = -1
    //   // encontrou = posicaoNoArray
    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1
    //   return result

    // })

    const familiaLars = results.meuFilter((item, index, lista) => {
      console.log(`index: ${index}`, lista.length)
      return item.name.toLowerCase().indexOf('lars') !== -1
    })

    const names = familiaLars.map((pessoa) => pessoa.name)
    console.log(names)

  } catch (error) {
    console.error(`Deu ruim`, error)
  }
}

main()
// class RecintosZoo {

//     analisaRecintos(animal, quantidade) {
//     }

// }

// export { RecintosZoo as RecintosZoo };

const animais = [
    { especie: "LEAO", tamanho: 3, bioma: ["savana"], carnivoro: true },
    { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"], carnivoro: true },
    { especie: "CROCODILO", tamanho: 3, bioma: ["rio"], carnivoro: true },
    { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
    { especie: "GAZELA", tamanho: 2, bioma: ["savana"], carnivoro: false },
    { especie: "HIPOPOTAMO", tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
];

const recintos = [
    // 7 disponiveis 
    { numero: 1, bioma: ["savana"], tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
    // 5 disponiveis
    { numero: 2, bioma: ["floresta"], tamanhoTotal: 5, animaisExistentes: [] },
    // 5 disponiveis
    { numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
    // 8 disponiveis
    { numero: 4, bioma: ["rio"], tamanhoTotal: 8, animaisExistentes: [] },
    // 6 disponiveis
    { numero: 5, bioma: ["savana"], tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] }
  ];

const disponibilidadeRecintos = [
    { recinto: recintos[0].numero, espacoLivre: recintos[0].tamanhoTotal - recintos[0].animaisExistentes[0].quantidade },
    { recinto: recintos[1].numero, espacoLivre: recintos[1].tamanhoTotal },
    { recinto: recintos[2].numero, espacoLivre: recintos[2].tamanhoTotal - recintos[2].animaisExistentes[0].quantidade },
    { recinto: recintos[3].numero, espacoLivre: recintos[3].tamanhoTotal },
    { recinto: recintos[4].numero, espacoLivre: recintos[4].tamanhoTotal - recintos[4].animaisExistentes[0].quantidade }
];

function calcularPesoAnimal(tipo, quantidade) {
    let pesoTotal = 0;

    switch (tipo.toUpperCase()) {
        case 'LEAO':
            pesoTotal = 3 * quantidade;
            break;
        case 'LEOPARDO':
            pesoTotal = 2 * quantidade;
            break;
        case 'CROCODILO':
            pesoTotal = 3 * quantidade;
            break;
        case 'MACACO':
            pesoTotal = 1 * quantidade;
            break;
        case 'GAZELA':
            pesoTotal = 2 * quantidade;
            break;
        case 'HIPOPOTAMO':
            pesoTotal = 4 * quantidade;
            break;
        default:
            return { erro: "Animal inválido" };
    }

    return pesoTotal;
}

function encontrarRecintosParaAnimal(tipo, quantidade) {
    const animal = animais.find(animal => animal.especie === tipo.toUpperCase());

    // Se o animal não for encontrado, retorna um erro
    if (!animal) {
        return { erro: "Animal inválido" };
    }

    const pesoTotal = calcularPesoAnimal(tipo, quantidade);

    // Filtrar os recintos com espaço livre suficiente
    const recintosDisponiveis = disponibilidadeRecintos.filter(recinto => recinto.espacoLivre >= pesoTotal);

    return recintosDisponiveis;
}

// Exemplo de uso:
const recintosParaAnimais = encontrarRecintosParaAnimal("hipopotamo", 2);
console.log(recintosParaAnimais);
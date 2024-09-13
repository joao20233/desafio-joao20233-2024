
class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        if (!animal || quantidade <= 0) {
            return {
                erro: quantidade <= 0 ? "Quantidade inválida" : "Animal inválido",
                recintosViaveis: false
            };
        }

        const pesoTotal = calcularPesoAnimal(animal, quantidade);

        if (typeof pesoTotal === 'object' && pesoTotal.erro) {
            return {
                erro: pesoTotal.erro,
                recintosViaveis: false
            };
        }

        const recintosDisponiveis = encontrarRecintosParaAnimal(animal, quantidade);

        if (recintosDisponiveis.length === 0) {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: false
            };
        }

        const recintosViaveis = recintosDisponiveis.map(recinto => 
            `Recinto ${recinto.recinto} (espaço livre: ${recinto.espacoLivre} total: ${recintos.find(r => r.numero === recinto.recinto).tamanhoTotal})`
        );

        return {
            erro: false,
            recintosViaveis
        };
    }
}


export { RecintosZoo };




// disponiveis 
// 7
// 5
// 5
// 8
// 6


const animais = [
    { especie: "LEAO", tamanho: 3, bioma: ["savana"], carnivoro: true },
    { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"], carnivoro: true },
    { especie: "CROCODILO", tamanho: 3, bioma: ["rio"], carnivoro: true },
    { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
    { especie: "GAZELA", tamanho: 2, bioma: ["savana"], carnivoro: false },
    { especie: "HIPOPOTAMO", tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
];


const recintos = [
    { numero: 1, bioma: ["savana"], tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 , peso: 1 }] },
    { numero: 2, bioma: ["floresta"], tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 , peso: 2}] },
    { numero: 4, bioma: ["rio"], tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: ["savana"], tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1, peso: 3 }] }
];


const disponibilidadeRecintos = recintos.map((recinto) => {
    const espacoOcupado = recinto.animaisExistentes.reduce((total, animal) => {
        const especieAnimal = animais.find(a => a.especie === animal.especie.toUpperCase());
        return total + (animal.quantidade * especieAnimal.tamanho);
    }, 0);

    return {
        recinto: recinto.numero,
        espacoLivre: recinto.tamanhoTotal - espacoOcupado
    };
});


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

    if (!animal) {
        return { erro: "Animal inválido" };
    }

    const pesoTotal = calcularPesoAnimal(tipo, quantidade);
    console.log(pesoTotal);

    // Filtrar os recintos com espaço livre suficiente
    let recintosDisponiveis = disponibilidadeRecintos.filter(recinto => recinto.espacoLivre >= pesoTotal);

    // Se for um macaco, verificar se ele não ficará sozinho nos recintos 2 e 4
    recintosDisponiveis = recintosDisponiveis.filter(recinto => {
        const recintoOriginal = recintos.find(r => r.numero === recinto.recinto);

        // Se for o recinto 2 ou 4 e o animal for um macaco, verificar se há outros animais
        if (animal.especie === "MACACO" && (recinto.recinto === 2 || recinto.recinto === 4)) {
            return recintoOriginal.animaisExistentes.length > 0;
        }

        return true;
    });

    return recintosDisponiveis;
}

const recintosParaMacaco = encontrarRecintosParaAnimal("macaco", 1);
console.log(recintosParaMacaco);




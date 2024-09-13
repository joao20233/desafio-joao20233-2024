
import { RecintosZoo } from './recintos-zoo';

describe('Recintos do Zoológico', () => {
    let zoo;

    beforeEach(() => {
        zoo = new RecintosZoo();
    });

    
    test('Deve retornar erro para animal inválido', () => {
        const resultado = zoo.analisaRecintos('INVALIDO', 1);

        // Verificar se há erro
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBe(false);
    });

    test('Deve retornar erro para quantidade inválida', () => {
        const resultado = zoo.analisaRecintos('HIPOPOTAMO', -1);

        // Verificar se há erro
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBe(false);
    });
});

import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));
    

        //Testes feitos por Guilherme Calheira de Almeida
        test.each([
            //Café e chantily
            ['dinheiro', 'Número de cafe maior do que extras correspondentes (dinheiro)', ['cafe,2', 'chantily,1'], 'R$ 7,13'],
            ['dinheiro', 'Número de chantily maior do que o item principal correspondente (dinheiro)', ['cafe,1', 'chantily,2'], 'R$ 5,70'],
            ['debito', 'Número de cafe maior do que extras correspondentes (debito)', ['cafe,2', 'chantily,1'], 'R$ 7,50'],
            ['debito', 'Número de chantily maior do que o item principal correspondente (debito)', ['cafe,1', 'chantily,2'], 'R$ 6,00'],
            ['credito', 'Número de cafe maior do que extras correspondentes (credito)', ['cafe,2', 'chantily,1'], 'R$ 7,72'], 
            ['credito', 'Número de chantily maior do que o item principal correspondente (credito)', ['cafe,1', 'chantily,2'], 'R$ 6,18'], 
            //Sanduiche e queijo
            ['dinheiro', 'Número de sanduiche maior do que extras correspondentes (dinheiro)', ['sanduiche,2', 'queijo,1'], 'R$ 14,25'],
            ['dinheiro', 'Número de queijo maior do que o item principal correspondente (dinheiro)', ['sanduiche,1', 'queijo,2'], 'R$ 9,97'],
            ['debito', 'Número de sanduiche maior do que extras correspondentes (debito)', ['sanduiche,2', 'queijo,1'], 'R$ 15,00'],
            ['debito', 'Número de queijo maior do que o item principal correspondente (debito)', ['sanduiche,1', 'queijo,2'], 'R$ 10,50'],
            ['credito', 'Número de sanduiche maior do que extras correspondentes (credito)', ['sanduiche,2', 'queijo,1'], 'R$ 15,45'], 
            ['credito', 'Número de queijo maior do que o item principal correspondente (credito)', ['sanduiche,1', 'queijo,2'], 'R$ 10,81'], 
           
       
        ])('compra em %p - %s', (formaDePagamento, _, itens, resultadoEsperado) => {
            const resultado = new CaixaDaLanchonete()
                .calcularValorDaCompra(formaDePagamento, itens);
        
            expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
        });
    
});

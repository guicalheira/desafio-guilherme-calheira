class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50, extraDe: 'cafe' },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00, extraDe: 'sanduiche' },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };
        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;
        const principaisPedidos = new Set();
        const extrasPedidos = new Set();
        const itensExtrasSemPrincipais = new Set(); // Novo Set para rastrear itens extras sem itens principais

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (quantidade && +quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            const cardapioItem = this.cardapio[codigo];

            if (!cardapioItem) {
                return 'Item inválido!';
            }

            if (cardapioItem.extraDe) {
                extrasPedidos.add(cardapioItem.extraDe);

                // Verificar se o item principal foi pedido anteriormente
                if (!principaisPedidos.has(cardapioItem.extraDe)) {
                    itensExtrasSemPrincipais.add(codigo);
                }
            } else {
                principaisPedidos.add(codigo);
            }

            let valorItem = cardapioItem.valor;

            if (quantidade) {
                valorItem *= +quantidade;
            }

            valorTotal += valorItem;
        }

        for (const extraPedido of extrasPedidos) {
            if (!principaisPedidos.has(extraPedido)) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        // Verificar se há itens extras sem itens principais correspondentes
        if (itensExtrasSemPrincipais.size > 0) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        if (metodoDePagamento === 'dinheiro') {
            const desconto = valorTotal * (5 / 100);
            valorTotal -= desconto;
        } else if (metodoDePagamento === 'credito') {
            const taxa = valorTotal * (3 / 100);
            valorTotal += taxa;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };

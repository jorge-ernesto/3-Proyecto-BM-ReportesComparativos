/**
 * @NApiVersion 2.1
 */
define([
    './reports/Class.GastosComparativosGroup',
    './reports/Class.GastosTransactiones'
],

    function (
        GastosComparativosGroup,
        GastosTransactiones
    ) {

        return {
            GastosComparativosGroup,
            GastosTransactiones
        }

    });

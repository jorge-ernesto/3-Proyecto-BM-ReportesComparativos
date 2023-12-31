/**
 * @NApiVersion 2.1
 */
define(['N', './Lib.Basic'],

    function (N, Basic) {

        const { search, log, format } = N; // * Audit: Nueva libreria format

        function createAccountingPeriodYear() {

            let result = [];
            let currentDate = format.format({ type: format.Type.DATE, value: new Date() }); // * Audit: Obtiene fecha actual

            search.create({
                type: 'accountingperiod', // * Audit: Para replicar esta busqueda hacer una prueba creando busqueda "Período contable"
                filters:
                    [
                        ["isyear", "is", "T"],
                        'AND',
                        ['startdate', 'onorbefore', currentDate] // * Audit: Todo lo anterior a la fecha actual
                    ],
                columns: [
                    { name: 'startdate', sort: 'DESC', label: 'start' },
                    { name: 'internalid', label: 'id' },
                    { name: "periodname", label: "Name" }
                ]
            }).run().each(node => {
                let { columns } = node;
                result.push({
                    id: node.getValue(columns[1]),
                    text: node.getValue(columns[2])
                });
                return true;
            });
            return result;
        }



        function createAccountingQuarterByYear(year) {
            let result = [];

            search.create({
                type: 'accountingperiod',
                filters:
                    [
                        ["parent", "anyof", year],
                        "AND",
                        ["isquarter", "is", "T"],
                        "AND",
                        ["isyear", "is", "F"],
                        'AND',
                        ["isadjust", "is", "F"]
                    ],
                columns: [
                    { name: 'startdate', sort: 'DESC', label: 'start' },
                    { name: 'internalid', label: 'id' },
                    { name: "periodname", label: "Name" }
                ]
            }).run().each(node => {
                let { columns } = node;
                result.push({
                    id: node.getValue(columns[1]),
                    text: node.getValue(columns[2])
                });
                return true;
            });
            return result;
        }


        function createAccountingPeriodByYear(year) {

            let result = [];

            search.create({
                type: 'accountingperiod',
                filters:
                    [
                        ["parent", "anyof", year],
                        "AND",
                        ["isquarter", "is", "F"],
                        "AND",
                        ["isyear", "is", "F"],
                        'AND',
                        ["isadjust", "is", "F"]
                    ],
                columns: [
                    { name: 'startdate', sort: 'DESC', label: 'start' },
                    { name: 'internalid', label: 'id' },
                    { name: "periodname", label: "Name" }
                ]
            }).run().each(node => {
                let { columns } = node;
                result.push({
                    id: node.getValue(columns[1]),
                    text: node.getValue(columns[2])
                });
                return true;
            });
            return result;
        }


        return {
            createAccountingQuarterByYear,
            createAccountingPeriodByYear,
            createAccountingPeriodYear
        }



    });

/**
 * @NApiVersion 2.1
 */
define(['N'],

    function (N) {

        const { search, record, log } = N;

        class CustomSearch {

            constructor(type) {

                this.context = {
                    type: type,
                    filters: [],
                    columns: []
                    // settings: {}
                }
            }

            updateFilters(filters) {
                this.context.filters = Array.isArray(filters) ? filters : [];
            }

            pushColumn(context) {
                this.context.columns.push(context);
            }

            // addSetting(key, value) {
            //     this.context.settings[key] = value;
            // }

            execute(callback) {

                let context = this.context;

                let currentSearch = search.create(context);

                let pagesSearch = currentSearch.runPaged({ pageSize: 1000 })

                pagesSearch.pageRanges.forEach((pageRange) => {

                    let currentPage = pagesSearch.fetch({ index: pageRange.index });

                    currentPage.data.forEach((row) => {

                        let currentRow = {
                            data: {},
                            getValue: function (id) {
                                return currentRow.data[id].value;
                            },
                            getText: function (id) {
                                return currentRow.data[id].text;
                            }
                        };

                        let columns = row.columns;

                        columns.forEach(currentColumn => {
                            let id = currentColumn.label;
                            let value = row.getValue(currentColumn);
                            let text = row.getText(currentColumn);
                            currentRow.data[id] = { value, text };
                        });

                        callback(currentRow);
                    });
                });
            }


        }
        const Data = {

            View: {
                'DETAILED': 'A',
                'ANNUAL': 'B',
                'QUARTERLY': 'C',
                'MONTHLY': 'D'
            },
            Report: {
                'GASTOS_INDIRECTOS': 1,
                'GASTOS_VENTAS': 4,
                'GASTOS_ADM_OP': 2,
                'GASTOS_ADM_OF': 3,
                'GASTOS_DETALLES': 2,
                'GASTOS_COMPARATIVOS_XLS': 3,
                'GASTOS_DETALLES_XLS': 4
            }

        }

        const Template = {
            1: 'GastosIndirectosFabricacion.html',
            2: 'GastosDetalleTransacciones.html',
            3: 'GastosComparativoExcel.ftl',
            4: 'GastosDetalleExcel.ftl'
        }

        const Classes = {
            'GASTOS_INDIRECTOS': [8, 9, 10, 11, 12, 13, 32],
            'GASTOS_ADM_OP': [33, 1, 2, 3, 4, 5, 6, 7],
            'GASTOS_ADM_OF': [14, 15, 16, 17, 18, 19, 20, 43],
            'GASTOS_VENTAS': [21, 22, 23, 24, 25, 26, 27]
        }

        const Yes_Acc = {
            'GASTOS_INDIRECTOS': 6,
            'GASTOS_ADM_OP': 6,
            'GASTOS_ADM_OF': 6,
            'GASTOS_VENTAS': 6
        }

        const No_Acc = {
            'GASTOS_INDIRECTOS': [
                60, 67, 69, 61,
                6211, 6212, 6214, 6215,
                6221, 6231, 6241, 6251, 6271, 6273, 6274, 6275, 6277, 6281, 6291,
                62131111, 62131112, 62131114
            ],
            'GASTOS_ADM_OP': [
                60, 67, 69, 61
            ],
            'GASTOS_ADM_OF': [
                60, 67, 69, 61
            ],
            'GASTOS_VENTAS': [
                60, 67, 69, 61
            ]
        }


        return {
            CustomSearch, // * Audit: Util
            Data,
            Template,
            Account: {
                True: Yes_Acc,
                False: No_Acc
            },
            Classes
        }


    });

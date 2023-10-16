/**
 * @NApiVersion 2.1
 */
define(['N', './Class.ReportRenderer', '../Lib.Basic', '../Lib.Operations'],

    function (N, ReportRenderer, Basic, Operations) {

        const { search, log } = N;

        const REPORTS = {
            1: 'GASTOS_INDIRECTOS',
            2: 'GASTOS_ADM_OP',
            3: 'GASTOS_ADM_OF',
            4: 'GASTOS_VENTAS'
        }

        function createAccountNumberFilter(view) {
            let filter = ['AND'];
            filter.push(['account.number', 'startswith', Basic.Account.True[view]]);

            Basic.Account.False[view].forEach(number => {
                filter.push('AND');
                filter.push(['account.number', 'doesnotstartwith', number]);
            });

            return filter;
        }

        function createTransactionDetailsByMonth(periods, subsidiary, view, concept, selectClass) {

            let resultTransaction = [];

            let summary = { total: 0 };
            let accountMap = {};

            let transactionQuery = new Basic.CustomSearch('transaction');

            let classList = Basic.Classes[view];
            if (selectClass) {
                classList = selectClass;
            }

            let conceptFilter = [];
            if (concept) {
                conceptFilter = ["account.custrecord_bio_cam_cuenta_concepto", "is", concept];
            } else {
                conceptFilter = ["account.custrecord_bio_cam_cuenta_concepto", "isnotempty", ''];
            }

            transactionQuery.updateFilters([
                conceptFilter,
                "AND",
                [
                    ["accountingperiod.internalid", "anyof"].concat(periods),
                    'OR',
                    ["accountingperiod.parent", "anyof"].concat(periods),
                ],
                "AND",
                ["accountingperiod.isadjust", "is", "F"],
                'AND',
                ['subsidiary', 'anyof', subsidiary],
                "AND",
                ['class', 'anyof'].concat(classList),
                "AND",
                ["type", "noneof", "PurchReq"],
                "AND",
                ["memorized", "is", "F"]
            ].concat(createAccountNumberFilter(view))
            );
            transactionQuery.pushColumn(
                { name: 'internalid', label: 'id' }
            );
            transactionQuery.pushColumn(
                { name: 'account', label: 'account' }
            );
            transactionQuery.pushColumn(
                { name: 'number', join: 'account', label: 'accountNumber' }
            );
            transactionQuery.pushColumn(
                { name: 'custrecord_bio_cam_cuenta_concepto', join: 'account', label: 'concept' }
            );
            transactionQuery.pushColumn(
                { name: 'type', label: 'type' }
            );
            transactionQuery.pushColumn(
                { name: 'mainname', label: 'entity' }
            );
            transactionQuery.pushColumn(
                { name: 'trandate', label: 'date' }
            );
            transactionQuery.pushColumn(
                { name: 'tranid', label: 'number' }
            );
            transactionQuery.pushColumn(
                { name: 'custcol24', label: 'journalNumber' }
            );
            transactionQuery.pushColumn(
                { name: 'amount', label: 'amount' }
            );
            transactionQuery.pushColumn(
                { name: 'symbol', join: 'currency', label: 'currency' }
            );
            transactionQuery.pushColumn(
                { name: 'exchangerate', label: 'rate' }
            );
            transactionQuery.pushColumn(
                { name: 'memo', label: 'memo' }
            );
            transactionQuery.pushColumn(
                { name: 'memomain', label: 'memomain' }
            );
            transactionQuery.pushColumn(
                { name: 'fxamount', label: 'fxamount' }
            );
            transactionQuery.execute(node => {

                let accountName = node.getText('account').split(':');
                accountName = accountName[accountName.length - 1];

                let account = {
                    id: node.getValue('account'),
                    text: node.getValue('accountNumber') + " : " + accountName
                };

                if (!accountMap[account.id]) {
                    accountMap[account.id] = {
                        id: account.id,
                        name: account.text,
                        lines: [],
                        total: 0
                    }
                }
                let row = {
                    id: node.getValue('id'),
                    concept: node.getValue('concept'),
                    type: node.getText('type'),
                    entity: node.getText('entity'),
                    date: node.getValue('date'),
                    number: node.getValue('number'),
                    journalNumber: node.getValue('journalNumber'),
                    amount: Number(node.getValue('amount')),
                    currency: node.getValue('currency'),
                    rate: node.getValue('rate'),
                    memo: node.getValue('memo'),
                    memomain: node.getValue('memomain'),
                    fxamount: node.getValue('fxamount')
                }
                accountMap[account.id].lines.push(row);
                accountMap[account.id].total += Number(row.amount);
                summary.total += Number(row.amount);

            });
            return { accountMap, summary };
        }



        class GastosTransacciones extends ReportRenderer {

            constructor(input) {

                if (input.xls == 'T') {
                    super(Basic.Data.Report.GASTOS_DETALLES_XLS);
                } else {
                    super(Basic.Data.Report.GASTOS_DETALLES);
                }

                let { subsidiary, view, decimal, period, concept } = input;

                let selectClass = input.class;

                let viewReport = REPORTS[view];

                let descriptionMap = {
                    report: '',
                    period: '',
                };

                if (viewReport == 'GASTOS_INDIRECTOS') {
                    descriptionMap.report = 'Gastos Indirectos de Fabricación';
                }
                if (viewReport == 'GASTOS_ADM_OP') {
                    descriptionMap.report = 'Gastos Administrativos (Operación)';
                }
                if (viewReport == 'GASTOS_ADM_OF') {
                    descriptionMap.report = 'Gastos Administrativos (Oficina)';
                }
                if (viewReport == 'GASTOS_VENTAS') {
                    descriptionMap.report = 'Gastos de Ventas';
                }


                let periodName = search.lookupFields({
                    type: 'accountingperiod',
                    id: period,
                    columns: ['periodname']
                });
                descriptionMap.period = periodName.periodname;

                let resultMap = createTransactionDetailsByMonth(period, subsidiary, viewReport, concept, selectClass);

                this.addInput('accounts', Object.values(resultMap.accountMap));
                this.addInput('summary', resultMap.summary);
                this.addInput('description', descriptionMap);
            }
        }

        return GastosTransacciones

    });

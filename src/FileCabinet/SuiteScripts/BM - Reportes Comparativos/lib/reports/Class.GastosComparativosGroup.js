/**
 * @NApiVersion 2.1
 */
define(['N', './Class.ReportRenderer', '../Lib.Basic', '../Lib.Operations'],

    function (N, ReportRenderer, Basic, Operations) {

        const REPORTS = {
            1: 'GASTOS_INDIRECTOS',
            2: 'GASTOS_ADM_OP',
            3: 'GASTOS_ADM_OF',
            4: 'GASTOS_VENTAS'
        }

        const { search, log } = N;

        var classes = null;
        var selectReport = null;

        var hasDecimal = 'T';

        function sumAmount(base, amount) {
            return Math.round((Number(base) + Number(amount)) * 100) / 100;
        }

        function createAccountNumberFilter() {
            let filter = ['AND'];
            filter.push(['account.number', 'startswith', Basic.Account.True[selectReport]]);

            Basic.Account.False[selectReport].forEach(number => {
                filter.push('AND');
                filter.push(['account.number', 'doesnotstartwith', number]);
            });

            return filter;
        }

        function createTransactionDetailsByMonth(periods, subsidiary) {

            let resultTransaction = [];

            let transactionQuery = new Basic.CustomSearch('transaction');

            transactionQuery.updateFilters([
                ["account.custrecord_bio_cam_cuenta_concepto", "isnotempty", ""],
                "AND",
                ["accountingperiod.internalid", "anyof"].concat(periods),
                "AND",
                ["accountingperiod.isadjust", "is", "F"],
                'AND',
                ['subsidiary', 'anyof', subsidiary],
                "AND",
                ['class', 'anyof'].concat(classes),
                'AND',
                ['account.custrecord_bio_cam_cuenta_concepto', 'isnotempty', ''],
                "AND",
                ["type", "noneof", "PurchReq"],
                "AND",
                ["memorized", "is", "F"]
            ].concat(createAccountNumberFilter())
            );

            transactionQuery.pushColumn(
                { name: 'class', summary: 'GROUP', label: 'classId' }
            );
            transactionQuery.pushColumn(
                { name: 'classnohierarchy', summary: 'GROUP', label: 'className' }
            );
            transactionQuery.pushColumn(
                { name: 'custrecord_bio_cam_cuenta_concepto', join: 'account', summary: 'GROUP', label: 'concept' }
            );
            transactionQuery.pushColumn(
                { name: 'postingperiod', summary: 'GROUP', label: 'period' }
            );
            transactionQuery.pushColumn(
                { name: 'amount', summary: 'SUM', label: 'amount' }
            );

            transactionQuery.execute(node => {

                let classId = node.getValue('classId');
                let className = node.getValue('className');
                let concept = node.getValue('concept');
                let periodId = node.getValue('period');
                let periodName = node.getText('period')
                let amount = Number(node.getValue('amount'));

                resultTransaction.push({
                    class: { id: classId, name: className },
                    concept: concept,
                    period: periodId,
                    amount: hasDecimal == 'T' ? Number(amount) : Number(amount.toFixed(0))
                })
            });

            return resultTransaction;
        }

        function createTransactionDetailsByPeriod(periods, subsidiary) {

            log.debug('Periods', periods);

            let resultTransaction = [];

            let transactionQuery = new Basic.CustomSearch('transaction');

            transactionQuery.updateFilters([
                ["account.custrecord_bio_cam_cuenta_concepto", "isnotempty", ""],
                "AND",
                ["accountingperiod.internalid", "anyof"].concat(periods),
                "AND",
                ["accountingperiod.isadjust", "is", "F"],
                'AND',
                ['subsidiary', 'anyof', subsidiary],
                "AND",
                ['class', 'anyof'].concat(classes),
                "AND",
                ["type", "noneof", "PurchReq"],
                "AND",
                ["memorized", "is", "F"]
            ].concat(createAccountNumberFilter())
            );

            transactionQuery.pushColumn(
                { name: 'class', summary: 'GROUP', label: 'classId' }
            );
            transactionQuery.pushColumn(
                { name: 'custrecord_bio_cam_cuenta_concepto', join: 'account', summary: 'GROUP', label: 'concept' }
            );
            transactionQuery.pushColumn(
                { name: 'internalid', join: 'accountingperiod', summary: 'GROUP', label: 'period' }
            );
            transactionQuery.pushColumn(
                { name: 'amount', summary: 'SUM', label: 'amount' }
            );

            transactionQuery.execute(node => {

                let classId = node.getValue('classId');
                let className = node.getText('classId').split(':');
                className = className[className.length - 1];
                let concept = node.getValue('concept');
                let periodId = node.getValue('period');
                let amount = Number(node.getValue('amount'));

                if (concept == 'Depreciación de PPE' && classId == 22) {
                    log.debug('node', node)
                }

                resultTransaction.push({
                    class: { id: classId, name: className },
                    concept: concept,
                    period: periodId,
                    amount: hasDecimal == 'T' ? Number(amount) : Number(amount.toFixed(0))
                })
            });

            log.debug('Length', resultTransaction.length);

            return resultTransaction;
        }

        function createTransactionDetailsByQuarter(quarters, subsidiary) {
            let resultTransaction = [];

            let transactionQuery = new Basic.CustomSearch('transaction');

            transactionQuery.updateFilters([
                ["account.custrecord_bio_cam_cuenta_concepto", "isnotempty", ""],
                "AND",
                ["accountingperiod.parent", "anyof"].concat(quarters),
                "AND",
                ["accountingperiod.isadjust", "is", "F"],
                'AND',
                ['subsidiary', 'anyof', subsidiary],
                "AND",
                ['class', 'anyof'].concat(classes),
                'AND',
                ['account.custrecord_bio_cam_cuenta_concepto', 'isnotempty', ''],
                "AND",
                ["type", "noneof", "PurchReq"],
                "AND",
                ["memorized", "is", "F"]
            ].concat(createAccountNumberFilter())
            );

            transactionQuery.pushColumn(
                { name: 'class', summary: 'GROUP', label: 'classId' }
            );
            transactionQuery.pushColumn(
                { name: 'classnohierarchy', summary: 'GROUP', label: 'className' }
            );
            transactionQuery.pushColumn(
                { name: 'custrecord_bio_cam_cuenta_concepto', join: 'account', summary: 'GROUP', label: 'concept' }
            );
            transactionQuery.pushColumn(
                { name: 'parent', join: "accountingperiod", summary: 'GROUP', label: 'period' }
            );
            transactionQuery.pushColumn(
                { name: 'amount', summary: 'SUM', label: 'amount' }
            );

            transactionQuery.execute(node => {

                let classId = node.getValue('classId');
                let className = node.getValue('className');
                let concept = node.getValue('concept');
                let periodId = node.getValue('period');
                let periodName = node.getText('period')
                let amount = Number(node.getValue('amount'));

                resultTransaction.push({
                    class: { id: classId, name: className },
                    concept: concept,
                    period: periodId,
                    amount: hasDecimal == 'T' ? Number(amount) : Number(amount.toFixed(0))
                })
            });

            return resultTransaction;
        }

        function createTransactionsDetailsByYear(years, subsidiary) {

            let quarterYearMap = {}

            search.create({
                type: "accountingperiod",
                filters:
                    [
                        ['parent', 'anyof'].concat(years),
                        "AND",
                        ["isquarter", "is", "T"]
                    ],
                columns:
                    [
                        'internalid', 'parent'
                    ]
            }).run().each(node => {
                quarterYearMap[node.id] = node.getValue('parent');
                return true;
            });


            let resultTransaction = [];

            let transactionQuery = new Basic.CustomSearch('transaction');

            transactionQuery.updateFilters([
                ["account.custrecord_bio_cam_cuenta_concepto", "isnotempty", ""],
                "AND",
                ["accountingperiod.parent", "anyof"].concat(years),
                "AND",
                ["accountingperiod.isadjust", "is", "F"],
                'AND',
                ['subsidiary', 'anyof', subsidiary],
                "AND",
                ['class', 'anyof'].concat(classes),
                'AND',
                ['account.custrecord_bio_cam_cuenta_concepto', 'isnotempty', ''],
                "AND",
                ["type", "noneof", "PurchReq"],
                "AND",
                ["memorized", "is", "F"]
            ].concat(createAccountNumberFilter())
            );

            transactionQuery.pushColumn(
                { name: 'class', summary: 'GROUP', label: 'classId' }
            );
            transactionQuery.pushColumn(
                { name: 'classnohierarchy', summary: 'GROUP', label: 'className' }
            );
            transactionQuery.pushColumn(
                { name: 'custrecord_bio_cam_cuenta_concepto', join: 'account', summary: 'GROUP', label: 'concept' }
            );
            transactionQuery.pushColumn(
                { name: 'parent', join: "accountingperiod", summary: 'GROUP', label: 'period' }
            );
            transactionQuery.pushColumn(
                { name: 'amount', summary: 'SUM', label: 'amount' }
            );

            transactionQuery.execute(node => {

                let classId = node.getValue('classId');
                let className = node.getValue('className');
                let concept = node.getValue('concept');

                let periodId = node.getValue('period');
                periodId = quarterYearMap[periodId];

                let amount = Number(node.getValue('amount'));

                resultTransaction.push({
                    class: { id: classId, name: className },
                    concept: concept,
                    period: periodId,
                    amount: hasDecimal == 'T' ? Number(amount) : Number(amount.toFixed(0))
                })
            });

            return resultTransaction;
        }

        class GastosComparativosGroup extends ReportRenderer {

            constructor(input) {

                if (input.xls == 'T') {
                    super(Basic.Data.Report.GASTOS_COMPARATIVOS_XLS);
                } else {
                    super(Basic.Data.Report.GASTOS_INDIRECTOS);
                }
                log.debug('Template', 'Was Loading....');

                let { subsidiary, view, year, month, decimal, report } = input;
                hasDecimal = decimal == 'T' || decimal == true ? 'F' : 'T';

                selectReport = REPORTS[report];

                classes = Basic.Classes[selectReport];

                let descriptionMap = {
                    report: '',
                    view: '',
                    year: '',
                    month: ''
                };

                if (selectReport == 'GASTOS_INDIRECTOS') {
                    descriptionMap.report = 'Gastos Indirectos de Fabricación';
                }
                if (selectReport == 'GASTOS_ADM_OP') {
                    descriptionMap.report = 'Gastos Administrativos (Operación)';
                }
                if (selectReport == 'GASTOS_ADM_OF') {
                    descriptionMap.report = 'Gastos Administrativos (Oficina)';
                }
                if (selectReport == 'GASTOS_VENTAS') {
                    descriptionMap.report = 'Gastos de Ventas';
                }

                log.debug('Action', 'Set Report Name to Object')

                let currentYear = year;

                let lastYear = null;

                let currentYearContext = null;
                let lastYearContext = null;

                let yearList = Operations.createAccountingPeriodYear();

                let currentPositionYear = -1;

                for (var i = 0; i < yearList.length; i++) {
                    let lineYear = yearList[i].id;
                    if (currentYear == lineYear) {
                        currentYearContext = yearList[i];
                        currentPositionYear = i;
                        break;
                    }
                }

                lastYearContext = yearList[currentPositionYear + 1];
                lastYear = yearList[currentPositionYear + 1].id;

                let currentPeriods = [];
                let lastPeriods = [];
                let transactionList = [];

                descriptionMap.year = currentYearContext.text;

                if (view == Basic.Data.View.DETAILED) {
                    descriptionMap.view = 'Detallado';
                    // currentPeriods = Operations.createAccountingPeriodByYear(currentYear).reverse();
                    // lastPeriods = Operations.createAccountingPeriodByYear(lastYear).reverse();

                    /**
                     * [Change Request]
                     * Slice the array months, first look for the position of a month, 
                     */
                    let currentMonth = month;
                    let auxCurrentPeriods = Operations.createAccountingPeriodByYear(currentYear).reverse();
                    let auxLastPeriods = Operations.createAccountingPeriodByYear(lastYear).reverse();

                    for (var i = 0; i < auxCurrentPeriods.length; i++) {

                        currentPeriods.push(auxCurrentPeriods[i]);
                        lastPeriods.push(auxLastPeriods[i]);

                        if (auxCurrentPeriods[i].id == currentMonth) {
                            break;
                        }

                    }
                    /*****************************************************************/

                    let totalPeriods = currentPeriods.map(node => { return node.id });

                    transactionList = createTransactionDetailsByPeriod(totalPeriods, subsidiary);

                    // transactionList = transactionList.concat(
                    //     createTransactionDetailsByPeriod(totalPeriods.slice(6, 12), subsidiary)
                    // );

                    totalPeriods = lastPeriods.map(node => { return node.id });

                    transactionList = transactionList.concat(createTransactionDetailsByPeriod(totalPeriods, subsidiary));

                    // transactionList = transactionList.concat(createTransactionDetailsByPeriod(totalPeriods.slice(6, 12), subsidiary));

                }

                if (view == Basic.Data.View.QUARTERLY) {
                    descriptionMap.view = 'Trimestral';
                    currentPeriods = Operations.createAccountingQuarterByYear(currentYear).reverse();
                    lastPeriods = Operations.createAccountingQuarterByYear(lastYear).reverse();
                    transactionList = createTransactionDetailsByQuarter([currentYear, lastYear], subsidiary);
                }

                if (view == Basic.Data.View.MONTHLY) {
                    descriptionMap.view = 'Mensual';

                    let currentMonth = month;
                    let auxCurrentPeriods = Operations.createAccountingPeriodByYear(currentYear).reverse();
                    let auxLastPeriods = Operations.createAccountingPeriodByYear(lastYear).reverse();

                    for (var i = 0; i < auxCurrentPeriods.length; i++) {

                        currentPeriods.push(auxCurrentPeriods[i]);
                        lastPeriods.push(auxLastPeriods[i]);
                        if (auxCurrentPeriods[i].id == currentMonth) {

                            descriptionMap.month = auxCurrentPeriods[i].text;
                            break;
                        }

                    }


                    let totalPeriods = currentPeriods.map(node => { return node.id });

                    transactionList = createTransactionDetailsByPeriod(totalPeriods, subsidiary);

                    // transactionList = transactionList.concat(
                    //     createTransactionDetailsByPeriod(totalPeriods.slice(6, 12), subsidiary)
                    // );

                    totalPeriods = lastPeriods.map(node => { return node.id });

                    transactionList = transactionList.concat(createTransactionDetailsByPeriod(totalPeriods, subsidiary));
                }

                if (view == Basic.Data.View.ANNUAL) {
                    descriptionMap.view = 'Anual';

                    currentPeriods = Operations.createAccountingQuarterByYear(currentYear).reverse();
                    lastPeriods = Operations.createAccountingQuarterByYear(lastYear).reverse();
                    transactionList = createTransactionsDetailsByYear([currentYear, lastYear], subsidiary);

                    currentPeriods = yearList.filter(node => { return node.id == currentYear });
                    lastPeriods = yearList.filter(node => { return node.id == lastYear });
                }


                let currentYearMap = {};
                let lastYearMap = {};

                currentPeriods.forEach(node => {
                    currentYearMap[node.id] = true;
                });
                lastPeriods.forEach(node => {
                    lastYearMap[node.id] = true;
                })

                let headersList = [];
                let totalMap = {};
                let summaryMap = {
                    current: {
                        ...currentYearContext,
                        amount: 0
                    }, last: {
                        ...lastYearContext,
                        amount: 0
                    }
                };

                for (var i = 0; i < currentPeriods.length; i++) {
                    headersList.push({
                        current: currentPeriods[i],
                        last: lastPeriods[i],
                    });
                    totalMap[currentPeriods[i].id] = 0;
                    totalMap[lastPeriods[i].id] = 0;

                }

                let costCenterMap = {};

                transactionList.forEach(node => {

                    let id = node.class.id;
                    let name = node.class.name;
                    let concept = node.concept;
                    let period = node.period;
                    let amount = node.amount;

                    let currentPeriods = {};
                    headersList.forEach(node => {
                        currentPeriods[node.current.id] = 0;
                        currentPeriods[node.last.id] = 0;

                    })

                    if (!costCenterMap[id]) {
                        costCenterMap[id] = {
                            id,
                            name,
                            concepts: {},
                            period: JSON.parse(JSON.stringify(currentPeriods)),
                            current: 0,
                            last: 0
                        };
                    }

                    if (!costCenterMap[id].concepts[concept]) {

                        costCenterMap[id].concepts[concept] = {
                            name: concept,
                            periods: JSON.parse(JSON.stringify(currentPeriods)),
                            current: 0,
                            last: 0
                        };

                    }


                    costCenterMap[id].concepts[concept].periods[period] =
                        sumAmount(costCenterMap[id].concepts[concept].periods[period], amount)

                    if (currentYearMap[period]) {
                        // costCenterMap[id].concepts[concept].current += Number(amount);
                        // costCenterMap[id].current += Number(amount);
                        // summaryMap.current.amount += Number(amount);
                        costCenterMap[id].concepts[concept].current = sumAmount(
                            costCenterMap[id].concepts[concept].current, amount);

                        costCenterMap[id].current = sumAmount(
                            costCenterMap[id].current, amount);

                        log.debug("Amount: " + amount, summaryMap);
                        summaryMap.current.amount = sumAmount(
                            summaryMap.current.amount, amount);

                    }
                    if (lastYearMap[period]) {

                        costCenterMap[id].concepts[concept].last = sumAmount(
                            costCenterMap[id].concepts[concept].last, amount);

                        costCenterMap[id].last = sumAmount(costCenterMap[id].last, amount);

                        summaryMap.last.amount = sumAmount(summaryMap.last.amount, amount);
                        // costCenterMap[id].concepts[concept].last += Number(amount);
                        // costCenterMap[id].last += Number(amount);
                        // summaryMap.last.amount += Number(amount);
                    }
                    costCenterMap[id].period[period] = sumAmount(costCenterMap[id].period[period], amount);
                    totalMap[period] = sumAmount(totalMap[period], amount)

                    // costCenterMap[id].period[period] += Number(amount)
                    // totalMap[period] += Number(amount);

                });

                /**************************************************************************
                 * Change 10/10/2023, Filter the months header depending of the report 
                 */

                // if (view == Basic.Data.View.DETAILED && month) {
                //     let auxiliary = [];
                //     for (var i = 0; i < headersList.length; i++) {
                //         auxiliary.push(headersList[i]);
                //         if (headersList[i].current.id == month) {
                //             break;
                //         }
                //     }
                //     headersList = auxiliary;
                // }


                if (view == Basic.Data.View.MONTHLY && month) {

                    let auxiliary = [];
                    for (var i = 0; i < headersList.length; i++) {
                        if (headersList[i].current.id == month) {
                            auxiliary.push(headersList[i]);
                            break;
                        }
                    }
                    headersList = auxiliary;
                }

                /**************************************************************************/


                for (var costCenter in costCenterMap) {
                    costCenterMap[costCenter].concepts = Object.values(costCenterMap[costCenter].concepts).sort((a, b) => {

                        let variationA = a.current - a.last;
                        let variationB = b.current - b.last;

                        return Number(variationB) - Number(variationA);
                    });
                }

                let arrayCenters = Object.values(costCenterMap);

                arrayCenters = arrayCenters.sort((a, b) => {
                    let variationA = a.current - a.last;
                    let variationB = b.current - b.last;

                    return Number(variationB) - Number(variationA);
                });

                log.debug('summaryMap', summaryMap);
                this.addInput('headers', headersList);
                this.addInput('total', totalMap);
                this.addInput('centers', arrayCenters);
                this.addInput('summary', summaryMap);
                this.addInput('decimal', decimal == 'T' || decimal == true ? 'T' : 'F');
                this.addInput('description', descriptionMap)

            }

        }

        return GastosComparativosGroup

    });

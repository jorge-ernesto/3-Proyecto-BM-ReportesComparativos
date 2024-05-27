/**
 * @NApiVersion 2.1
 */
define(['N', './Lib.Dao', './Lib.Render', './Lib.Operations'],

    function (N, DAO, Render, Operations) {

        const { redirect, log, runtime } = N;
        const { serverWidget } = N.ui;

        var formContext = {
            dao: null,
            form: null,
            params: {}
        }

        const SUITELET_RECORD = {
            title: 'custpage_report_title',
            titleDetails: 'custpage_reporte_title_deails',
            groups: {
                main: 'custpage_report_group_criteria_1',
                criteria: 'custpage_report_group_criteria_2'
            },
            fields: {
                report: 'custpage_report_criteria_report',
                decimal: 'custpage_report_criteria_decimal',
                subsidiary: 'custpage_report_criteria_subsidiary',
                view: 'custpage_report_criteria_view',
                year: 'custpage_report_criteria_year',
                month: 'custpage_report_criteria_month'
            },
            buttons: {
                generate: 'custpage_report_button_visualize',
                export: 'custpage_report_button_export_xls'
            }
        }

        const STATIC_DATA = {
            reports: {
                1: 'Gastos Indirectos de Fabricación',
                2: 'Comparativo Gastos de Administracion Operacion',
                3: 'Comparativo Gastos de Administracion Oficina',
                4: 'Comparativo Gastos de Venta'
            },
            viewForm: {
                'A': 'Detallada',
                'B': 'Anual',
                'C': 'Trimestral',
                'D': 'Mensual'
            }
        }

        function setInput(params) {
            formContext.params = params;
            log.debug('Input.Report', params);
        }

        function selectedReport() {
            log.debug('SelectedReport', formContext.params.report);
            return Number(formContext.params.report);
        }

        /**
         * description : Create Basic Form, add buttons and client script
        */
        function createReportForm() {

            formContext.dao = new DAO();
            formContext.form = serverWidget.createForm({
                title: formContext.dao.get(SUITELET_RECORD.title)
            });

            formContext.form.addSubmitButton({
                label: formContext.dao.get(SUITELET_RECORD.buttons.generate)
            });
        }

        /**
         * description : Create Basic Form
         */
        function createReporteDetailsForm() {
            formContext.dao = new DAO();
            formContext.form = serverWidget.createForm({
                title: formContext.dao.get(SUITELET_RECORD.titleDetails),
                hideNavBar: false
            });
        }

        /**
         * description : Create main fields (Report and decimals)
         */
        function createMainGroup() {

            let group = formContext.form.addFieldGroup({
                id: SUITELET_RECORD.groups.main,
                label: formContext.dao.get(SUITELET_RECORD.groups.main),
            });

            group.isBorderHidden = true;
            // group.isSingleColumn = true;

            let reportField = formContext.form.addField({
                id: SUITELET_RECORD.fields.report,
                label: formContext.dao.get(SUITELET_RECORD.fields.report),
                type: 'select',
                container: SUITELET_RECORD.groups.main
            });

            reportField.addSelectOption({ value: '', text: '' });
            for (var key in STATIC_DATA.reports) {
                reportField.addSelectOption({ value: key, text: STATIC_DATA.reports[key] })
            }
            reportField.isMandatory = true;
            reportField.updateBreakType({ breakType: 'STARTCOL' })

            if (formContext.params.report) {
                reportField.defaultValue = formContext.params.report;
            }

            let decimalField = formContext.form.addField({
                id: SUITELET_RECORD.fields.decimal,
                label: formContext.dao.get(SUITELET_RECORD.fields.decimal),
                type: 'checkbox',
                container: SUITELET_RECORD.groups.main
            });
            if (formContext.params.decimal) {
                decimalField.defaultValue = formContext.params.decimal;
            }

        }

        /**
         * description : create criteria Fields
         */
        function createCriteriaGroup() {

            let group = formContext.form.addFieldGroup({
                id: SUITELET_RECORD.groups.criteria,
                label: formContext.dao.get(SUITELET_RECORD.groups.criteria),
            });

            // Subsidiary Field
            let subsidiaryField = formContext.form.addField({
                id: SUITELET_RECORD.fields.subsidiary,
                label: formContext.dao.get(SUITELET_RECORD.fields.subsidiary),
                type: 'select',
                source: 'subsidiary',
                container: SUITELET_RECORD.groups.criteria
            });
            subsidiaryField.updateBreakType({ breakType: 'STARTCOL' })
            subsidiaryField.isMandatory = true;

            if (formContext.params.subsidiary) {
                subsidiaryField.defaultValue = formContext.params.subsidiary;
            }

            // Viewer Field
            let viewFormField = formContext.form.addField({
                id: SUITELET_RECORD.fields.view,
                label: formContext.dao.get(SUITELET_RECORD.fields.view),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            viewFormField.updateBreakType({ breakType: 'STARTCOL' })
            viewFormField.isMandatory = true;
            for (var key in STATIC_DATA.viewForm) {
                viewFormField.addSelectOption({ value: key, text: STATIC_DATA.viewForm[key] })
            }

            if (formContext.params.view) {
                viewFormField.defaultValue = formContext.params.view;
            }

            // Period Year Field
            let yearField = formContext.form.addField({
                id: SUITELET_RECORD.fields.year,
                label: formContext.dao.get(SUITELET_RECORD.fields.year),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            yearField.updateBreakType({ breakType: 'STARTCOL' })
            yearField.isMandatory = true;

            let yearArray = Operations.createAccountingPeriodYear();

            yearArray.forEach(node => {
                yearField.addSelectOption({ value: node.id, text: node.text });
            });

            if (formContext.params.year) {
                yearField.defaultValue = formContext.params.year;
            }

            //Period Month Field
            let monthField = formContext.form.addField({
                id: SUITELET_RECORD.fields.month,
                label: formContext.dao.get(SUITELET_RECORD.fields.month),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            monthField.updateBreakType({ breakType: 'STARTCOL' })

            if (formContext.params.view && formContext.params.view != 'D' && formContext.params.view != 'A') {
                monthField.updateDisplayType({ displayType: 'DISABLED' })
            } else {
                let selectedYear = formContext.params.year;
                selectedYear = selectedYear ? selectedYear : yearArray[0].id;

                if (selectedYear) {
                    Operations.createAccountingPeriodByYear(selectedYear).forEach(node => {
                        monthField.addSelectOption({ value: node.id, text: node.text });
                    });
                    if (formContext.params.month) {
                        monthField.defaultValue = formContext.params.month;
                    }
                }
            }
        }

        /**
         * Create HTML Container Field
         */
        function createViewerModel(htmlReport) {

            let viewerModelField = formContext.form.addField({
                id: 'custpage_report_viewer_html',
                label: ' ',
                type: 'inlinehtml'
            });

            viewerModelField.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.OUTSIDEBELOW
            });

            let htmlContainer = new String();

            htmlContainer = htmlContainer.concat(Render.getDefaultStyle());
            htmlContainer = htmlContainer.concat(htmlReport);

            viewerModelField.defaultValue = htmlContainer;
        }

        function getForm() {
            return formContext.form;
        }

        function loadReportForm(params) {

            let getParams = {};
            for (var x in SUITELET_RECORD.fields) {
                let value = params[SUITELET_RECORD.fields[x]];
                if (value) {
                    getParams[x] = value;
                }
            }

            redirect.toSuitelet({
                scriptId: runtime.getCurrentScript().id,
                deploymentId: runtime.getCurrentScript().deploymentId,
                parameters: getParams
            });

        }

        return {
            setInput,
            selectedReport,
            createReportForm,
            createReporteDetailsForm,
            createMainGroup,
            createCriteriaGroup,
            createViewerModel,
            getForm,
            loadReportForm
        }

    });

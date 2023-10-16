/**
 * @NApiVersion 2.1
 */
define(['N', './Lib.Dao', './Lib.Render', './Lib.Operations'],

    function (N, DAO, Render, Operations) {

        const { redirect, log, runtime } = N;
        const { serverWidget } = N.ui;

        // * Audit: JSON para almacenar información
        var formContext = {
            dao: null,
            form: null,
            params: {}
        }
        log.audit('formContext', formContext);

        // * Audit: JSON para almacenar información
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
        log.audit('SUITELET_RECORD', SUITELET_RECORD);

        // * Audit: JSON para almacenar información
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
        log.audit('STATIC_DATA', STATIC_DATA);

        function setInput(params) {
            formContext.params = params;
            log.debug('Input.Report', params);
        }

        function selectedReport() {
            log.debug('SelectedReport', formContext.params.report);
            log.audit('SelectedReport', formContext.params.report);
            return Number(formContext.params.report);
        }

        /**
         * description : Create Basic Form, add buttons and client script
        */
        function createReportForm() {

            formContext.dao = new DAO(); // * Audit: Data Access Object para obtener la traduccion de strings ---- Almacena informacion dentro de formContext.dao
            formContext.form = serverWidget.createForm({ // * Audit: Creamos formulario para mostrar en el reporte ---- Almacena informacion dentro de formContext.form
                title: formContext.dao.get(SUITELET_RECORD.title) // * Audit: La funcion "get" obtiene la renderizacion del string
            });

            formContext.form.addSubmitButton({ // * Audit: Agregamos el boton al formulario
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

            // * Audit: GRUPO DE CAMPOS
            // * Audit: Creamos grupo de campos
            let group = formContext.form.addFieldGroup({
                id: SUITELET_RECORD.groups.main,
                label: formContext.dao.get(SUITELET_RECORD.groups.main),
            });

            group.isBorderHidden = true; // * Audit: Me gustaria aclarar para que es esto, comente y parece que no hace nada
            // group.isSingleColumn = true;

            // * Audit: COMBO PRESENTACION
            // * Audit: Creamos combo Presentacion
            let reportField = formContext.form.addField({
                id: SUITELET_RECORD.fields.report,
                label: formContext.dao.get(SUITELET_RECORD.fields.report),
                type: 'select',
                container: SUITELET_RECORD.groups.main
            });

            // * Audit: Agregamos informacion al combo Presentacion
            reportField.addSelectOption({ value: '', text: '' });
            for (var key in STATIC_DATA.reports) {
                reportField.addSelectOption({ value: key, text: STATIC_DATA.reports[key] })
            }
            reportField.isMandatory = true;
            reportField.updateBreakType({ breakType: 'STARTCOL' })

            // * Audit: Seteamos variable enviada por URL al combo Presentacion
            if (formContext.params.report) {
                reportField.defaultValue = formContext.params.report;
            }

            // * Audit: CHECKBOX SIN DECIMALES
            // * Audit: Creamos checkbox Sin Decimales
            let decimalField = formContext.form.addField({
                id: SUITELET_RECORD.fields.decimal,
                label: formContext.dao.get(SUITELET_RECORD.fields.decimal),
                type: 'checkbox',
                container: SUITELET_RECORD.groups.main
            });
            // * Audit: Seteamos variable enviada por URL al checkbox Sin Decimales
            if (formContext.params.decimal) {
                decimalField.defaultValue = formContext.params.decimal;
            }

        }

        /**
         * description : create criteria Fields
         */
        function createCriteriaGroup() {

            // * Audit: GRUPO DE CAMPOS
            // * Audit: Creamos grupo de campos
            let group = formContext.form.addFieldGroup({
                id: SUITELET_RECORD.groups.criteria,
                label: formContext.dao.get(SUITELET_RECORD.groups.criteria),
            });

            // * Audit: COMBO SUBSIDIARIA
            // * Audit: Creamos combo Subsidiaria
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

            // * Audit: Seteamos variable enviada por URL al combo Subsidiaria
            if (formContext.params.subsidiary) {
                subsidiaryField.defaultValue = formContext.params.subsidiary;
            }

            // * Audit: COMBO VISTA
            // * Audit: Creamos combo Vista
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

            // * Audit: Seteamos variable enviada por URL al combo Vista
            if (formContext.params.view) {
                viewFormField.defaultValue = formContext.params.view;
            }

            // * Audit: COMBO AÑO
            // * Audit: Creamos combo Año
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

            // * Audit: Seteamos variable enviada por URL al combo Año
            if (formContext.params.year) {
                yearField.defaultValue = formContext.params.year;
            }

            // * Audit: COMBO MES
            // * Audit: Creamos combo Mes
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
                    // * Audit: Agregamos informacion al combo Mes
                    Operations.createAccountingPeriodByYear(selectedYear).forEach(node => {
                        monthField.addSelectOption({ value: node.id, text: node.text });
                    });
                    // * Audit: Seteamos variable enviada por URL al combo Mes
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

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N', '../lib/Lib.Operations'],

    function (N, Operations) {

        const FIELDS = {
            view: 'custpage_report_criteria_view',
            year: 'custpage_report_criteria_year',
            month: 'custpage_report_criteria_month'
        }

        function fieldChanged(scriptContext) {

            if (scriptContext.fieldId == FIELDS.view || scriptContext.fieldId == FIELDS.year) {

                let viewValue = scriptContext.currentRecord.getValue(FIELDS.view);
                let yearValue = scriptContext.currentRecord.getValue(FIELDS.year);
                let monthField = scriptContext.currentRecord.getField(FIELDS.month);

                if (viewValue == 'D' || viewValue == 'A') {
                    monthField.isDisabled = false;
                    monthField.removeSelectOption({ value: null })
                    Operations.createAccountingPeriodByYear(yearValue).forEach(node => {
                        monthField.insertSelectOption({ value: node.id, text: node.text });
                    });
                }
                else {
                    monthField.isDisabled = true;
                    monthField.removeSelectOption({ value: null })
                }

            }

        }

        return {
            fieldChanged
        };

    });

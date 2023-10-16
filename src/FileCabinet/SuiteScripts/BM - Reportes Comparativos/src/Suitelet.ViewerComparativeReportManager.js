/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['../lib/Lib.ServerWidget', '../lib/Lib.ReportManager', '../lib/Lib.Basic', 'N'],

    function (ServerWidget, ReportManager, Basic, N) {

        const { file, encode } = N;

        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        function onRequest(scriptContext) {

            try {
                if (scriptContext.request.method == 'GET') {

                    let params = scriptContext.request.parameters;

                    ServerWidget.setInput(params);

                    ServerWidget.createReportForm();

                    ServerWidget.createMainGroup();

                    ServerWidget.createCriteriaGroup();

                    let selectedReportHtml = '';

                    switch (ServerWidget.selectedReport()) {

                        case Basic.Data.Report.GASTOS_INDIRECTOS: {
                            log.debug('Start Report', '-- Gastos Indirectos Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.debug('End Report', '-- Gastos Indirectos Report --');
                            break;
                        }
                        case Basic.Data.Report.GASTOS_ADM_OP: {
                            log.debug('Start Report', '-- Gastos Administrativos Operacion Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.debug('End Report', '-- Gastos Administrativos Operacion Report --');
                            break;
                        }
                        case Basic.Data.Report.GASTOS_ADM_OF: {
                            log.debug('Start Report', '-- Gastos Administrativos Oficina Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.debug('End Report', '-- Gastos Administrativos Oficina Report --');
                            break;
                        }
                        case Basic.Data.Report.GASTOS_VENTAS: {
                            log.debug('Start Report', '-- Gastos Ventas Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.debug('End Report', '-- Gastos Ventas Report --');
                            break;
                        }
                    }

                    if (params.xls == 'T') {

                        let base64fileEncodedString = encode.convert({
                            string: selectedReportHtml,
                            inputEncoding: encode.Encoding.UTF_8,
                            outputEncoding: encode.Encoding.BASE_64
                        });

                        scriptContext.response.writeFile(
                            file.create({
                                name: 'Reporte Comparativo.xls',
                                fileType: file.Type.EXCEL,
                                encoding: file.Encoding.UTF_8,
                                contents: base64fileEncodedString
                            })
                        )

                    } else {

                        ServerWidget.createViewerModel(selectedReportHtml);

                        let reportForm = ServerWidget.getForm();

                        reportForm.clientScriptModulePath = './Client.ViewerComparativeReportManager'

                        scriptContext.response.writePage(reportForm);
                    }

                } else {

                    ServerWidget.loadReportForm(scriptContext.request.parameters);

                }
            } catch (err) {
                log.error('Err', err);
                scriptContext.response.write(JSON.stringify(err));
            }

        }

        return { onRequest }

    });

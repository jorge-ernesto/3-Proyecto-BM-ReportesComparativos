// Notas del archivo:
// - Secuencia de comando:
//      - BM - Comparative Report Managet Suitelet (customscript_bm_comp_report_suitelet)

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

            try { // * Audit: try catch
                if (scriptContext.request.method == 'GET') {

                    let params = scriptContext.request.parameters;
                    log.audit('', 'GET');
                    log.audit('params', params);

                    // * Audit Creacion de formulario
                    ServerWidget.setInput(params); // * Audit: Guardamos los parametros enviados por URL

                    ServerWidget.createReportForm(); // * Audit: Creamos formulario

                    ServerWidget.createMainGroup(); // * Audit: Creamos grupo principal del formulario

                    ServerWidget.createCriteriaGroup(); // * Audit: Creamos grupo de filtros del formulario

                    let selectedReportHtml = '';

                    switch (ServerWidget.selectedReport()) {

                        case Basic.Data.Report.GASTOS_INDIRECTOS: { // * Audit: Gastos Indirectos de Fabricación ---- report=1
                            log.debug('Start Report', '-- Gastos Indirectos Report --');
                            log.audit('Start Report', '-- Gastos Indirectos Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.audit('End Report', '-- Gastos Indirectos Report --');
                            log.debug('End Report', '-- Gastos Indirectos Report --');
                            break;
                        }
                        case Basic.Data.Report.GASTOS_ADM_OP: { // * Audit: Comparativo Gastos de Administracion Operacion ---- report=2
                            log.debug('Start Report', '-- Gastos Administrativos Operacion Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.debug('End Report', '-- Gastos Administrativos Operacion Report --');
                            break;
                        }
                        case Basic.Data.Report.GASTOS_ADM_OF: { // * Audit: Comparativo Gastos de Administracion Oficina ---- report=3
                            log.debug('Start Report', '-- Gastos Administrativos Oficina Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.debug('End Report', '-- Gastos Administrativos Oficina Report --');
                            break;
                        }
                        case Basic.Data.Report.GASTOS_VENTAS: { // * Audit: Comparativo Gastos de Venta ---- report=4
                            log.debug('Start Report', '-- Gastos Ventas Report --');
                            selectedReportHtml = new ReportManager.GastosComparativosGroup(params).print();
                            log.debug('End Report', '-- Gastos Ventas Report --');
                            break;
                        }
                    }

                    if (params.xls == 'T') {

                        // * Audit: Crear XLS
                        let base64fileEncodedString = encode.convert({
                            string: selectedReportHtml,
                            inputEncoding: encode.Encoding.UTF_8,
                            outputEncoding: encode.Encoding.BASE_64
                        });

                        // * Audit: Descargar Excel
                        scriptContext.response.writeFile(
                            // * Audit: Crear XLS
                            file.create({
                                name: 'Reporte Comparativo.xls',
                                fileType: file.Type.EXCEL,
                                encoding: file.Encoding.UTF_8,
                                contents: base64fileEncodedString
                            })
                        )

                    } else { // * Audit: HTML

                        // * Audit: Renderizar vista HTML en input de tipo inlinehtml
                        ServerWidget.createViewerModel(selectedReportHtml);

                        // * Audit: Recuperar el objeto formulario
                        let reportForm = ServerWidget.getForm();

                        // * Audit: Asignar ClientScript a formulario
                        reportForm.clientScriptModulePath = './Client.ViewerComparativeReportManager'

                        // * Audit: Renderizar formulario
                        scriptContext.response.writePage(reportForm);
                    }

                } else { // * Audit: POST

                    log.audit('', 'POST');
                    log.audit('params', scriptContext.request.parameters);

                    // * Audit: Util, redireccion al mismo suitelet
                    ServerWidget.loadReportForm(scriptContext.request.parameters);

                }
            } catch (err) {
                log.error('Err', err);
                scriptContext.response.write(JSON.stringify(err)); // * Audit: Ver error de try catch
            }

        }

        return { onRequest }

    });

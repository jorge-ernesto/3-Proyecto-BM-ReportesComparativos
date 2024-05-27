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

                    ServerWidget.createReporteDetailsForm();

                    let selectedReportHtml = new ReportManager.GastosTransactiones(params).print();

                    if (params.xls == 'T') {

                        let base64fileEncodedString = encode.convert({
                            string: selectedReportHtml,
                            inputEncoding: encode.Encoding.UTF_8,
                            outputEncoding: encode.Encoding.BASE_64
                        });

                        scriptContext.response.writeFile(
                            file.create({
                                name: 'Reporte Detallado (Transacciones).xls',
                                fileType: file.Type.EXCEL,
                                encoding: file.Encoding.UTF_8,
                                contents: base64fileEncodedString
                            })
                        )

                    } else {
                        ServerWidget.createViewerModel(selectedReportHtml);

                        let reportForm = ServerWidget.getForm();

                        scriptContext.response.writePage(reportForm);
                    }
                }
            } catch (err) {
                log.error('Err', err);
                scriptContext.response.write(JSON.stringify(err));
            }

        }

        return { onRequest }

    });

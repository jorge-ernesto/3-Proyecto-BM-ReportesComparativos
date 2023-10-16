/**
 * @NApiVersion 2.1
 */
define(['N', '../Lib.Basic'],

    function (N, Basic) {

        const { file, render, log } = N;

        class ReportRenderer {

            constructor(report) {

                // * Audit: Recibimos parametros
                log.audit('Recibimos parametros en el constructor de la clase "ReportRenderer"', report);

                // * Audit: Elegimos template HTML o Excel
                let templateName = Basic.Template[report];

                // * Audit: Crear Excel - Contenido dinamico
                let basicFormat = `
                <#assign context =data.context?eval/>
                `
                let templateFormat = file.load('../../freemarker/' + templateName).getContents();

                this.templateName = templateName;

                this.renderer = render.create();
                this.renderer.templateContent = basicFormat + '' + templateFormat;
                this.data = {}
            }

            addInput(key, value) {
                this.data[key] = value;
            }

            print() {
                let context = this.data;

                // * Audit: Enviar datos a Excel
                this.renderer.addCustomDataSource({
                    alias: 'data',
                    format: render.DataSource.OBJECT,
                    data: { context: JSON.stringify(context) }
                })

                // * Audit: Crear XLS
                return this.renderer.renderAsString();
            }
        }

        return ReportRenderer

    });

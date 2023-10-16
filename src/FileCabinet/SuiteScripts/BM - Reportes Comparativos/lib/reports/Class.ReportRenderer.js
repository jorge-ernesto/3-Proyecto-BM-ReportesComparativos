/**
 * @NApiVersion 2.1
 */
define(['N', '../Lib.Basic'],

    function (N, Basic) {

        const { file, render, log } = N;

        class ReportRenderer {

            constructor(report) {

                let templateName = Basic.Template[report];

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
                this.renderer.addCustomDataSource({
                    alias: 'data',
                    format: render.DataSource.OBJECT,
                    data: { context: JSON.stringify(context) }
                })
                return this.renderer.renderAsString();
            }
        }

        return ReportRenderer

    });

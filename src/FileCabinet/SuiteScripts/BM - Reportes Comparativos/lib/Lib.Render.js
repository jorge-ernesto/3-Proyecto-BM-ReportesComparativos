/**
 * @NApiVersion 2.1
 */
define(['N', './Lib.Basic'],

    function (N, Basic) {

        const { file, render } = N;

        function getDefaultStyle() {

            let style = file.load('../pub/viewerModel.css').url;

            return `<link rel="stylesheet" href="${style}">`;
        }

        return {
            getDefaultStyle,
        }

    });

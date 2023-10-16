<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:html="http://www.w3.org/TR/REC-html40">
    <ss:Styles>
        <ss:Style ss:ID="header">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="header-red">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" ss:Color="#ff0000" />
        </ss:Style>
        <ss:Style ss:ID="t1">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="t1-percent">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="Percent" />
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="t1-number">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="background">
            <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="cell">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="cell-percent">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="Percent" />
        </ss:Style>
    </ss:Styles>
    <Worksheet ss:Name="Reporte Comparativo">
        <Table ss:StyleID="background">
            <Column ss:Width="200" />
            <Column ss:Width="120" />
            <Column ss:Width="120" />
            <Column ss:Width="70" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="180" />
            <Column ss:Width="70" />
            <Column ss:Width="70" />
            <Column ss:Width="70" />
            <Column ss:Width="70" />
            <Column ss:Width="220" />
            <Column ss:Width="220" />
            <Row>
            </Row>
            <Row>
                <Cell ss:StyleID="header-red">
                    <Data ss:Type="String">LABORATORIOS BIOMONT S.A.</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Presentacion :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.description.report}</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Periodo :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.description.period}</Data>
                </Cell>
            </Row>
            <Row>
            </Row>
            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Cuenta</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Concepto</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Tipo</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Fecha</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Nro Doc.</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Nro Doc. (Diario)</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Nombre</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Importe</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Importe Me</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Moneda</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">T.C.</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">DESCRIPCION NOTA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">DESCRIPCION</Data>
                </Cell>
            </Row>
            <#list context.accounts as account>
                <Row>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${account.name}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="Number">${account.total}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                </Row>
                <#list account.lines as line>
                    <Row>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.concept}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.type}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.date}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.number}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.journalNumber}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.entity}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="Number">${line.amount}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="Number">${line.fxamount}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.currency}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="Number">${line.rate}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.memo}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${line.memomain}</Data>
                        </Cell>
                    </Row>
                </#list>
            </#list>
        </Table>
    </Worksheet>
</Workbook>
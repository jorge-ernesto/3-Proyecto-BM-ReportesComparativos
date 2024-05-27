<#if (context.decimal='T' )>
    <#setting number_format="#" />
</#if>
<#assign space="" />
<#function generateVariationPercent current last>
    <#assign percent=0 />
    <#attempt>

        <#if (current> 0 && last = 0)>
            <#assign percent=1 />
            <#else>
                <#assign percent=(current-last)/last />
        </#if>

        <#recover>
            <#assign percent=0 />
    </#attempt>
    <#return percent />
</#function>
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
            <NumberFormat ss:Format="0%" />
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
        <ss:Style ss:ID="t1-currency">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="Currency" />
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
            <NumberFormat ss:Format="0%" />
        </ss:Style>
        <ss:Style ss:ID="cell-currency">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="Currency" />
        </ss:Style>
    </ss:Styles>
    <Worksheet ss:Name="Reporte Comparativo">
        <Table ss:StyleID="background">
            <Column ss:Width="200" />
            <Column ss:Width="200" />
            <#list context.headers as header>
                <Column ss:Width="70" />
            </#list>
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
                    <Data ss:Type="String">Vista :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.description.view}</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Año :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.description.year}</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Mes :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.description.month?upper_case}</Data>
                </Cell>
            </Row>
            <Row>
            </Row>
            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Centro de Costo</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Concepto</Data>
                </Cell>
                <#list context.headers as header>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">${header.current.text?upper_case}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">${header.last.text?upper_case}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">Variación</Data>
                    </Cell>
                    <Cell ss:StyleID="t1">
                        <Data ss:Type="String">Var %</Data>
                    </Cell>
                </#list>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">${context.summary.current.text}</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">${context.summary.last.text}</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Variación</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Var %</Data>
                </Cell>
            </Row>
            <#list context.centers as center>
                <Row>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${center.name}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <#list context.headers as header>
                        <#assign current=center.period[header.current.id] />
                        <#assign last=center.period[header.last.id] />
                        <#assign var=current - last />
                        <#assign p_var=generateVariationPercent(current,last) />
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${current}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${last}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${var}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-percent"
                            ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                            <Data ss:Type="Number"></Data>
                        </Cell>
                    </#list>
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${center.current}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${center.last}</Data>
                    </Cell>
                    <#assign current=center.current />
                    <#assign last=center.last />
                    <#assign var=current - last />
                    <#assign p_var=generateVariationPercent(current,last) />
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${var}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-percent"
                        ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                        <Data ss:Type="Number"></Data>
                    </Cell>
                </Row>
                <#list center.concepts as concept>
                    <Row>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${space}${concept.name}</Data>
                        </Cell>
                        <#list context.headers as header>
                            <#assign current=concept.periods[header.current.id] />
                            <#assign last=concept.periods[header.last.id] />
                            <#assign var=current - last />
                            <#assign p_var=generateVariationPercent(current,last) />
                            <Cell ss:StyleID="cell-currency">
                                <Data ss:Type="Number">${current}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency">
                                <Data ss:Type="Number">${last}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency">
                                <Data ss:Type="Number">${var}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-percent"
                                ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                                <Data ss:Type="Number"></Data>
                            </Cell>
                        </#list>
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${concept.current}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${concept.last}</Data>
                        </Cell>
                        <#assign current=concept.current />
                        <#assign last=concept.last />
                        <#assign var=current - last />
                        <#assign p_var=generateVariationPercent(current,last) />
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${var}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-percent"
                            ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                            <Data ss:Type="Number"></Data>
                        </Cell>
                    </Row>
                </#list>
                <Row>
                </Row>
            </#list>
            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Report Comparativo (Total)</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <#list context.headers as header>
                    <#assign current=context.total[header.current.id] />
                    <#assign last=context.total[header.last.id] />
                    <#assign var=current - last />
                    <#assign p_var=generateVariationPercent(current,last) />
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${current}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${last}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${var}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-percent"
                        ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                        <Data ss:Type="Number"></Data>
                    </Cell>
                </#list>
                <Cell ss:StyleID="t1-currency">
                    <Data ss:Type="Number">${context.summary.current.amount}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency">
                    <Data ss:Type="Number">${context.summary.last.amount}</Data>
                </Cell>
                <#assign current=context.summary.current.amount />
                <#assign last=context.summary.last.amount />
                <#assign var=current - last />
                <#assign p_var=generateVariationPercent(current,last) />
                <Cell ss:StyleID="t1-currency">
                    <Data ss:Type="Number">${var}</Data>
                </Cell>
                <Cell ss:StyleID="t1-percent"
                    ss:Formula="=${(p_var?string.percent)?replace('%','')?replace(',','')?replace('.','')}/100">
                    <Data ss:Type="Number"></Data>
                </Cell>
            </Row>
        </Table>
    </Worksheet>
</Workbook>
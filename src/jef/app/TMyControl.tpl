<?xml version="1.0" encoding="UTF-8" ?>

<!--
    Document   : TMyXontrol.xml
    Created on : June 5, 2012, 3:49 PM
    Author     : wiktor
    Description:
        Purpose of the document follows.
-->

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil'>

<com:TContent>
	<prop:OnClick>
		<![CDATA[ <a>alert( 'ok' );</a> ]]>
	</prop:OnClick>
	<p class="paragraph">
		ąćół akkkkka
		<com:TPanel ID="p2" />
		<com:TPanel ID="panelik">
			<p>testowty paragraf</p>
			<com:TLiteral ID="xxx" Text="xxx" />
			<p>drugi paragraf</p>
		</com:TPanel>
	</p>
	<com:TPanel />
	<a href="[%= this.getText() %]" >aaA</a>
	<com:TRepeater>
		<temp:Item>
			helo [%= this.DataItem.text %]
		</temp:Item>
	</com:TRepeater>
</com:TContent>

</template>
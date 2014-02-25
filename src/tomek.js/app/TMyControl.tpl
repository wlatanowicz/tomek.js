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
	<prop:Visible>
		[%= Date() > '2012-01-01' %]
	</prop:Visible>
	<prop:OnClick>
		<![CDATA[ alert( 'ok' ); ]]>
	</prop:OnClick>
	<div>
		1
	</div>
	<com:TPanel ID="ddd">
		2 [%= '#'+Math.random() %]
	</com:TPanel>
	<div>
		3
	</div>
	<com:TPanel>
		4
	</com:TPanel>
	<p class="paragraph">
		ąćół akkkkka
		<com:TPanel ID="p2" />
		<com:TPanel ID="panelik">
			<p>testowty paragraf</p>
			<com:TLiteral ID="xxx" Text="xxx1" />
			<p>drugi paragraf</p>
		</com:TPanel>
	</p>
	<com:TPanel >
		xx 3
	</com:TPanel>
	<com:TPanel ID="xxx">
		[%= Date() %] 1
	</com:TPanel>
	<div style="background: yellow;">
		<com:TLiteral Text="[%= Date()+' 2' %]" />
	</div>
	<a href="[%= '#'+Math.random() %]" >aaA</a>
	<com:TRepeater ID="Rep">
		<temp:Item>
			helo [%= this.DataItem.text %]
			<com:TButton ID="RptBtn" />
			<com:TPanel>
				helo2 [%= this.DataItem.text2 %]
			</com:TPanel>
		</temp:Item>
	</com:TRepeater>
</com:TContent>

</template>
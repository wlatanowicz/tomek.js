<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
	<div>
		Temp: <com:TLiteral ID="TemperatureL" />
	</div>
	<com:TButton on:Click=".buttonClicked" Text="Check temperature" />
			
</com:TContent>

</template>
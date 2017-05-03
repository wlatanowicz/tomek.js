<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:Content>
	
	<div>
		Temp: <com:Literal ID="TemperatureL" />
	</div>
	<com:Button on:Click=".buttonClicked" Text="Check temperature" />
			
</com:Content>

</template>
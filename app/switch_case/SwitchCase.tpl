<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:Content>
	
	<com:AutoRefresh Interval="0.1">
		<com:SwitchView>
			<com:Case ID="c1" Condition="[%= (new Date()).getSeconds() % 2 == 0 %]">
				Even second
			</com:Case>
			<com:Case ID="c2">
				Odd second
			</com:Case>
		</com:SwitchView>
	</com:AutoRefresh>
			
</com:Content>

</template>
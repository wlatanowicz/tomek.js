<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
	<com:TAutoRefresh Interval="0.1">
		<com:TSwitchView>
			<com:TCase Condition="[%= (new Date()).getSeconds() % 2 == 0 %]">
				Even second
			</com:TCase>
			<com:TCase>
				Odd second
			</com:TCase>
		</com:TSwitchView>
	</com:TAutoRefresh>
			
</com:TContent>

</template>
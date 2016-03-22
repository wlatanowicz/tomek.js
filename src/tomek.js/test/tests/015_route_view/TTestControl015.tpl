<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>

	<com:TRouteView Path="/tabs/one">
		<div id="t1">tab one</div>
	</com:TRouteView>

	<com:TRouteView Path="/tabs/two/{option}" on:BecameActive=".tabTwoBecameActive">
		<div id="t2">
			<com:TLiteral ID="OptionL" />
		</div>
	</com:TRouteView>
		
	<com:TRouteView>
		<prop:Path>
			/tabs/three
			/tabs/three/*
			/tabs/trzy
		</prop:Path>
		<div id="t3">tab three</div>
	</com:TRouteView>

</com:TContent>
	
</template>
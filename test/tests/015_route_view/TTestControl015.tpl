<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:Content>

	<com:RouteView Path="/tabs/one">
		<div id="t1">tab one</div>
	</com:RouteView>

	<com:RouteView Path="/tabs/two/{option}" on:BecameActive=".tabTwoBecameActive">
		<div id="t2">
			<com:Literal ID="OptionL" />
		</div>
	</com:RouteView>
		
	<com:RouteView>
		<prop:Path>
			/tabs/three
			/tabs/three/*
			/tabs/trzy
		</prop:Path>
		<div id="t3">tab three</div>
	</com:RouteView>

</com:Content>
	
</template>
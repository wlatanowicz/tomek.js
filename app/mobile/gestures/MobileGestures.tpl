<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:Content>
	
	<div class="bar bar-header bar-light">
		<h1 class="title">Swipe any direction</h1>
	</div>
	<com:GesturePanel CssClass="content has-header has-footer padding"
				 on:Swipe=".swipe"
				 Options="[%= { swipe: { direction: Hammer.DIRECTION_ALL } } %]"
				 >
		<p style="font-size: 100px; padding-top: calc(50vh - 94px); text-align: center;">
			<i class="icon ion-arrow-[%= this.Direction %]-a"></i>
		</p>
	</com:GesturePanel>
	<div class="bar bar-footer bar-light">
		<div class="title">to flip arrow</div>
	</div>
</com:Content>

</template>
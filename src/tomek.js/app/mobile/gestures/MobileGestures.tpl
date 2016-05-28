<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
	<div class="bar bar-header bar-light">
		<h1 class="title">Hello World!</h1>
	</div>
	<com:TGesturePanel CssClass="content has-header has-footer padding"
				 on:Swipe=".swipe"
				 Options.swipe.direction="[%= Hammer.DIRECTION_ALL %]"
				 >
		<p style="font-size: 100px; padding-top: calc(50vh - 94px); text-align: center;">
			<i class="icon ion-arrow-[%= this.getDirection() %]-a"></i>
		</p>
	</com:TGesturePanel>
	<div class="bar bar-footer bar-light">
		<div class="title">Footer</div>
	</div>
</com:TContent>

</template>
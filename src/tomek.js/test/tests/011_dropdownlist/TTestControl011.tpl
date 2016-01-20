<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>


	<com:TDropDownList DataSource="[%= SourceTemplateControl.getDdlOptions() %]" DisabledFieldName="disabled">
	</com:TDropDownList>

</com:TContent>
	
</template>
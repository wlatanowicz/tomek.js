<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>

	<com:TLiteral Text="L1" Visible="[%= true or false %]" />
	<com:TLiteral Text="L2" Visible="[%= true and false %]" />
	<com:TLiteral Text="L3" Visible="[%= true and true %]" />

</com:TContent>
	
</template>
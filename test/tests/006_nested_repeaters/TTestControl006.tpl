<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>
	<com:TRepeater ID="Rep" on:ItemCreated="SourceTemplateControl.itemCreated" >
		<temp:Header>
			<com:TControl>
				<span class="header">
					Header
				</span>
			</com:TControl>
		</temp:Header>
		<temp:Footer>
			<com:TControl>
				<span class="footer">
					Footer
				</span>
			</com:TControl>
		</temp:Footer>
		<temp:Empty>
			<com:TControl>
				<span class="empty">
					Empty
				</span>
			</com:TControl>
		</temp:Empty>
		<temp:Item>
			<com:TControl>
				<span class="item" id="item_[%= this.getItemIndex() %]">
					<com:TRepeater ID="InnerRep" >
						<temp:Item>
							<com:TControl>
								<p class="inneritem inneritem_[%= this.getItemIndex() %]" >
									Item_[%= this.getDataItem() %]
								</p>
							</com:TControl>
						</temp:Item>
					</com:TRepeater>
				</span>
			</com:TControl>
		</temp:Item>
	</com:TRepeater>
</com:TContent>
	
</template>
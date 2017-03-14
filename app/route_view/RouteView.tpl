<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>

	<div id="tabs-container">
		<ul class="tabs-menu">
			<li>
				<com:TLink Href="#/tab/one" ID="Tab1Button">Tab 1</com:TLink>
			</li>
			<li>
				<com:TLink Href="#/tab/two" ID="Tab2Button">Tab 2</com:TLink>
			</li>
			<li>
				<com:TLink Href="#/tab/three" ID="Tab3Button">Tab 3</com:TLink>
			</li>
			<li>
				<com:TLink Href="#/tab/four" ID="Tab4Button">Tab 4</com:TLink>
			</li>
		</ul>
		<div class="tab tab-content">
			
			<com:TRouteView ID="Tab1" on:BecameActive=".tabBecameActive" on:BecameInactive=".tabBecameInactive" >
				<prop:Path>
					/tab/one
				</prop:Path>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim,
					sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet
					porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Nullam pretium, est at congue
					mattis, nibh eros pharetra lectus, nec posuere libero dui consectetur arcu. Quisque convallis facilisis fermentum. Nam
					tincidunt, diam nec dictum mattis, nunc dolor ultrices ipsum, in mattis justo turpis nec ligula. Curabitur a ante mauris.
					Integer placerat imperdiet diam, facilisis pretium elit mollis pretium. Sed lobortis, eros non egestas suscipit, dui
					dui euismod enim, ac ultricies arcu risus at tellus. Donec imperdiet congue ligula, quis vulputate mauris ultrices non.
					Aliquam rhoncus, arcu a bibendum congue, augue risus tincidunt massa, vel vehicula diam dolor eget felis.
				</p>
			</com:TRouteView>
			
			<com:TRouteView ID="Tab2" on:BecameActive=".tabBecameActive" on:BecameInactive=".tabBecameInactive" >
				<prop:Path>
					/tab/two
				</prop:Path>
				<p>
					Donec semper dictum sem, quis pretium sem malesuada non. Proin venenatis orci vel nisl porta sollicitudin. Pellentesque
					sit amet massa et orci malesuada facilisis vel vel lectus. Etiam tristique volutpat auctor. Morbi nec massa eget sem
					ultricies fermentum id ut ligula. Praesent aliquet adipiscing dictum. Suspendisse dignissim dui tortor. Integer faucibus
					interdum justo, mattis commodo elit tempor id. Quisque ut orci orci, sit amet mattis nulla. Suspendisse quam diam, feugiat
					at ullamcorper eget, sagittis sed eros. Proin tortor tellus, pulvinar at imperdiet in, egestas sed nisl. Aenean tempor
					neque ut felis dignissim ac congue felis viverra.
				</p>
			</com:TRouteView>
			
			<com:TRouteView ID="Tab3" on:BecameActive=".tabBecameActive" on:BecameInactive=".tabBecameInactive" >
				<prop:Path>
					/tab/three
				</prop:Path>
				<p>
					Duis egestas fermentum ipsum et commodo. Proin bibendum consectetur elit, hendrerit porta mi dictum eu. Vestibulum adipiscing
					euismod laoreet. Vivamus lobortis tortor a odio consectetur pulvinar. Proin blandit ornare eros dictum fermentum. Class
					aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur laoreet, ante aliquet
					molestie laoreet, lectus odio fringilla purus, id porttitor erat velit vitae mi. Nullam posuere nunc ut justo sollicitudin
					interdum. Donec suscipit eros nec leo condimentum fermentum. Nunc quis libero massa. Integer tempus laoreet lectus id interdum.
					Integer facilisis egestas dui at convallis. Praesent elementum nisl et erat iaculis a blandit ligula mollis. Vestibulum vitae
					risus dui, nec sagittis arcu. Nullam tortor enim, placerat quis eleifend in, viverra ac lacus. Ut aliquam sapien ut metus
					hendrerit auctor dapibus justo porta.
				</p>
			</com:TRouteView>
			
			<com:TRouteView ID="Tab4" on:BecameActive=".tabBecameActive" on:BecameInactive=".tabBecameInactive" >
				<prop:Path>
					/tab/four
				</prop:Path>
				<p>
					Proin sollicitudin tincidunt quam, in egestas dui tincidunt non. Maecenas tempus condimentum mi, sed convallis tortor iaculis
					eu. Cras dui dui, tempor quis tempor vitae, ullamcorper in justo. Integer et lorem diam. Quisque consequat lectus eget urna
					molestie pharetra. Cras risus lectus, lobortis sit amet imperdiet sit amet, eleifend a erat. Suspendisse vel luctus lectus.
					Sed ac arcu nisi, sit amet ornare tellus. Pellentesque nec augue a nibh pharetra scelerisque quis sit amet felis. Nullam at
					enim at lacus pretium iaculis sit amet vel nunc. Praesent sapien felis, tincidunt vitae blandit ut, mattis at diam. Suspendisse
					ac sapien eget eros venenatis tempor quis id odio. Donec lacus leo, tincidunt eget molestie at, pharetra cursus odio.
				</p>
			</com:TRouteView>
			
		</div>
	</div>
	
</com:TContent>

</template>
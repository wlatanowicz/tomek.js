<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil' xmlns:tomek='tomek'>

    <com:TControl>
        <div class="bar bar-header bar-stable">
            <com:UIButton CssClass="button button-icon icon ion-navicon" />
            <div class="h1 title">Header Buttons</div>
            <com:UIButton CssClass="button button-clear button-positive" Text="Edit" />
        </div>

        <div class="scroll-content ionic-scroll has-header has-tabs padding" >

            <div class="list">
                <label class="item item-input item-stacked-label">
                    <span class="input-label">First Name</span>
                    <com:TTextBox />
                </label>
                <label class="item item-input item-stacked-label">
                    <span class="input-label">Last Name</span>
                    <input type="text" placeholder="Suhr" />
                </label>
                <label class="item item-input item-stacked-label">
                    <span class="input-label">Email</span>
                    <input type="text" placeholder="john@suhr.com" />
                </label>
            </div>

            <ul class="list">

                <li class="item item-toggle">
                    HTML5
                    <label class="toggle toggle-positive">
                        <input type="checkbox" />
                        <div class="track">
                            <div class="handle"></div>
                        </div>
                    </label>
                </li>
                <li class="item item-toggle">
                    HTML5
                    <label class="toggle toggle-assertive">
                        <input type="checkbox" />
                        <div class="track">
                            <div class="handle"></div>
                        </div>
                    </label>
                </li>
                <li class="item item-toggle">
                    HTML5
                    <label class="toggle toggle-assertive">
                        <input type="checkbox" />
                        <div class="track">
                            <div class="handle"></div>
                        </div>
                    </label>
                </li>

            </ul>            

            <div class="range">
                <i class="icon ion-volume-low"></i>
                <input type="range" name="volume" />
                <i class="icon ion-volume-high"></i>
            </div>

            <div class="list">
                <div class="item range range-positive">
                    <i class="icon ion-ios7-sunny-outline"></i>
                    <input type="range" name="volume" min="0" max="100" value="33" />
                    <i class="icon ion-ios7-sunny"></i>
                </div>
                <div class="item range range-negative">
                    <i class="icon ion-ios7-sunny-outline"></i>
                    <input type="range" name="volume" min="0" max="100" value="33" />
                    <i class="icon ion-ios7-sunny"></i>
                </div>
                <div class="item range range-positive">
                    <i class="icon ion-ios7-sunny-outline"></i>
                    <input type="range" name="volume" min="0" max="100" value="33" />
                    <i class="icon ion-ios7-sunny"></i>
                </div>
            </div>            


            <com:TButton CssClass="button button-block button-positive" Text="Block button" />

        </div>
    </com:TControl>

</template>
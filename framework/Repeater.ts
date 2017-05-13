import Control from "@framework/Control";
import RepeaterItem from "@framework/RepeaterItem";
import PlaceHolder from "@framework/PlaceHolder";
import EventResponder from "@framework/EventResponder";
import EventResponderInterface from "@framework/EventResponderInterface";

/** section: Controls
 * class Repeater < Control
 * includes EventResponderMixin
 *
 * Control renders it's contents multiple times
 * based on data source
 *
 * ##### Triggered events
 *
 * `on:ItemCreated`
 *
 **/
export default class Repeater extends Control implements EventResponderInterface
{
    private _event = null;

    get event():EventResponder
    {
        if (this._event === null) {
            this._event = new EventResponder(this, ['ItemCreated']);
        }
        return this._event;
    }

    //@Override
    _ignoreTemplate = true;

    private _DataSource = [];
    private _Items = [];
    private _HeaderItem = null;
    private _FooterItem = null;
    private _EmptyItem = null;
    private _ItemTemplate = null;
    private _HeaderTemplate = null;
    private _FooterTemplate = null;
    private _EmptyTemplate = null;
    private _WrapperTemplate = null;

    private _ShowHeaderWhenEmpty = true;
    private _ShowFooterWhenEmpty = true;
    private _ShowWrapperWhenEmpty = true;

    /**
     * Repeater#DataSource -> Array
     *
     * Data source for repeater. Setting data source
     * clean ups the repeater for next rendering.
     *
     **/

    /**
     * Repeater#Items -> Array@RepeaterItem
     **/

    /**
     * Repeater#HeaderItem -> RepeaterItem
     **/

    /**
     * Repeater#FooterItem -> RepeaterItem
     **/

    /**
     * Repeater#EmptyItem -> RepeaterItem
     **/

    /**
     * Repeater#ItemTemplate -> Function
     **/

    /**
     * Repeater#HeaderTemplate -> Function
     **/

    /**
     * Repeater#FooterTemplate -> Function
     **/

    /**
     * Repeater#EmptyTemplate -> Function
     **/

    get ShowHeaderWhenEmpty()
    {
        return this.converters.boolean(this._ShowHeaderWhenEmpty);
    }

    set ShowHeaderWhenEmpty(value)
    {
        this._ShowHeaderWhenEmpty = value;
    }

    get ShowFooterWhenEmpty()
    {
        return this.converters.boolean(this._ShowFooterWhenEmpty);
    }

    set ShowFooterWhenEmpty(value)
    {
        this._ShowFooterWhenEmpty = value;
    }

    get ShowWrapperWhenEmpty()
    {
        return this.converters.boolean(this._ShowWrapperWhenEmpty);
    }

    set ShowWrapperWhenEmpty(value)
    {
        this._ShowWrapperWhenEmpty = value;
    }

    get ItemTemplate(): any
    {
        return this._ItemTemplate;
    }

    set ItemTemplate(value: any)
    {
        this._ItemTemplate = value;
    }

    get HeaderTemplate(): any
    {
        return this._HeaderTemplate;
    }

    set HeaderTemplate(value: any)
    {
        this._HeaderTemplate = value;
    }

    get FooterTemplate(): any
    {
        return this._FooterTemplate;
    }

    set FooterTemplate(value: any)
    {
        this._FooterTemplate = value;
    }

    get EmptyTemplate(): any
    {
        return this._EmptyTemplate;
    }

    set EmptyTemplate(value: any)
    {
        this._EmptyTemplate = value;
    }

    get WrapperTemplate(): any
    {
        return this._WrapperTemplate;
    }

    set WrapperTemplate(value: any)
    {
        this._WrapperTemplate = value;
    }

    set DataSource(ds)
    {
        this._DataSource = ds;
        this.cleanup();
    }

    get DataSource()
    {
        return this.converters.object(this._DataSource);
    }

    get Items()
    {
        return this._Items;
    }

    get HeaderItem(): any
    {
        return this._HeaderItem;
    }

    get FooterItem(): any
    {
        return this._FooterItem;
    }

    get EmptyItem(): any
    {
        return this._EmptyItem;
    }

    cleanup()
    {
        for ( var i=0; i<this._Items.length; i++ ){
            this._Items[i].destroy();
        }

        var to_destroy = ['_HeaderItem','_FooterItem','_EmptyItem'];
        for ( var j=0; j<to_destroy.length; j++ ){
            var c = to_destroy[j];
            if ( this[c] ){
                this[c].destroy();
            }
        }

        this.removeRenderedNodes();

        this._childControlsCreated = false;
        this._childControls = [];
        this._childControlsHash = {};

        this._Items = [];
        this._HeaderItem = null;
        this._FooterItem = null;
        this._EmptyItem = null;
    }

    /**
     * Repeater#createChildControls() -> void
     *
     * Creates child controls based on contents of DataSource
     *
     **/
    //@Override
    createChildControls()
    {
        var data_source = this.DataSource;
        var hasData = data_source && data_source.length > 0;

        var placeholder = this;

        if ((hasData || this.ShowWrapperWhenEmpty) && this._WrapperTemplate) {
            var wrapper = new RepeaterItem();
            wrapper.Type = 'Wrapper';
            wrapper.Repeater = this;
            wrapper.useTemplate(this._WrapperTemplate);
            var placeholders = wrapper.findChildControlsByKind(PlaceHolder);
            if (placeholders.length > 0) {
                this.addChildControl(wrapper);
                placeholder = placeholders[0];
            }
        }

        if ((hasData || this.ShowHeaderWhenEmpty) && this._HeaderTemplate) {
            var header = new RepeaterItem();
            header.Type = 'Header';
            header.Repeater = this;
            header.useTemplate(this._HeaderTemplate);
            this._HeaderItem = header;
            placeholder.addChildControl(header);
        }

        if (hasData && this._ItemTemplate) {
            for (var i = 0; i<data_source.length; i++) {
                var data_item = data_source[i];
                var item = new RepeaterItem();
                item.Type = 'Item';
                item.Repeater = this;
                item.ItemIndex = i;
                item.DataItem = data_item;
                item.useTemplate(this._ItemTemplate);
                this._Items.push(item);
                placeholder.addChildControl(item);
                var param = {
                    'domEvent' : null,
                    'event' : 'ItemCreated',
                    'item' : item,
                    'dataItem' : data_item,
                    'itemIndex' : i
                };
                this.event.trigger('ItemCreated', param);
            }
        }

        if ((hasData || this.ShowFooterWhenEmpty) && this._FooterTemplate) {
            var footer = new RepeaterItem();
            footer.Type = 'Footer';
            footer.Repeater = this;
            footer.useTemplate(this._FooterTemplate);
            this._FooterItem = footer;
            placeholder.addChildControl(footer);
        }

        if (!hasData && this._EmptyTemplate) {
            var empty = new RepeaterItem();
            empty.Type = 'Empty';
            empty.Repeater = this;
            empty.useTemplate(this._EmptyTemplate);
            this._EmptyItem = empty;
            this.addChildControl(empty);
        }

    }
}

/** section: Utilities
 * class RepeaterItemCreatedEventParameter
 *
 **/

/**
 * RepeaterItemCreatedEventParameter.domEvent -> null
 **/

/**
 * RepeaterItemCreatedEventParameter.event -> String
 **/

/**
 * RepeaterItemCreatedEventParameter.item -> RepeaterItem
 **/

/**
 * RepeaterItemCreatedEventParameter.dataItem -> Object
 **/

/**
 * RepeaterItemCreatedEventParameter.itemIndex -> int
 **/

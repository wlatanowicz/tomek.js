import ServiceDefinitionInterface from "@framework/DependencyInjection/Definition/ServiceDefinitionInterface";
import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";

export default class ByValue implements ServiceDefinitionInterface
{
    private value: any;

    constructor(value: any)
    {
        this.value = value;
    }

    compile(container: ServiceContainer): any
    {
        return this.value;
    }
}

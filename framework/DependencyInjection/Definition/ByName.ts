import ServiceDefinitionInterface from "@framework/DependencyInjection/Definition/ServiceDefinitionInterface";
import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";

export default class ByName implements ServiceDefinitionInterface
{
    private serviceName: string;

    constructor(serviceName: string)
    {
        this.serviceName = serviceName;
    }

    compile(container: ServiceContainer): any
    {
        return container.getService(this.serviceName);
    }
}

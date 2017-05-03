import ServiceDefinitionInterface from "@framework/DependencyInjection/Definition/ServiceDefinitionInterface";
import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";

export default class ByConstructor implements ServiceDefinitionInterface
{
    private serviceClass: any;
    private argumentsList: any[];

    constructor(serviceClass: any, argumentsList: any[] = [])
    {
        this.serviceClass = serviceClass;
        this.argumentsList = argumentsList;
    }

    compile(container: ServiceContainer): any
    {
        return new (Function.prototype.bind.apply(
            this.serviceClass,
            this.getPreparedArguments(container)
        ));
    }

    private getPreparedArguments(container: ServiceContainer): any[]
    {
        let preparedArguments = [null];
        for (let i = 0; i < this.argumentsList.length; i++) {
            if (container.isServiceDefinition(this.argumentsList[i])) {
                preparedArguments.push(this.argumentsList[i].compile(container));
            } else {
                preparedArguments.push(this.argumentsList[i])
            }
        }
        return preparedArguments;
    }
}

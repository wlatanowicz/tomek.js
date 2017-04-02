import ServiceDefinitionInterface from "@framework/DependencyInjection/Definition/ServiceDefinitionInterface";
import TException from "@framework/TException";

export default class ServiceContainer
{
    private definitions: any = {};
    private services: any = {};

    static instance;

    static getInstance(): ServiceContainer
    {
        if (!ServiceContainer.instance) {
            ServiceContainer.instance = new ServiceContainer();
        }
        return ServiceContainer.instance;
    }

    static define(name: string, definition: ServiceDefinitionInterface)
    {
        ServiceContainer.getInstance().defineService(name, definition);
    }

    static get(name: string): any
    {
        return ServiceContainer.getInstance().getService(name);
    }

    static set(name: string, service: any)
    {
        ServiceContainer.getInstance().setService(name, service);
    }

    defineService(name: string, definition: ServiceDefinitionInterface)
    {
        this.definitions[name] = definition;
    }

    getService(name: string): any
    {
        if (! this.services[name]) {
            this.services[name] = this.serviceFromDefinition(name);
        }
        return this.services[name];
    }

    setService(name: string, service: any)
    {
        this.services[name] = service;
    }

    isServiceDefinition(obj: any): obj is ServiceDefinitionInterface {
        return !! obj['compile'];
    }

    private serviceFromDefinition(name: string)
    {
        if (this.definitions[name]){
            return this.definitions[name].compile(this);
        }
        throw new TException("Undefined service " + name);
    }
}

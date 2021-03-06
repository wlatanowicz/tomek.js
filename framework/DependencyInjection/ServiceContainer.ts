import ServiceDefinitionInterface from "@framework/DependencyInjection/Definition/ServiceDefinitionInterface";
import Exception from "@framework/Exception";

export default class ServiceContainer {
  private definitions: any = {};
  private services: any = {};

  static instance;

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  static define(name: string, definition: ServiceDefinitionInterface) {
    ServiceContainer.getInstance().defineService(name, definition);
  }

  static batchDefine(definitions: any) {
    for (var serviceName in definitions) {
      ServiceContainer.define(
        serviceName,
        definitions[serviceName]
      );
    }
  }

  static get(name: string): any {
    return ServiceContainer.getInstance().getService(name);
  }

  static set(name: string, service: any) {
    ServiceContainer.getInstance().setService(name, service);
  }

  static create(name: string) {
    return ServiceContainer.getInstance().createFromDefinition(name);
  }

  defineService(name: string, definition: ServiceDefinitionInterface) {
    this.definitions[name] = definition;
  }

  getService(name: string): any {
    if (!this.services[name]) {
      this.services[name] = this.createFromDefinition(name);
    }
    return this.services[name];
  }

  setService(name: string, service: any) {
    this.services[name] = service;
  }

  isServiceDefinition(obj: any): obj is ServiceDefinitionInterface {
    return !!obj['compile'];
  }

  createFromDefinition(name: string) {
    if (this.definitions[name]) {
      return this.definitions[name].compile(this);
    }
    throw new Exception("Undefined service " + name);
  }
}

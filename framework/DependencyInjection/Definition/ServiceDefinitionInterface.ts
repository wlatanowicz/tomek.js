import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";

interface ServiceDefinitionInterface {
  compile(container: ServiceContainer): any;
}

export default ServiceDefinitionInterface;

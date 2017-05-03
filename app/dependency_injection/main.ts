import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";

import services from "@app/dependency_injection/Services";

ServiceContainer.batchDefine(services);
ServiceContainer.get("app").render();

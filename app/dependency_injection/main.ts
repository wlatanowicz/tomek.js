import DependencyInjection from "@app/dependency_injection/DependencyInjection";
import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";
import ByConstructor from "@framework/DependencyInjection/Definition/ByConstructor";
import MainApp from "@app/dependency_injection/MainApp";
import ByName from "@framework/DependencyInjection/Definition/ByName";
import GreetingsProvider from "@app/dependency_injection/GreetingsProvider";

ServiceContainer.define(
    "app",
    new ByConstructor(
        MainApp,
        [
            "container"
        ]
    )
);

ServiceContainer.define(
    "dependecyInjected",
    new ByConstructor(
        DependencyInjection,
        [
            new ByName("greetings_provider")
        ]
    )
);

ServiceContainer.define(
    "greetings_provider",
    new ByConstructor(
        GreetingsProvider,
        [
            "Hello injected World!"
        ]
    )
);


ServiceContainer.get("app").render();

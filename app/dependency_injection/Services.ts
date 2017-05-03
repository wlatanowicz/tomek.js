import ByConstructor from "@framework/DependencyInjection/Definition/ByConstructor";
import ByValue from "@framework/DependencyInjection/Definition/ByValue";
import MainApp from "@app/dependency_injection/MainApp";
import DependencyInjection from "@app/dependency_injection/DependencyInjection";
import ByName from "@framework/DependencyInjection/Definition/ByName";
import GreetingsProvider from "@app/dependency_injection/GreetingsProvider";

export default {
    "app": new ByConstructor(
        MainApp,
        [
            new ByValue("container")
        ]
    ),
    "dependecyInjected": new ByConstructor(
        DependencyInjection,
        [
            new ByName("greetings_provider")
        ]
    ),
    "greetings_provider": new ByConstructor(
        GreetingsProvider,
        [
            new ByValue("Hello injected World!")
        ]
    )
};
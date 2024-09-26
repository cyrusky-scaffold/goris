import { Container } from "inversify";
import { ServiceNames } from "../constants/ServiceNames";
import { CommandRegister } from "../command/commandRegister";
import { CommandPrompt } from "../command/commandPrompt";

export class IOC {
  static instance: IOC;

  private container: Container;

  private constructor() {
    this.container = new Container();
    this.bindServices();
  }

  static get<T>(serviceName: ServiceNames): T {
    if (!IOC.instance) {
      IOC.instance = new IOC();
    }
    return IOC.instance.container.get(serviceName) as T;
  }

  private bindServices() {
    this.container
      .bind<CommandRegister>(ServiceNames.CommandRegister)
      .to(CommandRegister)
      .inSingletonScope();

    this.container
      .bind<CommandPrompt>(ServiceNames.CommandPrompt)
      .to(CommandPrompt)
      .inSingletonScope();
  }
}

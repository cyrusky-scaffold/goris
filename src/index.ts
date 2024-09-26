import "reflect-metadata";
import { IOC } from "./container";
import { ServiceNames } from "./constants/ServiceNames";
import { CommandRegister } from "./command/commandRegister";

const commandRegister = IOC.get<CommandRegister>(ServiceNames.CommandRegister);

commandRegister.init();

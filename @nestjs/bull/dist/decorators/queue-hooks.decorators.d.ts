import { BullQueueEvent, BullQueueEventOptions, QueueEventDecoratorOptions } from '../bull.types';
export declare const OnQueueEvent: (eventNameOrOptions: BullQueueEvent | BullQueueEventOptions) => MethodDecorator;
export declare const OnQueueError: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueWaiting: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueActive: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueStalled: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueProgress: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueCompleted: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueFailed: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueuePaused: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueResumed: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueCleaned: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueDrained: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnQueueRemoved: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueError: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueWaiting: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueActive: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueStalled: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueProgress: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueCompleted: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueFailed: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueuePaused: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueResumed: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueCleaned: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueDrained: (options?: QueueEventDecoratorOptions) => MethodDecorator;
export declare const OnGlobalQueueRemoved: (options?: QueueEventDecoratorOptions) => MethodDecorator;
//# sourceMappingURL=queue-hooks.decorators.d.ts.map
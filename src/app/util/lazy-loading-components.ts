import {ComponentFactoryResolver, ComponentRef, ViewContainerRef} from '@angular/core';

import {ComponentType} from '@angular/cdk/portal';

export class LazyLoadComponentsUtil<T> {
  static loadComponent(component: ComponentType<any>, entry: ViewContainerRef, resolver: ComponentFactoryResolver): ComponentRef<any> {
    entry.clear();
    const factory = resolver.resolveComponentFactory(component);
    return entry.createComponent(factory);
  }
}

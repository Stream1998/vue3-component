import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(component: T) {
	(component as SFCWithInstall<T>).install= function(app:App) {
		const { name } = component as unknown as { name: string };
		app.component(name, component as SFCWithInstall<T>);
	}
	return component as SFCWithInstall<T>;
}
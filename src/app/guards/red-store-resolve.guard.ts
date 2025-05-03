import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { MasterService } from "../service/master.service";
import { IProduct, ITeam } from "../model/RedStore";


export const redStoreResolve: ResolveFn<IProduct> = () => {
    const masterService = inject(MasterService);
    return masterService.getAllProducts();
}

export const redStoreCategoryPResolve: ResolveFn<IProduct> = () => {
    const masterService = inject(MasterService);
    return masterService.getAllCategories()
}

export const redStoreFeaturedPResolve: ResolveFn<any> = () => {
    const masterService = inject(MasterService);
    return masterService.getAllFeaturedProducts();
}

export const redStoreLatestPResolve: ResolveFn<any> = () => {
    const masterService = inject(MasterService);
    return masterService.getAllLatestProduct();
}

export const redStoreCheckoutResolve: ResolveFn<any> = () => {
    const masterService = inject(MasterService);
    return masterService.getAllCartProducts();
}

export const redStoreAboutResolve: ResolveFn<ITeam[]> = () => {
    const masterService = inject(MasterService);
    return masterService.getAllTeam();
}